import React, { createContext, useContext, useState } from 'react';
import type { KnowledgeSuggestion } from '../types';
import { fetchRelevantPolicies } from '../api/mockData';

interface KnowledgeContextType {
  suggestions: KnowledgeSuggestion[];
  isLoading: boolean;
  searchKnowledge: (claimType: string, state: string) => void;
}

const KnowledgeContext = createContext<KnowledgeContextType | undefined>(undefined);

export const KnowledgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [suggestions, setSuggestions] = useState<KnowledgeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchKnowledge = async (claimType: string, state: string) => {
    // Only search if we have a valid claim type
    if (!claimType) return;

    setIsLoading(true);
    setSuggestions([]); // Clear old suggestions while loading

    try {
      const results = await fetchRelevantPolicies(claimType, state);
      setSuggestions(results);
    } catch (error) {
      console.error("Failed to fetch knowledge", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KnowledgeContext.Provider value={{ suggestions, isLoading, searchKnowledge }}>
      {children}
    </KnowledgeContext.Provider>
  );
};

// A custom hook to make using this easy
export const useKnowledge = () => {
  const context = useContext(KnowledgeContext);
  if (!context) throw new Error("useKnowledge must be used within a KnowledgeProvider");
  return context;
};