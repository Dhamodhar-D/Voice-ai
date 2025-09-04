import { type FieldSchema } from '../lib/types';
import { useFormStore } from '../state/store';


export default function FormRenderer() {
const { schema, values } = useFormStore();
if (!schema) return <div>No schema loaded.</div>;


const renderField = (f: FieldSchema) => {
const v = values[f.id] ?? '';
const common = { id: f.id, name: f.id, value: v, onChange: () => {} } as any;
switch (f.type) {
case 'textarea':
return <textarea className="border p-2 rounded w-full" {...common} />;
case 'date':
return <input type="date" className="border p-2 rounded w-full" {...common} />;
case 'number':
return <input type="number" className="border p-2 rounded w-full" {...common} />;
default:
return <input type="text" className="border p-2 rounded w-full" {...common} />;
}
};


return (
<div className="space-y-4">
<h2 className="text-xl font-semibold">{schema.title}</h2>
{schema.fields.map((f) => (
<div key={f.id} className="space-y-1">
<label htmlFor={f.id} className="block text-sm text-gray-700">{f.label}</label>
{renderField(f)}
</div>
))}
</div>
);
}