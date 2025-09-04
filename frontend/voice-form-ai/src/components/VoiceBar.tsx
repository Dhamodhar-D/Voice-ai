import { useEffect, useRef, useState } from 'react';
import { analyzeUtterance } from '../lib/api';
import { createSpeechRecognizer } from '../lib/speech';
import { speak } from '../lib/tts';
import { useFormStore } from '../state/store';


export default function VoiceBar() {
const [listening, setListening] = useState(false);
const [partial, setPartial] = useState('');
const recRef = useRef<ReturnType<typeof createSpeechRecognizer> | null>(null);
const { schema, applySlots } = useFormStore();


useEffect(() => {
try { recRef.current = createSpeechRecognizer(); } catch {}
}, []);


const handleStart = () => {
if (!schema) return;
if (!recRef.current) return alert('SpeechRecognition unsupported. Try Chrome.');
setListening(true);
recRef.current.start((text, isFinal) => {
setPartial(text);
if (isFinal && text) {
analyzeUtterance(text, schema.formId).then((res) => {
applySlots(res.slots);
const said = res.messageBack || 'Updated the form.';
speak(said);
}).catch((e) => console.error(e));
}
});
};


const handleStop = () => { setListening(false); recRef.current?.stop(); };


return (
<div className="flex items-center gap-3 mt-4">
<button onClick={listening ? handleStop : handleStart} className={`px-4 py-2 rounded text-white ${listening ? 'bg-red-600' : 'bg-indigo-600'}`}>
{listening ? 'Stop' : 'Speak'}
</button>
<div className="text-gray-600 italic min-h-[1.5rem]">{partial}</div>
</div>
);
}