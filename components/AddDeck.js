import React, { Component } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { saveDeckTitle, fetchDecks } from '../store/api.js'
import { addDeck } from '../actions/index.js';
import { connect } from 'react-redux';

class DecksDashboard extends Component {
    state = {
        deckTitle: ''
    };

    onChangeText = (deckTitle) => {
        this.setState({ deckTitle })
    }

    createDeck = (e) => {
        const {dispatch} = this.props
        saveDeckTitle(this.state.deckTitle)
            .then(  dispatch(addDeck(this.state.deckTitle))   )
            .then(  this.setState({deckTitle: ''})  )
            .then(  this.props.navigation.navigate('View Deck', {item: {title: this.state.deckTitle}})  )
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

export default connect()(DecksDashboard)