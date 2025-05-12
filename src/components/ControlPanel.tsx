
import React from "react";
import { FunctionData, FunctionType, functions } from "@/data/functionData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ControlPanelProps {
  selectedFunction: FunctionType;
  onFunctionChange: (value: FunctionType) => void;
  showIntercepts: boolean;
  setShowIntercepts: (value: boolean) => void;
  showExtrema: boolean;
  setShowExtrema: (value: boolean) => void;
  showDomainRange: boolean;
  setShowDomainRange: (value: boolean) => void;
  showEndBehavior: boolean;
  setShowEndBehavior: (value: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedFunction,
  onFunctionChange,
  showIntercepts,
  setShowIntercepts,
  showExtrema,
  setShowExtrema,
  showDomainRange,
  setShowDomainRange,
  showEndBehavior,
  setShowEndBehavior,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Function Controls</h2>
      
      <div className="mb-6">
        <Label htmlFor="function-select" className="mb-2 block">Select Function:</Label>
        <Select value={selectedFunction} onValueChange={(value) => onFunctionChange(value as FunctionType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a function" />
          </SelectTrigger>
          <SelectContent>
            {functions.map((func) => (
              <SelectItem key={func.id} value={func.id}>
                {func.name}: {func.expression}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-700">Graph Options</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-intercepts" className="cursor-pointer">Show Intercepts</Label>
          <Switch 
            id="show-intercepts"
            checked={showIntercepts}
            onCheckedChange={setShowIntercepts}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-extrema" className="cursor-pointer">Show Extrema</Label>
          <Switch 
            id="show-extrema"
            checked={showExtrema}
            onCheckedChange={setShowExtrema}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-domain-range" className="cursor-pointer">Show Domain & Range</Label>
          <Switch 
            id="show-domain-range"
            checked={showDomainRange}
            onCheckedChange={setShowDomainRange}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-end-behavior" className="cursor-pointer">Show End Behavior</Label>
          <Switch 
            id="show-end-behavior"
            checked={showEndBehavior}
            onCheckedChange={setShowEndBehavior}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
