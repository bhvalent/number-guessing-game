import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOver = props => {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over!</TitleText>
			<View style={styles.imgContainer}>
				<Image source={require('../assets/success.png')} style={styles.img} resizeMode="cover" />
			</View>
			<View style={styles.messageContainer}>
				<BodyText style={styles.message}>
					Your phone needed <Text style={styles.highlight}>{props.guessRounds}</Text> rounds to guess the
					number <Text style={styles.highlight}>{props.userNumber}</Text>.
				</BodyText>
			</View>
			<Button title="NEW GAME" onPress={props.onNewGame} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	img: {
		width: '100%',
		height: '100%'
	},
	imgContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: 30
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	},
	messageContainer: {
		marginHorizontal: 30,
		marginVertical: 15
	},
	message: {
		textAlign: 'center',
		fontSize: 20
	}
});

export default GameOver;