# LevelUp — Reel/Short tracking feasibility report

Status: **Implementation complete, pending real-device validation.** Nothing in this
module is considered "done" until the device test plan in `docs/TEST_PLAN.md` passes.

## 1. What BrainPal-style apps actually do

Apps that count Reels/Shorts on Android all rely on the same public mechanism: an
`AccessibilityService`. Android delivers UI events (window changes, content changes,
scrolls) and lets the service read the *structure* of the foreground window
(view IDs, class names, bounds, selection state). There is no other public API that
exposes "the user moved to the next Reel". Usage-stats APIs only report time spent
per app, not per item.

On iOS no equivalent exists. Third-party apps cannot observe another app's UI. Screen
Time (`FamilyControls`, `DeviceActivity`, `ManagedSettings`) reports usage per app or
category, never per Reel or Short, and the report extension cannot export raw numbers
back to the host app.

## 2. Android design

| Area | Decision |
| --- | --- |
| Scope | `packageNames` in `levelup_accessibility_config.xml` restricts events to `com.instagram.android`, `com.google.android.youtube`, `com.facebook.katana`. Android never delivers events from other apps to the service. |
| Events | `typeWindowStateChanged`, `typeWindowContentChanged`, `typeViewScrolled` only. No text-changed, focus, or notification events. |
| Detection | One detector per app (`InstagramReelsDetector`, `YouTubeShortsDetector`, `FacebookReelsDetector`). Signature scoring over several weak signals (pager view ID, feed container ID, selected tab label, full-screen vertical pager, window class). No single node ID is required, so a renamed ID lowers confidence instead of breaking detection. |
| Confidence | HIGH ≥ 3 points, MEDIUM = 2, LOW = 1. Items are only counted at MEDIUM or above by default. Hard negatives (Stories viewer, DM threads) force an exit. |
| Counting | Counts *settled new items*, not swipes: pager index change confirmed by a settle (`fromIndex == toIndex`), with dwell ≥ 500 ms (configurable), burst dedupe 250 ms, visited-index set per session, and a 30-minute in-memory fingerprint set for revisits. |
| Fallback | When a pager exposes no indices, a structural fingerprint (SHA-256 of view IDs + content descriptions inside the pager, first 8 bytes) is used to tell items apart. Fingerprints are never persisted. |
| Sessions | Start on feed entry, idle after 120 s without activity, exit after two consecutive negative detections, on a decisive window change, on screen off, or when another app takes the foreground. Re-entering within 2 minutes does not re-count the visible item. |
| Storage | Local SQLite (`sessions`, `items`, `service_days`, `diagnostics`). The diagnostics log is capped at 500 rows. |
| Overlay | `TYPE_ACCESSIBILITY_OVERLAY` drawn by the service (no extra permission). Falls back to `TYPE_APPLICATION_OVERLAY` only if the user grants "Display over other apps". |
| Restricted settings | Android 13+ blocks enabling accessibility for sideloaded APKs until the user taps "Allow restricted settings" in App info. Onboarding detects sideloaded installs and links there. |

### Known Android limitations

* App updates can rename view IDs. The scoring degrades gracefully, and Diagnostics shows
  which signals were seen, so detectors can be updated. An app update may still
  cause under-counting until the detector is adjusted. Low-confidence counting can be
  enabled temporarily in Settings.
* Facebook Reels detection is marked **experimental**: its view hierarchy is heavily
  obfuscated and changes frequently.
* OEM battery managers (Xiaomi, Oppo, Vivo, some Samsung builds) can kill the service.
  Onboarding requests the battery-optimization exemption. Days the service never ran
  are recorded as "not tracked", never as zero.
* Other short-form feeds (Snapchat Spotlight, TikTok, etc.) are **not** included because
  their detection has not been validated.

## 3. Privacy disclosure (exactly what is observed)

Observed, from the three supported apps only:

* view resource IDs, class names, bounds, scrollability and selected state
* scroll event metadata (item indices, scroll deltas)
* content descriptions of nodes inside the short-form pager, hashed in memory only for
  the revisit fingerprint
* selected bottom-tab labels, matched against a fixed allowlist (e.g. "Reels", "Shorts")

Never observed or stored:

* typed text, `EditText` contents, messages, DMs, captions, comments
* passwords or OTPs. If any password field is present in the window, inspection
  stops immediately.
* screenshots, screen recordings, images or video frames
* anything from any other app

Nothing leaves the device. LevelUp has no account, no server, no analytics and no
network calls in the tracking module.

## 4. iOS design

| Capability | Status | Reason |
| --- | --- | --- |
| Per-Reel / per-Short counting | **Unsupported** | No public API exposes another app's UI. The app does not fake it. |
| App-level usage (Screen Time) | **Coming soon** | Requires the Family Controls (Distribution) entitlement, which needs a paid Apple Developer account and Apple approval. |
| Journal, quests, ranks, quotes | Supported | Pure app features. |

The Swift module returns `reelCounting: unsupported` and `appUsage: comingSoon` with
`requiresPaidDeveloperAccount: true`. The shared TypeScript API turns these into
explicit `unsupported` / `comingSoon` results. No numbers are ever fabricated.

## 5. Shared TypeScript API

`modules/levelup-tracker/src/index.ts`:

* `getTrackingCapabilities()`: platform, per-feature status, permissions, app list,
  validation status
* `requestTrackingAuthorization()`: opens Accessibility settings on Android, `comingSoon`
  on iOS
* `getDailyUsage(day)`, `getDailyReelCounts(day)`, `getMonthlyUsageReport(year, month)`
* `setTrackingEnabled(bool)`, `setOverlayEnabled(bool)`

Every data call returns a `TrackerResult<T>`: `ok`, `permissionRequired` (with stored
data, if any), `unsupported`, `comingSoon`, or `error`.
