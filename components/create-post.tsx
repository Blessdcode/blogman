"use client";

import React, { useState } from "react";
import RichTextEditor from "./rich-text-editor";
import { Button } from "./ui/button";

const CreatePost = () => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-start sm:my-16 my-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 space-y-8">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="px-4 py-2 border border-slate-300 rounded-md outline-none"
        />

        {/* <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`h-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${
            imageUrl && "pointer-events-none"
          }`}
          onUpload={handleImageUpload}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>

          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              className="absolute object-cover inset-0"
              alt={title}
            />
          )}
        </CldUploadButton>

        {publicId && (
          <button
            onClick={removeImage}
            className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4">
            Remove Image
          </button>
        )}

        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-md border appearance-none">
          <option value="">Select A Category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.catName}>
                {category.catName}
              </option>
            ))}
        </select> */}

        <RichTextEditor editorContent={content} onChange={setContent} />
        <Button
          className="bg-transparent border border-white text-white hover:bg-white hover:text-darkBlue"
          type="submit">
          Create Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;