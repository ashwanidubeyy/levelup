package com.levelup.tracker.bridge

import android.accessibilityservice.AccessibilityServiceInfo
import android.content.ComponentName
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.os.PowerManager
import android.provider.Settings
import android.view.accessibility.AccessibilityManager
import com.levelup.tracker.service.LevelUpAccessibilityService

object PermissionStatus {
    private const val PLAY_STORE = "com.android.vending"

    fun serviceComponent(context: Context) = ComponentName(context, LevelUpAccessibilityService::class.java)

    fun isAccessibilityEnabled(context: Context): Boolean {
        val component = serviceComponent(context)
        val manager = context.getSystemService(Context.ACCESSIBILITY_SERVICE) as? AccessibilityManager
        val viaManager = manager
            ?.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.FEEDBACK_ALL_MASK)
            ?.any { info ->
                val service = info.resolveInfo?.serviceInfo
                service != null && service.packageName == component.packageName && service.name == component.className
            } == true
        if (viaManager) return true
        val enabled = Settings.Secure.getString(context.contentResolver, Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES) ?: return false
        val flat = component.flattenToString()
        val short = component.flattenToShortString()
        return enabled.split(':').any { it.equals(flat, ignoreCase = true) || it.equals(short, ignoreCase = true) }
    }

    fun canDrawOverlays(context: Context): Boolean =
        Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(context)

    fun isIgnoringBatteryOptimizations(context: Context): Boolean {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return true
        val power = context.getSystemService(Context.POWER_SERVICE) as? PowerManager ?: return false
        return power.isIgnoringBatteryOptimizations(context.packageName)
    }

    fun restrictedSettingsLikely(context: Context): Boolean {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return false
        val installer = runCatching {
            context.packageManager.getInstallSourceInfo(context.packageName).installingPackageName
        }.getOrNull()
        return installer != PLAY_STORE
    }

    fun installedVersion(context: Context, packageName: String): String? = runCatching {
        val info = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            context.packageManager.getPackageInfo(packageName, PackageManager.PackageInfoFlags.of(0))
        } else {
            @Suppress("DEPRECATION")
            context.packageManager.getPackageInfo(packageName, 0)
        }
        info.versionName ?: ""
    }.getOrNull()
}
