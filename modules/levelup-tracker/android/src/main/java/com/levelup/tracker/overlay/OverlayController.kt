package com.levelup.tracker.overlay

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Color
import android.graphics.PixelFormat
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.provider.Settings
import android.util.TypedValue
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.widget.LinearLayout
import android.widget.TextView
import com.levelup.tracker.data.TrackerPrefs
import kotlin.math.abs

class OverlayController(private val context: Context, private val prefs: TrackerPrefs) {

    private val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    private var root: LinearLayout? = null
    private var fractionView: TextView? = null
    private var params: WindowManager.LayoutParams? = null
    private val background = GradientDrawable()

    val isShowing: Boolean get() = root != null

    fun show() {
        if (root != null) return
        val layout = buildView()
        val layoutParams = buildParams(WindowManager.LayoutParams.TYPE_ACCESSIBILITY_OVERLAY)
        val added = runCatching { windowManager.addView(layout, layoutParams) }.isSuccess ||
            (canUseApplicationOverlay() && runCatching {
                layoutParams.type = applicationOverlayType()
                windowManager.addView(layout, layoutParams)
            }.isSuccess)
        if (added) {
            root = layout
            params = layoutParams
        }
    }

    fun hide() {
        val view = root ?: return
        runCatching { windowManager.removeViewImmediate(view) }
        root = null
        fractionView = null
        params = null
    }

    fun update(sessionCount: Int, todayTotal: Int, dailyLimit: Int) {
        fractionView?.text = "$todayTotal/$dailyLimit"
        val ratio = if (dailyLimit > 0) todayTotal.toFloat() / dailyLimit else 0f
        fractionView?.setTextColor(if (ratio >= WARNING_RATIO) COLOR_RED_TEXT else COLOR_COUNT)
    }

    @SuppressLint("ClickableViewAccessibility")
    private fun buildView(): LinearLayout {
        val body = loadTypeface(FONT_BODY)
        background.cornerRadius = dp(CIRCLE_DP / 2f).toFloat()
        background.setColor(COLOR_BG)
        background.setStroke(dp(STROKE_DP), COLOR_RIM)

        val icon = OverlayGifView(context).apply {
            layoutParams = LinearLayout.LayoutParams(dp(ICON_DP), dp(ICON_DP)).apply {
                gravity = Gravity.CENTER_HORIZONTAL
            }
        }

        val fraction = TextView(context).apply {
            typeface = body
            setTextSize(TypedValue.COMPLEX_UNIT_SP, FRACTION_SP)
            setTextColor(COLOR_COUNT)
            gravity = Gravity.CENTER_HORIZONTAL
            includeFontPadding = false
            letterSpacing = 0.02f
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT,
            ).apply {
                topMargin = dp(TEXT_GAP_DP)
                gravity = Gravity.CENTER_HORIZONTAL
            }
        }
        fractionView = fraction

        return LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(dp(PAD_DP), dp(PAD_DP), dp(PAD_DP), dp(PAD_DP))
            setBackground(background)
            clipToOutline = true
            importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS
            addView(icon)
            addView(fraction)
            setOnTouchListener(DragListener())
        }
    }

    private fun buildParams(type: Int) = WindowManager.LayoutParams(
        dp(CIRCLE_DP),
        dp(CIRCLE_DP),
        type,
        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
        PixelFormat.TRANSLUCENT,
    ).apply {
        gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
        x = prefs.overlayX.takeIf { it >= 0 } ?: 0
        y = prefs.overlayY.takeIf { it >= 0 } ?: dp(DEFAULT_TOP_DP)
    }

    private fun canUseApplicationOverlay(): Boolean =
        Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(context)

    @Suppress("DEPRECATION")
    private fun applicationOverlayType(): Int =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        } else {
            WindowManager.LayoutParams.TYPE_PHONE
        }

    private fun loadTypeface(path: String): Typeface =
        runCatching { Typeface.createFromAsset(context.assets, path) }.getOrDefault(Typeface.DEFAULT_BOLD)

    private fun dp(value: Float): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value, context.resources.displayMetrics).toInt()

    private inner class DragListener : View.OnTouchListener {
        private var startX = 0
        private var startY = 0
        private var touchX = 0f
        private var touchY = 0f
        private var dragging = false

        override fun onTouch(view: View, event: MotionEvent): Boolean {
            val lp = params ?: return false
            when (event.actionMasked) {
                MotionEvent.ACTION_DOWN -> {
                    startX = lp.x
                    startY = lp.y
                    touchX = event.rawX
                    touchY = event.rawY
                    dragging = false
                }
                MotionEvent.ACTION_MOVE -> {
                    val dx = event.rawX - touchX
                    val dy = event.rawY - touchY
                    if (abs(dx) > dp(4f) || abs(dy) > dp(4f)) dragging = true
                    if (dragging) {
                        lp.x = (startX + dx).toInt()
                        lp.y = (startY + dy).toInt().coerceAtLeast(0)
                        runCatching { windowManager.updateViewLayout(view, lp) }
                    }
                }
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    if (dragging) {
                        prefs.overlayX = lp.x
                        prefs.overlayY = lp.y
                    }
                }
            }
            return true
        }
    }

    companion object {
        private const val FONT_BODY = "fonts/Rajdhani-Bold.ttf"
        private const val WARNING_RATIO = 0.8f
        private const val CIRCLE_DP = 156f
        private const val ICON_DP = 96f
        private const val FRACTION_SP = 18f
        private const val PAD_DP = 12f
        private const val TEXT_GAP_DP = 4f
        private const val STROKE_DP = 1.5f
        private const val DEFAULT_TOP_DP = 8f
        private val COLOR_BG = Color.BLACK
        private val COLOR_RIM = Color.parseColor("#33FFFFFF")
        private val COLOR_COUNT = Color.WHITE
        private val COLOR_RED_TEXT = Color.parseColor("#FF4D5E")
    }
}
