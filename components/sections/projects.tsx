"use client"

import { projects } from "@/config/projects"
import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"

export function ProjectsSection() {
    return (
        <Section id="projects" isFullHeight={false} className="w-full relative pt-32 md:pt-40 pb-48 px-8 md:px-20 lg:px-32 bg-black">
            {/* Cinematic Backdrop */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00A8E1]/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black" />
            </div>

            <div className="relative z-10 w-full">
                <div className="flex flex-col items-start gap-6 mb-16">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                            Projects
                        </h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-[#00A8E1] to-transparent rounded-full" />
                    </div>
                    <p className="text-lg text-gray-400 md:text-xl font-medium max-w-2xl">
                        A curated collection of digital products and technical experiments.
                    </p>
                </div>

                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </Section>
    )
}
