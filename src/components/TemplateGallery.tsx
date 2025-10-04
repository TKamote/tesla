import React from "react";

// A list of meme templates.
// In a real app, this would come from an API or a config file.
const templates = [
  { id: "1", name: "Elon Laughing", url: "/templates/elon-laughing.svg" },
  { id: "2", name: "Doge to the Moon", url: "/templates/doge-to-the-moon.svg" },
  { id: "3", name: "Stonks", url: "/templates/stonks.svg" },
  { id: "4", name: "Tesla Cybertruck", url: "/templates/cybertruck.svg" },
  // Add more templates here as you add images to the public/templates folder
];

interface TemplateGalleryProps {
  onSelectTemplate: (templateUrl: string) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Choose Your Template
        </h2>
        <p className="text-gray-400 text-lg">
          Select a meme template to get started
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm sm:max-w-2xl mx-auto px-4 sm:px-0">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 active:border-red-400 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 touch-manipulation"
            onClick={() => onSelectTemplate(template.url)}
          >
            <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
              <div className="text-center p-3 sm:p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 leading-tight">
                  {template.name}
                </h3>
                <p className="text-gray-400 text-xs">Tap to edit</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-gray-500 text-sm">
          Add your own template images to the{" "}
          <code className="bg-gray-800 px-2 py-1 rounded text-red-400">
            public/templates/
          </code>{" "}
          folder
        </p>
      </div>
    </div>
  );
};

export default TemplateGallery;
