
import React, { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine, Label } from "recharts";
import { FunctionData } from "@/data/functionData";
import { ArrowRight } from "lucide-react";

interface GraphDisplayProps {
  functionData: FunctionData;
  showIntercepts: boolean;
  showExtrema: boolean;
  showDomainRange: boolean;
  showEndBehavior: boolean;
}

const GraphDisplay: React.FC<GraphDisplayProps> = ({
  functionData,
  showIntercepts,
  showExtrema,
  showDomainRange,
  showEndBehavior,
}) => {
  const { func, id } = functionData;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine range based on function type
  const getRange = () => {
    switch (id) {
      case "logarithmic":
        return { min: 0.01, max: 10, points: 200 };
      case "reciprocal":
        return { min: -10, max: 10, points: 400, excludeZero: true };
      case "squareRoot":
        return { min: 0, max: 10, points: 200 };
      default:
        return { min: -10, max: 10, points: 200 };
    }
  };

  const { min, max, points, excludeZero } = getRange();
  
  const data = useMemo(() => {
    const step = (max - min) / points;
    return Array.from({ length: points + 1 }, (_, i) => {
      const x = min + step * i;
      // Skip x=0 for reciprocal function
      if (excludeZero && Math.abs(x) < 0.05) return { x, y: null };
      const y = func(x);
      // Filter out values that would make graph unreadable
      return { 
        x, 
        y: !isNaN(y) && isFinite(y) && Math.abs(y) < 100 ? y : null 
      };
    });
  }, [func, min, max, points, excludeZero]);

  // Custom tick formatter to avoid scientific notation
  const tickFormatter = (value: number) => {
    if (Math.abs(value) < 0.001) return "0";
    return value.toString();
  };

  const isMobile = windowWidth < 768;

  // Custom intercept label components with arrows - fixed positioning
  const XInterceptLabel = ({ x, y, viewBox }: any) => {
    // Position the label text to the right and above the intercept point
    return (
      <g>
        <text 
          x={viewBox.x + 15} 
          y={viewBox.y - 15} 
          fill="#FF5722" 
          textAnchor="start"
        >
          x-intercept
        </text>
        <path 
          d={`M ${viewBox.x + 15} ${viewBox.y - 10} L ${viewBox.x} ${viewBox.y}`} 
          stroke="#FF5722" 
          strokeWidth={1.5} 
          fill="none" 
          markerEnd="url(#arrowhead)" 
        />
      </g>
    );
  };

  const YInterceptLabel = ({ x, y, viewBox }: any) => {
    // Position the label text to the left and above the intercept point
    return (
      <g>
        <text 
          x={viewBox.x - 15} 
          y={viewBox.y - 15} 
          fill="#4CAF50" 
          textAnchor="end"
        >
          y-intercept
        </text>
        <path 
          d={`M ${viewBox.x - 15} ${viewBox.y - 10} L ${viewBox.x} ${viewBox.y}`} 
          stroke="#4CAF50" 
          strokeWidth={1.5} 
          fill="none" 
          markerEnd="url(#arrowhead)" 
        />
      </g>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 w-full h-[400px]">
      <div className="text-center font-medium mb-4 text-gray-700">
        {functionData.name}: {functionData.expression}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {/* Define arrow marker for the intercept labels */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#9b87f5" />
            </marker>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[-10, 10]}
            tickFormatter={tickFormatter}
            label={{ 
              value: 'x', 
              position: 'insideBottomRight', 
              offset: -5 
            }}
            ticks={Array.from({length: 21}, (_, i) => i - 10)}
          />
          <YAxis 
            tickFormatter={tickFormatter}
            domain={[-10, 10]}
            label={{ 
              value: 'f(x)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' } 
            }}
            ticks={Array.from({length: 21}, (_, i) => i - 10)}
          />
          <Tooltip 
            formatter={(value: any) => [Number(value).toFixed(2), 'f(x)']}
            labelFormatter={(label) => `x: ${Number(label).toFixed(2)}`}
          />
          {/* X and Y axes */}
          <ReferenceLine y={0} stroke="#000" strokeWidth={1.5} />
          <ReferenceLine x={0} stroke="#000" strokeWidth={1.5} />
          
          <Line
            type="monotone"
            dataKey="y"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            connectNulls
          />
          
          {/* Show x-intercepts if enabled */}
          {showIntercepts && functionData.xIntercepts !== "None" && 
            id !== "reciprocal" && id !== "greatestInteger" && (
            <ReferenceLine
              x={id === "logarithmic" ? 1 : 0}
              stroke="#FF5722"
              strokeDasharray="5 5"
              label={!isMobile ? <XInterceptLabel /> : undefined}
              ifOverflow="extendDomain"
            />
          )}
          
          {/* Show y-intercepts if enabled */}
          {showIntercepts && functionData.yIntercept !== "None" && 
            id !== "reciprocal" && id !== "logarithmic" && (
            <ReferenceLine
              y={id === "exponential" ? 1 : 0}
              stroke="#4CAF50"
              strokeDasharray="5 5"
              label={!isMobile ? <YInterceptLabel /> : undefined}
              ifOverflow="extendDomain"
            />
          )}
          
          {/* Show extrema if applicable and enabled */}
          {showExtrema && functionData.extrema && 
            id !== "greatestInteger" && ["quadratic", "absoluteValue"].includes(id) && (
            <ReferenceLine
              x={0}
              stroke="#9C27B0"
              strokeDasharray="5 5"
              label={!isMobile ? {
                value: "Min (0,0)",
                position: "insideBottom",
                fill: "#9C27B0",
              } : undefined}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      
      {/* Domain & Range info */}
      {showDomainRange && (
        <div className="text-sm mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-indigo-50 p-2 rounded-md">
            <span className="font-medium">Domain:</span> {functionData.domain}
          </div>
          <div className="bg-indigo-50 p-2 rounded-md">
            <span className="font-medium">Range:</span> {functionData.range}
          </div>
        </div>
      )}
      
      {/* End behavior info */}
      {showEndBehavior && (
        <div className="text-sm mt-2 bg-indigo-50 p-2 rounded-md">
          <span className="font-medium">End Behavior:</span> {functionData.endBehavior}
        </div>
      )}
    </div>
  );
};

export default GraphDisplay;
