import { useEffect, useState } from "react";
import Section from "./ui/Section";
import { loadSettings } from "../lib/contentLoader";

export default function About() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        loadSettings().then(data => setContent(data?.about));
    }, []);

    if (!content) return null;

    return (
        <Section id="about" className="bg-surface/50">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center md:text-left">{content.title}</h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                    {content.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </Section>
    );
}
