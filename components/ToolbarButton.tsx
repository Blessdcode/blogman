import React from "react";

type ToolbarButtonProps = {
  editor: unknown;
  action: () => void;
  isActive: boolean;
  label: string;
  children: React.ReactNode;
};

const ToolbarButton = ({
  action,
  isActive,
  label,
  children,
}: ToolbarButtonProps) => {
  return (
    <button
      type="button"
      onClick={action}
      aria-label={label}
      className={`p-2 rounded ${
        isActive ? "bg-white text-darkBlue" : "hover:bg-white hover:text-darkBlue"
      }`}
      title={label}>
      {children}
    </button>
  );
};

export default ToolbarButton;
