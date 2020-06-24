import styles from './styles';
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, NativeModules, NativeEventEmitter } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function PlayListItem({ item, onSelect }) {
    return (
        <TouchableOpacity style={styles.item} onPress={() => onSelect(item.id)}>
            <View style={
                [
                    styles.color,
                    { backgroundColor: item.tint }
                ]}
            />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>{item.songs}</Text>
        </TouchableOpacity>
    );
}

function Home({ navigation }) {

    const [playLists, setPlayLists] = useState(new Array());
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

    const onSelect = (id) => {
        console.log("Selected " + id);
        navigation.navigate('PlayListDetails', {
            playListId: id
        });
    };

    if (isUpdateNeeded) {
        NativeModules.SongManager.getAllPlayLists()
            .then(res => {
                setUpdateNeeded(false);
                setPlayLists(res["playlists"]);
            })
            .catch(e => console.log(e.message, e.code))
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={playLists}
                renderItem={({ item }) => (
                    <PlayListItem
                        item={item}
                        onSelect={onSelect}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

export default Home;