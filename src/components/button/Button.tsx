import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "icon";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  isLoading?: boolean;
}

const baseStyles =
  "flex items-center gap-2 font-medium transition-colors rounded-md";

// const variants = {
//   primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
//   secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
//   danger: "bg-red-50 text-red-500 hover:bg-red-100",
//   icon: "p-2 rounded-full hover:bg-gray-100",
// };

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  isLoading,
  children,
  className = "",
  ...props
}) => {
  // const variantStyle = variants[variant];
  const sizeStyle = variant === "icon" ? "" : sizes[size];
  const IconStyle = variant === "icon" ? "w-5 h-5" : "w-4 h-4";

  if (variant === "primary") {
    return (
      <button
        className={`${baseStyles} bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 ${sizeStyle} ${className}`}
        disabled={isLoading}
        {...props}
      >
        {Icon && <Icon className={IconStyle} />}
        {children}
      </button>
    );
  }
  if (variant === "secondary") {
    return (
      <button
        className={`${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200 ${sizeStyle} ${className}`}
        disabled={isLoading}
        {...props}
      >
        {Icon && <Icon className={IconStyle} />}
        {children}
      </button>
    );
  }
  if (variant === "danger") {
    return (
      <button
        className={`${baseStyles} bg-red-50 text-red-500 hover:bg-red-100 ${sizeStyle} ${className}`}
        disabled={isLoading}
        {...props}
      >
        {Icon && <Icon className={IconStyle} />}
        {children}
      </button>
    );
  }
  if (variant === "icon") {
    return (
      <button
        className={`${baseStyles} p-2 rounded-full hover:bg-gray-100 ${sizeStyle} ${className}`}
        disabled={isLoading}
        {...props}
      >
        {Icon && <Icon className={IconStyle} />}
        {children}
      </button>
    );
  }
};
