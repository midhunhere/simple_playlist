import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    color: {
        width: 5,
        alignSelf: 'stretch'
    },
    title: {
        flex: 1,
        fontSize: 20,
        padding: 8,
        alignSelf: 'stretch'
    },
    subTitle: {
        fontSize: 20,
        alignSelf: 'stretch',
        padding: 8
    },
});

export default styles;