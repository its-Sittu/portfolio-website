"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { achievements } from "@/config/achievements"
import { Trophy, Code, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const iconMap = {
    trophy: Trophy,
    code: Code,
    book: BookOpen,
}

export function AchievementsSection() {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null)

    return (
        <Section id="achievements" isFullHeight={false} centerContent={false} className="w-full pt-4 pb-12 md:pt-6 md:pb-24 lg:pt-8 lg:pb-32 px-8 md:px-20 lg:px-32 relative overflow-hidden">
            {/* Cinematic Background Reveal - Section wide */}
            <AnimatePresence>
                {hoveredImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-x-0 -inset-y-20 z-0 pointer-events-none"
                    >
                        <img
                            src={hoveredImage}
                            alt=""
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Subtle Vignette for edge blending only */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/80" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10">
                <h1 className="mb-12 text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl text-white">
                    Achievements
                </h1>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00A8E1] via-[#00A8E1]/50 to-transparent hidden md:block" />

                    <div className="flex flex-col gap-12">
                        {achievements.map((achievement, index) => {
                            const Icon = iconMap[achievement.icon as keyof typeof iconMap]

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    onMouseEnter={() => achievement.image && setHoveredImage(achievement.image)}
                                    onMouseLeave={() => setHoveredImage(null)}
                                    className="relative flex gap-8 items-start group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-black border-4 border-[#00A8E1] z-10 group-hover:scale-110 transition-transform">
                                        <Icon className="h-6 w-6 text-[#00A8E1]" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-[#00A8E1]/50 transition-all duration-500 backdrop-blur-sm relative group/card">
                                        <div className="relative z-10">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                                                <h3 className="text-2xl font-bold text-white group-hover/card:text-[#00A8E1] transition-colors">
                                                    {achievement.title}
                                                </h3>
                                                <span className="text-sm font-medium text-[#00A8E1] bg-[#00A8E1]/10 px-3 py-1 rounded-full whitespace-nowrap w-fit shadow-[0_0_10px_rgba(0,168,225,0.1)]">
                                                    {achievement.date}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed group-hover/card:text-white transition-colors">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Section>
    )
}
