import { useEffect, useState } from "react";
import Section from "./ui/Section";
import frontMatter from "front-matter";
import { Github, ExternalLink } from "lucide-react";
import { loadProjects } from "../lib/contentLoader";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadProjects().then(setProjects);
    }, []);

    return (
        <Section id="projects">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-10">
                {projects.map((project) => (
                    <div
                        key={project.slug}
                        className="group rounded-xl overflow-hidden bg-surface border border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
                    >
                        {project.thumbnail && (
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary rounded-full text-black hover:scale-110 transition-transform">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform">
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 mb-6 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech && project.tech.map((tech) => (
                                    <span key={tech} className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-gray-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
