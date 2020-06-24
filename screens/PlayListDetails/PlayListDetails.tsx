import styles from './styles';
import React, { Component, useState, useEffect } from 'react';
import { Text, View, SafeAreaView, FlatList, NativeModules, NativeEventEmitter } from 'react-native';
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
    const [isUpdateNeeded, setUpdateNeeded] = useState(true);

    const onDataUpdate = (event) => {
        setUpdateNeeded(true);
    };

    useEffect(
        () => {
            const DataUpdateEvents = new NativeEventEmitter(NativeModules.SongManager)

            DataUpdateEvents.addListener("DataUpdate", onDataUpdate);

            // Remove event listener on cleanup
            return () => {
                DataUpdateEvents.removeListener("DataUpdate", onDataUpdate);
            };
        },
        []
    );

    const onChoose = () => {
        navigation.navigate('PlayListSongSelection', {
            playListId: playListId
        });
    };

    if (isUpdateNeeded) {
        NativeModules.SongManager.getAllSongsForPlayList(playListId)
            .then(res => {
                setUpdateNeeded(false);
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