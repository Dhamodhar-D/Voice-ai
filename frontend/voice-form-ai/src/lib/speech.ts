// Minimal wrapper around Web Speech API (Chrome/Edge). Fallbacks can be wired later.
export type SpeechListener = (text: string, isFinal: boolean) => void;


export function createSpeechRecognizer() {
const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
if (!SR) throw new Error('SpeechRecognition not supported in this browser');
const rec = new SR();
rec.continuous = true;
rec.interimResults = true;
rec.lang = 'en-US'; // make configurable


let listener: SpeechListener | null = null;


rec.onresult = (e: SpeechRecognitionEvent) => {
let transcript = '';
let isFinal = false;
for (let i = e.resultIndex; i < e.results.length; i++) {
transcript += e.results[i][0].transcript;
if (e.results[i].isFinal) isFinal = true;
}
if (listener) listener(transcript.trim(), isFinal);
};


return {
start(onHeard: SpeechListener) {
listener = onHeard;
rec.start();
},
stop() { rec.stop(); },
setLang(lang: string) { rec.lang = lang; }
};
}