import { useEffect, useState } from "react";
import Section from "./ui/Section";
import { Quote } from "lucide-react";
import { loadTestimonials } from "../lib/contentLoader";

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        loadTestimonials().then(setTestimonials);
    }, []);

    return (
        <Section id="testimonials">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Testimonials</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-surface/30 p-8 rounded-xl border border-white/5 relative">
                        <Quote className="text-primary/20 w-10 h-10 mb-4" />
                        <p className="text-gray-300 mb-6 italic">"{t.quote}"</p>
                        <div>
                            <p className="font-bold">{t.name}</p>
                            <p className="text-sm text-gray-500">{t.role}{t.company ? ` at ${t.company}` : ''}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
