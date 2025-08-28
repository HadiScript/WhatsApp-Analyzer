import React, { useState } from "react";
import { Plus, X, RotateCcw } from "lucide-react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Card from "./ui/Card";

const KeywordManager = ({
  customWorkKeywords,
  customMeetingKeywords,
  onAddWorkKeyword,
  onAddMeetingKeyword,
  onRemoveWorkKeyword,
  onRemoveMeetingKeyword,
  onResetKeywords,
  defaultWorkKeywords,
  defaultMeetingKeywords,
}) => {
  const [newWorkKeyword, setNewWorkKeyword] = useState("");
  const [newMeetingKeyword, setNewMeetingKeyword] = useState("");

  const handleAddWorkKeyword = () => {
    if (onAddWorkKeyword(newWorkKeyword)) {
      setNewWorkKeyword("");
    }
  };

  const handleAddMeetingKeyword = () => {
    if (onAddMeetingKeyword(newMeetingKeyword)) {
      setNewMeetingKeyword("");
    }
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === "Enter") {
      handler();
    }
  };

  return (
    <Card
      title="Keyword Settings"
      subtitle="Customize keywords to improve detection accuracy"
    >
      <div className="space-y-8">
        {/* Default Keywords Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Default Keywords Included
          </h4>
          <p className="text-sm text-blue-700 mb-3">
            We've included{" "}
            {defaultWorkKeywords.length + defaultMeetingKeywords.length} common
            work and meeting keywords. Add your own to improve detection for
            your specific team.
          </p>
          <details className="text-sm">
            <summary className="cursor-pointer text-blue-800 font-medium">
              View default keywords (
              {defaultWorkKeywords.length + defaultMeetingKeywords.length})
            </summary>
            <div className="mt-3 space-y-2">
              <div>
                <p className="font-medium text-blue-900">Work Keywords:</p>
                <p className="text-blue-700">
                  {defaultWorkKeywords.slice(0, 10).join(", ")}...
                </p>
              </div>
              <div>
                <p className="font-medium text-blue-900">Meeting Keywords:</p>
                <p className="text-blue-700">
                  {defaultMeetingKeywords.join(", ")}
                </p>
              </div>
            </div>
          </details>
        </div>

        {/* Work Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Work Keywords
          </label>
          <div className="flex gap-2 mb-4">
            <Input
              value={newWorkKeyword}
              onChange={(e) => setNewWorkKeyword(e.target.value)}
              placeholder="e.g., sprint, standup, devops..."
              onKeyPress={(e) => handleKeyPress(e, handleAddWorkKeyword)}
              className="flex-1"
            />
            <Button
              onClick={handleAddWorkKeyword}
              disabled={!newWorkKeyword.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {customWorkKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {keyword}
                <button
                  onClick={() => onRemoveWorkKeyword(keyword)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {customWorkKeywords.length === 0 && (
              <p className="text-gray-500 text-sm">
                No custom work keywords added
              </p>
            )}
          </div>
        </div>

        {/* Meeting Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Meeting Keywords
          </label>
          <div className="flex gap-2 mb-4">
            <Input
              value={newMeetingKeyword}
              onChange={(e) => setNewMeetingKeyword(e.target.value)}
              placeholder="e.g., webinar, workshop, catchup..."
              onKeyPress={(e) => handleKeyPress(e, handleAddMeetingKeyword)}
              className="flex-1"
            />
            <Button
              onClick={handleAddMeetingKeyword}
              disabled={!newMeetingKeyword.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {customMeetingKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {keyword}
                <button
                  onClick={() => onRemoveMeetingKeyword(keyword)}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {customMeetingKeywords.length === 0 && (
              <p className="text-gray-500 text-sm">
                No custom meeting keywords added
              </p>
            )}
          </div>
        </div>

        {/* Reset Button */}
        {(customWorkKeywords.length > 0 ||
          customMeetingKeywords.length > 0) && (
          <div className="pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onResetKeywords}
              className="text-gray-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default KeywordManager;
