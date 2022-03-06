import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const Game = (props) => {
	const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
	const [rounds, setRounds] = useState(0);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver])

	const nextGuessHandler = (direction) => {
		if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
			Alert.alert(
				'Don\'t lie!',
				'You know that this is wrong...',
				[{ text: 'Sorry!', style: 'cancel' }]
			);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setRounds(curRounds => curRounds + 1);
	}

	return (
		<View style={styles.screen}>
			<BodyText>Opponent's Guess</BodyText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.btnContainer}>
				<Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
				<Button title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')} />
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
	}
});

export default Game;