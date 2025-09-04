import { NLUResponse } from './types';


export async function analyzeUtterance(utterance: string, formId: string): Promise<NLUResponse> {
const res = await fetch('http://localhost:8000/nlu/parse', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ utterance, form_id: formId })
});
if (!res.ok) throw new Error('NLU service error');
return res.json();
}