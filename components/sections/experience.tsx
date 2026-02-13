"use client"

import { experience } from "@/config/experience"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/section"
import { useRecruiterMode } from "@/context/recruiter-mode"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase } from "lucide-react"

export function ExperienceSection() {
    return (
        <Section id="experience" isFullHeight={false} centerContent={false} className="w-full pt-8 pb-12 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 px-8 md:px-20 lg:px-32">
            <h1 className="mb-12 text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl text-white">
                Experience
            </h1>

            <div className="">
                <AnimatePresence mode="wait">
                    <motion.div
                        key="cinematic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative"
                    >
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00A8E1] via-[#00A8E1]/50 to-transparent hidden md:block" />

                        <div className="flex flex-col gap-12">
                            {experience.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="relative flex gap-8 items-start group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-black border-4 border-[#00A8E1] z-10 group-hover:scale-110 transition-transform">
                                        <Briefcase className="h-6 w-6 text-[#00A8E1]" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10 hover:border-[#00A8E1]/50 transition-all backdrop-blur-sm">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                            <span className="text-sm font-medium text-[#00A8E1] bg-[#00A8E1]/10 px-3 py-1 rounded-full whitespace-nowrap w-fit">
                                                {item.date}
                                            </span>
                                        </div>
                                        <p className="text-lg text-gray-400 mb-4">
                                            {item.company} <span className="text-gray-600">•</span> {item.location}
                                        </p>
                                        <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Section>
    )
}
