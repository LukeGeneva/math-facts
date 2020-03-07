import mapWordToNumber from './mapWordToNumber';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

class NumberListener {
  constructor(numberToListenFor) {
    this.listeningFor = numberToListenFor;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
  }

  listen(onHeard) {
    this.recognition.onresult = event => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      const heard = transcript
        .trim()
        .split(/\s+/)
        .map(mapWordToNumber)
        .some(value => value === this.listeningFor);
      console.log('Listener heard:', transcript);
      if (heard) onHeard();
    };

    this.recognition.onerror = event =>
      console.log(`Listener error: ${event.error}`);

    this.recognition.onstart = () => console.log('Listener started');

    this.recognition.start();
  }
}

export default NumberListener;
