import * as React from "react"
import * as LucideIcons from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  iconName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconName, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const currentType = isPassword ? (showPassword ? "text" : "password") : type;
    const LeftIcon = iconName
      ? (LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType)
      : null;

    return (
      <div className="relative w-full flex items-center">
        {LeftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-gray-400">
            <LeftIcon className="h-4 w-4" />
          </div>
        )}

        <input
          type={currentType}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            iconName ? "pl-10" : "pl-3",
            isPassword ? "pr-10" : "pr-3",
            className
          )}
          ref={ref}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 flex items-center text-brand-base hover:text-foreground transition-colors focus:outline-none"
          >
            {!showPassword ? (
              <LucideIcons.EyeClosedIcon className="h-4 w-4" />
            ) : (
              <LucideIcons.EyeIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }