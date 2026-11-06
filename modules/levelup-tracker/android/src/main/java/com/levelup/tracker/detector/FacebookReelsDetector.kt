package com.levelup.tracker.detector

import com.levelup.tracker.core.TrackedApp

class FacebookReelsDetector : SignatureDetector() {
    override val app = TrackedApp.FACEBOOK
    override val version = "fb-1-experimental"
    override val selectedLabelAllowlist = setOf("reels")

    override val feedPagerRule = SignatureRule(
        "reels-pager",
        "^.*reels?_.*(pager|recycler|viewer).*$",
        "^.*fb_shorts.*(pager|recycler|viewer).*$",
        "^.*clips_.*(pager|viewer).*$",
    )

    override val feedIdRule = SignatureRule(
        "reels-ui",
        "^.*reels?_(?!tab).+$",
        "^.*fb_shorts_.+$",
    )

    override val hardNegativeRules = listOf(
        SignatureRule("stories", "^.*stor(y|ies)_viewer.*$"),
        SignatureRule("messenger", "^.*(thread_view|message_composer).*$"),
    )

    override val windowClassRule = SignatureRule("reels-window", ".*([Rr]eels|FbShorts|[Cc]lips).*")
}
