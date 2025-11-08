import React, { useEffect, useRef } from "react";
import { Settings, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import Button from "./ui/Button";

const Header = ({ onSettingsClick, showSettings }) => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(subtitleRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(iconRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "back.out(1.7)",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative bg-gradient-to-r from-white via-blue-50/30 to-white backdrop-blur-sm border-b border-gray-200/50 shadow-sm z-10"
    >
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              ref={iconRef}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform hover:scale-110 transition-transform duration-300"
            >
              <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1
                ref={titleRef}
                className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent"
              >
                WhatsApp Chat Analyzer
              </h1>
              <p
                ref={subtitleRef}
                className="text-gray-600 mt-1 text-lg font-medium"
              >
                Transform conversations into actionable insights
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onSettingsClick}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              showSettings
                ? "bg-blue-100 text-blue-600 shadow-md"
                : "hover:bg-gray-100"
            }`}
          >
            <Settings
              className="w-6 h-6"
              style={{
                transform: showSettings ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
