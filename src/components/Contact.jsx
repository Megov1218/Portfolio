import { useEffect, useState } from "react";
import Section from "./ui/Section";
import Button from "./ui/Button";
import { loadSettings } from "../lib/contentLoader";

export default function Contact() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        loadSettings().then(data => setContent(data?.contact));
    }, []);

    if (!content) return null;

    return (
        <Section id="contact" className="bg-surface/30">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
                <p className="text-gray-400">
                    {content.subtitle}
                </p>
            </div>

            <form className="max-w-xl mx-auto space-y-6" name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full bg-background border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full bg-background border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        className="w-full bg-background border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    ></textarea>
                </div>

                <div className="pt-2">
                    <Button type="submit" className="w-full md:w-auto">
                        Send Message
                    </Button>
                </div>
            </form>
        </Section>
    );
}
