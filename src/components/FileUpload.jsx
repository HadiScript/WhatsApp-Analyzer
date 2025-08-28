import React, { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";

const FileUpload = ({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  processing,
}) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.name.endsWith(".txt")) {
      onFileSelect(file);
    } else {
      alert("Please upload a .txt file exported from WhatsApp");
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (selectedFile) {
    return (
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            disabled={processing}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragActive
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upload WhatsApp Chat Export
        </h3>
        <p className="text-gray-600 mb-6">
          Drag and drop your .txt file here, or click to select
        </p>
        <Button onClick={openFileDialog}>Choose File</Button>

        <div className="mt-6 text-sm text-gray-500">
          <p className="font-medium mb-2">How to export WhatsApp chat:</p>
          <ol className="text-left max-w-md mx-auto space-y-1">
            <li>1. Open WhatsApp group/chat</li>
            <li>2. Tap ⋮ (menu) → More → Export chat</li>
            <li>3. Choose "Without Media"</li>
            <li>4. Save as .txt file</li>
          </ol>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleChange}
        className="hidden"
      />
    </Card>
  );
};

export default FileUpload;
