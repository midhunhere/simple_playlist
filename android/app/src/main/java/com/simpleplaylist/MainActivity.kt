package com.simpleplaylist

import com.facebook.react.ReactActivity

public class MainActivity: ReactActivity() {

    /*///////////////////////////////////////////////////////////
     * OVERRIDES
     *///////////////////////////////////////////////////////////
    override fun getMainComponentName() = MAIN_COMPONENT_NAME

    /*///////////////////////////////////////////////////////////
     * COMPANION
     *///////////////////////////////////////////////////////////
    companion object {
        private const val MAIN_COMPONENT_NAME = "SimplePlayList"
    }
}
