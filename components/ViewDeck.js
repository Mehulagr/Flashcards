import React, { Component } from 'react';
import { Paragraph, Title, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ViewDeck({route}) {
    const navigation = useNavigation();
    const currentDeck = route.params.item
    //console.log(currentDeck)
    
    return (
        <View style={styles.container}>
            <Title>{currentDeck.title}</Title>
            <Paragraph>{currentDeck.questionCount}</Paragraph>
            <Button style={styles.spaceItem} icon="plus" mode="outlined" onPress={() => navigation.navigate('Add Question', {currentDeck: currentDeck})}> Add Card </Button>
            <Button style={styles.spaceItem} icon="play" mode="contained" onPress={() => navigation.navigate('Play Deck', {currentDeck: currentDeck.title})}> Start Quiz </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
      padding: 20,
    },
    spaceItem: {
        marginBottom: 10,
        marginTop: 10,
        width: 250
    }
  });

export default ViewDeck;