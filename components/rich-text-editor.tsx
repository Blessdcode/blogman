"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Blockquote from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";

import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiListOrdered2,
} from "react-icons/ri";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { BsTypeUnderline } from "react-icons/bs";
import { IoListOutline } from "react-icons/io5";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuQuote,
} from "react-icons/lu";
import { MdImage } from "react-icons/md";

type EditorProps = {
  editorContent: string;
  onChange: (content: string) => void;
};

const RichTextEditor = ({ editorContent, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
      Blockquote,
      Image,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      ListItem,
      BulletList,
      OrderedList,
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "shadow border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 focus:outline-none focus:shadow-outline",
      },
    },
  });

  if (!editor) return <div>Loading editor...</div>;

  const handleImageUpload = async () => {
    const url = prompt("Enter the image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const toolbarButtons = [
    {
      icon: <RiBold className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <RiItalic className="size-5" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <LuHeading1 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      disabled: !editor.can().chain().focus().run(),
    },
    {
      icon: <LuHeading2 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      disabled: !editor.can().chain().focus().run(),
    },
    {
      icon: <LuHeading3 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      disabled: !editor.can().chain().focus().run(),
    },
    {
      icon: <LuHeading4 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive("heading", { level: 4 }),
      disabled: !editor.can().chain().focus().run(),
    },
    {
      icon: <RiStrikethrough className="size-5" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <RiCodeSSlashLine className="size-5" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: <LuQuote className="size-5" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      disabled: !editor.can().chain().focus().toggleBlockquote().run(),
    },
    {
      icon: <MdImage className="size-5" />,
      onClick: handleImageUpload,
      isActive: false,
    },
    {
      icon: <IoListOutline className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <RiListOrdered2 className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <AiOutlineUndo className="size-5" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: false,
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <AiOutlineRedo className="size-5" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: false,
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <div className="flex flex-col justify-stretch min-h-[200px] border rounded">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            disabled={button.disabled}
            className={`p-2 rounded ${
              button.isActive
                ? "bg-gray-200 text-black"
                : "hover:bg-gray-300 text-gray-600"
            } ${button.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            title={button.isActive ? "Active" : "Inactive"}>
            {button.icon}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
