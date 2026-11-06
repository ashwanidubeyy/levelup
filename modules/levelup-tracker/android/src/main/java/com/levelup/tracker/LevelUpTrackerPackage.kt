package com.levelup.tracker

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.levelup.tracker.bridge.LevelUpTrackerModule

class LevelUpTrackerPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        if (name == LevelUpTrackerModule.NAME) LevelUpTrackerModule(reactContext) else null

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
        mapOf(
            LevelUpTrackerModule.NAME to ReactModuleInfo(
                LevelUpTrackerModule.NAME,
                LevelUpTrackerModule::class.java.name,
                false,
                false,
                false,
                false,
            )
        )
    }
}
