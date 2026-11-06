package com.levelup.tracker.detector

import com.levelup.tracker.core.Confidence
import com.levelup.tracker.core.FeedState
import com.levelup.tracker.core.PagerInfo
import com.levelup.tracker.core.ScreenSummary
import com.levelup.tracker.core.ScrollInfo
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class DetectorTest {

    private val instagram = InstagramReelsDetector()
    private val youtube = YouTubeShortsDetector()
    private val facebook = FacebookReelsDetector()

    private fun summary(
        pkg: String,
        ids: Set<String> = emptySet(),
        labels: Set<String> = emptySet(),
        pagers: List<PagerInfo> = emptyList(),
        window: String? = null,
        sensitive: Boolean = false,
    ) = ScreenSummary(pkg, window, ids, labels, pagers, "fp", 120, false, sensitive)

    private fun pager(id: String?, vertical: Boolean = true) = PagerInfo(id, "androidx.recyclerview.widget.RecyclerView", 0.92f, 1f, vertical)

    private fun scroll(id: String?, height: Float = 0.92f, deltaX: Int = 0, deltaY: Int = 200) =
        ScrollInfo(3, 3, 40, deltaX, deltaY, id, "RecyclerView", height, 1f)

    @Test
    fun instagramReelsTabIsHighConfidence() {
        val result = instagram.detect(
            summary(
                "com.instagram.android",
                ids = setOf("clips_viewer_view_pager", "clips_video_container", "clips_tab", "feed_tab"),
                labels = setOf("reels"),
                pagers = listOf(pager("clips_viewer_view_pager")),
            )
        )
        assertEquals(FeedState.IN_FEED, result.state)
        assertEquals(Confidence.HIGH, result.confidence)
    }

    @Test
    fun instagramReelOpenedFromFeedIsHighConfidence() {
        val result = instagram.detect(
            summary("com.instagram.android", ids = setOf("clips_viewer_view_pager", "clips_ufi_component"), pagers = listOf(pager("clips_viewer_view_pager")))
        )
        assertEquals(Confidence.HIGH, result.confidence)
    }

    @Test
    fun instagramHomeFeedIsNotCounted() {
        val result = instagram.detect(
            summary(
                "com.instagram.android",
                ids = setOf("feed_tab", "clips_tab", "row_feed_photo_profile_name", "list"),
                labels = setOf("home"),
                pagers = listOf(pager("list")),
            )
        )
        assertEquals(FeedState.NOT_IN_FEED, result.state)
    }

    @Test
    fun instagramHomeFeedWithReelPostIsOnlyLowConfidence() {
        val result = instagram.detect(
            summary("com.instagram.android", ids = setOf("list", "clips_viewer_media_indicator"), pagers = listOf(pager("list")))
        )
        assertEquals(Confidence.LOW, result.confidence)
    }

    @Test
    fun instagramStoriesAreAHardNegative() {
        val result = instagram.detect(
            summary("com.instagram.android", ids = setOf("reel_viewer_root", "reel_viewer_progress_bar"), pagers = listOf(pager(null)))
        )
        assertEquals(FeedState.NOT_IN_FEED, result.state)
        assertTrue(result.hardExit)
    }

    @Test
    fun instagramDirectMessagesAreAHardNegative() {
        val result = instagram.detect(
            summary("com.instagram.android", ids = setOf("direct_thread_view", "row_thread_composer_edittext"))
        )
        assertEquals(FeedState.NOT_IN_FEED, result.state)
        assertTrue(result.hardExit)
    }

    @Test
    fun instagramRenamedIdsFallBackToTabAndPager() {
        val result = instagram.detect(
            summary("com.instagram.android", ids = setOf("x_container"), labels = setOf("reels"), pagers = listOf(pager("vertical_pager_v2")))
        )
        assertEquals(FeedState.IN_FEED, result.state)
        assertEquals(Confidence.MEDIUM, result.confidence)
    }

    @Test
    fun sensitiveScreenStopsDetection() {
        val result = instagram.detect(summary("com.instagram.android", sensitive = true))
        assertEquals(FeedState.NOT_IN_FEED, result.state)
        assertTrue(result.hardExit)
    }

    @Test
    fun youtubeShortsIsHighConfidence() {
        val result = youtube.detect(
            summary(
                "com.google.android.youtube",
                ids = setOf("reel_recycler", "reel_player_page_container", "pivot_bar"),
                labels = setOf("shorts"),
                pagers = listOf(pager("reel_recycler")),
            )
        )
        assertEquals(Confidence.HIGH, result.confidence)
    }

    @Test
    fun youtubeNormalVideoIsNotCounted() {
        val result = youtube.detect(
            summary(
                "com.google.android.youtube",
                ids = setOf("watch_while_layout", "watch_player", "watch_list", "player_view"),
                pagers = listOf(pager("watch_list")),
            )
        )
        assertEquals(FeedState.NOT_IN_FEED, result.state)
    }

    @Test
    fun youtubeHomeWithShortsShelfIsNotCounted() {
        val result = youtube.detect(
            summary(
                "com.google.android.youtube",
                ids = setOf("results", "reel_shelf_header", "reel_item_thumbnail", "pivot_bar"),
                labels = setOf("home"),
                pagers = listOf(pager("results")),
            )
        )
        assertEquals(FeedState.NOT_IN_FEED, result.state)
    }

    @Test
    fun facebookReelsViewerIsDetected() {
        val result = facebook.detect(
            summary("com.facebook.katana", labels = setOf("reels"), pagers = listOf(pager(null)))
        )
        assertEquals(Confidence.MEDIUM, result.confidence)
    }

    @Test
    fun feedScrollSourceMustBeTheFeedPager() {
        val onScreen = summary("com.instagram.android", pagers = listOf(pager("clips_viewer_view_pager")))
        assertTrue(instagram.isFeedScrollSource(scroll("clips_viewer_view_pager"), onScreen))
        assertFalse(instagram.isFeedScrollSource(scroll("comments_list"), onScreen))
        assertFalse(instagram.isFeedScrollSource(scroll("clips_viewer_view_pager", deltaX = 300, deltaY = 0), onScreen))
    }

    @Test
    fun unknownFullScreenScrollerAcceptedOnlyWhenNoKnownPager() {
        val renamed = summary("com.instagram.android", pagers = listOf(pager("vertical_pager_v2")))
        assertTrue(instagram.isFeedScrollSource(scroll("vertical_pager_v2"), renamed))
        assertFalse(instagram.isFeedScrollSource(scroll("small_list", height = 0.4f), renamed))
    }
}
