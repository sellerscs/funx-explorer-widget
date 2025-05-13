
import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import GraphDisplay from "./GraphDisplay";
import { FunctionType, getFunction } from "@/data/functionData";

const FunctionVisualizer: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = useState<FunctionType>("quadratic");
  const [showIntercepts, setShowIntercepts] = useState(false);
  const [showExtrema, setShowExtrema] = useState(false);
  const [showDomainRange, setShowDomainRange] = useState(false);
  const [showEndBehavior, setShowEndBehavior] = useState(false);
  
  const functionData = getFunction(selectedFunction);
  
  const handleFunctionChange = (functionType: FunctionType) => {
    setSelectedFunction(functionType);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto">
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
    </div>
  );
};

export default FunctionVisualizer;
