import styles from './styles';
import React, { Component, useState } from 'react';
import { Text, View, NativeModules, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { AllSongs } from 'data/Data';

function SongItem({ id, title, selected, onSelect }) {

    let icon;
    if (selected) {
        icon = <Icon type="material" name="done" containerStyle={styles.icon} />;
    } else {
        icon = <Text />;
    }

    return (
        <TouchableOpacity
            onPress={() => onSelect(id)}
            style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            {icon}
        </TouchableOpacity>
    );
}


function PlayListSongSelection({ route, navigation }) {

    const { playListId } = route.params;
    const [allSongs, setAllSongs] = useState(new Array());
    const [selected, setSelected] = useState(new Map());

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            const itemSelected = !selected.get(id);
            if (itemSelected) {
                newSelected.set(id, itemSelected);
            } else {
                newSelected.delete(id);
            }

            setSelected(newSelected);
        },
        [selected],
    );

    const onDone = () => {

        var songIds = Array();

        selected.forEach((value, key, map) => {
            songIds.push(key);
        });

        NativeModules.SongManager.syncPlayList(playListId, songIds)
            .then(res => {
                if (res) {
                    navigation.goBack();
                }
            })
            .catch(e => console.log(e.message, e.code));
    };

    if (selected.size > 0) {
        navigation.setOptions({
            headerRight: () => (
                <Icon name="done-all" type="material" onPress={() => onDone()} />
            )
        });
    } else {
        navigation.setOptions({
            headerRight: () => (
                null
            )
        });
    }


    if (allSongs.length == 0) {
        NativeModules.SongManager.getAllSongs()
            .then(res => {
                setAllSongs(res["songs"]);
                return NativeModules.SongManager.getAllSongsForPlayList(playListId)
            })
            .then(res => {
                const selectedMap = new Map(selected);
                res["songs"].forEach(song => {
                    selectedMap.set(song.id, true);
                });

                setSelected(selectedMap);
            })
            .catch(e => console.log(e.message, e.code));
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={allSongs}
                renderItem={({ item }) => (
                    <SongItem
                        id={item.id}
                        title={item.name}
                        selected={!!selected.get(item.id)}
                        onSelect={onSelect}
                    />
                )}
                keyExtractor={item => `S${item.id}`}
                extraData={selected}
            />
        </SafeAreaView>
    );
}

export default PlayListSongSelection;