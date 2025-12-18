// src/types.ts

export interface CaseData {
  id: string;
  title: string;
  description: string;
  state: string;
  claimType: 'Flood' | 'Fire' | 'Theft' | 'Liability' | '';
}

// MAKE SURE THIS PART EXISTS 👇
// src/types.ts

export interface Citation {
  sourceDocument: string;
  pageNumber: number;
  paragraphId?: string;
  textSnippet: string;
}

export interface KnowledgeSuggestion {
  id: string;
  title: string;
  summary: string;
  confidenceScore: number;
  
  // 🆕 NEW FIELDS for Feature List C & E
  relevanceLevel: 'High' | 'Medium' | 'Low'; // Text-based relevance
  effectiveDate: string; // "2024-01-01"
  documentType: 'Policy' | 'Regulation' | 'SOP';
  jurisdiction: string; // "FL", "National"

  citations: Citation[];
  actions?: string[];
}
// ... CaseData interface remains the same
export interface CaseData {
    id: string;
    title: string;
    description: string;
    state: string;
    claimType: 'Flood' | 'Fire' | 'Theft' | 'Liability' | '';
  }

