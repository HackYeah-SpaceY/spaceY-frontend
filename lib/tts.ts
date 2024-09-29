export const speakText = (text: string) => {
  let myTimeout: NodeJS.Timeout | undefined;

  function myTimer() {
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
    myTimeout = setTimeout(myTimer, 10000);
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();

    const myTimeout = setTimeout(myTimer, 10000);
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = function () {
      clearTimeout(myTimeout);
    };
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("Text-to-speech not supported.");
  }
};
