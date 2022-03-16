import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';

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

const renderListItem = (length, itemData) => {
	return (
		<View style={styles.guessListItem}>
			<BodyText>#{length - itemData.index}</BodyText>
			<BodyText>{itemData.item}</BodyText>
		</View>
	);
}

const Game = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
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
		setPastGuesses(guesses => [nextNumber.toString(), ...guesses]);
	}

	let guessListContainerStyle = styles.guessListContainer;
	if (Dimensions.get('window').width < 350) {
		guessListContainerStyle = styles.guessListContainerBig;
	}

	return (
		<View style={styles.screen}>
			<TitleText>Opponent's Guess</TitleText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.btnContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={guessListContainerStyle}>
				<FlatList
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.guessList}
				/>
			</View>
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
		marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
		width: 400,
		maxWidth: '90%',
	},
	guessListContainer: {
		width:'60%',
		flex: 1
	},
	guessListContainerBig: {
		width: '80%',
		flex: 1
	},
	guessList: {
		justifyContent: 'flex-end',
		flexGrow: 1
	},
	guessListItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		width: '100%'
	}
});

export default Game;