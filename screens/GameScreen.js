import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    Alert, 
    ScrollView, 
    FlatList, 
    Dimensions, 
    StyleSheet
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles';

import MainButton from '../components/MainButton';
import { ScreenOrientation} from 'expo';

const generateRandomBetween = (min, max, exclude) => {

    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = parseInt(Math.random() * (max - min) + min);

    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
}

const GameScreen = props => {

    // lock the orientation at this point
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    )

    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    )

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // object destructuring
    const {userChoice, onGameOver} = props;

    // updating the height & width
    useEffect(() => {

        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout);

        // Clean up function
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };

    });

    // this is a kind of afterRender function
    useEffect(() => {

        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }

    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || 
           (direction === 'greater' && currentGuess > props.userChoice)) {
            
            Alert.alert('Don\'t lie!','You know that this is wrong...', [{text: 'Sorry', style: 'cancel'}]);
            return;
        }

        if(direction  === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber =  generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    let gameControls = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
        </React.Fragment>
    );

    if(availableDeviceHeight < 500) {
        gameControls = (   
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
            {gameControls}
            <View style={styles.listContainer}>
                {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                   </ScrollView>*/}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderBottomColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        flex: 1,
        width: '60%',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
});

export default GameScreen;