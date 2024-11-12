import { twMerge } from "tailwind-merge";

interface IButtonProps {
  onClick?: () => void;
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<IButtonProps> = ({
  onClick,
  type = "button",
  children,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        "flex items-center justify-center bg-primary rounded-lg hover:opacity-80 py-1 text-white",
        className,
      )}
    >
      {children}
    </button>
  );
};
