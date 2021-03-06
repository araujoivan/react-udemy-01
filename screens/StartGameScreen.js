import React, { useState, useEffect } from 'react';
import {
    View,
    Text, 
    Button, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    Alert, 
    Dimensions, 
    ScrollView, 
    Keyboard,
    KeyboardAvoidingView
} from 'react-native'; 

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredvalue, setEnteredValue] = useState('');

    const [confirmed, setConfirmed] = useState(false);

    const [selectedNumber, setSelectedNumber] = useState();

    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {

        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        
        Dimensions.addEventListener('change', updateLayout);

        return () => { 
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const numnerInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {

        let chosenNumber = parseInt(enteredvalue);

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!', 
                'Number must be between 1 and 99.', 
                [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}]
            );

            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
                            <BodyText>You selected</BodyText>
                            <NumberContainer>{selectedNumber}</NumberContainer>
                            <MainButton onPress={() => props.onStartGame(selectedNumber)} >START GAME</MainButton>
                         </Card>;
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                    <View style={styles.screen}>
                        <BodyText style={styles.title}>New Game</BodyText>
                        <Card style={styles.inputContainer}>
                            <Text>Select a number</Text>
                            <Input 
                                style={styles.input}
                                blurOnSubmit
                                autoCaptalize='none'
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numnerInputHandler}
                                value={enteredvalue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer : {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        maxWidth: '95%',
        width: '80%',
        minWidth: 300
    },

    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignContent: 'center'
    }
});

export default StartGameScreen;