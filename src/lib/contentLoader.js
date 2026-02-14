import frontMatter from "front-matter";

// Load site settings
export async function loadSettings() {
  try {
    const settings = await import("../content/site/settings.json");
    return settings.default;
  } catch (error) {
    console.error("Error loading settings:", error);
    return null;
  }
}

// Load all services
export async function loadServices() {
  try {
    const modules = import.meta.glob("../content/services/*.json");
    const services = await Promise.all(
      Object.entries(modules).map(async ([path, loader]) => {
        const data = await loader();
        return {
          ...data.default,
          slug: path.split("/").pop().replace(".json", ""),
        };
      })
    );
    return services.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error("Error loading services:", error);
    return [];
  }
}

// Load all testimonials
export async function loadTestimonials() {
  try {
    const modules = import.meta.glob("../content/testimonials/*.json");
    const testimonials = await Promise.all(
      Object.entries(modules).map(async ([path, loader]) => {
        const data = await loader();
        return {
          ...data.default,
          slug: path.split("/").pop().replace(".json", ""),
        };
      })
    );
    return testimonials.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error("Error loading testimonials:", error);
    return [];
  }
}

// Load skills
export async function loadSkills() {
  try {
    const skills = await import("../content/skills/skills.json");
    return skills.default;
  } catch (error) {
    console.error("Error loading skills:", error);
    return { categories: [] };
  }
}

// Load all projects
export async function loadProjects() {
  try {
    const modules = import.meta.glob("../content/projects/*.md", {
      query: "?raw",
      import: "default",
    });
    const projects = await Promise.all(
      Object.entries(modules).map(async ([path, loader]) => {
        const markdown = await loader();
        const { attributes } = frontMatter(markdown);
        return {
          ...attributes,
          slug: path.split("/").pop().replace(".md", ""),
        };
      })
    );
    return projects.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}
