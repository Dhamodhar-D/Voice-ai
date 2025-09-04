import { create } from 'zustand';
import { FormSchema, SlotValue } from '../lib/types';


interface FormState {
schema: FormSchema | null;
values: Record<string, string>;
applySlots: (slots: SlotValue[]) => void;
setSchema: (schema: FormSchema) => void;
}


export const useFormStore = create<FormState>((set) => ({
schema: null,
values: {},
setSchema: (schema) => set({ schema, values: {} }),
applySlots: (slots) => set((s) => {
const next = { ...s.values };
for (const slot of slots) {
if (slot.confidence >= 0.6) next[slot.fieldId] = slot.value;
}
return { values: next };
})
}));