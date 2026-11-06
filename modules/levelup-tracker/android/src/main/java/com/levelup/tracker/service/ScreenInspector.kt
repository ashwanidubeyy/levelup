package com.levelup.tracker.service

import android.graphics.Rect
import android.os.Build
import android.view.accessibility.AccessibilityNodeInfo
import com.levelup.tracker.core.PagerInfo
import com.levelup.tracker.core.ScreenSummary
import java.security.MessageDigest

class ScreenInspector(private val screenBounds: () -> Rect) {

    private class Entry(val node: AccessibilityNodeInfo, val depth: Int, val insidePager: Boolean)

    fun inspect(
        root: AccessibilityNodeInfo,
        packageName: String,
        windowClassName: String?,
        labelAllowlist: Set<String>,
    ): ScreenSummary {
        val screen = screenBounds()
        val screenHeight = screen.height().coerceAtLeast(1).toFloat()
        val screenWidth = screen.width().coerceAtLeast(1).toFloat()
        val viewIds = LinkedHashSet<String>()
        val labels = LinkedHashSet<String>()
        val pagers = mutableListOf<PagerInfo>()
        val fingerprintParts = mutableListOf<String>()
        val queue = ArrayDeque<Entry>()
        val bounds = Rect()
        var visited = 0
        var truncated = false
        var sensitive = false
        var fingerprintPagerFound = false

        queue.addLast(Entry(root, 0, false))
        while (queue.isNotEmpty()) {
            val entry = queue.removeFirst()
            val node = entry.node
            if (visited >= MAX_NODES || sensitive) {
                truncated = truncated || !sensitive
                if (node !== root) release(node)
                continue
            }
            visited++

            if (node.isPassword) {
                sensitive = true
                if (node !== root) release(node)
                continue
            }

            val className = node.className?.toString()
            val viewId = node.viewIdResourceName?.substringAfter(":id/", "")?.takeIf { it.isNotEmpty() }
            if (viewId != null && viewIds.size < MAX_IDS) viewIds.add(viewId)

            if (node.isSelected) collectSelectedLabel(node, labelAllowlist, labels)

            node.getBoundsInScreen(bounds)
            var insidePager = entry.insidePager
            if (node.isScrollable && !isTextInput(className)) {
                val heightFraction = bounds.height() / screenHeight
                val widthFraction = bounds.width() / screenWidth
                if (heightFraction >= FULL_HEIGHT && widthFraction >= FULL_WIDTH) {
                    pagers += PagerInfo(viewId, className, heightFraction, widthFraction, isVertical(node, className))
                    if (!fingerprintPagerFound) {
                        fingerprintPagerFound = true
                        insidePager = true
                    }
                }
            }

            if (entry.insidePager && fingerprintParts.size < MAX_FINGERPRINT_PARTS && isOnScreen(bounds, screen) && !isTextInput(className)) {
                val description = node.contentDescription?.toString()?.take(MAX_DESCRIPTION)
                if (!description.isNullOrBlank() || viewId != null) {
                    fingerprintParts += "${viewId.orEmpty()}=${description.orEmpty()}"
                }
            }

            if (entry.depth < MAX_DEPTH && !isTextInput(className)) {
                for (i in 0 until node.childCount) {
                    val child = node.getChild(i) ?: continue
                    queue.addLast(Entry(child, entry.depth + 1, insidePager))
                }
            }
            if (node !== root) release(node)
        }
        while (queue.isNotEmpty()) {
            val leftover = queue.removeFirst().node
            if (leftover !== root) release(leftover)
        }

        return ScreenSummary(
            packageName = packageName,
            windowClassName = windowClassName,
            viewIds = if (sensitive) emptySet() else viewIds,
            selectedLabels = if (sensitive) emptySet() else labels,
            fullScreenPagers = if (sensitive) emptyList() else pagers,
            pageFingerprint = if (sensitive) null else digest(fingerprintParts),
            nodesVisited = visited,
            truncated = truncated,
            sensitive = sensitive,
        )
    }

    private fun collectSelectedLabel(node: AccessibilityNodeInfo, allowlist: Set<String>, out: MutableSet<String>) {
        matchLabel(node.contentDescription, allowlist)?.let { out.add(it); return }
        for (i in 0 until minOf(node.childCount, 3)) {
            val child = node.getChild(i) ?: continue
            matchLabel(child.contentDescription, allowlist)?.let { out.add(it) }
            release(child)
        }
    }

    private fun matchLabel(description: CharSequence?, allowlist: Set<String>): String? {
        if (description == null || description.length > MAX_LABEL_LENGTH) return null
        val normalized = description.toString().trim().lowercase()
        return allowlist.firstOrNull { label ->
            normalized == label || normalized.startsWith("$label,") || normalized.startsWith("$label ") || normalized.startsWith("$label.")
        }
    }

    private fun isVertical(node: AccessibilityNodeInfo, className: String?): Boolean {
        if (className != null && className.contains("HorizontalScrollView")) return false
        val collection = node.collectionInfo
        if (collection != null) {
            if (collection.columnCount > 1 && collection.rowCount <= 1) return false
            if (collection.rowCount > 1) return true
        }
        val actions = node.actionList.map { it.id }
        val down = AccessibilityNodeInfo.AccessibilityAction.ACTION_SCROLL_DOWN.id
        val up = AccessibilityNodeInfo.AccessibilityAction.ACTION_SCROLL_UP.id
        val left = AccessibilityNodeInfo.AccessibilityAction.ACTION_SCROLL_LEFT.id
        val right = AccessibilityNodeInfo.AccessibilityAction.ACTION_SCROLL_RIGHT.id
        if (actions.contains(down) || actions.contains(up)) return true
        if (actions.contains(left) || actions.contains(right)) return false
        return true
    }

    private fun isTextInput(className: String?): Boolean = className != null && className.contains("EditText")

    private fun isOnScreen(bounds: Rect, screen: Rect): Boolean {
        if (bounds.isEmpty) return false
        val centerY = bounds.centerY()
        return centerY in screen.top..screen.bottom && Rect.intersects(bounds, screen)
    }

    private fun digest(parts: List<String>): String? {
        if (parts.isEmpty()) return null
        val sha = MessageDigest.getInstance("SHA-256")
        parts.forEach { sha.update(it.toByteArray(Charsets.UTF_8)); sha.update(SEPARATOR) }
        return sha.digest().take(8).joinToString("") { "%02x".format(it) }
    }

    @Suppress("DEPRECATION")
    private fun release(node: AccessibilityNodeInfo) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) node.recycle()
    }

    companion object {
        private const val MAX_NODES = 320
        private const val MAX_DEPTH = 30
        private const val MAX_IDS = 300
        private const val MAX_FINGERPRINT_PARTS = 40
        private const val MAX_DESCRIPTION = 64
        private const val MAX_LABEL_LENGTH = 40
        private const val FULL_HEIGHT = 0.7f
        private const val FULL_WIDTH = 0.9f
        private val SEPARATOR = byteArrayOf(0x1F)
    }
}
