import React from 'react';
import { X, Search, ChevronLeft, ChevronRight, Highlighter } from 'lucide-react';
// src/components/PdfModal.tsx
import type { Citation } from '../types'; // <--- Add 'type' here

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  citation: Citation | null;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose, citation }) => {
  if (!isOpen || !citation) return null;

  return (
    // 1. Overlay (Dark background)
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8 backdrop-blur-sm">
      
      {/* 2. Modal Window */}
      <div className="bg-white w-full h-full max-w-5xl rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* A. Header (Toolbar) */}
        <div className="h-14 bg-slate-800 text-white flex items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-sm">{citation.sourceDocument}</span>
            <span className="bg-slate-700 px-2 py-1 rounded text-xs text-slate-300">
              Page {citation.pageNumber} / 45
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* B. The "PDF" Content (Visual Mock) */}
        <div className="flex-1 bg-slate-100 overflow-y-auto p-8 flex justify-center relative">
          
          {/* This represents the "Page" */}
          <div className="bg-white w-[800px] min-h-[1000px] shadow-lg p-12 text-slate-800 relative">
            
            {/* Fake Content Header */}
            <div className="border-b-2 border-black mb-8 pb-4 flex justify-between items-end">
              <h1 className="text-3xl font-bold uppercase tracking-widest">Official Policy Document</h1>
              <span className="text-xs text-slate-500">Ref: 2024-SEC-04</span>
            </div>

            {/* Fake Text Paragraphs */}
            <div className="space-y-6 text-justify text-sm leading-relaxed text-slate-600 font-serif">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Section 1 outlines the general provisions...</p>
              <p>For the purposes of this agreement, the term "Insured" shall refer to the primary policyholder...</p>
              
              <h3 className="text-lg font-bold text-black mt-8">4. Limitations and Exclusions</h3>
              <p>Subject to the provisions of Article 3, the following exclusions apply to all property claims...</p>
              
              {/* THE HIGHLIGHTED PART (The Magic) */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-yellow-200/50 rounded border border-yellow-400/50 -z-10 animate-pulse"></div>
                <p className="font-bold text-black">
                  <Highlighter className="inline w-4 h-4 mr-1 text-yellow-600" />
                  {citation.textSnippet}
                </p>
                <div className="absolute top-0 right-full mr-4 bg-slate-800 text-white text-xs px-2 py-1 rounded">
                  AI Found this
                </div>
              </div>

              <p>Furthermore, any damage resulting from neglect or failure to maintain the property...</p>
              <p>In the event of a dispute regarding the cause of loss, an independent adjuster...</p>
            </div>

            {/* Page Number Footer */}
            <div className="absolute bottom-8 right-8 text-slate-400 font-bold">
              Page {citation.pageNumber}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};