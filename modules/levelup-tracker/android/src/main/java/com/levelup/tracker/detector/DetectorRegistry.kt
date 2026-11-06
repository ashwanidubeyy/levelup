package com.levelup.tracker.detector

import com.levelup.tracker.core.TrackedApp

object DetectorRegistry {
    private val detectors: Map<TrackedApp, ShortFormDetector> = listOf(
        InstagramReelsDetector(),
        YouTubeShortsDetector(),
        FacebookReelsDetector(),
    ).associateBy { it.app }

    fun forApp(app: TrackedApp): ShortFormDetector = detectors.getValue(app)

    val all: Collection<ShortFormDetector> get() = detectors.values
}
