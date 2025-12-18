// src/api/mockData.ts
import type { KnowledgeSuggestion } from '../types';

const DATABASE: Record<string, KnowledgeSuggestion[]> = {
  Flood: [
    {
      id: '1',
      title: 'Flood Exclusion Clause 4.2',
      summary: 'Standard property insurance DOES NOT cover flood damage caused by natural disasters (rising water). Separate flood coverage is required.',
      confidenceScore: 0.98,
      
      // 🆕 NEW DATA
      relevanceLevel: 'High',
      effectiveDate: '2024-01-15',
      documentType: 'Policy',
      jurisdiction: 'National',

      citations: [
        {
          sourceDocument: 'Homeowner_Policy_2024.pdf',
          pageNumber: 14,
          textSnippet: 'We do not insure for loss caused directly or indirectly by... Water Damage, meaning: Flood, surface water, waves, tidal water...'
        }
      ],
      actions: ['Send Rejection Letter', 'Check Flood Rider']
    },
    {
      id: '2',
      title: 'FEMA Emergency Guidelines',
      summary: 'If the property is in a declared FEMA disaster zone (Zone A/V), different claim handling procedures apply immediately.',
      confidenceScore: 0.85,
      
      // 🆕 NEW DATA
      relevanceLevel: 'Medium',
      effectiveDate: '2023-11-01',
      documentType: 'Regulation',
      jurisdiction: 'Federal',

      citations: [
        {
          sourceDocument: 'FEMA_Guidelines_v2.pdf',
          pageNumber: 3,
          textSnippet: 'For properties located in Special Flood Hazard Areas (SFHA), claims must be processed within 48 hours.'
        }
      ]
    }
  ],
  // ... Keep your Fire data, just add the new fields to it too!
  Fire: [] 
};

export const fetchRelevantPolicies = async (
  claimType: string, 
  state: string
): Promise<KnowledgeSuggestion[]> => {
  console.log(`🤖 AI Searching for: [${claimType}] in [${state}]...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return empty array if key doesn't exist
      const results = DATABASE[claimType] || [];
      resolve(results);
    }, 1500);
  });
};