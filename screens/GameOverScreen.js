import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import BodyText from '../components/BodyText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {

    const [availableWidth, setAvailableWidth]  = useState(Dimensions.get('window').width);
    const [availableHeight, setAvailableHeight]  = useState(Dimensions.get('window').height);

    useEffect(() => {

        const updateLayout = () => {
            setAvailableWidth(Dimensions.get('window').width);
            setAvailableHeight(Dimensions.get('window').height);
        };
 
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

   // for text components the styles is inherited...this is a breaking rule in react native that makes this component similar to html css rules
   return (
        <View style={styles.screen}>
            <BodyText>The Game is Over!</BodyText>
            <View style={{...styles.imageContainer, ...{
                width: availableWidth * 0.2,
                height: availableWidth * 0.2,
                borderRadius: (availableWidth * 0.2) / 2,
                marginVertical: availableHeight / 30
            }}}>
                <Image  
                    style={styles.image} 
                    source={require('../assets/success.png')}
                    resizeMode='cover'
                />
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

    imageContainer: {
        borderWidth: 3,
        borderColor: 'white',
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