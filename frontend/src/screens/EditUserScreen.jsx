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
import { editarUsuario } from "../services/api";

export default function EditUserScreen({ navigation, route }) {
    const {id, username, email, placa, cor, modelo} = route.params.user

    const [form, setForm] = useState({
        username: username, password: '', email: email,
        placa: placa, cor: cor, modelo: modelo
    })

    const handleChange = (name, value) => setForm({ ...form, [name]: value})

    const handleSubmit = async () => {
    const result = await editarUsuario(id, form)

    if(result.success) {
        Alert.alert('Sucesso', result.message)
        navigation.navigate('Vagas', { user: result.user })
    } else {
        Alert.alert('Erro', result.message)
    }
}

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar</Text>
            <TextInput style={styles.input} placeholder="Username" onChangeText={(input) => handleChange('username', input)} value={form.username}/>
            <TextInput style={styles.input} placeholder="Senha" onChangeText={(input) => handleChange('password', input)} value={form.password}/>
            <TextInput style={styles.input} placeholder="E-mail" onChangeText={(input) => handleChange('email', input)} value={form.email}/>
            <TextInput style={styles.input} placeholder="Placa" onChangeText={(input) => handleChange('placa', input)} value={form.placa}/>
            <TextInput style={styles.input} placeholder="Cor" onChangeText={(input) => handleChange('cor', input)} value={form.cor}/>
            <TextInput style={styles.input} placeholder="Modelo" onChangeText={(input) => handleChange('modelo', input)} value={form.modelo}/>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 200
    },
    input:{
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 8
    },
    title: {
        fontSize: 40,
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
        marginTop: 20,
        color: 'black',
        textAlign: 'center'
    }
})