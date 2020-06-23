import styles from './styles';
import React, { Component, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

function SongItem({ item }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );
}

function PlayListDetails({ route, navigation }) {

    const { playListId } = route.params;
    const [songs, setSongs] = useState(new Array());

    const onChoose = () => {
        navigation.navigate('PlayListSongSelection', {
            playListId: playListId
        });
    };

    if (songs.length == 0) {
        NativeModules.SongManager.getAllSongsForPlayList(playListId)
            .then(res => {
                setSongs(res["songs"]);
                navigation.setOptions({
                    title: res["name"],
                    headerRight: () => (
                        <Icon name="library-add" type="material" onPress={() => onChoose()} />
                    )
                });
            })
            .catch(e => console.log(e.message, e.code));
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={songs}
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