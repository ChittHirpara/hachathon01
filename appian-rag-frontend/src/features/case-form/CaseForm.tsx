import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useKnowledge } from '../../context/KnowledgeContext';

type CaseFormData = {
  title: string;
  state: string;
  claimType: string;
  description: string;
};

export const CaseForm = () => {
  // 1. Setup the Form
  const { register, watch } = useForm<CaseFormData>({
    defaultValues: {
      title: 'Claim #4920: Water Damage in Basement',
      state: '',
      claimType: '',
      description: ''
    }
  });

  // 2. Get the "Search" function from our Brain
  const { searchKnowledge } = useKnowledge();

  // 3. Watch the inputs we care about
  const claimType = watch('claimType');
  const state = watch('state');

  // 4. THE TRIGGER: This runs whenever claimType changes
  useEffect(() => {
    console.log("Form Changed:", claimType); // <--- Added for debugging
    
    if (claimType) {
      searchKnowledge(claimType, state);
    }
  }, [claimType, state, searchKnowledge]);

  return (
    <div className="h-full p-8 overflow-y-auto bg-white">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Case Details</h2>
          <p className="text-slate-500 mt-1">
            Enter the details of the incident to retrieve relevant policy documents.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Case Title</label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Jurisdiction (State)</label>
              <select
                {...register('state')}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select State...</option>
                <option value="FL">Florida</option>
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="NY">New York</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Claim Type</label>
              {/* IMPORTANT: Make sure the values match the Mock Data (Flood, Fire) */}
              <select
                {...register('claimType')}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select Type...</option>
                <option value="Flood">Flood</option>
                <option value="Fire">Fire</option>
                <option value="Theft">Theft</option>
                <option value="Liability">Liability</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Incident Description</label>
            <textarea
              {...register('description')}
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};