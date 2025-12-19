import React, { useState } from 'react';
import { Sparkles, FileText, ExternalLink, Loader2, Calendar, Tag, MapPin, Zap } from 'lucide-react';
import { useKnowledge } from '../../context/KnowledgeContext';
import { PdfModal } from '../../components/PdfModal';
import type { Citation } from '../../types';

export const KnowledgePanel = () => {
  // 1. Get triggerAction from context
  const { suggestions, isLoading, triggerAction } = useKnowledge();
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

  return (
    <>
      <div className="h-full flex flex-col bg-slate-50 border-l border-slate-200">
        
        {/* Header */}
        <div className="h-14 flex items-center px-4 bg-white border-b border-slate-200 shadow-sm justify-between">
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="font-semibold text-slate-700">Knowledge Assistant</span>
          </div>
          {isLoading && (
            <div className="flex items-center text-xs text-indigo-600 animate-pulse">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Syncing Context...
            </div>
          )}
        </div>

        {/* Context Bar */}
        {!isLoading && suggestions.length > 0 && (
          <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100 flex items-center gap-3 text-xs text-indigo-800">
            <span className="font-bold uppercase tracking-wide">Active Context:</span>
            <span className="flex items-center"><Tag className="w-3 h-3 mr-1"/> Claim Type Match</span>
            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1"/> Jurisdiction Filter</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          
          {isLoading && (
            <div className="space-y-3">
              <div className="h-24 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-24 bg-slate-200 rounded-lg animate-pulse delay-75" />
            </div>
          )}

          {!isLoading && suggestions.length === 0 && (
            <div className="p-6 text-center text-slate-400 mt-10">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm">Start typing case details to receive live policy suggestions.</p>
            </div>
          )}

          {!isLoading && suggestions.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              
              {/* Metadata Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2 mb-1">
                   <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                     {item.documentType}
                   </span>
                   <span className="flex items-center text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                     <Calendar className="w-3 h-3 mr-1"/> {item.effectiveDate}
                   </span>
                </div>
                
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  item.relevanceLevel === 'High' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.relevanceLevel} RELEVANCE
                </span>
              </div>

              <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                {item.summary}
              </p>

              {/* Citations */}
              <div className="space-y-2">
                {item.citations.map((cite, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center p-2 bg-slate-50 rounded border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 transition group text-left"
                    onClick={() => setSelectedCitation(cite)} 
                  >
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 mr-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-indigo-600">
                        Source
                      </div>
                      <div className="text-xs text-slate-700 truncate font-medium">
                        {cite.sourceDocument} <span className="text-slate-400 font-normal">(p.{cite.pageNumber})</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-indigo-400" />
                  </button>
                ))}
              </div>

              {/* 🚀 ACTION BUTTONS (The One-Click Feature) */}
              {item.actions && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                  {item.actions.map(action => (
                     <button 
                       key={action} 
                       // 🆕 When clicked, send data to the Form
                       onClick={() => triggerAction(`[AI Suggestion applied] Based on ${item.title}: ${item.summary}`)}
                       className="text-xs px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition flex items-center shadow-sm"
                     >
                       <Zap className="w-3 h-3 mr-1 fill-white" />
                       {action}
                     </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
      

      <PdfModal 
        isOpen={!!selectedCitation} 
        citation={selectedCitation} 
        onClose={() => setSelectedCitation(null)} 
      />
    </>
  );
};