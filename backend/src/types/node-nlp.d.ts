declare module 'node-nlp' {
  export class NlpManager {
    constructor(options?: NlpManagerOptions);
    addDocument(language: string, utterance: string, intent: string): void;
    train(): Promise<void>;
    process(language: string, utterance: string): Promise<NlpResult>;
  }

  export interface NlpManagerOptions {
    languages?: string[];
    forceNER?: boolean;
  }

  export interface NlpResult {
    locale: string;
    utterance: string;
    intent: string;
    score: number;
    entities: Entity[];
  }

  export interface Entity {
    start: number;
    end: number;
    len: number;
    accuracy: number;
    sourceText: string;
    utteranceText: string;
    entity: string;
    resolution?: {
      strValue?: string;
      value?: number;
    };
  }
}
