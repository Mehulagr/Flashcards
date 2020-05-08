import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashcardNavigation from './components/FlashcardNavigation'
import FlashcardStatusBar from './components/FlashcardStatusBar'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <PaperProvider>
        <FlashcardStatusBar />
        <FlashcardNavigation />
      </PaperProvider>
    </Provider>
  );
}
