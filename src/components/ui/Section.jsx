import { cn } from "../../lib/utils";

export default function Section({ children, className, id }) {
    return (
        <section id={id} className={cn("py-24 px-6", className)}>
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </section>
    );
}
