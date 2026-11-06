package com.levelup.tracker.overlay

import android.content.Context
import android.graphics.Canvas
import android.graphics.Path
import android.graphics.Movie
import android.os.SystemClock
import android.view.View
import com.levelup.tracker.R

class OverlayGifView(context: Context) : View(context) {

    private val movie: Movie? = runCatching {
        val bytes = resources.openRawResource(R.raw.levelup_overlay_gear5).use { stream -> stream.readBytes() }
        Movie.decodeByteArray(bytes, 0, bytes.size)
    }.getOrNull()
    private val clip = Path()
    private var start = 0L

    init {
        setLayerType(LAYER_TYPE_SOFTWARE, null)
        importantForAccessibility = IMPORTANT_FOR_ACCESSIBILITY_NO
    }

    override fun onDraw(canvas: Canvas) {
        val current = movie ?: return
        val now = SystemClock.uptimeMillis()
        if (start == 0L) start = now
        val duration = current.duration().takeIf { it > 0 } ?: DEFAULT_DURATION
        current.setTime(((now - start) % duration).toInt())
        clip.rewind()
        clip.addOval(0f, 0f, width.toFloat(), height.toFloat(), Path.Direction.CW)
        canvas.save()
        canvas.clipPath(clip)
        val scale = minOf(
            width.toFloat() / current.width().coerceAtLeast(1),
            height.toFloat() / current.height().coerceAtLeast(1),
        )
        val dx = (width - current.width() * scale) / 2f
        val dy = (height - current.height() * scale) / 2f
        canvas.translate(dx, dy)
        canvas.scale(scale, scale)
        current.draw(canvas, 0f, 0f)
        canvas.restore()
        postInvalidateOnAnimation()
    }

    companion object {
        private const val DEFAULT_DURATION = 1000
    }
}
