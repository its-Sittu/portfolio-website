"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const QuickLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
]

export function Footer() {
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <footer className="w-full bg-black relative border-t border-white/5 pt-10 pb-20 overflow-hidden">
            {/* Soft Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-[#00A8E1]/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24"
                >
                    {/* 1. Brand Identity */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="space-y-5">
                            <h3 className="text-4xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,168,225,0.3)]">
                                &lt;<span className="text-[#00A8E1]">SKS</span> /&gt;
                            </h3>
                            <p className="text-gray-400 leading-relaxed font-medium text-sm md:text-base max-w-xs">
                                Full Stack Developer creating powerful digital products with modern technologies.
                            </p>
                        </div>
                        <div className="flex items-center gap-2.5 text-[10px] md:text-xs font-bold text-[#00A8E1]/70 uppercase tracking-[0.2em] border border-white/5 bg-white/[0.03] w-fit py-2.5 px-4 rounded-2xl backdrop-blur-xl">
                            <MapPin size={14} className="text-[#00A8E1]" />
                            <span>Bhopal, India</span>
                        </div>
                    </motion.div>

                    {/* 2. Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-8 md:pl-12">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] opacity-80">Quick Links</h4>
                        <ul className="space-y-5">
                            {QuickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-300"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00A8E1] scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_10px_rgba(0,168,225,1)]" />
                                        <span className="text-sm md:text-base font-semibold tracking-wide">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* 3. Tech Philosophy */}
                    <motion.div variants={itemVariants} className="w-full space-y-8 md:pt-1">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#00A8E1]" />
                                <h4 className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em]">Tech Philosophy</h4>
                            </div>
                            <div className="space-y-3">
                                <h5 className="text-2xl font-bold text-white tracking-tight leading-tight">
                                    Building clean, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">scalable systems</span>
                                </h5>
                                <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed max-w-sm">
                                    Where performance meets thoughtful design.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            {["Clean Code", "Scalable UI", "Performance", "DX"].map((tag) => (
                                <span key={tag} className="text-[10px] font-bold text-gray-500 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full whitespace-nowrap">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar: Socials & Copyright */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-6"
                >
                    {/* Social Icons (Center) */}
                    <div className="flex items-center gap-5">
                        {[
                            { icon: <Github size={20} />, href: siteConfig.links.github },
                            { icon: <Linkedin size={20} />, href: siteConfig.links.linkedin },
                            { icon: <Instagram size={20} />, href: siteConfig.links.instagram },
                            { icon: <Mail size={20} />, href: `mailto:${siteConfig.links.email}` },
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                                rel="noreferrer"
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(0,168,225,0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-gray-400 hover:text-[#00A8E1] backdrop-blur-2xl transition-all duration-300"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright (Center) */}
                    <div className="text-center space-y-1">
                        <p className="text-[10px] md:text-xs font-black text-gray-600 uppercase tracking-[0.4em]">
                            © 2026 {siteConfig.name}.
                        </p>
                        <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest leading-none">
                            All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
