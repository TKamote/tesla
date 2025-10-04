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
      height: 400,
      width: 400,
      backgroundColor: "grey",
    });

    setCanvas(initCanvas);

    fabric.Image.fromURL(selectedTemplate, {
      crossOrigin: "anonymous",
    })
      .then((img: fabric.Image) => {
        if (img) {
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
    if (canvas && text.trim()) {
      const textbox = new fabric.Textbox(text, {
        left: 50,
        top: 50,
        width: 300,
        fontSize: 24,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
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

      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `tesla-meme-${timestamp}.png`;

      if (
        navigator.share &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
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
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Edit Your Meme
      </h2>

      <div className="mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-md bg-gray-800 border border-gray-700 text-white p-3 rounded mb-3 h-10"
          placeholder="Enter your meme text..."
        />

        <div className="flex gap-3">
          <button
            onClick={addText}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Text
          </button>
          <button
            onClick={exportMeme}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <i className="fas fa-download"></i>
            Export
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <canvas ref={canvasRef} className="border border-gray-600 rounded" />
      </div>

      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          ← Back to Templates
        </button>
      </div>
    </div>
  );
};

export default MemeEditor;
