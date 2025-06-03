import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { listarVagas, ocuparVaga, desocuparVaga } from "../services/api";

export default function VagasScreen({ route, navigation }) {
    const [vagas, setVagas] = useState([])
    //route chama o valor do usuário (variavel user) que veio junto com a rota
    const userId = route.params.user.id

    const fetchVagas = async () => {
        const result = await listarVagas()
        if (result.success) setVagas(result.vagas)
    }

    const handleOcupar = async (vagaId) => {
        const result = await ocuparVaga(vagaId, userId)
        Alert.alert(result.message)
        fetchVagas()
    }

    const handleDesocupar = async (vagaId) => {
        const result = await desocuparVaga(vagaId)
        Alert.alert(result.message)
        fetchVagas()
    }

    useEffect(() => { fetchVagas() }, [])

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text> Vaga #{item.id} - {item.preferencial_int ? 'Preferencial' : 'Comum'} </Text>
            <Text> Disponível: {item.disponivel ? 'Sim' : 'Não'} </Text>
            {item.disponivel ? (
                <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF8C00' }]}
                onPress={() => handleOcupar(item.id)}
            >
                <Text style={styles.buttonText}>Ocupar</Text>
            </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#F0E68C' }]}
                    onPress={() => handleDesocupar(item.id)}
                >
                    <Text style={styles.buttonText}>Desocupar</Text>
                </TouchableOpacity>
            )}
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={vagas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 20 }}
            />
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF8C00' }]}
                onPress={() => navigation.navigate('Editar', { user: route.params.user })}
            >
                <Text style={styles.buttonText}>Editar Conta</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        width: '80%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 16,
        marginBottom: 6
    },
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    linkButton: {
        marginTop: 10,
        alignItems: 'center'
    },
    linkText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    }
})