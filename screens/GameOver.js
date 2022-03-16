import React from "react";
import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";

import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOver = props => {
	return (
		<ScrollView>
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
				<MainButton onPress={props.onNewGame}>NEW GAME</MainButton>
			</View>
		</ScrollView>
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
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderRadius: Dimensions.get('window').width * 0.7 / 2,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height / 30
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	},
	messageContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get('window').height / 60
	},
	message: {
		textAlign: 'center',
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20
	}
});

export default GameOver;