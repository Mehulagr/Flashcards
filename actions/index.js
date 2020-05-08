export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION_TO_DECK = 'ADD_QUESTION_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function getDecks (decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addDeck (deckEntry) {
    return {
        type: ADD_DECK,
        deckEntry
    }
}

export function addQuestionToDeck (deckKey, newQuestion, newAnswer) {
    return {
        type: ADD_QUESTION_TO_DECK,
        deckKey, 
        newQuestion, 
        newAnswer
    }
}

export function deleteDeckFromState (deckKey) {
    return {
        type: DELETE_DECK,
        deckKey
    }
}