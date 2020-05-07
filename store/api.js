import  {AsyncStorage } from 'react-native';

//getDecks: return all of the decks along with their titles, questions, and answers.
//getDeck: take in a single id argument and return the deck associated with that id.
//saveDeckTitle: take in a single title argument and add it to the decks.
//addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

const STORAGE_KEY = 'mobile-flashcard';

const getDecks = () => {
    return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
      return results === null ? null : JSON.parse(results);
    });
  };

const getDeck = (id) => {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
      const obj = JSON.parse(results);
      return obj[id];
  });
};

const saveDeckTitle = (deckTitle) => {
    entry = {
        title: deckTitle
    }
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deckTitle]: entry
    }))
}

const clearDecks = () => {
  return AsyncStorage.removeItem(STORAGE_KEY)
}

const addCardToDeck = (deckTitle, question, answer) => {
  const newQuestions = {
    question: question,
    answer: answer
  }

  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const obj = JSON.parse(results);
      const newObj = obj[deckTitle];
      if (newObj.questions) {
        newObj.questions.push(newQuestions)
      } else {
        newObj.questions = [newQuestions]
      }
      return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deckTitle]: newObj
      }))
    })
}


export { getDecks, getDeck, saveDeckTitle, addCardToDeck }

