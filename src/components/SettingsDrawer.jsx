import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { X, Settings, Sparkles, RotateCcw } from "lucide-react";
import Button from "./ui/Button";
import KeywordManager from "./KeywordManager";

const SettingsDrawer = ({
  isOpen,
  onClose,
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
  const drawerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(contentRef.current.children, {
          x: 50,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        });
      }, contentRef);

      return () => ctx.revert();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute top-1/2 -right-32 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex-shrink-0 px-8 py-6 border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Settings className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                        Settings
                      </h2>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Customize keyword detection
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group hover:scale-110"
                  >
                    <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <div ref={contentRef} className="space-y-6">
                  {/* Info card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                    <div className="relative flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                      <div className="text-white">
                        <h3 className="font-bold text-lg mb-2">Smart Keyword Detection</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                          Add custom keywords to improve work activity and meeting detection.
                          The analyzer will use these keywords to identify relevant messages.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Keyword Manager */}
                  <KeywordManager
                    customWorkKeywords={customWorkKeywords}
                    customMeetingKeywords={customMeetingKeywords}
                    onAddWorkKeyword={onAddWorkKeyword}
                    onAddMeetingKeyword={onAddMeetingKeyword}
                    onRemoveWorkKeyword={onRemoveWorkKeyword}
                    onRemoveMeetingKeyword={onRemoveMeetingKeyword}
                    onResetKeywords={onResetKeywords}
                    defaultWorkKeywords={defaultWorkKeywords}
                    defaultMeetingKeywords={defaultMeetingKeywords}
                  />

                  {/* Reset Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <RotateCcw className="w-5 h-5 text-gray-600" />
                          Reset to Defaults
                        </h3>
                        <p className="text-sm text-gray-600">
                          Restore all keywords to their original default values
                        </p>
                      </div>
                      <Button
                        onClick={onResetKeywords}
                        variant="outline"
                        className="rounded-xl border-gray-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-8 py-6 border-t border-gray-200/50 bg-white/80 backdrop-blur-md">
                <Button
                  onClick={onClose}
                  className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Save & Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsDrawer;
