import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => {

    // MUST BE in capital letters
    let ButtonComponent = TouchableOpacity;

    if(Platform.OS == 'android' && Platform.Version >= 21) {
       ButtonComponent = TouchableNativeFeedback; 
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.5} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        {props.children}
                    </Text>
                </View>
            </ButtonComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'my-open-sans',
        fontSize: 18
    },
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    }
});

export default MainButton;