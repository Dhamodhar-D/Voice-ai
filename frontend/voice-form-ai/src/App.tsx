import { useEffect } from 'react';
import FormRenderer from './components/FormRenderer';
import VoiceBar from './components/VoiceBar';
import schema from './schema/bank_application.json';
import { useFormStore } from './state/store';


export default function App() {
const { setSchema } = useFormStore();
useEffect(() => { setSchema(schema as any); }, [setSchema]);


return (
<div className="max-w-2xl mx-auto p-6">
<h1 className="text-2xl font-bold">Voice‑Driven Form</h1>
<p className="text-sm text-gray-600">Say things like: "My name is John Doe", "email john at example dot com", "phone nine eight nine one two three four five six seven".</p>
<FormRenderer />
<VoiceBar />
</div>
);
}