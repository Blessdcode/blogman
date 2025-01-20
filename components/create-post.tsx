"use client";

import React, { useState } from "react";
import RichTextEditor from "./rich-text-editor";

const CreatePost = () => {
    const [content, setContent] = useState<string>("");
  return (
    <div>
      <RichTextEditor editorContent={content} onChange={setContent} />
    </div>
  );
};

export default CreatePost;
