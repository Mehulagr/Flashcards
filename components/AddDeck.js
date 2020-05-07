import React, { Component } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { saveDeckTitle, getDecks } from '../store/api.js'

class DecksDashboard extends Component {
    state = {
        deckTitle: ''
    };

    onChangeText = (deckTitle) => {
        this.setState({ deckTitle })
    }

    createDeck = (e) => {
        saveDeckTitle(this.state.deckTitle)
            .then(getDecks()
                .then((decks) => {
                    console.log(decks)
                })
            )
            .then(this.setState({ deckTitle: '' }))
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.bottomMargin}
                    onChangeText={deckTitle => this.onChangeText(deckTitle)}
                    label='Deck Title'
                    value={this.state.deckTitle}
                    />

                <Button mode="contained" onPress={this.createDeck} disabled={!this.state.deckTitle.length}>
                    Submit
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    bottomMargin: {
        marginBottom: 20
    }
});

export default DecksDashboard