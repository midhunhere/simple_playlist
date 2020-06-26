
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import PlayListDetails from '../screens/PlayListDetails';
import PlayListSongSelection from '../screens/PlayListSongSelection';

export type PlayListDetailsParams = {
    playListId: number
    name: string
    tint: string
}

export type PlayListSongSelectionParams = {
    playListId: number
    songIds: Array<number>
}

export type NavigationParamList = {
    Home: undefined;
    PlayListDetails: PlayListDetailsParams;
    PlayListSongSelection: PlayListSongSelectionParams;
};

const HomeStack = createStackNavigator<NavigationParamList>();

function Navigator() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={Home} options={{ title: 'Playlists' }} />
            <HomeStack.Screen name="PlayListDetails" component={PlayListDetails} options={{ title: 'Songs' }} />
            <HomeStack.Screen name="PlayListSongSelection" component={PlayListSongSelection} options={{ title: 'Select Songs' }} />
        </HomeStack.Navigator>
    );
}

export default Navigator;