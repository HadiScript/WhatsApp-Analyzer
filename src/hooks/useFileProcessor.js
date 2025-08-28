import { useState, useCallback } from "react";
import { WhatsAppParser } from "../utils/whatsappParser";

export const useFileProcessor = (
  customWorkKeywords = [],
  customMeetingKeywords = []
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const processFile = useCallback(
    async (file) => {
      if (!file) {
        setError("No file provided");
        return;
      }

      if (!file.name.endsWith(".txt")) {
        setError("Please upload a .txt file");
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const text = await file.text();
        const parser = new WhatsAppParser(
          customWorkKeywords,
          customMeetingKeywords
        );
        const parseResults = parser.parseChat(text);

        if (parseResults.activities.length === 0) {
          setError(
            "No work-related activities found in the chat. Try adding custom keywords or check the file format."
          );
        } else {
          setResults(parseResults);
        }
      } catch (err) {
        console.error("Error processing file:", err);
        setError(
          "Error processing file. Please check the file format and try again."
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [customWorkKeywords, customMeetingKeywords]
  );

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isProcessing,
    results,
    error,
    processFile,
    clearResults,
    clearError,
  };
};
