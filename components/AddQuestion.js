import React, {Component} from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { addCardToDeck } from '../store/api';
import { addQuestionToDeck } from '../actions';
import { connect } from 'react-redux';

class AddQuestion extends Component {
    state = {
        questionText: '',
        answerText: '',
        currentDeck: ''
    }

    onChangeQuestionText = (questionText) => {
        this.setState({ questionText })
    }

    onChangeAnswerText = (answerText) => {
        this.setState({ answerText })
    }

    createDeck = () => {
        const {dispatch} = this.props
        const {currentDeck, questionText, answerText} = this.state
        
        addCardToDeck(currentDeck, questionText, answerText)
            .then(dispatch(addQuestionToDeck(currentDeck, questionText, answerText)))
            .then(  this.props.navigation.goBack()  )
    }

    componentDidMount() {
        this.setState({ currentDeck: this.props.route.params.currentDeckTitle })
    }

    render() {
        const {questionText, answerText} = this.state

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.bottomMargin}
                    onChangeText={questionText => this.onChangeQuestionText(questionText)}
                    label='Question'
                    value={questionText}
                    />

                <TextInput
                    style={styles.bottomMargin}
                    onChangeText={answerText => this.onChangeAnswerText(answerText)}
                    label='Answer'
                    value={answerText}
                    />

                <Button mode="contained" onPress={this.createDeck} disabled={!(questionText.length && answerText.length)}>
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

export default connect()(AddQuestion)