import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import validationSchema from './src/validation/validationSchema';


const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          setSubmitted(true);
          actions.resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, resetForm }) => (
          <View>
            {submitted ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>Cadastro realizado com sucesso!</Text>
                <Button
                  title="Voltar"
                  onPress={() => {
                    setSubmitted(false);
                    resetForm();
                  }}
                />
              </View>
            ) : (
              <>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#aaa"
                />
                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setFieldValue('email', text.toLowerCase())}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Digite seu email"
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <Text style={styles.label}>Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showPassword} // Alterna entre visível e oculto
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showText}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                <Text style={styles.label}>Confirme a Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder="Confirme sua senha"
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Text style={styles.showText}>{showConfirmPassword ? "Ocultar" : "Mostrar"}</Text>
                  </TouchableOpacity>
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
  },
  showText: {
    color: '#007BFF',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    color: 'green',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
