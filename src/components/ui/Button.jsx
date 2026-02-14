import { cn } from "../../lib/utils";

export default function Button({ children, variant = "primary", className, ...props }) {
    const variants = {
        primary: "bg-primary text-black hover:bg-secondary",
        outline: "border border-primary text-primary hover:bg-primary/10",
        ghost: "text-gray-300 hover:text-white hover:bg-white/5",
    };

    return (
        <button
            className={cn(
                "px-6 py-3 rounded-md font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
