import { useState } from "react";
import TemplateGallery from "./components/TemplateGallery";
import MemeEditor from "./components/MemeEditor";
import "./App.css";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="p-4 bg-gray-900 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-center text-white">
          Tesla Meme Generator
        </h1>
        <p className="text-center text-gray-400 mt-2">
          Create epic Tesla & Elon memes in seconds
        </p>
      </header>
      <main>
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
