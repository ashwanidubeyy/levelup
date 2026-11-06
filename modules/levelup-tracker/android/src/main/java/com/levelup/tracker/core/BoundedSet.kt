package com.levelup.tracker.core

class BoundedSet<T>(private val capacity: Int) {
    private val items = LinkedHashSet<T>()

    val size: Int get() = items.size

    operator fun contains(item: T): Boolean = item in items

    fun add(item: T) {
        items.remove(item)
        items.add(item)
        while (items.size > capacity) {
            val first = items.iterator()
            first.next()
            first.remove()
        }
    }

    fun clear() = items.clear()
}

class ExpiringSet<T>(private val capacity: Int, private val ttlMs: Long) {
    private val items = LinkedHashMap<T, Long>()

    val size: Int get() = items.size

    fun contains(item: T, now: Long): Boolean {
        prune(now)
        return items.containsKey(item)
    }

    fun add(item: T, now: Long) {
        items.remove(item)
        items[item] = now
        prune(now)
    }

    fun clear() = items.clear()

    private fun prune(now: Long) {
        val iterator = items.entries.iterator()
        while (iterator.hasNext()) {
            val entry = iterator.next()
            if (now - entry.value > ttlMs || items.size > capacity) iterator.remove() else break
        }
    }
}
