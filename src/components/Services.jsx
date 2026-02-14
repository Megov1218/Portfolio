import { useEffect, useState } from "react";
import Section from "./ui/Section";
import { Palette, Code, Layers, Monitor, Smartphone, Database, Cloud, Lock } from "lucide-react";
import { loadServices } from "../lib/contentLoader";

const iconMap = {
    Palette,
    Code,
    Layers,
    Monitor,
    Smartphone,
    Database,
    Cloud,
    Lock
};

export default function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        loadServices().then(setServices);
    }, []);

    return (
        <Section id="services">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Services</h2>
            <div className="grid md:grid-cols-2 gap-10">
                {services.map((service, index) => {
                    const IconComponent = iconMap[service.icon] || Code;
                    return (
                        <div key={index} className="p-8 rounded-2xl bg-surface border border-white/5 hover:-translate-y-1 transition-transform duration-300">
                            <IconComponent className="w-8 h-8 text-primary mb-4" />
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <ul className="space-y-2">
                                {service.items.map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-300">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
