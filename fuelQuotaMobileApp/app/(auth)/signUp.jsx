import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const signUp = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleRegister = () => {
    navigation.navigate('Login');
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(response);
      alert('Check your emails');
    } catch (error) {
      console.log(error);
      alert('Register failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image source={require('../assets/topVector.png')} style={styles.topImage} />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.createAccoutText}>
          <Text style={{ color: '#F97794', fontWeight: 'bold' }}>C</Text>
          reate <Text style={{ color: '#623AA2', fontWeight: 'bold' }}>A</Text>ccount
        </Text>
      </View>

      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={90}>
        <View style={styles.inputContainer}>
          <FontAwesome style={styles.inputIcon} name="user" size={20} color={'#9A9A9A'} />
          <TextInput value={username} onChangeText={(text) => setUsername(text)} style={styles.textInput} placeholder="Username" />
        </View>

        <View style={styles.inputContainer}>
          <Fontisto style={styles.inputIcon} name="locked" size={20} color={'#9A9A9A'} />
          <TextInput value={password} onChangeText={(text) => setPassword(text)} style={styles.textInput} placeholder="Password" secureTextEntry />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign style={styles.inputIcon} name="mail" size={20} color={'#9A9A9A'} />
          <TextInput value={email} onChangeText={(text) => setEmail(text)} style={styles.textInput} placeholder="E-mail" />
        </View>
        <View style={styles.inputContainer}>
          <Entypo style={styles.inputIcon} name="mobile" size={20} color={'#9A9A9A'} />
          <TextInput value={phonenumber} onChangeText={(text) => setPhonenumber(text)} style={styles.textInput} placeholder="phonenumber" />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity onPress={signUp} style={styles.signUpButtonContainer}>
            <Text style={styles.signUp}>Sign Up</Text>
            <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
              <AntDesign style={styles.inputIcon} name="arrowright" size={20} color={'white'} />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.socialMediaContainer}>
          <Entypo style={styles.socialIcon} name="facebook-with-circle" size={30} color={'blue'} />
          <Entypo style={styles.socialIcon} name="twitter-with-circle" size={30} color={'blue'} />
          <AntDesign style={styles.socialIcon} name="google" size={30} color={'blue'} />
        </View>

        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.footerText}>
            Or if you have an account<Text style={{ textDecorationLine: 'underline' }}> Log In </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.leftVectorContainer}>
        <ImageBackground source={require('../assets/leftVector.png')} style={styles.leftVectorImage} />
      </View>
    </View>
  );
};

export default signUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    position: 'relative',
  },
  topImageContainer: {},
  topImage: {
    width: '100%',
    height: 130,
  },
  helloContainer: {},
  createAccoutText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: '#262626',
  },
  signInText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#262626',
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: 'center',
    height: 50,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 12,
  },
  inputIcon: {
    marginLeft: 15,
  },
  forgotPassword: {
    color: '#BEBEBE',
    textAlign: 'right',
    width: '90%',
    fontSize: 15,
  },
  signUpButtonContainer: {
    flexDirection: 'row',
    marginTop: 50,
    width: '90%',
    justifyContent: 'center',
  },
  signUp: {
    color: '#262626',
    fontSize: 25,
    fontWeight: 'bold',
  },
  linearGradient: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  footerText: {
    color: '#262626',
    textAlign: 'center',
    fontSize: 18,
  },
  footerContainer: { marginTop: 25, marginBottom: 50 },
  socialMediaContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    backgroundColor: 'white',
    elevation: 10,
    margin: 10,
    padding: 10,
    borderRadius: 50,
  },
  leftVectorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  leftVectorImage: {
    height: 250,
    width: 200,
  },
});
