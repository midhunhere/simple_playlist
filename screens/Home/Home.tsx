import styles from './styles';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, NativeModules, NativeEventEmitter } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ColorView from '../../components'

function PlayListItem({ item, onSelect }) {
    return (
        <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
            <ColorView style={styles.color} color={item.tint} />
            <View style={styles.iconContainer}>
                <Icon name="library-music" type="material" color={item.tint} />
            </View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>{item.songs}</Text>
        </TouchableOpacity>
    );
}

function Home({ navigation }) {

    const [playLists, setPlayLists] = useState(new Array());
    const [isUpdateNeeded, setUpdateNeeded] = useState(true);

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

    const onSelect = (item: any) => {
        console.log("Selected " + item.id);
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
                    onSelect={onSelect}
                />
            )}
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