import styles from './styles';
import React, { Component } from 'react';
import { Text, View, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { PlayLists, AllSongs, PlayList } from '../../data/Data'

function SongItem({ item }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );
}

function PlayListDetails({ route, navigation }) {

    const { playListId } = route.params;

    const playlist = PlayLists.find((item) => item.id === playListId) || new PlayList('', '', [], '');

    const songs = playlist.songs;

    var songData = AllSongs.filter((song) => songs.includes(song.id));

    navigation.setOptions({ title: playlist.name });

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={songData}
                renderItem={({ item }) => (
                    <SongItem
                        item={item}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

export default PlayListDetails;