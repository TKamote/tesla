import React, { useRef, useEffect, useState } from "react";
import * as fabric from "fabric";

interface MemeEditorProps {
  selectedTemplate: string;
}

const MemeEditor: React.FC<MemeEditorProps> = ({ selectedTemplate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!canvasRef.current) return;

    const initCanvas = new fabric.Canvas(canvasRef.current, {
      height: window.innerWidth < 768 ? 300 : 500,
      width: window.innerWidth < 768 ? 300 : 500,
      backgroundColor: "grey",
    });

    setCanvas(initCanvas);

    fabric.Image.fromURL(selectedTemplate, {
      crossOrigin: "anonymous",
    })
      .then((img: fabric.Image) => {
        if (img) {
          // Scale the image to fit the canvas
          const scaleX = initCanvas.width! / img.width!;
          const scaleY = initCanvas.height! / img.height!;
          const scale = Math.min(scaleX, scaleY);

          img.scale(scale);
          img.set({
            left: (initCanvas.width! - img.width! * scale) / 2,
            top: (initCanvas.height! - img.height! * scale) / 2,
          });

          initCanvas.backgroundImage = img;
          initCanvas.renderAll();
        }
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });

    return () => {
      initCanvas.dispose();
    };
  }, [selectedTemplate]);

  const addText = () => {
    if (canvas) {
      const textbox = new fabric.Textbox(text, {
        left: 50,
        top: 50,
        width: 400,
        fontSize: 40,
        fill: "white",
        stroke: "black",
        strokeWidth: 2,
        textAlign: "center",
      });
      canvas.add(textbox);
      canvas.setActiveObject(textbox);
      setText("");
    }
  };

  const exportMeme = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 1,
      });

      // Create a more descriptive filename with timestamp
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `tesla-meme-${timestamp}.png`;

      // Try to use the Web Share API on mobile devices
      if (
        navigator.share &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        // Convert dataURL to blob
        fetch(dataURL)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], filename, { type: "image/png" });
            navigator
              .share({
                title: "Tesla Meme",
                text: "Check out my Tesla meme!",
                files: [file],
              })
              .catch((err) => {
                console.log("Share failed, falling back to download:", err);
                downloadFile(dataURL, filename);
              });
          })
          .catch(() => {
            downloadFile(dataURL, filename);
          });
      } else {
        downloadFile(dataURL, filename);
      }
    }
  };

  const downloadFile = (dataURL: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
          Edit Your Meme
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Add text and customize your creation
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800">
        <div className="flex flex-col gap-4 items-center justify-center mb-4 sm:mb-6">
          <div className="w-full max-w-sm">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white p-4 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-lg"
              placeholder="Enter your meme text..."
            />
          </div>
          <div className="flex gap-2 w-full max-w-xs mx-auto">
            <button
              onClick={addText}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1 touch-manipulation text-sm flex-1"
            >
              <i className="fas fa-plus text-sm"></i>
              <span className="hidden sm:inline">Add Text</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button
              onClick={exportMeme}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1 touch-manipulation text-sm flex-1"
            >
              <i className="fas fa-download text-sm"></i>
              <span className="hidden sm:inline">Export Meme</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-gray-800 rounded-lg p-2 sm:p-4 border border-gray-700 max-w-full overflow-hidden">
            <canvas
              ref={canvasRef}
              className="border border-gray-600 rounded-lg shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm touch-manipulation"
        >
          ← Back to Templates
        </button>
      </div>
    </div>
  );
};

export default MemeEditor;
