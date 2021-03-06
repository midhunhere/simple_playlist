import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF2F2'
    },
    list: {
        margin: 12
    },
    listRounded: {
        borderRadius: 10,
        borderColor: '#F5F5F5',
        overflow: 'hidden',
        borderWidth: 1
    },
    loading: {
        borderRadius: 10,
        borderColor: '#F5F5F5',
        overflow: 'hidden',
        borderWidth: 1,
        margin: 12,
        padding: 8,
        backgroundColor: 'white',
        alignContent: 'stretch',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 20,
        alignSelf: 'center'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    iconContainer: {
        width: 40,
        alignSelf: 'stretch',
        alignContent: 'center',
        justifyContent: 'center'
    },
    itemSeperator: {
        height: 1,
        width: '100%',
        backgroundColor: '#F5F5F5'
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