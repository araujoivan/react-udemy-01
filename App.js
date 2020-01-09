import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font'; //install expo-font
import { AppLoading } from 'expo'; // an component used for postponing the splash screen

// This function doesnt need to be created every component render cycle
// for this reason, it is declared out of the component
// returns a promise
const fetchFonts = () => {
  return Font.loadAsync({
    'my-open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'my-bold-sans': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {

  const [guessRounds, setGuessRounds] = useState(0);
  const [userNumber, setUserNumber] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (<AppLoading 
              startAsync={fetchFonts} 
              onFinish={() => setDataLoaded(true)}
              onError={(err) => console.log(err)}
    />);
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if(guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />;
  }

  return (
    <View style={styles.scree}>
      <Header title="Guess a Number" />
      {content} 
    </View>
  );
}

const styles = StyleSheet.create({
  scree: {
    flex: 1
  },
});
