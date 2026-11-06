package com.levelup.tracker.detector

import com.levelup.tracker.core.TrackedApp

class YouTubeShortsDetector : SignatureDetector() {
    override val app = TrackedApp.YOUTUBE
    override val version = "yt-1"
    override val selectedLabelAllowlist = setOf("shorts")

    override val feedPagerRule = SignatureRule(
        "reel-recycler",
        "^reel_recycler$",
        "^reel_.*(recycler|pager)$",
        "^shorts_.*(recycler|pager)$",
    )

    override val feedIdRule = SignatureRule(
        "shorts-ui",
        "^reel_(player_page_container|player_overlay.*|watch_player|time_bar|progress_bar|main_title|channel_.+|like_button|dislike_button|comment_button|more_button|dyn_remix|metapanel.*|multi_format.*|pivot_button)$",
        "^shorts_(player|container|video).*$",
    )

    override val softNegativeRules = listOf(
        SignatureRule(
            "watch-page",
            "^watch_while_layout$",
            "^watch_list$",
            "^watch_player$",
            "^engagement_panel.*$",
        ),
    )

    override val windowClassRule = SignatureRule("shorts-window", ".*([Ss]horts|[Rr]eel[Ww]atch).*")
}
