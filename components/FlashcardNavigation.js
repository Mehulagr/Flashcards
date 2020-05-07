import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DecksDashboard from './DecksDashboard'
import AddDeck from './AddDeck'
import AddQuestion from './AddQuestion';
import ViewDeck from './ViewDeck';
import PlayDeck from './PlayDeck';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Decks" component={DecksDashboard} />
            <Tab.Screen name="Add Deck" component={AddDeck} />
        </Tab.Navigator>
    );
}

export default function FlashcardNavigation() {
  return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="View Deck" component={ViewDeck} />
                <Stack.Screen name="Add Question" component={AddQuestion} />
                <Stack.Screen name="Play Deck" component={PlayDeck} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}
