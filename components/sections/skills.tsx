"use client"

import * as React from "react"
import { Section } from "@/components/section"
import { skillCategories, type Skill, type SkillCategory } from "@/config/skills"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
    Code2,
    Terminal,
    Cpu,
    Globe,
    Layout,
    Database,
    Flame,
    Zap,
    Github,
    Figma,
    Command,
    Box,
    Triangle,
    ShieldCheck,
    Network,
    FileCode2,
    Palette
} from "lucide-react"

const iconMap: Record<string, any> = {
    react: Code2,
    nextjs: Globe,
    javascript: Terminal,
    typescript: Code2,
    html5: FileCode2,
    css3: Palette,
    tailwind: Layout,
    threejs: Box,
    nodejs: Cpu,
    express: Cpu,
    mongodb: Database,
    api: Network,
    auth: ShieldCheck,
    github: Github,
    vscode: Command,
    postman: Box,
    figma: Figma,
    vercel: Triangle,
    firebase: Flame
}

function SkillCapsule({ skill, categoryColor }: { skill: Skill, categoryColor: string }) {
    const Icon = iconMap[skill.icon] || Code2

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="group/capsule relative flex flex-col gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.1] overflow-hidden"
        >
            <div className="flex items-center gap-3 relative z-10">
                <motion.div
                    whileHover={{ rotate: 15 }}
                    className="p-2 rounded-lg bg-black/40 text-gray-400 group-hover/capsule:text-white transition-colors border border-white/[0.05]"
                >
                    <Icon size={16} />
                </motion.div>
                <span className="text-xs font-bold text-gray-400 group-hover/capsule:text-white uppercase tracking-wider transition-colors">
                    {skill.name}
                </span>
            </div>

            {/* Glowing Micro-Progress Indicator */}
            <div className="h-[2px] w-full bg-white/[0.05] rounded-full overflow-hidden mt-1">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "40%" }} // Subtle base line
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="h-full rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    style={{ backgroundColor: categoryColor, boxShadow: `0 0 10px ${categoryColor}` }}
                />
            </div>

            {/* Subtle Inner Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.02] opacity-0 group-hover/capsule:opacity-100 transition-opacity" />
        </motion.div>
    )
}

function TechCard({ category, idx }: { category: SkillCategory, idx: number }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative bg-[#0A0A0B]/80 backdrop-blur-3xl border border-white/[0.08] rounded-[3rem] p-10 shadow-2xl overflow-hidden transition-all duration-300"
        >
            {/* Interactive Glow Background */}
            <div
                className="absolute inset-x-0 top-0 h-1 transition-transform duration-700 opacity-30 group-hover:scale-x-110"
                style={{ backgroundColor: category.color, boxShadow: `0 0 20px ${category.color}` }}
            />

            <div className="relative z-20" style={{ transform: "translateZ(50px)" }}>
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-2 h-10 rounded-full" style={{ backgroundColor: category.color }} />
                    <h3 className="text-3xl font-black text-white tracking-tighter">
                        {category.title}
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {category.skills.map((skill: any) => (
                        <SkillCapsule key={skill.name} skill={skill} categoryColor={category.color} />
                    ))}
                </div>
            </div>

            {/* Background Light Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div
                className="absolute -inset-24 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[80px] pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${category.color}, transparent)` }}
            />
        </motion.div>
    )
}

export function SkillsSection() {
    return (
        <Section
            id="skills"
            isFullHeight={false}
            centerContent={false}
            className="w-full relative px-6 md:px-20 lg:px-32 bg-black pt-4 pb-32 overflow-hidden"
        >
            {/* Subtle Animated Particle Background Dots */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 10 + (i % 5) * 2,
                            repeat: Infinity,
                            delay: (i % 10)
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${(i * 7) % 100}%`,
                            top: `${(i * 13) % 100}%`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl w-full mx-auto relative z-10">
                {/* Refined Left-Aligned Header */}
                <div className="mb-20 space-y-4 text-left">
                    <div className="relative inline-block">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl lg:text-5xl font-black tracking-tighter"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                                Skills & Technologies
                            </span>
                        </motion.h2>
                        {/* Glowing Underline Alignment */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 to-transparent blur-[1px]"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-base md:text-lg max-w-2xl font-medium"
                    >
                        Building scalable and interactive digital experiences.
                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 perspective-[2000px]">
                    {skillCategories.map((category, idx) => (
                        <TechCard key={category.title} category={category} idx={idx} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 15s ease infinite;
                }
            `}</style>
        </Section>
    )
}
