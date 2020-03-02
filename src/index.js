import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bulma/css/bulma.css";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// TODO: Move speech recognition to proper component
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const grammar = "#JSGF V1.0; grammar numbers; public <number> = " + numbers.join(" | ") + " ;";

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;

recognition.start();
recognition.onresult = event => {
  console.log(event.results);
};

recognition.onerror = event => {
  console.log(event.error);
};
