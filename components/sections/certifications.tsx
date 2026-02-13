"use client"

import { Section } from "@/components/section"
import { certifications } from "@/config/certifications"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function CertificationsSection() {
    return (
        <Section
            id="certifications"
            isFullHeight={false}
            className="w-full pt-8 pb-12 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 px-8 md:px-20 lg:px-32"
        >
            {/* Section Header */}
            <div className="mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl text-white"
                >
                    Certifications
                </motion.h1>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 h-[2px] w-20 origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent"
                />
            </div>

            {/* Cards Grid */}
            <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.55,
                            delay: 0.25 + index * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative"
                    >
                        {/* Gradient border wrapper */}
                        <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Card body */}
                        <div
                            className="relative h-full flex flex-col rounded-[20px] overflow-hidden
                                bg-[#0d1117]/80 backdrop-blur-2xl
                                border border-white/[0.06]
                                transition-all duration-300 ease-out
                                group-hover:border-transparent
                                group-hover:translate-y-[-5px]
                                group-hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.12)]"
                        >
                            {/* Top gradient strip */}
                            <div className="h-[3px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="p-6 flex flex-col flex-1">
                                {/* Year + Badge row */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-[6px] h-[6px] rounded-full bg-cyan-400 animate-pulse" />
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400/70">
                                            Certified
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono text-gray-600 bg-white/[0.04] px-2.5 py-1 rounded-md">
                                        {cert.date}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-[18px] font-bold text-white leading-[1.35] mb-2 tracking-[-0.01em] group-hover:text-cyan-50 transition-colors duration-300">
                                    {cert.title}
                                </h3>

                                {/* Issuer */}
                                <p className="text-[13px] text-gray-500 font-medium mb-auto">
                                    Issued by{" "}
                                    <span className="text-gray-400">
                                        {cert.issuer}
                                    </span>
                                </p>

                                {/* Divider */}
                                <div className="h-px w-full bg-gradient-to-r from-white/[0.06] via-white/[0.04] to-transparent my-5" />

                                {/* CTA */}
                                <Link
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2.5 w-full
                                        h-11 rounded-xl text-[13px] font-semibold tracking-wide
                                        text-cyan-300/90
                                        bg-gradient-to-b from-cyan-400/[0.06] to-transparent
                                        border border-cyan-400/[0.12]
                                        transition-all duration-300 ease-out
                                        hover:from-cyan-400/[0.12] hover:to-cyan-400/[0.04]
                                        hover:border-cyan-400/30
                                        hover:text-cyan-200
                                        hover:shadow-[0_0_24px_-6px_rgba(6,182,212,0.25),inset_0_1px_0_rgba(6,182,212,0.1)]
                                        active:scale-[0.97]"
                                >
                                    View Credential
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
