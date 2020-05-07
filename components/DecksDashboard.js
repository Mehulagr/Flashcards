import React, { Component } from 'react'
import { List, Button } from 'react-native-paper';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDecks, clearDecks } from '../store/api.js'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
];

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
    state = {
        dataArray: []
    }

    componentDidMount () {
        getDecks()
            .then((decks) => {
                keys = Object.keys(decks)
                const dataArray = keys.map((item) => {
                    return {
                        title: decks[item].title,
                        questionCount: decks[item].questions ? decks[item].questions.length : "0"
                    }
                })
                this.setState({ dataArray })
            })
    }

    render() {
        return (
            <FlatList
                keyExtractor={(item) => item.title}
                data={this.state.dataArray}
                renderItem={(item) => <DeckItem item={item}/>}
                />
        )
    }
}

export default DecksDashboard