import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashcardNavigation from './components/FlashcardNavigation'
import FlashcardStatusBar from './components/FlashcardStatusBar'

export default function App() {
  return (
    <PaperProvider>
      <FlashcardStatusBar />
      <FlashcardNavigation />
    </PaperProvider>
  );
}
