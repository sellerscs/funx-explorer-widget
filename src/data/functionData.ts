
export type FunctionType = 
  | "constant" 
  | "identity" 
  | "quadratic" 
  | "cubic" 
  | "squareRoot" 
  | "reciprocal" 
  | "absoluteValue"
  | "exponential" 
  | "logarithmic"
  | "greatestInteger";

export type FunctionData = {
  id: FunctionType;
  name: string;
  expression: string;
  latex: string;
  func: (x: number) => number;
  domain: string;
  range: string;
  xIntercepts: string;
  yIntercept: string;
  extrema: string | null;
  increasingIntervals: string;
  decreasingIntervals: string;
  endBehavior: string;
  questions: {
    question: string;
    answer: string;
    hint: string;
  }[];
};

export const functions: FunctionData[] = [
  {
    id: "constant",
    name: "Constant Function",
    expression: "f(x) = c",
    latex: "f(x) = 3",
    func: (x: number) => 3,
    domain: "(-∞, ∞)",
    range: "{3}",
    xIntercepts: "None (unless c = 0)",
    yIntercept: "(0, 3)",
    extrema: null,
    increasingIntervals: "None",
    decreasingIntervals: "None",
    endBehavior: "As x → ±∞, f(x) → 3",
    questions: [
      {
        question: "What is the domain of this function?",
        answer: "(-∞, ∞)",
        hint: "The constant function is defined for all real numbers."
      },
      {
        question: "Is this function increasing, decreasing, or neither?",
        answer: "neither",
        hint: "Think about how the y-values change as x changes."
      }
    ]
  },
  {
    id: "identity",
    name: "Identity Function",
    expression: "f(x) = x",
    latex: "f(x) = x",
    func: (x: number) => x,
    domain: "(-∞, ∞)",
    range: "(-∞, ∞)",
    xIntercepts: "(0, 0)",
    yIntercept: "(0, 0)",
    extrema: null,
    increasingIntervals: "(-∞, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ∞, f(x) → ∞; As x → -∞, f(x) → -∞",
    questions: [
      {
        question: "What is the slope of this function?",
        answer: "1",
        hint: "The slope measures the rate of change of the function."
      },
      {
        question: "Where does this function cross the x-axis?",
        answer: "0",
        hint: "Find where f(x) = 0."
      }
    ]
  },
  {
    id: "quadratic",
    name: "Quadratic Function",
    expression: "f(x) = x²",
    latex: "f(x) = x^2",
    func: (x: number) => Math.pow(x, 2),
    domain: "(-∞, ∞)",
    range: "[0, ∞)",
    xIntercepts: "(0, 0)",
    yIntercept: "(0, 0)",
    extrema: "Minimum at (0, 0)",
    increasingIntervals: "(0, ∞)",
    decreasingIntervals: "(-∞, 0)",
    endBehavior: "As x → ±∞, f(x) → ∞",
    questions: [
      {
        question: "What is the vertex of this function?",
        answer: "(0, 0)",
        hint: "The vertex is the point where the parabola reaches its minimum or maximum value."
      },
      {
        question: "Is this function even, odd, or neither?",
        answer: "even",
        hint: "Test if f(-x) = f(x) for even functions."
      }
    ]
  },
  {
    id: "cubic",
    name: "Cubic Function",
    expression: "f(x) = x³",
    latex: "f(x) = x^3",
    func: (x: number) => Math.pow(x, 3),
    domain: "(-∞, ∞)",
    range: "(-∞, ∞)",
    xIntercepts: "(0, 0)",
    yIntercept: "(0, 0)",
    extrema: "Inflection point at (0, 0)",
    increasingIntervals: "(-∞, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ∞, f(x) → ∞; As x → -∞, f(x) → -∞",
    questions: [
      {
        question: "What is the inflection point of this function?",
        answer: "(0, 0)",
        hint: "The inflection point is where the concavity changes."
      },
      {
        question: "Is this function even, odd, or neither?",
        answer: "odd",
        hint: "Test if f(-x) = -f(x) for odd functions."
      }
    ]
  },
  {
    id: "squareRoot",
    name: "Square Root Function",
    expression: "f(x) = √x",
    latex: "f(x) = \\sqrt{x}",
    func: (x: number) => (x >= 0 ? Math.sqrt(x) : NaN),
    domain: "[0, ∞)",
    range: "[0, ∞)",
    xIntercepts: "(0, 0)",
    yIntercept: "(0, 0)",
    extrema: null,
    increasingIntervals: "(0, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ∞, f(x) → ∞",
    questions: [
      {
        question: "Why is the domain of this function restricted to [0, ∞)?",
        answer: "We can't take the square root of negative numbers in the real number system",
        hint: "Think about what values would make the square root undefined for real numbers."
      },
      {
        question: "How does this function behave as x gets very large?",
        answer: "It grows more slowly than the identity function",
        hint: "Compare the growth rate with f(x) = x."
      }
    ]
  },
  {
    id: "reciprocal",
    name: "Reciprocal Function",
    expression: "f(x) = 1/x",
    latex: "f(x) = \\frac{1}{x}",
    func: (x: number) => (x !== 0 ? 1 / x : NaN),
    domain: "(-∞, 0) ∪ (0, ∞)",
    range: "(-∞, 0) ∪ (0, ∞)",
    xIntercepts: "None",
    yIntercept: "None (undefined at x = 0)",
    extrema: null,
    increasingIntervals: "(-∞, 0), (0, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ±∞, f(x) → 0",
    questions: [
      {
        question: "Why is this function undefined at x = 0?",
        answer: "Division by zero is undefined",
        hint: "Think about what happens when you divide by zero."
      },
      {
        question: "What are the horizontal asymptotes of this function?",
        answer: "y = 0",
        hint: "Consider the behavior of the function as x approaches infinity."
      }
    ]
  },
  {
    id: "absoluteValue",
    name: "Absolute Value Function",
    expression: "f(x) = |x|",
    latex: "f(x) = |x|",
    func: (x: number) => Math.abs(x),
    domain: "(-∞, ∞)",
    range: "[0, ∞)",
    xIntercepts: "(0, 0)",
    yIntercept: "(0, 0)",
    extrema: "Minimum at (0, 0)",
    increasingIntervals: "(0, ∞)",
    decreasingIntervals: "(-∞, 0)",
    endBehavior: "As x → ±∞, f(x) → ∞",
    questions: [
      {
        question: "Where is the vertex of this function?",
        answer: "(0, 0)",
        hint: "Look for the point where the function changes direction."
      },
      {
        question: "Is this function differentiable at x = 0?",
        answer: "no",
        hint: "Think about the sharp corner at the origin."
      }
    ]
  },
  {
    id: "exponential",
    name: "Exponential Function",
    expression: "f(x) = e^x",
    latex: "f(x) = e^x",
    func: (x: number) => Math.exp(x),
    domain: "(-∞, ∞)",
    range: "(0, ∞)",
    xIntercepts: "None",
    yIntercept: "(0, 1)",
    extrema: null,
    increasingIntervals: "(-∞, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ∞, f(x) → ∞; As x → -∞, f(x) → 0",
    questions: [
      {
        question: "What is the y-intercept of this function?",
        answer: "(0, 1)",
        hint: "Evaluate the function at x = 0."
      },
      {
        question: "What is the horizontal asymptote of this function?",
        answer: "y = 0",
        hint: "Consider what happens as x approaches negative infinity."
      }
    ]
  },
  {
    id: "logarithmic",
    name: "Logarithmic Function",
    expression: "f(x) = ln(x)",
    latex: "f(x) = \\ln(x)",
    func: (x: number) => (x > 0 ? Math.log(x) : NaN),
    domain: "(0, ∞)",
    range: "(-∞, ∞)",
    xIntercepts: "(1, 0)",
    yIntercept: "None (undefined at x = 0)",
    extrema: null,
    increasingIntervals: "(0, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ∞, f(x) → ∞; As x → 0⁺, f(x) → -∞",
    questions: [
      {
        question: "What is the vertical asymptote of this function?",
        answer: "x = 0",
        hint: "Consider what happens as x approaches zero from the right."
      },
      {
        question: "At what point does this function cross the x-axis?",
        answer: "(1, 0)",
        hint: "Find where f(x) = 0."
      }
    ]
  },
  {
    id: "greatestInteger",
    name: "Greatest Integer Function",
    expression: "f(x) = ⌊x⌋",
    latex: "f(x) = \\lfloor x \\rfloor",
    func: (x: number) => Math.floor(x),
    domain: "(-∞, ∞)",
    range: "Z (integers)",
    xIntercepts: "0",
    yIntercept: "(0, 0)",
    extrema: null,
    increasingIntervals: "None (step function)",
    decreasingIntervals: "None (step function)",
    endBehavior: "As x → ∞, f(x) → ∞; As x → -∞, f(x) → -∞",
    questions: [
      {
        question: "Is this function continuous?",
        answer: "no",
        hint: "Consider what happens at integer values."
      },
      {
        question: "What is the value of f(2.75)?",
        answer: "2",
        hint: "The greatest integer function returns the largest integer less than or equal to x."
      }
    ]
  }
];

export const getFunction = (id: FunctionType): FunctionData => {
  return functions.find(f => f.id === id) || functions[0];
};
