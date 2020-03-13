import mapWordToNumber from './mapWordToNumber';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;

// Until the Web Speech API grammar is implemented fully, interim results just
// seem to be much more trouble than they're worth. Results are returned long
// after the user is done speaking and frequently cause trouble with the next
// math fact.
recognition.interimResults = false;

recognition.onerror = event => console.log(`Listener error: ${event.error}`);
recognition.onstart = () => console.log('Listener started');

const start = () => recognition.start();

const listen = onNumber => {
  recognition.onresult = event => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    const number = parseInt(mapWordToNumber(transcript.trim()));
    console.log('Listener heard:', transcript);
    console.log('Number:', number);
    onNumber(number);
  };
};

const stop = () => recognition.stop();

export default { start, stop, listen };
