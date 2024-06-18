import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';

export function LoginPage() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);

  const handleLogin = () => {
    // Aquí iría la lógica para manejar el inicio de sesión
    console.log(mail, password);
  };

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
  };

  const handleChangeMail = (text: string) => {
    setMail(text);
    validateEmail(text);
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.logincontainer}>
        <Text style={styles.loginText}>Login</Text>
        <Image style={styles.imagecontainer} source={require('../assets/AritmosLogo.png')} />
        <TextInput
          style={[styles.input, isValidEmail == null ? styles.input : isValidEmail ? styles.inputValid : styles.inputInvalid]}
          placeholder="E-mail"
          value={mail}
          onChangeText={handleChangeMail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#10002B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logincontainer: {
    backgroundColor: '#7B2CBF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 450,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#C77DFF',
    shadowOffset: { width: 0, height: 4, },
    shadowRadius: 6,
    shadowOpacity: 0.75,
    elevation: 10,
  },
  loginText: {
    fontSize: 35,
    color: 'white',
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    backgroundColor: '#C77DFF',
  },
  inputValid: {
    borderColor: 'green',
    borderWidth: 3,
  },
  inputInvalid: {
    borderColor: 'red',
    borderWidth: 3,
  },
  imagecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    padding: 20,
    margin: 20,
  },
  buttonStyle: {
    backgroundColor: '#E0AAFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginPage;