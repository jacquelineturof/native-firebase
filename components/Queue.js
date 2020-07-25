import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TextInput, Button, Text } from 'react-native'

import firebase from '../firebase'
import axios from '../axios-firebase-server'

const QueueItem = ({ name }) => (
    <View style = { styles.item }>
        <Text>{ name }</Text>
    </View>
)

const Queue = () => {
    const [ queue, setQueue ] = useState([])
    const [ textFieldValue, setTextFieldValue ] = useState('')
    // const [ reload, setReload ] = useState(false)

     useEffect(() => {
        loadQueue()
        
    }, [ ])

    const loadQueue = () => {
        const names = []
        
        firebase
        .firestore()
        .collection('users')
        .get()
        .then(collection => {
            collection.forEach(doc => names.push(doc.data()))
            const sortedNames = names.sort((a, b) => {
                console.log(a)
                return a.number - b.number })
            setQueue(sortedNames)
        })
    }

    const onAddToQueue = async () => {
        try {
            await axios.post('addUserToQueue', { user: textFieldValue })
            setTextFieldValue('')
            loadQueue()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style = { styles.container }>
            <TextInput
                style = { styles.input }
                onChangeText = { text => setTextFieldValue(text) }
                value = { textFieldValue } />
            <View style = { styles.seperator } />
            <Button title = "Add To Queue" onPress = { onAddToQueue } />
            <View style = { styles.seperator } />
            <View style = { styles.listContainer }>
                <FlatList 
                    data = { queue }
                    keyExtractor = { (item, index) => index + "" }
                    renderItem = { item => <QueueItem name = { item.item.name } /> } 
                    style = { styles.list } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        width: 300,
        borderColor: '#ccc',
        borderWidth: 1
    },
    seperator: {
        padding: 20
    },
    listContainer: {
        height: 300,
        width: '80%'
    },
    item: {
        width: '100%',
        height: 30
    }
})

export default Queue