import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Section from "./ui/Section";
import { loadSettings } from "../lib/contentLoader";

export default function Hero() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        loadSettings().then(data => setContent(data?.hero));
    }, []);

    if (!content) return null;

    return (
        <Section className="min-h-screen flex items-center justify-center pt-32">
            <div className="text-center max-w-4xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
                >
                    {content.title} <br className="hidden md:block" />
                    <span className="text-primary">{content.titleHighlight}</span> {content.titleEnd}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
                >
                    {content.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                        {content.primaryButtonText}
                    </Button>
                    <Button variant="outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                        {content.secondaryButtonText}
                    </Button>
                </motion.div>
            </div>
        </Section>
    );
}
