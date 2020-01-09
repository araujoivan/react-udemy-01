import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import BodyText from '../components/BodyText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
   // for text components the styles is inherited...this is a breaking rule in react native that makes this component similar to html css rules
    return (
        <View style={styles.screen}>
            <BodyText>The Game is Over!</BodyText>
            <View style={styles.imageContainerOuter}>
                <View style={styles.imageContainerInner}>
                    <Image  
                        style={styles.image} 
                        source={require('../assets/success.png')}
                        resizeMode='cover'
                    />
                </View>
            </View>
            <BodyText style={styles.resultText}>The phone was able to find out the number <Text style={styles.highlight}>{props.userNumber}</Text> after <Text style={styles.highlight}>{props.roundsNumber}</Text> attempts.</BodyText>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        width: '100%',
        height: '100%'
    },

    imageContainerOuter: {
        borderRadius: 153,
        borderWidth: 3,
        borderColor: 'black',
        width: 256,
        height: 256
    },

    imageContainerInner: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'white',
        width: 250,
        height: 250,
        overflow: 'hidden'
    },

    resultText: {
        textAlign: 'center',
        margin: 10
    },

    highlight: {
        color: Colors.primary,
    }
});

export default GameOverScreen;