import { useState, useCallback } from "react";
import {
  DEFAULT_WORK_KEYWORDS,
  DEFAULT_MEETING_KEYWORDS,
} from "../utils/constants";

export const useKeywords = () => {
  const [customWorkKeywords, setCustomWorkKeywords] = useState([]);
  const [customMeetingKeywords, setCustomMeetingKeywords] = useState([]);

  const addWorkKeyword = useCallback(
    (keyword) => {
      const trimmed = keyword.trim().toLowerCase();
      if (trimmed && !customWorkKeywords.includes(trimmed)) {
        setCustomWorkKeywords((prev) => [...prev, trimmed]);
        return true;
      }
      return false;
    },
    [customWorkKeywords]
  );

  const addMeetingKeyword = useCallback(
    (keyword) => {
      const trimmed = keyword.trim().toLowerCase();
      if (trimmed && !customMeetingKeywords.includes(trimmed)) {
        setCustomMeetingKeywords((prev) => [...prev, trimmed]);
        return true;
      }
      return false;
    },
    [customMeetingKeywords]
  );

  const removeWorkKeyword = useCallback((keyword) => {
    setCustomWorkKeywords((prev) => prev.filter((k) => k !== keyword));
  }, []);

  const removeMeetingKeyword = useCallback((keyword) => {
    setCustomMeetingKeywords((prev) => prev.filter((k) => k !== keyword));
  }, []);

  const resetKeywords = useCallback(() => {
    setCustomWorkKeywords([]);
    setCustomMeetingKeywords([]);
  }, []);

  const getAllWorkKeywords = useCallback(() => {
    return [...DEFAULT_WORK_KEYWORDS, ...customWorkKeywords];
  }, [customWorkKeywords]);

  const getAllMeetingKeywords = useCallback(() => {
    return [...DEFAULT_MEETING_KEYWORDS, ...customMeetingKeywords];
  }, [customMeetingKeywords]);

  return {
    customWorkKeywords,
    customMeetingKeywords,
    addWorkKeyword,
    addMeetingKeyword,
    removeWorkKeyword,
    removeMeetingKeyword,
    resetKeywords,
    getAllWorkKeywords,
    getAllMeetingKeywords,
    defaultWorkKeywords: DEFAULT_WORK_KEYWORDS,
    defaultMeetingKeywords: DEFAULT_MEETING_KEYWORDS,
  };
};
