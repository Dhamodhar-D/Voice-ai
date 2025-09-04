export function speak(text: string, lang = 'en-US') {
const u = new SpeechSynthesisUtterance(text);
u.lang = lang;
window.speechSynthesis.cancel();
window.speechSynthesis.speak(u);
}