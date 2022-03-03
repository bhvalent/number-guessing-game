import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import Game from './screens/Game';
import StartGame from './screens/StartGame';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  let content = (userNumber) ?
    <Game userChoice={userNumber} /> :
    <StartGame onStartGame={startGameHandler} />;

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
