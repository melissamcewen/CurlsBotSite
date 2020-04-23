import React from 'react'
import update from 'immutability-helper'
import Quiz from '../components/quiz/quiz'
import Result from '../components/quiz/result'
import quizQuestions from '../data/quizquestions'
import Question from '../components/quiz/question'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'




class porosity extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      points: 0,
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: 0,
      result: ''
    };



   this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    //removing this for now
    // While there remain elements to shuffle...
    /*while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }*/

    return array;
  };



  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    //console.log("answer slected");
    //console.log(event.currentTarget);
        //console.log(event.currentTarget);

    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
        //console.log("set next");
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
        //console.log("SetResults");
    }
  }


  setUserAnswer(answer) {
   // console.log("answer points is")
    //console.log(answer);

      //  console.log("answer type is")
    //console.log(this.state);


    //console.log("old points is");
    //console.log(this.state.points );
    const addPoints = this.state.points + Number(answer);
   // console.log('new points is');
    //console.log(addPoints);


    this.setState({
        answer: answer,
        points: addPoints
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const points = this.state.points;
    return  points;
  }

  setResults(result) {
    console.log("set results is running");
    console.log(result);
    if (result > 2) {
      this.setState({ result: 'probably high porosity. ' });
      ReactGA.event({
        category: 'quiz',
        action: 'High porosity',
        label: 'points: ' + result

      });
    } else if (result < -2)  {
      this.setState({ result: 'probably low porosity.' });
      ReactGA.event({
        category: 'quiz',
        action: 'Low porosity',
        label: 'points: ' + result
      });
    } else {
      this.setState({ result: 'probably normal porosity' });
      ReactGA.event({
        category: 'quiz',
        action: 'Normal porosity',
        label: 'points: ' + result
      });
    }
  }

  renderQuiz() {
    return (
      <Quiz
      counter={this.state.counter}
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
   // console.log("render result");
    //console.log(this.state.result);
    return (
      <Result quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="App">
            <Helmet
      title="curly hair Porosity Test"
      meta={[
        { name: 'description', content: 'An easy quiz for determining hair porosity' },
        { name: 'keywords', content: 'products, curly hair, hair porosity, low porosity, high porosity' },
      ]}
    />
        <div className="App-header">
          <h2>Hair Porosity Quiz</h2>
          <p>Confused about hair porosity? Well it's just how able your hair is to absorb moisture, which is affected by the cuticle structure. A raised cuticle means your hair easily absorbs moisture and is <em>high porosity</em>. A tight cuticle means your hair is relucant to absorb moisture and is <em>low porosity</em>. If you're somewhere in the middle you are <em>normal porosity</em>.</p>

          <p>Most "tests" of porosity just deal with how your hair floats in water, but they can be <a href="http://hairmomentum.com/hair-porosity-test-not-accurate/">inaccurate</a>. This quiz focuses on how your hair behaves so it can get a more complete picture of your porosity.</p>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}

      </div>
    );
  }

}

export default porosity;
