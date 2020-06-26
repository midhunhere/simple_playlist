import styles from './styles';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, NativeModules, NativeEventEmitter } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ColorView from '../../components'
import { useNavigation } from '@react-navigation/native';

// Type definitions
type PlayList = {
    id: number
    name: string
    tint: string
    songs: number
}

type PlayListItemProps = {
    item: PlayList
    select(item: PlayList): void
}

// Play List Item Cell
const PlayListItem = React.memo(({ item, select }: PlayListItemProps) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => select(item)}>
            <ColorView style={styles.color} color={item.tint} />
            <View style={styles.iconContainer}>
                <Icon name="library-music" type="material" color={item.tint} />
            </View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>{item.songs}</Text>
        </TouchableOpacity>
    );
});

// Home Screen
function Home() {

    // State hooks
    const navigation = useNavigation();
    const [playLists, setPlayLists] = useState(new Array());
    const [isUpdateNeeded, setUpdateNeeded] = useState(true);

    const onDataUpdate = () => {
        setUpdateNeeded(true);
    };

    // Refresh on data update
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

    // Navigation to details
    const onSelect = (item: PlayList) => {
        navigation.navigate('PlayListDetails', {
            playListId: item.id,
            name: item.name,
            tint: item.tint
        });
    };

    if (isUpdateNeeded) {
        NativeModules.SongManager.getAllPlayLists()
            .then((res: any) => {
                setUpdateNeeded(false);
                setPlayLists(res["playlists"]);
            })
            .catch((e: any) => console.log(e.message, e.code))
    }

    const itemLoaded = playLists.length > 0

    let content;
    if (itemLoaded) {
        content = <FlatList
            style={styles.list}
            contentContainerStyle={styles.listRounded}
            data={playLists}
            renderItem={({ item }) => (
                <PlayListItem
                    item={item}
                    select={onSelect}
                />
            )}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            initialNumToRender={20}
            removeClippedSubviews={true}
            keyExtractor={item => `PL${item.id}`}
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

export default Home;