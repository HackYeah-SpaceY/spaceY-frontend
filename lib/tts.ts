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

    // Set the language (for example, to English)
    utterance.lang = "en-US"; // You can set it to any supported language code

    utterance.onend = function () {
      clearTimeout(myTimeout);
    };
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("Text-to-speech not supported.");
  }
};
