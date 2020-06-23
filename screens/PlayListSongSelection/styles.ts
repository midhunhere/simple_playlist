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
    title: {
        flex: 1,
        fontSize: 20,
        padding: 8,
        alignSelf: 'stretch'
    },
    icon: {
        padding: 8
    }
});

export default styles;