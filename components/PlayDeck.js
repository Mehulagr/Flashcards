import React, {Component} from 'react';
import { Surface, Headline, Button, Subheading, Title, Avatar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { getDeck } from '../store/api';

class PlayDeck extends Component {
  state= {
    currentQuestion: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    questionsList: [],
    viewingAnswer: false
  }

  componentDidMount() {
    getDeck(this.props.route.params.currentDeck)
      .then((item) => {
        if (item.questions) {
          this.setState({
            totalQuestions: item.questions.length,
            questionsList: item.questions
          })
        }
      })
  }

  resetQuiz = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0
    })
  }

  recordAnswer = (answer) => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      viewingAnswer: false
    })
    if (answer) {
      this.setState({correctAnswers: this.state.correctAnswers + 1})
    }
  }

  toggleAnswers = () => {
    this.setState({viewingAnswer: !this.state.viewingAnswer})
  }

  render () {

    if (this.state.questionsList.length === 0) {
      return (
        <View style={styles.container}>
          <Avatar.Icon size={100} icon="help" />
          <Subheading>You haven't added any questions yet.</Subheading>
        </View>
      )
    }

    if (!(this.state.currentQuestion === this.state.totalQuestions)) {
      return (
      <View>
        <Subheading  style={styles.margin}>{this.state.currentQuestion + 1}/{this.state.totalQuestions}</Subheading>
        {!this.state.viewingAnswer && <Surface style={styles.surface}>
          <Headline>{this.state.questionsList[this.state.currentQuestion].question}</Headline>
          <Button mode="text" onPress={this.toggleAnswers}> Show Answer </Button>
        </Surface>}
        {this.state.viewingAnswer && <Surface style={styles.surface}>
          <Headline>{this.state.questionsList[this.state.currentQuestion].answer}</Headline>
          <Button mode="text" onPress={this.toggleAnswers}> View Question </Button>
        </Surface>}
        <Button mode="contained" style={styles.margin} onPress={() => this.recordAnswer(true)} color="green"> Correct </Button>
        <Button mode="contained" style={styles.margin} onPress={() => this.recordAnswer(false)} color="red"> Incorrect </Button>
      </View>
      )
    }
    
    return (
      <View>
        <Surface style={styles.surface}>
          <Headline>Score</Headline>
          <Title>{this.state.correctAnswers}/{this.state.totalQuestions}</Title>
        </Surface>
        <Button mode="outlined" style={styles.margin} onPress={this.resetQuiz}> Restart Quiz </Button>
        <Button mode="contained" style={styles.margin} onPress={() => this.props.navigation.popToTop()}> Back to decks </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    margin: 10,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  margin: {
    margin: 10
  }
});

export default PlayDeck;