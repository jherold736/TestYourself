import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginUser, registerUser } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Walidacja logowania
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Nieprawidłowy email").required("Email jest wymagany"),
  password: Yup.string().min(4, 'Hasło musi mieć min. 4 znaki').required('Hasło jest wymagane'),
});

// Walidacja rejestracji
const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email("Nieprawidłowy email").required("Email jest wymagany"),
  password: Yup.string().min(4, 'Hasło musi mieć min. 4 znaki').required('Hasło jest wymagane'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać').required('Potwierdzenie hasła jest wymagane'),
});

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Kliknięto przycisk. Wysyłam dane:', values); // 🔥 Dodane logowanie kliknięcia
    try {
      if (isLogin) {
        const data = await loginUser(values.email, values.password);
        await AsyncStorage.setItem('token', data.token); // ZAPISUJEMY TOKEN
        console.log('Zalogowano:', data);
        navigation.navigate('Main'); //  przekierowanie
      } else {
        await registerUser(values.email, values.password);
        alert("Rejestracja zakończona! Możesz się zalogować.");
        setIsLogin(true);
        resetForm();
      }
    } catch (error) {
      alert(error || "Coś poszło nie tak");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{isLogin ? "Zaloguj się" : "Zarejestruj się"}</Text>

        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={isLogin ? loginValidationSchema : registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                placeholder="Hasło"
                secureTextEntry
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

              {!isLogin && (
                <>
                  <TextInput
                    placeholder="Potwierdź hasło"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}
                </>
              )}

              {/* Poprawka: wywołujemy handleSubmit funkcją, a nie referencją */}
              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>{isLogin ? "Zaloguj się" : "Zarejestruj się"}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switch}>
            {isLogin ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBF4C',
  },
  scroll: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 30,
  },
  input: {
    width: 300,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switch: {
    marginTop: 20,
    color: '#000',
    fontWeight: '500',
  },
});

export default AuthScreen;

