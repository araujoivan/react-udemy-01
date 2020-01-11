import React from 'react';
import { View, Text, Platform, StyleSheet} from 'react-native';

const Header = props => {

    return (
        <View style={{
            ...styles.header, 
            ...Platform.select({
                android: styles.headerAndroid,
                ios: styles.headerIOS
        })}}>
            <Text style={styles.headerTitle}>
                {props.title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header : {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'my-bold-sans'
    },

    headerIOS: {
        backgroundColor: 'red',
    },

    headerAndroid: {
        backgroundColor: '#f7282b',
    },

    headerTitle: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;