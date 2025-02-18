const { View ,Text , Image ,TextInput, TouchableOpacity ,Alert} = require("react-native");
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import  Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";



function LoginPage(){
    const navigation=useNavigation();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState("");

    function handleSubmit(){
        console.log(email,password);
        const userData={
            email:email,
            password
        }
        axios
        .post("http://192.168.0.103:5001/login-user", userData)
        .then(res=> {console.log(res.data);
        if(res.data.status =="ok"){
            navigation.navigate("HomeScreen");
    }
    else {
      Alert.alert("Incorrect Login");
    }
    });
}

    return(
        <ScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps={"always"}>
        <View>
            <View style={styles.loginContainer}> 
                <Image style ={ styles.logo} source ={require("../../assets/mainLogo.png")}/>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}>Login!!!</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                    <TextInput placeholder="Mobile or Email" style ={styles.textInput }  onChange={e =>setEmail(e.nativeEvent.text)}/>
                </View>
                <View style={styles.action}>
                    <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                    <TextInput placeholder="Password" style ={styles.textInput}  onChange={e =>setPassword(e.nativeEvent.text)}/>
                </View>
                <View style ={{
                        justifyContent: "flex-end",
                        alignItems :"flex-end",
                        marginTop:8,
                        marginRight:10,
                    }}>
                        <Text style= {{color:"#420475" , fontWeight : "700"}}>
                            Forgot Password?
                        </Text>
                </View>
            </View>
            <View style ={styles.botton}>
                    <TouchableOpacity style ={styles.inBut} onPress={()=>handleSubmit()}>
                        <View>
                            <Text style ={styles.textSign}>Log in</Text>
                        </View>
                    </TouchableOpacity>
                    <View style ={{padding:15}}>
                        <Text style={{fontSize:14,fontWeight:"bold",color : '#919191' , marginLeft:100}}>
                            ----or Continue as----
                        </Text>
                    </View>
                    <View style ={styles.bottomButton}>
                        <View style ={{
                            alignItem:"center",
                            justifyContent :"center",
                        }}>
                            <TouchableOpacity style ={[styles.inBut2 ,{marginLeft:10}]}>
                                <FontAwesome 
                                name ="user-circle-o"
                                color="white"
                                style={styles.smallIcon2}
                                />
                            </TouchableOpacity>
                            <Text style={[styles.bottomText ,{marginLeft:25}]}>Guest</Text>
                        </View>
                        <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <FontAwesome
                  name="user-plus"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Sign Up</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => alert('Coming Soon')}>
                <FontAwesome
                  name="google"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Google</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => alert('Coming Soon')}>
                <FontAwesome
                  name="facebook-f"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={[styles.bottomText ,{marginRight:10}]}>Facebook</Text>
            </View>
                    </View>
                </View>
        </View>
        </ScrollView>
    )
}
export default LoginPage; 