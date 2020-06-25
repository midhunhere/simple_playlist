import styles from './styles';
import React, { useState } from 'react';
import { Text, View, NativeModules, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

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
            <View style={styles.iconContainer}>
                <Icon name="music-note" type="material" color={selected ? '#437414' : '#F4F4F4'} />
            </View>
            <Text style={styles.title}>{title}</Text>
            {icon}
        </TouchableOpacity>
    );
}


function PlayListSongSelection({ route, navigation }) {

    const { playListId, songIds } = route.params;
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
            .then((res: boolean) => {
                if (res) {
                    navigation.goBack();
                }
            })
            .catch((e: any) => console.log(e.message, e.code));
    };

    if (selected.size > 0) {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.iconContainer}>
                    <Icon name="done-all" type="material" onPress={() => onDone()} />
                </View>
            )
        });
    } else {
        navigation.setOptions({
            headerRight: () => (
                null
            )
        });
    }

    const itemLoaded = allSongs.length > 0

    if (!itemLoaded) {
        NativeModules.SongManager.getAllSongs()
            .then((res: any) => {
                setAllSongs(res["songs"]);

                const defaultSelected = new Map();
                songIds.forEach((songId: number) => {
                    defaultSelected.set(songId, true);
                });
                setSelected(defaultSelected);
            })
            .catch((e: any) => console.log(e.message, e.code));
    }



    let content;
    if (itemLoaded) {
        content = <FlatList
            style={styles.list}
            contentContainerStyle={styles.listRounded}
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
            ItemSeparatorComponent={() => {
                return (
                    <View style={styles.itemSeperator} />
                );
            }}
        />;
    } else {
        content = <View style={styles.loading}><Text style={styles.loadingText}>{"Loading ..."}</Text></View>;
    }

    return (
        <SafeAreaView style={styles.container}>
            {content}
        </SafeAreaView>
    );
}

export default PlayListSongSelection;