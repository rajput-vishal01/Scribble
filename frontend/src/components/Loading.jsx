import { PenTool } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-app">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 border-4 border-stone-300 border-t-amber-500 rounded-full animate-spin"></div>
        
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <PenTool className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      
      {/* Welcome text with fade animation */}
      <div className="mt-8 text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary animate-pulse">
          Welcome to Scribble
        </h2>
        <p className="text-secondary animate-pulse" style={{ animationDelay: '0.5s' }}>
          Organizing your thoughts...
        </p>
      </div>
      
      {/* Decorative dots */}
      <div className="flex space-x-2 mt-6">
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingComponent;