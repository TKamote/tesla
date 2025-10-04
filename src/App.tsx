import { useState } from "react";
import TemplateGallery from "./components/TemplateGallery";
import MemeEditor from "./components/MemeEditor";
import "./App.css";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="p-4 sm:p-6 bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold text-center text-white">
            Tesla Meme Generator
          </h1>
          <p className="text-center text-gray-400 mt-2 text-sm sm:text-base">
            Create epic Tesla & Elon memes in seconds
          </p>
        </div>
      </header>
      <main className="p-4 sm:p-6 max-w-6xl mx-auto">
        {selectedTemplate ? (
          <MemeEditor selectedTemplate={selectedTemplate} />
        ) : (
          <TemplateGallery onSelectTemplate={setSelectedTemplate} />
        )}
      </main>
    </div>
  );
}

export default App;
