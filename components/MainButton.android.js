import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, TouchableNativeFeedback, Platform } from "react-native";

import Colors from "../constants/colors";

const MainButton = props => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.btnContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  btnText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  },
  btnContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  }
});

export default MainButton;