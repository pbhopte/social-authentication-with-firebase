import React, { Component, useState } from "react";
import { Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, Alert } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import styles from './styles';
import { isValidEmail } from '../../utils/helper';

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");
    const [isValid, setValid] = useState(true);
    const __doLogin = () => {
      if (!email) {
        setError("Email required *");
        setValid(false);
        return;
      } else if (!password && password.trim() && password.length > 6) {
        setError("Weak password, minimum 5 chars");
        setValid(false);
        return;
      } else if (!isValidEmail(email)) {
        setError("Invalid Email");
        setValid(false);
        return;
      }
      let signInRequestData = {
        email,
        password
      };
  
      __doSingIn(email, password);
    };
  
    const __doSingIn = async (email, password) => {
      try {
        let response = await auth().signInWithEmailAndPassword(email, password);
        if (response && response.user) {
          Alert.alert("Success ✅", "Logged successfully");
        }
      } catch (e) {
        console.error(e.message);
      }
    };
  
    return (
      <SafeAreaView style={styles.containerStyle}>
        <View style={{ flex: 0.2 }}>{!!fetching && <ActivityIndicator color={'#ff0000'} />}</View>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.headerTitleStyle}> Log In </Text>
        </View>
        <View style={styles.formContainerStyle}>
          <TextInput
            label={"Email"}
            autoCapitalize={false}
            keyboardType="email-address"
            style={styles.textInputStyle}
            placeholder="Mail address"
            onChangeText={text => {
              setValid(isValidEmail(text));
              setEmail(text);
            }}
            error={isValid}
          />
          <TextInput label={"Password"} secureTextEntry autoCapitalize={false} style={styles.textInputStyle} selectionColor={'#ff0000'} placeholder="Password" error={isValid} onChangeText={text => setPassword(text)} />
        </View>
        {error ? (
          <View style={styles.errorLabelContainerStyle}>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        ) : null}
  
        <View style={styles.signInButtonContainerStyle}>
          <TouchableHighlight style={styles.signInButtonStyle} onPress={__doLogin} underlayColor={'#ff0000'}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={styles.signInButtonTextStyle}>Continue</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  };
  
  export default LoginComponent