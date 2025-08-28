import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import KeywordManager from './components/KeywordManager';
import ResultsDisplay from './components/ResultsDisplay';
import Button from './components/ui/Button';
import { useKeywords } from './hooks/useKeywords';
import { useFileProcessor } from './hooks/useFileProcessor';
import './styles/globals.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    customWorkKeywords,
    customMeetingKeywords,
    addWorkKeyword,
    addMeetingKeyword,
    removeWorkKeyword,
    removeMeetingKeyword,
    resetKeywords,
    defaultWorkKeywords,
    defaultMeetingKeywords
  } = useKeywords();

  const {
    isProcessing,
    results,
    error,
    processFile,
    clearResults,
    clearError
  } = useFileProcessor(customWorkKeywords, customMeetingKeywords);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    clearResults();
    clearError();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    clearResults();
    clearError();
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleStartOver = () => {
    setSelectedFile(null);
    clearResults();
    clearError();
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSettingsClick={() => setShowSettings(!showSettings)}
        showSettings={showSettings}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <KeywordManager
              customWorkKeywords={customWorkKeywords}
              customMeetingKeywords={customMeetingKeywords}
              onAddWorkKeyword={addWorkKeyword}
              onAddMeetingKeyword={addMeetingKeyword}
              onRemoveWorkKeyword={removeWorkKeyword}
              onRemoveMeetingKeyword={removeMeetingKeyword}
              onResetKeywords={resetKeywords}
              defaultWorkKeywords={defaultWorkKeywords}
              defaultMeetingKeywords={defaultMeetingKeywords}
            />
          </div>
        )}

        {/* Main Content */}
        {!results ? (
          <div className="space-y-8">
            {/* File Upload */}
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onRemoveFile={handleRemoveFile}
              processing={isProcessing}
            />

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Processing Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearError}
                        className="text-red-800 border-red-300 hover:bg-red-50"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Process Button */}
            {selectedFile && (
              <div className="text-center">
                <Button
                  onClick={handleAnalyze}
                  loading={isProcessing}
                  disabled={isProcessing}
                  size="lg"
                  className="px-8"
                >
                  {isProcessing ? 'Analyzing Chat...' : 'Analyze Chat'}
                </Button>
                <p className="text-gray-600 mt-2">
                  This will extract work activities, meetings, and generate reports
                </p>
              </div>
            )}

            {/* Instructions */}
            {!selectedFile && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Get Started
                </h2>
                <div className="max-w-2xl mx-auto space-y-4 text-gray-600">
                  <p>
                    Transform your WhatsApp group chats into organized work reports. 
                    Perfect for tracking team progress, meetings, and project activities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <h3 className="font-medium text-gray-900">Upload</h3>
                      <p className="text-sm">Upload your WhatsApp .txt export</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <h3 className="font-medium text-gray-900">Analyze</h3>
                      <p className="text-sm">AI extracts work activities automatically</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                      <h3 className="font-medium text-gray-900">Download</h3>
                      <p className="text-sm">Get Excel reports and insights</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results Display */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              <Button onClick={handleStartOver} variant="outline">
                Analyze Another File
              </Button>
            </div>
            <ResultsDisplay results={results} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;