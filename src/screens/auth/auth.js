import React, { Component } from 'react';
 import { Text, View,TouchableOpacity } from "react-native";
 import auth, { firebase } from "@react-native-firebase/auth";
 import SignUpComponent from './signup';
 import LoginComponent from './login';
 import styles from './styles';

 export default class Auth extends Component {
   state = {
     isLogin: false,
     authenticated: false
   };
   componentDidMount() {
     this.__isTheUserAuthenticated();
   }
 
   __isTheUserAuthenticated = () => {
     let user = firebase.auth().currentUser;
     if (user) {
       console.log(user);
 
       this.setState({ authenticated: true });
     } else {
       this.setState({ authenticated: false });
     }
   };
 
   render() {
     return (
       <View style={{ flex: 1 }}>
         {this.state.authenticated ? (
           <View style={styles.containerStyle}>
             <Text style={{ textAlign: "center" }}>email {firebase.auth().currentUser.email} </Text>
 
             <View style={styles.loginButtonContainerStyle}>
               <TouchableOpacity
                 style={styles.loginButtonStyle}
                 onPress={async () => {
                   await firebase.auth().signOut();
                 }}
               >
                 <Text style={styles.loginButtonTextStyle}> Log Out</Text>
               </TouchableOpacity>
             </View>
           </View>
         ) : (
           <View style={{ flex: 1 }}>
             {this.state.isLogin ? <LoginComponent /> : <SignUpComponent />}

             <View style={styles.loginButtonContainerStyle}>
               <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.setState(state => ({ isLogin: !state.isLogin }))}>
                 <Text style={styles.loginButtonTextStyle}> {this.state.isLogin ? "New? Create account." : "Already have account? Log In"}</Text>
               </TouchableOpacity>
             </View>
           </View>
         )}
       </View>
     );
   }
 }