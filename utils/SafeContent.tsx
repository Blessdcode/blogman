"use client";

import React from "react";
import DOMPurify from "dompurify";

type SafeContentProps = {
  content: string;
};

const SafeContent: React.FC<SafeContentProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content || "");

  return (
    <div className="text-gray-700 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}>
    </div>
  );
};

export default SafeContent;
