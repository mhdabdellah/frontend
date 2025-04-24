import { IconType } from "react-icons";
import { Tooltip } from "@nextui-org/react";

interface IconButtonProps {
  icon: IconType;
  onClick: () => void;
  tooltip?: string;
  color?: string;
  size?: number;
  className?: string;
}

export const IconButton = ({
  icon: Icon,
  onClick,
  tooltip,
  color = "text-gray-600",
  size = 20,
  className = "",
}: IconButtonProps) => {
  const button = (
    <button
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${color} ${className}`}
    >
      <Icon size={size} />
    </button>
  );

  return tooltip ? (
    <Tooltip content={tooltip} placement="top">
      {button}
    </Tooltip>
  ) : (
    button
  );
};