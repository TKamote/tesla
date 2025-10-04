import React from "react";

const templates = [
  { id: "1", name: "Elon Laughing", url: "/templates/elon-laughing.svg" },
  { id: "2", name: "Doge to the Moon", url: "/templates/doge-to-the-moon.svg" },
  { id: "3", name: "Stonks", url: "/templates/stonks.svg" },
  { id: "4", name: "Tesla Cybertruck", url: "/templates/cybertruck.svg" },
];

interface TemplateGalleryProps {
  onSelectTemplate: (templateUrl: string) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Choose Your Template
      </h2>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-red-500 cursor-pointer"
            onClick={() => onSelectTemplate(template.url)}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-600 rounded-full flex items-center justify-center">
                <i className="fas fa-image text-gray-400"></i>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {template.name}
              </h3>
              <p className="text-gray-400 text-xs">Click to edit</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
