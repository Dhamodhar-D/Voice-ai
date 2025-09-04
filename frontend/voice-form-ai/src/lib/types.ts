export type FieldType = 'text' | 'email' | 'phone' | 'date' | 'number' | 'textarea';


export interface FieldSchema {
id: string;
label: string;
type: FieldType;
required?: boolean;
synonyms?: string[];
}


export interface FormSchema {
formId: string;
title: string;
fields: FieldSchema[];
}


export interface SlotValue {
fieldId: string;
value: string;
confidence: number; // 0..1
source: 'rule' | 'llm';
}


export interface NLUResponse {
slots: SlotValue[];
intent?: string;
messageBack?: string; // BE suggested confirmation phrase
}