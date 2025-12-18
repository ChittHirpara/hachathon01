import { MainLayout } from './layout/MainLayout';
import { CaseForm } from './features/case-form/CaseForm';
import { KnowledgePanel } from './features/knowledge/KnowledgePanel';

function App() {
  return (
    <MainLayout>
      <div className="flex w-full h-full">
        
        {/* Left Side: Case Form (65% width) */}
        <div className="w-[65%] h-full">
          <CaseForm />
        </div>

        {/* Right Side: AI Panel (35% width) */}
        <div className="w-[35%] h-full shadow-xl z-10">
          <KnowledgePanel />
        </div>

      </div>
    </MainLayout>
  );
}

export default App;