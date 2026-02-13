export type Project = {
    title: string
    description: string
    techStack: string[]
    image?: string
    github?: string
    demo?: string
}

export const projects: Project[] = [
    {
        title: "Portfolio Website",
        description: "My personal developer portfolio built with Next.js and Tailwind CSS.",
        techStack: ["Next.js", "Tailwind CSS", "TypeScript", "shadcn/ui"],
        github: "https://github.com/its-Sittu/portfolio",
        demo: "https://its-sittu.vercel.app",
    },
    {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with cart and checkout functionality.",
        techStack: ["React", "Node.js", "MongoDB", "Redux"],
        github: "https://github.com/its-Sittu/ecommerce",
    },
    {
        title: "Task Management App",
        description: "A collaborative task management tool with real-time updates.",
        techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
        demo: "https://task-app.com",
    },
]
