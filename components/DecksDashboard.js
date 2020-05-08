import React, { Component } from 'react'
import { List, Avatar, Subheading } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchDecks } from '../store/api.js'
import { getDecks } from '../actions/index.js';
import { connect } from 'react-redux'

function DeckItem ({item}) {
    const navigation = useNavigation();

    return (
        <List.Item
        title={item.item.title}
        description={`${item.item.questionCount} cards`}
        onPress={() => navigation.navigate('View Deck', {item: item.item})}
        />
    )
}

class DecksDashboard extends Component {
    componentDidMount () {
        const { dispatch } = this.props

        fetchDecks()
            .then((decks) => dispatch(getDecks(decks)))
    }

    render() {
        const { decksList } = this.props

        const dataArray = Object.keys(decksList).map((item) => {
            return {
                title: decksList[item].title,
                questionCount: decksList[item].questions ? decksList[item].questions.length : "0"
            }
        })

        if (dataArray.length === 0) {
            return (
              <View style={styles.container}>
                <Avatar.Icon size={100} icon="help" />
                <Subheading>You don't have any decks. Go create some!!</Subheading>
              </View>
            )
          }

        return (
            <FlatList
                keyExtractor={(item) => item.title}
                data={dataArray}
                renderItem={(item) => <DeckItem item={item}/>}
                />
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
  });

function mapStateToProps (decks) {
    return {
        decksList: decks
    }
}

export default connect(mapStateToProps)(DecksDashboard)