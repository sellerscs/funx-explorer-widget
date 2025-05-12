
import React, { useState, useEffect } from "react";
import { FunctionData } from "@/data/functionData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface QuestionPanelProps {
  functionData: FunctionData;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ functionData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });
  
  const { toast } = useToast();
  
  // Reset state when function changes
  useEffect(() => {
    setUserAnswer("");
    setShowHint(false);
    setFeedback({ type: "", message: "" });
    setCurrentQuestionIndex(0);
  }, [functionData]);
  
  const currentQuestion = functionData.questions[currentQuestionIndex];
  
  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty Answer",
        description: "Please enter an answer before checking.",
        variant: "destructive",
      });
      return;
    }
    
    const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase();
    
    if (isCorrect) {
      setFeedback({
        type: "success",
        message: "Correct! Well done.",
      });
      toast({
        title: "Correct!",
        description: "That's the right answer. Great job!",
        variant: "default",
      });
    } else {
      setFeedback({
        type: "error",
        message: "That's not quite right. Try again or check the hint.",
      });
    }
  };
  
  const handleNextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % functionData.questions.length;
    setCurrentQuestionIndex(nextIndex);
    setUserAnswer("");
    setShowHint(false);
    setFeedback({ type: "", message: "" });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Function Analysis</h2>
      
      <div className="bg-indigo-50 p-4 rounded-md mb-4">
        <p className="font-medium text-indigo-900">{currentQuestion.question}</p>
      </div>
      
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter your answer here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleCheckAnswer} className="bg-purple-600 hover:bg-purple-700">
          Check Answer
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setShowHint(!showHint)}
          className="border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </Button>
        
        {functionData.questions.length > 1 && (
          <Button 
            variant="outline" 
            onClick={handleNextQuestion}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Next Question
          </Button>
        )}
      </div>
      
      {showHint && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
          <p className="text-sm">
            <span className="font-medium">Hint:</span> {currentQuestion.hint}
          </p>
        </div>
      )}
      
      {feedback.type && (
        <div className={`mt-4 p-3 rounded-md ${
          feedback.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : 
          "bg-red-50 border border-red-200 text-red-800"
        }`}>
          <p className="text-sm">{feedback.message}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionPanel;
