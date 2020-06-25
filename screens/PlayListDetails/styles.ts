import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    color: {
        width: "100%",
        height: "100%",
        padding: 12
    },
    loading: {
        borderRadius: 10,
        borderColor: '#F5F5F5',
        overflow: 'hidden',
        borderWidth: 1,
        padding: 8,
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 20,
        alignSelf: 'center'
    },
    listRounded: {
        borderRadius: 10,
        borderColor: '#F5F5F5',
        overflow: 'hidden',
        borderWidth: 1
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    itemSeperator: {
        height: 1,
        width: '100%',
        backgroundColor: '#F5F5F5'
    },
    iconContainer: {
        width: 40,
        alignSelf: 'stretch',
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        flex: 1,
        fontSize: 20,
        paddingTop: 8,
        paddingBottom: 8,
        paddingEnd: 8,
        alignSelf: 'stretch'
    }
});

export default styles;