package com.levelup.tracker.overlay

import android.content.Context
import android.graphics.Canvas
import android.graphics.Movie
import android.graphics.Path
import android.graphics.ImageDecoder
import android.graphics.drawable.AnimatedImageDrawable
import android.graphics.drawable.Drawable
import android.os.Build
import android.os.SystemClock
import android.view.View
import com.levelup.tracker.R

class OverlayGifView(context: Context) : View(context) {

    private val clip = Path()
    private var movie: Movie? = null
    private var animated: AnimatedImageDrawable? = null
    private var startMs = 0L
    private var animating = false

    private val frameTick = Runnable {
        if (!animating || !isAttachedToWindow) {
            return@Runnable
        }
        invalidate()
        scheduleNextFrame()
    }

    init {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            animated = runCatching {
                val source = ImageDecoder.createSource(resources, R.raw.levelup_overlay_gear5)
                val drawable = ImageDecoder.decodeDrawable(source) as? AnimatedImageDrawable
                drawable?.repeatCount = AnimatedImageDrawable.REPEAT_INFINITE
                drawable
            }.getOrNull()
        }
        if (animated == null) {
            movie = runCatching {
                val bytes = resources.openRawResource(R.raw.levelup_overlay_gear5).use { stream -> stream.readBytes() }
                Movie.decodeByteArray(bytes, 0, bytes.size)
            }.getOrNull()
            setLayerType(LAYER_TYPE_SOFTWARE, null)
        }
        importantForAccessibility = IMPORTANT_FOR_ACCESSIBILITY_NO
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            animated?.let { drawable ->
                drawable.callback = this
                drawable.setVisible(true, true)
                drawable.start()
            }
            animating = animated != null
        } else {
            animating = movie != null
            if (animating) {
                if (startMs == 0L) startMs = SystemClock.uptimeMillis()
                scheduleNextFrame()
            }
        }
    }

    override fun onDetachedFromWindow() {
        animating = false
        removeCallbacks(frameTick)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            animated?.stop()
        }
        super.onDetachedFromWindow()
    }

    override fun verifyDrawable(who: Drawable): Boolean =
        who == animated || super.verifyDrawable(who)

    override fun onDraw(canvas: Canvas) {
        val drawable = animated
        if (drawable != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            clip.rewind()
            clip.addOval(0f, 0f, width.toFloat(), height.toFloat(), Path.Direction.CW)
            canvas.save()
            canvas.clipPath(clip)
            drawable.setBounds(0, 0, width, height)
            drawable.draw(canvas)
            canvas.restore()
            return
        }

        val current = movie ?: return
        val now = SystemClock.uptimeMillis()
        if (startMs == 0L) startMs = now
        val duration = current.duration().takeIf { it > 0 } ?: DEFAULT_DURATION
        current.setTime(((now - startMs) % duration).toInt())
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
    }

    private fun scheduleNextFrame() {
        if (!animating || !isAttachedToWindow) return
        removeCallbacks(frameTick)
        postDelayed(frameTick, FRAME_MS)
    }

    companion object {
        private const val DEFAULT_DURATION = 1000
        private const val FRAME_MS = 32L
    }
}
