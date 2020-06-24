package com.simpleplaylist

import android.app.Application
import android.content.Context
import com.facebook.react.*
import com.facebook.soloader.SoLoader
import com.simpleplaylist.database.Db
import com.simpleplaylist.modules.SongPackage
import java.lang.reflect.InvocationTargetException

public class MainApplication: Application(), ReactApplication {

    /*///////////////////////////////////////////////////////////
     * PRIVATE MEMBERS
     *///////////////////////////////////////////////////////////
    private val host = object : ReactNativeHost(this) {
        override fun getPackages(): MutableList<ReactPackage> = PackageList(this).packages.apply {
            // Packages that cannot be autolinked yet can be added manually here, for example:
            add(SongPackage())
        }
        override fun getUseDeveloperSupport() = BuildConfig.DEBUG
        override fun getJSMainModuleName() = MAIN_MODULE_NAME
    }

    /*///////////////////////////////////////////////////////////
     * OVERRIDES
     *///////////////////////////////////////////////////////////
    override fun getReactNativeHost() = host

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        initializeFlipper(this, reactNativeHost.reactInstanceManager)

        Db.dbSetup(this)
    }

    /*///////////////////////////////////////////////////////////
     * COMPANION
     *///////////////////////////////////////////////////////////
    companion object {
        private const val MAIN_MODULE_NAME = "index"
        private const val FLIPPER_CLASS_NAME = "com.simpleplaylist.ReactNativeFlipper"

        private fun initializeFlipper(
            context: Context,
            reactInstanceManager: ReactInstanceManager
        ) {
            if (BuildConfig.DEBUG) {
                try {
                    /*
                    We use reflection here to pick up the class that initializes Flipper,
                    since Flipper library is not available in release mode
                    */
                    val aClass = Class.forName(FLIPPER_CLASS_NAME)

                    aClass
                        .getMethod(
                            "initializeFlipper",
                            Context::class.java,
                            ReactInstanceManager::class.java
                        )
                        .invoke(null, context, reactInstanceManager)
                } catch (e: ClassNotFoundException) {
                    e.printStackTrace()
                } catch (e: NoSuchMethodException) {
                    e.printStackTrace()
                } catch (e: IllegalAccessException) {
                    e.printStackTrace()
                } catch (e: InvocationTargetException) {
                    e.printStackTrace()
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }
}
