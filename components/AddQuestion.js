import React, {Component} from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { addCardToDeck } from '../store/api';

class AddQuestion extends Component {
    state = {
        questionText: '',
        answerText: '',
        currentDeck: 'React'
    }

    onChangeQuestionText = (questionText) => {
        this.setState({ questionText })
    }

    onChangeAnswerText = (answerText) => {
        this.setState({ answerText })
    }

    createDeck = () => {
        addCardToDeck(this.state.currentDeck, this.state.questionText, this.state.answerText)
    }

    componentDidMount() {
        this.setState({ currentDeck: this.props.route.params.currentDeck.title })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.bottomMargin}
                    onChangeText={questionText => this.onChangeQuestionText(questionText)}
                    label='Question'
                    value={this.state.questionText}
                    />

                <TextInput
                    style={styles.bottomMargin}
                    onChangeText={answerText => this.onChangeAnswerText(answerText)}
                    label='Answer'
                    value={this.state.answerText}
                    />

                <Button mode="contained" onPress={this.createDeck} disabled={!(this.state.questionText.length && this.state.answerText.length)}>
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

export default AddQuestion;