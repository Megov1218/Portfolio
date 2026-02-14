import Section from "./ui/Section";

const steps = [
    {
        number: "01",
        title: "Research",
        description: "Understanding the problem, user needs, and market landscape."
    },
    {
        number: "02",
        title: "Design",
        description: "Wireframing, prototyping, and creating the visual language."
    },
    {
        number: "03",
        title: "Build",
        description: "Clean, semantic code implementation with modern tools."
    },
    {
        number: "04",
        title: "Iterate",
        description: "Testing, gathering feedback, and refining the experience."
    }
];

export default function Process() {
    return (
        <Section id="process">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative group">
                        <span className="text-6xl font-bold text-white/5 absolute -top-4 -left-2 z-0 group-hover:text-primary/10 transition-colors">
                            {step.number}
                        </span>
                        <div className="relative z-10 pt-8">
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
