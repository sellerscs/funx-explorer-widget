import React, { useEffect, useMemo, useState, useRef } from "react";

interface FunctionData {
  func: (x: number) => number;
  id: string;
  name: string;
  expression: string;
  xIntercepts: string;
  yIntercept: string;
  extrema?: string;
  domain: string;
  range: string;
  endBehavior: string;
}

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
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth < 768;
  
  // SVG dimensions - make square
  const size = isMobile ? 320 : 600;
  const width = size;
  const height = size;
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Calculate viewRange
  const viewRange = 20 / zoomLevel;
  
  // Scale functions
  const scale = (value: number) => {
    const shiftedValue = value - panOffset.x;
    return ((shiftedValue + viewRange/2) / viewRange) * innerWidth;
  };
  const xScale = (x: number) => scale(x);
  const yScale = (y: number) => {
    const shiftedValue = y - panOffset.y;
    return innerHeight - ((shiftedValue + viewRange/2) / viewRange) * innerHeight;
  };
  
  // Inverse scale functions
  const inverseXScale = (pixelX: number) => {
    return (pixelX / innerWidth) * viewRange - viewRange/2 + panOffset.x;
  };
  const inverseYScale = (pixelY: number) => {
    return -((pixelY / innerHeight) * viewRange - viewRange/2) + panOffset.y;
  };
  
  // Determine range based on function type and zoom
  const getRange = () => {
    const baseRange = viewRange / 2;
    const min = -baseRange + panOffset.x;
    const max = baseRange + panOffset.x;
    
    switch (id) {
      case "logarithmic":
        return { min: Math.max(0.01, min), max, points: 400 };
      case "reciprocal":
        return { min, max, points: 800, excludeZero: true };
      case "squareRoot":
        return { min: Math.max(0, min), max, points: 400 };
      default:
        return { min, max, points: 400 };
    }
  };

  const { min, max, points, excludeZero } = getRange();
  
  const data = useMemo(() => {
    const currentViewRange = 20 / zoomLevel;
    const viewMin = -currentViewRange/2 + panOffset.y;
    const viewMax = currentViewRange/2 + panOffset.y;
    
    const step = (max - min) / points;
    
    return Array.from({ length: points + 1 }, (_, i) => {
      const x = min + step * i;
      if (excludeZero && Math.abs(x) < 0.05/zoomLevel) return { x, y: null };
      const y = func(x);
      return { 
        x, 
        y: !isNaN(y) && isFinite(y) && y >= viewMin && y <= viewMax ? y : null 
      };
    });
  }, [func, min, max, points, excludeZero, panOffset, zoomLevel]);

  // Calculate origin position
  const originX = xScale(0);
  const originY = yScale(0);
  
  // Generate path for function
  const generatePath = () => {
    let path = "";
    let firstPoint = true;
    
    data.forEach(point => {
      if (point.y !== null && !isNaN(point.y) && isFinite(point.y)) {
        const x = xScale(point.x);
        const y = yScale(point.y);
        
        if (x >= -50 && x <= innerWidth + 50 && y >= -50 && y <= innerHeight + 50) {
          if (firstPoint) {
            path += `M ${x} ${y}`;
            firstPoint = false;
          } else {
            path += ` L ${x} ${y}`;
          }
        } else {
          firstPoint = true;
        }
      } else {
        firstPoint = true;
      }
    });
    
    return path;
  };
  
  // Generate tick marks based on zoom level
  const generateTicks = (min: number, max: number) => {
    const range = max - min;
    let step = 1;
    
    if (range > 50) step = 10;
    else if (range > 20) step = 5;
    else if (range > 10) step = 2;
    else if (range < 2) step = 0.5;
    else if (range < 1) step = 0.2;
    else if (range < 0.5) step = 0.1;
    
    const ticks = [];
    const start = Math.ceil(min / step) * step;
    
    for (let tick = start; tick <= max; tick += step) {
      if (Math.abs(tick) < step * 0.01) tick = 0;
      ticks.push(Number(tick.toFixed(2)));
    }
    
    return ticks;
  };
  
  const visibleMin = -viewRange/2 + panOffset.x;
  const visibleMax = viewRange/2 + panOffset.x;
  const visibleMinY = -viewRange/2 + panOffset.y;
  const visibleMaxY = viewRange/2 + panOffset.y;
  
  const xTicks = generateTicks(visibleMin, visibleMax);
  const yTicks = generateTicks(visibleMinY, visibleMaxY);
  
  // Mouse handlers
  const handleWheel = (e: React.WheelEvent<SVGElement>) => {
    e.preventDefault();
    
    if (!svgRef.current) return;
    const svg = svgRef.current.closest('svg');
    if (!svg) return;
    
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    
    const relX = svgP.x - margin.left;
    const relY = svgP.y - margin.top;
    
    const mouseX = inverseXScale(relX);
    const mouseY = inverseYScale(relY);
    
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.max(0.1, Math.min(10, zoomLevel * zoomFactor));
    
    const scale = newZoom / zoomLevel;
    const newPanX = mouseX - (mouseX - panOffset.x) * scale;
    const newPanY = mouseY - (mouseY - panOffset.y) * scale;
    
    setZoomLevel(newZoom);
    setPanOffset({ x: newPanX, y: newPanY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current.closest('svg');
    if (!svg) return;
    
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    
    const svgP = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    const relX = svgP.x - margin.left;
    const relY = svgP.y - margin.top;
    
    const mathX = inverseXScale(relX);
    const mathY = inverseYScale(relY);
    
    if (relX >= 0 && relX <= innerWidth && relY >= 0 && relY <= innerHeight) {
      const actualY = func(mathX);
      const tolerance = 1.5 / zoomLevel;
      
      if (!isNaN(actualY) && isFinite(actualY) && Math.abs(actualY - mathY) < tolerance) {
        setHoverCoord({ x: mathX, y: actualY });
        setMousePos({ x: relX, y: yScale(actualY) });
      } else {
        setHoverCoord(null);
        setMousePos(null);
      }
    } else {
      setHoverCoord(null);
      setMousePos(null);
    }
  };
  
  const handleMouseLeave = () => {
    setHoverCoord(null);
    setMousePos(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 w-full relative">
      <div className="text-center font-medium mb-4 text-gray-700">
        {functionData.name}: {functionData.expression}
      </div>
      
      <svg width={width} height={height} className="mx-auto" onWheel={handleWheel}>
        <g 
          ref={svgRef}
          transform={`translate(${margin.left},${margin.top})`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Grid lines */}
          {xTicks.map(tick => (
            <line
              key={`x-grid-${tick}`}
              x1={xScale(tick)}
              y1={0}
              x2={xScale(tick)}
              y2={innerHeight}
              stroke="#e0e0e0"
              strokeDasharray="3 3"
            />
          ))}
          {yTicks.map(tick => (
            <line
              key={`y-grid-${tick}`}
              x1={0}
              y1={yScale(tick)}
              x2={innerWidth}
              y2={yScale(tick)}
              stroke="#e0e0e0"
              strokeDasharray="3 3"
            />
          ))}
          
          {/* X and Y axes */}
          <line
            x1={0}
            y1={originY}
            x2={innerWidth}
            y2={originY}
            stroke="#000"
            strokeWidth={2}
          />
          <line
            x1={originX}
            y1={0}
            x2={originX}
            y2={innerHeight}
            stroke="#000"
            strokeWidth={2}
          />
          
          {/* X-axis ticks and labels */}
          {xTicks.map(tick => (
            <g key={`x-tick-${tick}`}>
              <line
                x1={xScale(tick)}
                y1={originY - 4}
                x2={xScale(tick)}
                y2={originY + 4}
                stroke="#666"
                strokeWidth={1}
              />
              {tick !== 0 && (
                <text
                  x={xScale(tick)}
                  y={originY + 16}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#666"
                >
                  {tick}
                </text>
              )}
            </g>
          ))}
          
          {/* Y-axis ticks and labels */}
          {yTicks.map(tick => (
            <g key={`y-tick-${tick}`}>
              <line
                x1={originX - 4}
                y1={yScale(tick)}
                x2={originX + 4}
                y2={yScale(tick)}
                stroke="#666"
                strokeWidth={1}
              />
              {tick !== 0 && (
                <text
                  x={originX - 10}
                  y={yScale(tick) + 3}
                  textAnchor="end"
                  fontSize={10}
                  fill="#666"
                >
                  {tick}
                </text>
              )}
            </g>
          ))}
          
          {/* Axis labels */}
          <text
            x={innerWidth - 10}
            y={originY - 10}
            textAnchor="end"
            fontSize={12}
            fill="#666"
          >
            x
          </text>
          <text
            x={originX + 10}
            y={15}
            textAnchor="start"
            fontSize={12}
            fill="#666"
          >
            f(x)
          </text>
          
          {/* Function curve */}
          <path
            d={generatePath()}
            stroke="#8884d8"
            strokeWidth={2}
            fill="none"
          />
          
          {/* Hover coordinate display */}
          {hoverCoord && mousePos && (
            <g transform={`translate(${mousePos.x}, ${mousePos.y})`}>
              <rect
                x={hoverCoord.x > 0 ? -90 : 10}
                y={-30}
                width={80}
                height={24}
                fill="rgba(0, 0, 0, 0.8)"
                rx={4}
                ry={4}
              />
              <text
                x={hoverCoord.x > 0 ? -50 : 50}
                y={-12}
                textAnchor="middle"
                fill="white"
                fontSize={12}
                fontWeight="bold"
              >
                ({hoverCoord.x.toFixed(2)}, {hoverCoord.y.toFixed(2)})
              </text>
              <circle
                cx={0}
                cy={0}
                r={6}
                fill="#8884d8"
                stroke="white"
                strokeWidth={2}
              />
            </g>
          )}
          
          {/* Intercepts */}
          {showIntercepts && functionData.xIntercepts !== "None" && 
            id !== "reciprocal" && id !== "greatestInteger" && (
            <g>
              <circle
                cx={xScale(id === "logarithmic" ? 1 : 0)}
                cy={originY}
                r={4}
                fill="#FF5722"
              />
              {!isMobile && (
                <text
                  x={xScale(id === "logarithmic" ? 1 : 0) + 10}
                  y={originY - 10}
                  fill="#FF5722"
                  fontSize={12}
                >
                  x-intercept
                </text>
              )}
            </g>
          )}
          
          {showIntercepts && functionData.yIntercept !== "None" && 
            id !== "reciprocal" && id !== "logarithmic" && (
            <g>
              <circle
                cx={originX}
                cy={yScale(id === "exponential" ? 1 : 0)}
                r={4}
                fill="#4CAF50"
              />
              {!isMobile && (
                <text
                  x={originX + 10}
                  y={yScale(id === "exponential" ? 1 : 0) - 10}
                  fill="#4CAF50"
                  fontSize={12}
                >
                  y-intercept
                </text>
              )}
            </g>
          )}
          
          {/* Extrema */}
          {showExtrema && functionData.extrema && 
            id !== "greatestInteger" && ["quadratic", "absoluteValue"].includes(id) && (
            <g>
              <circle
                cx={originX}
                cy={originY}
                r={4}
                fill="#9C27B0"
              />
              {!isMobile && (
                <text
                  x={originX + 10}
                  y={originY + 20}
                  fill="#9C27B0"
                  fontSize={12}
                >
                  Min (0,0)
                </text>
              )}
            </g>
          )}
        </g>
      </svg>
      
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
      
      {/* End behavior info - positioned on sides */}
      {showEndBehavior && functionData.endBehavior && (
        <>
          {/* Parse end behavior text */}
          {(() => {
            // Split by semicolon to get left and right behaviors
            const behaviors = functionData.endBehavior.split(';').map(b => b.trim());
            console.log('Behaviors:', behaviors); // Debug log
            
            let leftBehavior = null;
            let rightBehavior = null;
            
            // Find left and right behaviors
            behaviors.forEach(behavior => {
              if (behavior.includes('x → -∞')) {
                leftBehavior = behavior;
              } else if (behavior.includes('x → ∞') && !behavior.includes('x → -∞')) {
                rightBehavior = behavior;
              }
            });
            
            // If special case (like periodic), handle separately
            if (behaviors.length === 1 && behaviors[0].includes('Periodic')) {
              const periodicBehavior = behaviors[0];
              return (
                <>
                  <div 
                    className="absolute left-2 bg-indigo-50 p-3 rounded-md text-sm"
                    style={{ 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      minWidth: '100px'
                    }}
                  >
                    <div className="font-medium text-center mb-2">End Behavior</div>
                    <div className="text-gray-700 text-center">{periodicBehavior}</div>
                  </div>
                </>
              );
            }
            
            // Parse individual behaviors
            const parseEndBehavior = (behavior: string | null) => {
              if (!behavior) return null;
              
              // Try to match pattern: "As x → ..., f(x) → ..."
              const match = behavior.match(/As\s+x\s*→\s*([^,]+),\s*f\(x\)\s*→\s*(.+)/);
              if (match) {
                return {
                  xApproaches: match[1].trim(),
                  fxApproaches: match[2].trim()
                };
              }
              
              return null;
            };
            
            const leftParsed = parseEndBehavior(leftBehavior);
            const rightParsed = parseEndBehavior(rightBehavior);
            
            return (
              <>
                {/* Left end behavior */}
                {leftParsed && (
                  <div 
                    className="absolute left-5 bg-indigo-50 p-3 rounded-md text-sm"
                    style={{ 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      minWidth: '100px'
                    }}
                  >
                    <div className="font-medium text-center mb-2">Left End</div>
                    <div className="text-gray-700 text-left">
                      <div>As</div>
                      <div>x → {leftParsed.xApproaches}</div>
                      <div>f(x) → {leftParsed.fxApproaches}</div>
                    </div>
                  </div>
                )}
                
                {/* Right end behavior */}
                {rightParsed && (
                  <div 
                    className="absolute right-5 bg-indigo-50 p-3 rounded-md text-sm"
                    style={{ 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      minWidth: '100px'
                    }}
                  >
                    <div className="font-medium text-center mb-2">Right End</div>
                    <div className="text-gray-700 text-left">
                      <div>As</div>
                      <div>x → {rightParsed.xApproaches}</div>
                      <div>f(x) → {rightParsed.fxApproaches}</div>
                    </div>
                  </div>
                )}
                
                {/* Fallback: if parsing fails, show original text */}
                {!leftParsed && !rightParsed && behaviors.length > 0 && !behaviors[0].includes('Periodic') && (
                  <div 
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-50 p-2 rounded-md text-sm"
                  >
                    <span className="font-medium">End Behavior:</span> {functionData.endBehavior}
                  </div>
                )}
              </>
            );
          })()}
        </>
      )}
    </div>
  );
};

export default GraphDisplay;