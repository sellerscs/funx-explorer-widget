export type FunctionType = 
  | "identity" 
  | "quadratic" 
  | "cubic" 
  | "squareRoot" 
  | "reciprocal" 
  | "absoluteValue"
  | "exponential" 
  | "logarithmic"
  | "sine"
  | "cosine";

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
};

export const functions: FunctionData[] = [
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
    endBehavior: "As x → ∞, f(x) → ∞; As x → -∞, f(x) → ∞",
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
  },
  {
    id: "reciprocal",
    name: "Reciprocal Function",
    expression: "f(x) = 1/x",
    latex: "f(x) = \\frac{1}{x}",
    func: (x: number) => (x !== 0 ? 1 / x : NaN),
    domain: "(-∞, 0) ∪ (0, ∞)",
    range: "(-∞, 0) ∪ (0, ∞)",
    xIntercepts: "None (Asymptote at y = 0)",
    yIntercept: "None (Asymptote at x = 0)",
    extrema: null,
    increasingIntervals: "(-∞, 0), (0, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ±∞, f(x) → 0",
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
    endBehavior: "As x → ∞, f(x) → ∞; As x → -∞, f(x) → ∞",
  },
  {
    id: "exponential",
    name: "Exponential Function",
    expression: "f(x) = e^x",
    latex: "f(x) = e^x",
    func: (x: number) => Math.exp(x),
    domain: "(-∞, ∞)",
    range: "(0, ∞)",
    xIntercepts: "None (Asymptote at y = 0)",
    yIntercept: "(0, 1)",
    extrema: null,
    increasingIntervals: "(-∞, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ∞, f(x) → ∞; As x → -∞, f(x) → 0",
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
    yIntercept: "None (Asymptote at x = 0)",
    extrema: null,
    increasingIntervals: "(0, ∞)",
    decreasingIntervals: "None",
    endBehavior: "As x → ∞, f(x) → ∞; As x → 0⁺, f(x) → -∞",
  }
];

// Add these types and data at the end of your functionData.ts file
export type TutorialFunction = {
  id: string;
  name: string;
  expression: string;
  func: (x: number) => number;
  leftEndBehavior: { x: string; fx: string };
  rightEndBehavior: { x: string; fx: string };
  degree: number;
  leading: number;
};

export const tutorialFunctions: TutorialFunction[] = [
  {
    id: "poly1",
    name: "Polynomial Function 1",
    expression: "f(x) = x³ - 2x² + 3x - 1",
    func: (x: number) => Math.pow(x, 3) - 2 * Math.pow(x, 2) + 3 * x - 1,
    leftEndBehavior: { x: "-∞", fx: "-∞" },
    rightEndBehavior: { x: "∞", fx: "∞" },
    degree: 3,
    leading: 1
  },
  {
    id: "poly2",
    name: "Polynomial Function 2",
    expression: "f(x) = -x⁴ + 3x² - 5",
    func: (x: number) => -Math.pow(x, 4) + 3 * Math.pow(x, 2) - 5,
    leftEndBehavior: { x: "-∞", fx: "-∞" },
    rightEndBehavior: { x: "∞", fx: "-∞" },
    degree: 4,
    leading: -1
  },
  {
    id: "poly3",
    name: "Polynomial Function 3", 
    expression: "f(x) = 2x⁴ - x² + 7",
    func: (x: number) => 2 * Math.pow(x, 4) - Math.pow(x, 2) + 7,
    leftEndBehavior: { x: "-∞", fx: "∞" },
    rightEndBehavior: { x: "∞", fx: "∞" },
    degree: 4,
    leading: 2
  },
  {
    id: "poly4",
    name: "Polynomial Function 4",
    expression: "f(x) = -x³ + 4x",
    func: (x: number) => -Math.pow(x, 3) + 4 * x,
    leftEndBehavior: { x: "-∞", fx: "∞" },
    rightEndBehavior: { x: "∞", fx: "-∞" },
    degree: 3,
    leading: -1
  },
  {
    id: "poly5",
    name: "Polynomial Function 5",
    expression: "f(x) = x⁵ - 4x³ + 2x",
    func: (x: number) => Math.pow(x, 5) - 4 * Math.pow(x, 3) + 2 * x,
    leftEndBehavior: { x: "-∞", fx: "-∞" },
    rightEndBehavior: { x: "∞", fx: "∞" },
    degree: 5,
    leading: 1
  }
];
export const getFunction = (id: FunctionType): FunctionData => {
  return functions.find(f => f.id === id) || functions[0];
};