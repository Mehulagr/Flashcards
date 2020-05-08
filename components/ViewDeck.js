import React, { Component } from 'react';
import { Paragraph, Title, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { removeEntry } from '../store/api';
import { deleteDeckFromState } from '../actions'

class ViewDeck extends Component {
    deleteDeck = (currentDeckTitle) => {
        const {dispatch} = this.props
        removeEntry(currentDeckTitle)
            .then(this.blah(currentDeckTitle))
    }

    blah = (currentDeckTitle) => {
        const {dispatch} = this.props
        dispatch(deleteDeckFromState(currentDeckTitle))
        this.props.navigation.goBack()
    }

    render() {
        const navigation = this.props.navigation
        const { decks } = this.props
        const currentDeckKey = this.props.route.params.item ? this.props.route.params.item.title : 'undefined'

        if (!decks[currentDeckKey]) {
            return (<View></View>)
        }

        const currentDeck = decks[currentDeckKey]

        const currentDeckTitle = currentDeck.title ? currentDeck.title : ''
        const currentDeckQuestionCount = currentDeck.questions ? currentDeck.questions.length : '0'


        return (
            <View style={styles.container}>
                <Title>{currentDeckTitle}</Title>
                <Paragraph>{currentDeckQuestionCount}</Paragraph>
                <Button style={styles.spaceItem} icon="plus" mode="outlined" onPress={() => navigation.navigate('Add Question', {currentDeckTitle: currentDeckTitle})}> Add Card </Button>
                <Button style={styles.spaceItem} icon="play" mode="contained" onPress={() => navigation.navigate('Play Deck', {currentDeck: currentDeckTitle})}> Start Quiz </Button>
                <Button style={styles.spaceItem} mode="text" onPress={() => this.deleteDeck(currentDeckTitle)}> Remove Deck </Button>
            </View>
        )
    }
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

  function mapStatusToProps (decks) {
    return {
        decks
    }
  }

export default connect(mapStatusToProps)(ViewDeck)