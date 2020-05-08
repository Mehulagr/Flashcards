import { GET_DECKS, ADD_DECK, ADD_QUESTION_TO_DECK, DELETE_DECK } from "../actions";

function decks (state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deckEntry]: {title: action.deckEntry}
            }
        case ADD_QUESTION_TO_DECK:
            const questionsArray = state[action.deckKey].questions ? state[action.deckKey].questions : []
            const newItem = {
                question: action.newQuestion,
                answer: action.newAnswer
            }
            questionsArray.push(newItem)
            return {
                ...state,
                [action.deckKey]: {
                    title: state[action.deckKey].title,
                    questions: questionsArray
                }
            }
        case DELETE_DECK:
            const {[action.deckKey]: value, ...remainingDecks} = state;
            return remainingDecks
        default:
            return state
    }
}

export default decks