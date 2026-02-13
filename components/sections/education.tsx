"use client"

import * as React from "react"
import { Section } from "@/components/section"
import { educationData } from "@/config/education"
import { motion, useScroll, useTransform } from "framer-motion"
import {
    GraduationCap,
    BookOpen,
    Building2,
    ChevronRight,
    Play
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, any> = {
    graduation: GraduationCap,
    book: BookOpen,
    building: Building2
}

function EducationCard({ item, index }: { item: typeof educationData[0], index: number }) {
    const Icon = iconMap[item.icon] || GraduationCap

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, translateY: -10 }}
            className="group relative w-full md:min-w-[400px] aspect-[16/11] md:aspect-[16/9] rounded-2xl md:rounded-[2rem] bg-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-3xl transition-all duration-500 hover:border-[#00A8E1]/30 shadow-2xl"
        >
            {/* Background Image Placeholder/Gradient - Cinematic base depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#0a0a0a] to-black opacity-90 z-0" />

            {/* Background Image - Cinematic hover reveal */}
            {item.image && (
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl md:rounded-[2rem]">
                    <motion.img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover opacity-0 group-hover:opacity-30 transition-opacity duration-1000 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
                    />
                    {/* Subtle vignette to focus on text */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
            )}

            {/* Accent Glow Layer */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(circle_at_30%_50%,rgba(0,168,225,0.15),transparent_70%)] z-10" />

            {/* Content Container */}
            <div className="absolute inset-0 p-8 pt-14 pb-14 flex flex-col justify-center space-y-6 z-20">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#00A8E1] group-hover:bg-[#00A8E1] group-hover:text-white transition-all duration-500">
                        <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight group-hover:text-[#00A8E1] transition-colors">
                            {item.degree}
                        </h4>
                        <p className="text-xs font-bold text-[#00A8E1] uppercase tracking-[0.2em]">{item.specialization}</p>
                    </div>
                </div>

                <div className="space-y-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <div className="flex flex-col text-sm">
                        <span className="text-white font-bold">{item.institution}</span>
                        <span className="text-gray-500 font-medium">{item.period}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>

            {/* Prime-style Selection Overlay */}
            <div className="absolute inset-0 border-4 border-[#00A8E1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[2rem]" />
        </motion.div>
    )
}

export function EducationSection() {
    const sectionRef = React.useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const textBlur = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(0px)", "blur(10px)", "blur(20px)"])

    return (
        <Section
            id="education"
            isFullHeight={false}
            centerContent={false}
            className="w-full relative px-6 md:px-20 lg:px-32 bg-black pt-40 pb-32 overflow-visible"
        >
            <div ref={sectionRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Parallax Background Elements */}
                <motion.div
                    style={{ y: bgY }}
                    className="absolute inset-0 opacity-[0.05]"
                >
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00A8E1] rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px]" />
                </motion.div>

                {/* Floating Large Title Pattern */}
                <motion.div
                    style={{ filter: textBlur }}
                    className="absolute inset-0 flex items-center justify-center select-none"
                >
                    <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter uppercase leading-none">
                        ACADEMIC
                    </span>
                </motion.div>
            </div>

            <div className="max-w-7xl w-full mx-auto relative z-10 space-y-24">
                {/* Prime-style Header */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-1.5 bg-[#00A8E1] rounded-full shadow-[0_0_20px_#00A8E1]" />
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase"
                        >
                            Education
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg md:text-xl font-bold tracking-widest uppercase flex items-center gap-4"
                    >
                        My Academic Journey & Qualifications
                        <span className="h-[1px] flex-1 bg-white/10 hidden md:block" />
                    </motion.p>
                </div>

                {/* Content Row (Scrollable on Desktop, Stacked on Mobile) */}
                <div className="relative group overflow-visible">
                    <div className="flex flex-col md:flex-row md:overflow-x-auto pt-6 md:pt-10 pb-12 gap-6 md:gap-10 no-scrollbar md:snap-x md:snap-mandatory px-2 md:px-4 -mx-2 md:-mx-4 overflow-visible">
                        {educationData.map((item, idx) => (
                            <div key={idx} className="md:snap-center overflow-visible w-full md:w-auto">
                                <EducationCard item={item} index={idx} />
                            </div>
                        ))}
                    </div>


                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </Section>
    )
}
