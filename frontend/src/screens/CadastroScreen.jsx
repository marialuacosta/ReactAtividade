import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity
} from 'react-native';
import { cadastrar } from "../services/api";

export default function CadastroScreen({ navigation }) {
    const [form, setForm] = useState({
        username: '', password: '', email: '',
        placa: '', cor: '', modelo: ''
    })

    const handleChange = (name, value) => setForm({ ...form, [name]: value })

    const handleSubmit = async () => {
        const result = await cadastrar(form)
        console.log(form);
        
        if (result.success) {
            Alert.alert('Sucesso', result.message)
            navigation.navigate('Login')
        } else {
            Alert.alert('Erro', result.message)
        }
    }

    return (
        <View style={styles.container}>
            {['username', 'email', 'password', 'placa', 'cor', 'modelo'].map((field) => (
                <TextInput
                    key={field}
                    placeholder={field}
                    secureTextEntry={field === 'password'}
                    onChangeText={(value) => handleChange(field, value)}
                    style={styles.input}
                />
            ))}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Já tem conta? Fazer Login </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 300
    },
    input:{
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 3
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#FF8C00',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    link: {
        marginTop: 15,
        color: 'black',
        textAlign: 'center'
    }
})