import { useEffect, useState } from "react";
import Section from "./ui/Section";
import { loadSkills } from "../lib/contentLoader";

export default function Skills() {
    const [skillsData, setSkillsData] = useState({ categories: [] });

    useEffect(() => {
        loadSkills().then(setSkillsData);
    }, []);

    return (
        <Section id="skills" className="bg-surface/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills</h2>
            <div className="grid md:grid-cols-3 gap-10">
                {skillsData.categories.map((category, index) => (
                    <div key={index}>
                        <h3 className="text-xl font-bold mb-6 text-primary">{category.title}</h3>
                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 bg-background border border-white/10 rounded-md text-sm text-gray-300"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
