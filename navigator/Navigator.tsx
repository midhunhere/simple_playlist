
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import PlayListDetails from '../screens/PlayListDetails';
import PlayListSongSelection from '../screens/PlayListSongSelection';

type NavigationParamList = {
    Home: undefined;
    PlayListDetails: { playListId: string };
    PlayListSongSelection: { playListId: string };
};

const HomeStack = createStackNavigator<NavigationParamList>();

function Navigator() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={Home} options={{ title: 'PlayLists' }} />
            <HomeStack.Screen name="PlayListDetails" component={PlayListDetails} options={{ title: 'Songs' }} />
            <HomeStack.Screen name="PlayListSongSelection" component={PlayListSongSelection} options={{ title: 'Select Songs' }} />
        </HomeStack.Navigator>
    );
}

export default Navigator;