
import FunctionVisualizer from "@/components/FunctionVisualizer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Parent Function Explorer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visualize and analyze the behavior of basic parent functions in mathematics
          </p>
        </header>
        
        <main>
          <FunctionVisualizer />
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            An interactive learning tool for mathematics students
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
