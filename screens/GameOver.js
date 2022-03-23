import React from "react";
import { Image, StyleSheet, Text, View, ScrollView, useWindowDimensions } from "react-native";

import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOver = props => {
	return (
			<ScrollView>
				<View style={styles.screen}>
					<TitleText>The Game is Over!</TitleText>
					<View style={{
						...styles.imgContainer,
						width: useWindowDimensions().width * 0.7,
						height: useWindowDimensions().width * 0.7,
						borderRadius: (useWindowDimensions().width * 0.7) / 2,
						marginVertical: useWindowDimensions().height / 30
					}}>
						<Image source={require('../assets/success.png')} style={styles.img} resizeMode="cover" />
					</View>
					<View style={{ ...styles.messageContainer, marginVertical: useWindowDimensions().height / 60 }}>
						<BodyText style={{ ...styles.message, fontSize: useWindowDimensions().height < 400 ? 16 : 20 }}>
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
		alignItems: 'center',
		paddingVertical: 10
	},
	img: {
		width: '100%',
		height: '100%'
	},
	imgContainer: {
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden'
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	},
	messageContainer: {
		marginHorizontal: 30
	},
	message: {
		textAlign: 'center'
	}
});

export default GameOver;