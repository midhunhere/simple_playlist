import styles from './styles';
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, FlatList, NativeModules, NativeEventEmitter } from 'react-native';
import { Icon } from 'react-native-elements';
import ColorView from '../../components';
import { NavigationParamList } from 'navigator/Navigator'
import { StackScreenProps } from '@react-navigation/stack';

// Type definitions
type Song = {
    id: number
    name: string
}

type SongItemProps = {
    item: Song
}

type Props = StackScreenProps<NavigationParamList, 'PlayListDetails'>;

// Song item cell
const SongItem = React.memo(({ item }: SongItemProps) =>
    <View style={styles.item}>
        <View style={styles.iconContainer}>
            <Icon name="music-note" type="material" color="#437414" />
        </View>
        <Text style={styles.title}>{item.name}</Text>
    </View>
);

// Play List Details Screen
function PlayListDetails({ route, navigation }: Props) {
    const { playListId, name, tint } = route.params;
    const [songs, setSongs] = useState(new Array());
    const [isUpdateNeeded, setUpdateNeeded] = useState(true);

    // Update navigation bar
    navigation.setOptions({
        title: name,
        headerRight: () => (
            <View style={styles.iconContainer}>
                <Icon name="library-add" type="material" onPress={() => onChoose()} />
            </View>
        )
    });


    // Data refresh handling
    const onDataUpdate = () => {
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

    // Navigate to song selection
    const onChoose = () => {
        const songIds = songs.map(song => song.id)
        navigation.navigate('PlayListSongSelection', {
            playListId: playListId,
            songIds: songIds
        });
    };


    // Fetch whenever update required
    if (isUpdateNeeded) {
        NativeModules.SongManager.getAllSongsForPlayList(playListId)
            .then((res: any) => {
                setUpdateNeeded(false);
                setSongs(res["songs"]);
            })
            .catch((e: any) => console.log(e.message, e.code));
    }

    const itemLoaded = songs.length > 0

    let content;
    if (itemLoaded) {
        content = <FlatList
            contentContainerStyle={styles.listRounded}
            data={songs}
            renderItem={({ item }) => (
                <SongItem
                    item={item}
                />
            )}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            initialNumToRender={20}
            removeClippedSubviews={true}
            keyExtractor={item => `PLS${item.id}`}
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
            <ColorView style={styles.color} color={tint}>
                {content}
            </ColorView>
        </SafeAreaView>
    );
}

export default PlayListDetails;