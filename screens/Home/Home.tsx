import styles from './styles';
import React, { Component } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { PlayLists } from '../../data/Data'


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
            <Text style={styles.subTitle}>{item.songs.length}</Text>
        </TouchableOpacity>
    );
}

function Home({ navigation }) {

    const onSelect = (id) => {
        console.log("Selected " + id);
        navigation.navigate('PlayListDetails', {
            playListId: id
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={PlayLists}
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