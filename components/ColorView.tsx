import React from 'react';
import { View, StyleSheet } from 'react-native';

function ColorView(props) {
    return (
        <View style={{ ...{ backgroundColor: props.color }, ...props.style }}>
            {props.children}
        </View>
    );
};

export default ColorView;