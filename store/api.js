import  {AsyncStorage } from 'react-native';

const STORAGE_KEY = 'mobile-flashcard';

const fetchDecks = () => {
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

const removeEntry = (key) => {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}


export { fetchDecks, getDeck, saveDeckTitle, addCardToDeck, removeEntry }

