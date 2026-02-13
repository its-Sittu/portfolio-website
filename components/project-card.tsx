"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Play, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export interface Project {
    title: string
    description: string
    techStack: string[]
    image?: string
    github?: string
    demo?: string
}

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.03,
                zIndex: 20,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col w-full min-h-[480px] rounded-[20px] bg-[#0a0a0a] border border-white/5 shadow-2xl"
        >
            {/* Top 65%: Project Image Area */}
            <div className="relative h-[280px] w-full overflow-hidden rounded-t-[20px]">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black z-0" />

                {project.image ? (
                    <motion.div
                        variants={{
                            hover: { scale: 1.1 }
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-70 transition-opacity group-hover:opacity-50"
                        />
                    </motion.div>
                ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-900/50">
                        <span className="text-6xl font-black text-white/5 tracking-tighter select-none">
                            {project.title.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                )}

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

                {/* Inner Shadow Glow */}
                <div className="absolute inset-0 shadow-[inner_0_0_40px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />
            </div>

            {/* Bottom: Content Area */}
            <div className="relative flex-1 w-full p-6 flex flex-col justify-between bg-[#0a0a0a] z-20 rounded-b-[20px]">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-white tracking-tight group-hover:text-[#00A8E1] transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-400 font-semibold group-hover:text-gray-300 transition-colors duration-300">
                        {project.description}
                    </p>
                </div>

                {/* Interactive Layer (Tags & Buttons) */}
                <div className="space-y-4">
                    {/* Tech Tags - Animated Upward */}
                    <div className="flex flex-wrap gap-1.5 transform group-hover:-translate-y-1 transition-transform duration-500">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-[#00A8E1]/40 hover:text-[#00A8E1] transition-all"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex gap-3">
                        {project.demo && (
                            <Link href={project.demo} target="_blank" rel="noreferrer" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-black text-xs transition-colors hover:bg-[#00A8E1] hover:text-white"
                                >
                                    <Play size={14} fill="currentColor" /> DEMO
                                </motion.button>
                            </Link>
                        )}
                        {project.github && (
                            <Link href={project.github} target="_blank" rel="noreferrer" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white font-black text-xs transition-colors hover:border-[#00A8E1] hover:text-[#00A8E1]"
                                >
                                    <Github size={14} /> CODE
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
