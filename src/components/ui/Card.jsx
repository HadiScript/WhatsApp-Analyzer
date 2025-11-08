import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  title,
  subtitle,
  hover = true,
  gradient = false
}) => {
  const baseClasses = gradient
    ? "bg-gradient-to-br from-white via-blue-50/30 to-white backdrop-blur-sm border-2 border-gray-200/50 shadow-xl"
    : "bg-white/90 backdrop-blur-sm border border-gray-200/60 shadow-lg hover:shadow-xl";

  const CardWrapper = hover ? motion.div : "div";
  const cardProps = hover ? {
    whileHover: { scale: 1.01, y: -2 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <CardWrapper
      className={`${baseClasses} rounded-2xl transition-all duration-300 ${className}`}
      {...cardProps}
    >
      {(title || subtitle) && (
        <div className="px-6 py-5 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/30">
          {title && (
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1.5 font-medium">{subtitle}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </CardWrapper>
  );
};

export default Card;
