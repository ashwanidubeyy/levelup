package com.levelup.tracker.widget

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Paint
import java.util.Calendar

object AnalogClockFace {
    private const val SIZE = 280

    fun draw(now: Calendar = Calendar.getInstance()): Bitmap {
        val bitmap = Bitmap.createBitmap(SIZE, SIZE, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        val paint = Paint(Paint.ANTI_ALIAS_FLAG)
        val center = SIZE / 2f
        val radius = SIZE * 0.42f
        paint.style = Paint.Style.FILL
        paint.color = 0x66120810.toInt()
        canvas.drawCircle(center, center, radius, paint)
        paint.style = Paint.Style.STROKE
        paint.strokeWidth = SIZE * 0.018f
        paint.color = 0xFF00D2EE.toInt()
        canvas.drawCircle(center, center, radius, paint)
        repeat(12) { index ->
            canvas.save()
            canvas.rotate(index * 30f, center, center)
            paint.strokeWidth = if (index % 3 == 0) SIZE * 0.02f else SIZE * 0.01f
            paint.color = if (index % 3 == 0) 0xFFF8FAFC.toInt() else 0xFF94A3B8.toInt()
            val inner = if (index % 3 == 0) radius * 0.78f else radius * 0.84f
            canvas.drawLine(center, center - radius * 0.92f, center, center - inner, paint)
            canvas.restore()
        }
        val hour = now.get(Calendar.HOUR)
        val minute = now.get(Calendar.MINUTE)
        val second = now.get(Calendar.SECOND)
        hand(canvas, paint, center, (hour + minute / 60f) * 30f, radius * 0.48f, SIZE * 0.034f, 0xFFF8FAFC.toInt())
        hand(canvas, paint, center, (minute + second / 60f) * 6f, radius * 0.7f, SIZE * 0.02f, 0xFFF8FAFC.toInt())
        hand(canvas, paint, center, second * 6f, radius * 0.76f, SIZE * 0.01f, 0xFFFF8A1E.toInt())
        paint.style = Paint.Style.FILL
        paint.color = 0xFF00D2EE.toInt()
        canvas.drawCircle(center, center, SIZE * 0.028f, paint)
        return bitmap
    }

    private fun hand(
        canvas: Canvas,
        paint: Paint,
        center: Float,
        angle: Float,
        length: Float,
        width: Float,
        color: Int,
    ) {
        canvas.save()
        canvas.rotate(angle, center, center)
        paint.style = Paint.Style.STROKE
        paint.strokeCap = Paint.Cap.ROUND
        paint.strokeWidth = width
        paint.color = color
        canvas.drawLine(center, center + length * 0.12f, center, center - length, paint)
        canvas.restore()
    }
}
