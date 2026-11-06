package com.levelup.tracker.detector

import com.levelup.tracker.core.TrackedApp

class InstagramReelsDetector : SignatureDetector() {
    override val app = TrackedApp.INSTAGRAM
    override val version = "ig-1"
    override val selectedLabelAllowlist = setOf("reels")

    override val feedPagerRule = SignatureRule(
        "clips-pager",
        "^clips_viewer_view_pager$",
        "^clips_viewer_pager$",
        "^clips_.*(pager|recycler_view|swipe_refresh).*$",
    )

    override val feedIdRule = SignatureRule(
        "clips-ui",
        "^clips_viewer_(?!view_pager$).+$",
        "^clips_(video_container|media_component|ufi_component|author_.+|item_overlay.*|caption_component|audio_attribution.*|action_bar.*)$",
    )

    override val hardNegativeRules = listOf(
        SignatureRule("stories", "^reel_viewer_.+$", "^reel_viewer$"),
        SignatureRule(
            "direct",
            "^direct_thread.*$",
            "^row_thread_composer.*$",
            "^thread_title.*$",
            "^direct_inbox.*$",
        ),
    )

    override val softNegativeRules = listOf(
        SignatureRule("explore-grid", "^explore_.*(grid|recycler).*$"),
        SignatureRule("profile", "^profile_header.*$"),
    )

    override val windowClassRule = SignatureRule("clips-window", ".*[Cc]lips.*")
}
