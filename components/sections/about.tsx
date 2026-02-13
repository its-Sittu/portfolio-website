"use client"

import * as React from "react"
import { Section } from "@/components/section"
import { motion } from "framer-motion"
import {
    Briefcase,
    MapPin,
    Zap
} from "lucide-react"
import Image from "next/image"

export function AboutSection() {
    return (
        <Section
            id="about"
            isFullHeight={false}
            centerContent={false}
            className="relative w-full bg-black overflow-hidden pt-12 pb-32 px-6 md:px-20 lg:px-32"
        >
            {/* Cinematic Background Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
                    <Image
                        src="/manit-profile.jpg"
                        alt="Background Cinematic"
                        fill
                        className="object-cover grayscale"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-20 w-full">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-center">

                    {/* Left Side: Cinematic Narrative */}
                    <div className="flex-[2] space-y-12">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 text-[#00A8E1] font-black tracking-[0.3em] text-xl md:text-3xl uppercase"
                            >
                                <div className="w-2 h-10 bg-[#00A8E1] rounded-full" />
                                About Me
                            </motion.div>

                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                                Engineering <br />
                                <span className="text-gray-500">Scalable Web Solutions</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed font-semibold">
                            <p>
                                I am <span className="text-white">Sittu Kumar Singh</span>, a Full-Stack Developer specializing in the high-fidelity architecture of modern web systems.
                            </p>
                            <p>
                                Driven by technical precision and a commitment to scalability, I build digital products that merge complex backend logic with cinematic frontend experiences.
                            </p>
                        </div>

                        {/* Refined Profile Summary Metadata Grid */}
                        <div className="relative pt-10 border-t border-white/10">
                            {/* Vertical Column Divider */}
                            <div className="absolute left-1/2 top-10 bottom-0 w-[1px] bg-white/5 hidden md:block" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                                {[
                                    { label: "Role", value: "Full-Stack Engineer", icon: <Briefcase size={12} className="text-[#8a8a8a]" /> },
                                    { label: "Location", value: "Bhopal, India", icon: <MapPin size={12} className="text-[#8a8a8a]" /> },
                                    { label: "Specialization", value: "Scalable Systems", icon: <Zap size={12} className="text-[#8a8a8a]" /> },
                                    { label: "Philosophy", value: "Performance-First Approach", icon: <Zap size={12} className="text-[#8a8a8a]" /> }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group relative py-4 border-b border-white/5 last:border-0 md:[&:nth-last-child(-n+2)]:border-0"
                                    >
                                        <div className="flex items-center gap-2 mb-1.5">
                                            {item.icon}
                                            <span className="text-[#8a8a8a] font-bold uppercase tracking-[2px] text-[10px] leading-none">
                                                {item.label}
                                            </span>
                                        </div>
                                        <div className="relative inline-block">
                                            <span className="text-white font-bold text-base tracking-wide transition-colors duration-300 group-hover:text-white/100 text-white/90">
                                                {item.value}
                                            </span>
                                            {/* Animated Underline */}
                                            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00A8E1] transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100 shadow-[0_0_8px_#00A8E1]" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Immersive Portrait Pillar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 hidden lg:flex justify-end relative h-[500px]"
                    >
                        <div className="relative w-full h-full max-w-[350px]">
                            {/* Accent Glow */}
                            <div className="absolute -inset-10 bg-[#00A8E1]/10 blur-[80px] rounded-full opacity-30 pointer-events-none" />

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                            >
                                <Image
                                    src="/manit-profile.jpg"
                                    alt="Sittu Kumar Singh Portfolio"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Prime Style Inner Vignette */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}
