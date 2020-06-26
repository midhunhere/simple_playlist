import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

type ColorViewProps = {
    color: string
    style: object
}

const ColorView: FunctionComponent<ColorViewProps> = ({ color, style, children }) => {
    return (
        <View style={{ ...{ backgroundColor: color }, ...style }}>
            {children}
        </View>
    );
};

export default ColorView;