import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import GraphDisplay from "./GraphDisplay";
import EndBehaviorTutorial from "./EndBehaviorTutorial";
import { FunctionType, getFunction } from "@/data/functionData";

const FunctionVisualizer: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = useState<FunctionType>("quadratic");
  const [showIntercepts, setShowIntercepts] = useState(false);
  const [showExtrema, setShowExtrema] = useState(false);
  const [showDomainRange, setShowDomainRange] = useState(false);
  const [showEndBehavior, setShowEndBehavior] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const functionData = getFunction(selectedFunction);
  
  const handleFunctionChange = (functionType: FunctionType) => {
    setSelectedFunction(functionType);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Function Visualizer</h1>
        <button
          onClick={() => setShowTutorial(!showTutorial)}
          className={`px-4 py-2 rounded-md ${
            showTutorial 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {showTutorial ? 'Return to Visualizer' : 'Try End Behavior Tutorial'}
        </button>
      </div>
      
      {showTutorial ? (
        <EndBehaviorTutorial />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ControlPanel
              selectedFunction={selectedFunction}
              onFunctionChange={handleFunctionChange}
              showIntercepts={showIntercepts}
              setShowIntercepts={setShowIntercepts}
              showExtrema={showExtrema}
              setShowExtrema={setShowExtrema}
              showDomainRange={showDomainRange}
              setShowDomainRange={setShowDomainRange}
              showEndBehavior={showEndBehavior}
              setShowEndBehavior={setShowEndBehavior}
            />
          </div>
          
          <div className="md:col-span-2">
            <GraphDisplay
              functionData={functionData}
              showIntercepts={showIntercepts}
              showExtrema={showExtrema}
              showDomainRange={showDomainRange}
              showEndBehavior={showEndBehavior}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FunctionVisualizer;