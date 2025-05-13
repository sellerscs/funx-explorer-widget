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
    xIntercepts: "None",
    yIntercept: "None (undefined at x = 0)",
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
    endBehavior: "As x → ±∞, f(x) → ∞",
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
  },
  {
    id: "sine",
    name: "Sine Function",
    expression: "f(x) = sin(x)",
    latex: "f(x) = \\sin(x)",
    func: (x: number) => Math.sin(x),
    domain: "(-∞, ∞)",
    range: "[-1, 1]",
    xIntercepts: "(nπ, 0) where n ∈ ℤ",
    yIntercept: "(0, 0)",
    extrema: "Maxima at ((2n+1/2)π, 1), Minima at ((2n-1/2)π, -1) where n ∈ ℤ",
    increasingIntervals: "((2n-1/2)π, (2n+1/2)π) where n ∈ ℤ",
    decreasingIntervals: "((2n+1/2)π, (2n+3/2)π) where n ∈ ℤ",
    endBehavior: "Periodic with period 2π",
  },
  {
    id: "cosine",
    name: "Cosine Function",
    expression: "f(x) = cos(x)",
    latex: "f(x) = \\cos(x)",
    func: (x: number) => Math.cos(x),
    domain: "(-∞, ∞)",
    range: "[-1, 1]",
    xIntercepts: "((2n+1)/2·π, 0) where n ∈ ℤ",
    yIntercept: "(0, 1)",
    extrema: "Maxima at (2nπ, 1), Minima at ((2n+1)π, -1) where n ∈ ℤ",
    increasingIntervals: "((2n-1)π, 2nπ) where n ∈ ℤ",
    decreasingIntervals: "(2nπ, (2n+1)π) where n ∈ ℤ",
    endBehavior: "Periodic with period 2π",
  }
];

export const getFunction = (id: FunctionType): FunctionData => {
  return functions.find(f => f.id === id) || functions[0];
};