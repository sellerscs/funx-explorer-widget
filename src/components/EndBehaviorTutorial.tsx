import React, { useState, useEffect } from 'react';
import { tutorialFunctions, TutorialFunction } from '@/data/functionData';

// Tutorial states
enum TutorialStep {
  SelectXDirection = 0,
  SelectEnd = 1,
  SelectYDirection = 2,
  CompleteEndBehavior = 3,
  ShowSummary = 4
}

// Function Graph Component for the tutorial
const TutorialGraph: React.FC<{
  func: (x: number) => number;
  showLeftEnd?: boolean;
  showRightEnd?: boolean;
  highlightLeftEnd?: boolean;
  highlightRightEnd?: boolean;
}> = ({
  func,
  showLeftEnd = false,
  showRightEnd = false,
  highlightLeftEnd = false,
  highlightRightEnd = false
}) => {
  // SVG dimensions
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Generate data points for the function
  const points = React.useMemo(() => {
    const data: {x: number, y: number}[] = [];
    const step = 0.2;
    
    for (let x = -10; x <= 10; x += step) {
      const y = func(x);
      if (!isNaN(y) && isFinite(y)) {
        data.push({ x, y });
      }
    }
    
    return data;
  }, [func]);

  // Scale functions for x and y axes
  const xScale = (x: number) => (x + 10) * (innerWidth / 20);
  const yScale = (y: number) => innerHeight - ((y + 10) * (innerHeight / 20));

  // Generate path for the function curve
  const generatePath = () => {
    let path = "";
    let firstPoint = true;
    
    points.forEach(point => {
      const x = xScale(point.x);
      const y = yScale(point.y);
      
      if (x >= 0 && x <= innerWidth && y >= -50 && y <= innerHeight + 50) {
        if (firstPoint) {
          path += `M ${x} ${y}`;
          firstPoint = false;
        } else {
          path += ` L ${x} ${y}`;
        }
      } else {
        firstPoint = true;
      }
    });
    
    return path;
  };

  return (
    <svg width={width} height={height} className="mx-auto">
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Grid lines */}
        {Array.from({ length: 21 }, (_, i) => i - 10).map(tick => (
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
        {Array.from({ length: 21 }, (_, i) => i - 10).map(tick => (
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
          y1={yScale(0)}
          x2={innerWidth}
          y2={yScale(0)}
          stroke="#000"
          strokeWidth={2}
        />
        <line
          x1={xScale(0)}
          y1={0}
          x2={xScale(0)}
          y2={innerHeight}
          stroke="#000"
          strokeWidth={2}
        />
        
        {/* X-axis ticks and labels */}
        {[-10, -5, 0, 5, 10].map(tick => (
          <g key={`x-tick-${tick}`}>
            <line
              x1={xScale(tick)}
              y1={yScale(0) - 4}
              x2={xScale(tick)}
              y2={yScale(0) + 4}
              stroke="#666"
              strokeWidth={1}
            />
            <text
              x={xScale(tick)}
              y={yScale(0) + 16}
              textAnchor="middle"
              fontSize={10}
              fill="#666"
            >
              {tick}
            </text>
          </g>
        ))}
        
        {/* Y-axis ticks and labels */}
        {[-10, -5, 0, 5, 10].map(tick => (
          <g key={`y-tick-${tick}`}>
            <line
              x1={xScale(0) - 4}
              y1={yScale(tick)}
              x2={xScale(0) + 4}
              y2={yScale(tick)}
              stroke="#666"
              strokeWidth={1}
            />
            <text
              x={xScale(0) - 10}
              y={yScale(tick) + 3}
              textAnchor="end"
              fontSize={10}
              fill="#666"
            >
              {tick}
            </text>
          </g>
        ))}
        
        {/* Function curve */}
        <path
          d={generatePath()}
          stroke="#8884d8"
          strokeWidth={2}
          fill="none"
        />
        
        {/* Left end highlight */}
        {showLeftEnd && (
          <g>
            <circle
              cx={xScale(-10)}
              cy={yScale(func(-10))}
              r={highlightLeftEnd ? 8 : 6}
              fill={highlightLeftEnd ? "#FF5722" : "#FFB74D"}
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={xScale(-10) + 10}
              y={yScale(func(-10)) - 10}
              fill={highlightLeftEnd ? "#FF5722" : "#FF9800"}
              fontSize={12}
              fontWeight={highlightLeftEnd ? "bold" : "normal"}
            >
              Left End (x → -∞)
            </text>
          </g>
        )}
        
        {/* Right end highlight */}
        {showRightEnd && (
          <g>
            <circle
              cx={xScale(10)}
              cy={yScale(func(10))}
              r={highlightRightEnd ? 8 : 6}
              fill={highlightRightEnd ? "#4CAF50" : "#81C784"}
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={xScale(10) - 10}
              y={yScale(func(10)) - 10}
              textAnchor="end"
              fill={highlightRightEnd ? "#4CAF50" : "#66BB6A"}
              fontSize={12}
              fontWeight={highlightRightEnd ? "bold" : "normal"}
            >
              Right End (x → ∞)
            </text>
          </g>
        )}
        
        {/* Directions for left end if highlighted */}
        {highlightLeftEnd && (
          <g>
            {/* Up arrow */}
            <g transform={`translate(${xScale(-10) - 30}, ${yScale(func(-10)) - 30})`}>
              <circle
                cx={15}
                cy={15}
                r={15}
                fill="#E1BEE7"
                stroke="#9C27B0"
                strokeWidth={2}
              />
              <path 
                d="M15,20 L15,10 M10,15 L15,10 L20,15" 
                stroke="#9C27B0"
                strokeWidth={2}
                fill="none"
              />
            </g>
            
            {/* Down arrow */}
            <g transform={`translate(${xScale(-10) - 30}, ${yScale(func(-10)) + 10})`}>
              <circle
                cx={15}
                cy={15}
                r={15}
                fill="#E1BEE7"
                stroke="#9C27B0"
                strokeWidth={2}
              />
              <path 
                d="M15,10 L15,20 M10,15 L15,20 L20,15" 
                stroke="#9C27B0"
                strokeWidth={2}
                fill="none"
              />
            </g>
          </g>
        )}
        
        {/* Directions for right end if highlighted */}
        {highlightRightEnd && (
          <g>
            {/* Up arrow */}
            <g transform={`translate(${xScale(10) + 10}, ${yScale(func(10)) - 30})`}>
              <circle
                cx={15}
                cy={15}
                r={15}
                fill="#E8F5E9"
                stroke="#4CAF50"
                strokeWidth={2}
              />
              <path 
                d="M15,20 L15,10 M10,15 L15,10 L20,15" 
                stroke="#4CAF50"
                strokeWidth={2}
                fill="none"
              />
            </g>
            
            {/* Down arrow */}
            <g transform={`translate(${xScale(10) + 10}, ${yScale(func(10)) + 10})`}>
              <circle
                cx={15}
                cy={15}
                r={15}
                fill="#E8F5E9"
                stroke="#4CAF50"
                strokeWidth={2}
              />
              <path 
                d="M15,10 L15,20 M10,15 L15,20 L20,15" 
                stroke="#4CAF50"
                strokeWidth={2}
                fill="none"
              />
            </g>
          </g>
        )}
      </g>
    </svg>
  );
};

// Main Tutorial Component
const EndBehaviorTutorial: React.FC = () => {
  const [currentFunction, setCurrentFunction] = useState<TutorialFunction>(tutorialFunctions[0]);
  const [tutorialStep, setTutorialStep] = useState<TutorialStep>(TutorialStep.SelectXDirection);
  const [selectedXDirection, setSelectedXDirection] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<"left" | "right" | null>(null);
  const [selectedYDirection, setSelectedYDirection] = useState<string | null>(null);
  const [userEndBehaviorX, setUserEndBehaviorX] = useState<string>(""); 
  const [userEndBehaviorFx, setUserEndBehaviorFx] = useState<string>("");
  const [correctChoices, setCorrectChoices] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentEndType, setCurrentEndType] = useState<"left" | "right">("left"); // "left" or "right"

  // Change to a random function when starting a new tutorial cycle
  useEffect(() => {
    if (tutorialStep === TutorialStep.SelectXDirection && !completed) {
      const randomIndex = Math.floor(Math.random() * tutorialFunctions.length);
      setCurrentFunction(tutorialFunctions[randomIndex]);
      setCorrectChoices([]);
      setFeedback("");
      setIsCorrect(null);
      
      // Randomly choose left or right end to study
      const endType = Math.random() > 0.5 ? "left" : "right";
      setCurrentEndType(endType as "left" | "right");
    }
  }, [tutorialStep, completed]);

  // Handle X direction selection
  const handleXDirectionSelect = (direction: string) => {
    setSelectedXDirection(direction);
    
    const correctDirection = currentEndType === "left" ? "-∞" : "∞";
    
    if (direction === correctDirection) {
      setIsCorrect(true);
      setFeedback(`Correct! Now select which end of the graph we're examining.`);
      setCorrectChoices([...correctChoices, `X approaches ${direction}`]);
      setTutorialStep(TutorialStep.SelectEnd);
    } else {
      setIsCorrect(false);
      setFeedback(`Not quite. We're focusing on the ${currentEndType.toUpperCase()} end of the graph. Try again!`);
    }
  };

  // Handle end selection
  const handleEndSelect = (end: "left" | "right") => {
    setSelectedEnd(end);
    
    if (end === currentEndType) {
      setIsCorrect(true);
      setFeedback("Correct! Now determine which direction the function values go at this end.");
      setCorrectChoices([...correctChoices, `Selected the ${end} end`]);
      setTutorialStep(TutorialStep.SelectYDirection);
    } else {
      setIsCorrect(false);
      setFeedback(`Not quite. Look at the ${currentEndType} end of the graph and try again!`);
    }
  };

  // Handle Y direction selection
  const handleYDirectionSelect = (direction: string) => {
    setSelectedYDirection(direction);
    
    const correctDirection = currentEndType === "left" 
      ? currentFunction.leftEndBehavior.fx 
      : currentFunction.rightEndBehavior.fx;
    
    if (direction === correctDirection) {
      setIsCorrect(true);
      setFeedback("Correct! Now complete the end behavior statement.");
      setCorrectChoices([...correctChoices, `f(x) approaches ${direction}`]);
      setTutorialStep(TutorialStep.CompleteEndBehavior);
    } else {
      setIsCorrect(false);
      const approachingX = currentEndType === "left" ? "-∞" : "∞";
      setFeedback(`Not quite. Look at the direction the function is heading as x approaches ${approachingX}.`);
    }
  };

  // Handle complete end behavior form submission
  const handleEndBehaviorSubmit = () => {
    const correctX = currentEndType === "left" 
      ? currentFunction.leftEndBehavior.x 
      : currentFunction.rightEndBehavior.x;
    
    const correctFx = currentEndType === "left" 
      ? currentFunction.leftEndBehavior.fx 
      : currentFunction.rightEndBehavior.fx;
    
    if (userEndBehaviorX === correctX && userEndBehaviorFx === correctFx) {
      setIsCorrect(true);
      setFeedback(`Excellent! You've correctly identified the ${currentEndType} end behavior of this function.`);
      setCorrectChoices([
        ...correctChoices, 
        `Complete end behavior: As x → ${userEndBehaviorX}, f(x) → ${userEndBehaviorFx}`
      ]);
      setTutorialStep(TutorialStep.ShowSummary);
      setProgress(progress + 1);
    } else {
      setIsCorrect(false);
      setFeedback("That's not quite right. Review your selections and try again.");
    }
  };

  // Handle restarting the tutorial
  const handleRestartTutorial = () => {
    setTutorialStep(TutorialStep.SelectXDirection);
    setSelectedXDirection(null);
    setSelectedEnd(null);
    setSelectedYDirection(null);
    setUserEndBehaviorX("");
    setUserEndBehaviorFx("");
    setIsCorrect(null);
    setFeedback("");
  };

  // Complete the tutorial after going through all examples
  const handleCompleteTutorial = () => {
    setCompleted(true);
    setFeedback("Congratulations! You've completed the end behavior tutorial!");
  };

  // Generate tutorial content based on current step
  const renderTutorialContent = () => {
    if (completed) {
      return (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold text-green-700 mb-4">Tutorial Completed!</h3>
          <p className="mb-4">Great job! You've learned how to identify end behaviors of polynomial functions.</p>
          <p className="mb-4">Remember the key patterns:</p>
          <ul className="text-left list-disc pl-8 mb-4">
            <li>For <strong>odd-degree</strong> polynomials, the ends go in <strong>opposite</strong> directions</li>
            <li>For <strong>even-degree</strong> polynomials, the ends go in the <strong>same</strong> direction</li>
            <li>The <strong>sign of the leading coefficient</strong> determines which direction</li>
          </ul>
          <button 
            onClick={handleRestartTutorial}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Restart Tutorial
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-gray-800">{currentFunction.name}</h3>
          <p className="text-lg font-medium text-gray-700">{currentFunction.expression}</p>
          <div className="mt-2 text-sm bg-indigo-50 p-2 rounded inline-block">
            <span className="font-medium">
              Focus: End Behavior
              (x → {currentEndType === "left" ? "-∞" : "∞"})
            </span>
          </div>
        </div>

        {/* Graph Visualization */}
        <div className="mb-6 border-2 border-gray-200 rounded-lg p-4 relative">
          <TutorialGraph 
            func={currentFunction.func} 
            showLeftEnd={currentEndType === "left" || tutorialStep >= TutorialStep.SelectEnd}
            showRightEnd={currentEndType === "right" || tutorialStep >= TutorialStep.SelectEnd}
            highlightLeftEnd={selectedEnd === "left" && tutorialStep >= TutorialStep.SelectYDirection}
            highlightRightEnd={selectedEnd === "right" && tutorialStep >= TutorialStep.SelectYDirection}
          />
          
          {/* Tutorial UI Elements */}
          {tutorialStep === TutorialStep.SelectXDirection && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 p-3 rounded-lg shadow">
              <p className="text-center mb-2 font-medium">
                Which direction is the graphing going in for x → {currentEndType === "left" ? "-∞" : "∞"}?
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                onClick={() => handleXDirectionSelect("-∞")} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-24"
                >
                Left
                </button>
                <button 
                onClick={() => handleXDirectionSelect("∞")} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-24"
                >
                Right
                </button>
              </div>
            </div>
          )}

          {tutorialStep === TutorialStep.SelectEnd && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 p-3 rounded-lg shadow">
              <p className="text-center mb-2 font-medium">Click on the end of the graph that represents x → {currentEndType === "left" ? "-∞" : "∞"}:</p>
              <div className="flex justify-between w-full mt-2">
                <button 
                  onClick={() => handleEndSelect("left")} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  End on this side
                </button>
                <button 
                  onClick={() => handleEndSelect("right")} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  End on this side
                </button>
              </div>
            </div>
          )}

          {tutorialStep === TutorialStep.SelectYDirection && selectedEnd && (
            <div className={`absolute top-4 p-3 rounded-lg shadow bg-white bg-opacity-90 w-64 
                ${currentEndType === "left" 
                ? "left-10" 
                : "right-10"}`}
            >
                <p className="text-center mb-2 font-medium">
                As x → {currentEndType === "left" ? "-∞" : "∞"}, which direction is the graph going?
                </p>
                <div className="flex justify-center space-x-4">
                <button 
                    onClick={() => handleYDirectionSelect("-∞")} 
                    className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <button 
                    onClick={() => handleYDirectionSelect("∞")} 
                    className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                </div>
            </div>
            )}
        </div>

        {/* Form for completing end behavior statement */}
        {tutorialStep === TutorialStep.CompleteEndBehavior && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-3">Complete the end behavior statement:</h4>
            <div className="flex items-center">
              <span className="mr-2">As x →</span>
              <select 
                value={userEndBehaviorX} 
                onChange={(e) => setUserEndBehaviorX(e.target.value)}
                className="border rounded p-1 mr-2"
              >
                <option value="">Select</option>
                <option value="-∞">-∞</option>
                <option value="∞">∞</option>
              </select>
              <span className="mr-2">, f(x) →</span>
              <select 
                value={userEndBehaviorFx} 
                onChange={(e) => setUserEndBehaviorFx(e.target.value)}
                className="border rounded p-1 mr-2"
              >
                <option value="">Select</option>
                <option value="-∞">-∞</option>
                <option value="∞">∞</option>
              </select>
              <button 
                onClick={handleEndBehaviorSubmit}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ml-2"
                disabled={!userEndBehaviorX || !userEndBehaviorFx}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Summary and explanation */}
        {tutorialStep === TutorialStep.ShowSummary && (
          <div className="mb-6 bg-green-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2">Great job! Summary of {currentEndType} end behavior:</h4>
            <p className="mb-2">
              As x → {currentEndType === "left" ? currentFunction.leftEndBehavior.x : currentFunction.rightEndBehavior.x}, 
              f(x) → {currentEndType === "left" ? currentFunction.leftEndBehavior.fx : currentFunction.rightEndBehavior.fx}
            </p>
            <div className="mt-3 bg-white p-3 rounded">
              <h5 className="font-medium">Why is this the case?</h5>
              <p>For this {currentFunction.degree}-degree polynomial with leading coefficient {currentFunction.leading}:</p>
              <ul className="list-disc pl-6 mt-2">
                {currentFunction.degree % 2 === 0 ? (
                  <li>Even-degree polynomials have the same behavior at both ends</li>
                ) : (
                  <li>Odd-degree polynomials have opposite behavior at each end</li>
                )}
                {currentFunction.leading > 0 ? (
                  <li>Positive leading coefficient means the highest-degree term is positive for large inputs</li>
                ) : (
                  <li>Negative leading coefficient means the highest-degree term is negative for large inputs</li>
                )}
              </ul>
            </div>
            <div className="mt-4 flex justify-between">
              <button 
                onClick={handleRestartTutorial}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Try Another Example
              </button>
              {progress >= 3 && (
                <button 
                  onClick={handleCompleteTutorial}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Complete Tutorial
                </button>
              )}
            </div>
          </div>
        )}

        {/* Feedback section */}
        {feedback && (
          <div className={`p-3 rounded-lg mb-4 ${
            isCorrect === true ? 'bg-green-100 text-green-800' :
            isCorrect === false ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <p>{feedback}</p>
          </div>
        )}

        {/* Progress indicator */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">Progress: {progress}/3 examples</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(progress / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Interactive End Behavior Tutorial
      </h2>
      {renderTutorialContent()}
    </div>
  );
};

export default EndBehaviorTutorial;