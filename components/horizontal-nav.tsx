"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function HorizontalNav() {
    const pathname = usePathname()
    const [activeTab, setActiveTab] = React.useState("#home")

    const routes = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#projects", label: "Projects" },
        { href: "#skills", label: "Skills" },
        { href: "#experience", label: "Experience" },
        { href: "#certifications", label: "Certifications" },
        { href: "#achievements", label: "Achievements" },
        { href: "#education", label: "Education" },
        { href: "#contact", label: "Contact" },
    ]

    React.useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(`#${entry.target.id}`)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        routes.forEach((route) => {
            const element = document.getElementById(route.href.substring(1))
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center pointer-events-none"
        >
            {/* Brand Logo - Top Left */}
            <Link href="#home" className="pointer-events-auto">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-2xl shadow-[#00A8E1]/10 flex items-center justify-center gap-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A8E1] animate-pulse" />
                    <span className="text-lg font-black tracking-tighter text-white">
                        &lt;<span className="text-[#00A8E1]">SKS</span>&gt;
                    </span>
                </motion.div>
            </Link>

            {/* Navigation - Top Right */}
            <div className="flex items-center gap-4 pointer-events-auto">
                <div className="relative flex items-center gap-4 bg-black/40 backdrop-blur-xl px-5 py-2 rounded-full border border-white/20 shadow-2xl shadow-[#00A8E1]/10">
                    {/* Gradient glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00A8E1]/10 via-purple-500/10 to-[#00A8E1]/10 blur-xl -z-10" />

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-4">
                        {routes.map((route) => {
                            const isActive = activeTab === route.href
                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "relative text-xs font-medium transition-all duration-300 hover:scale-110",
                                        isActive
                                            ? "text-[#00A8E1] drop-shadow-[0_0_8px_rgba(0,168,225,0.8)]"
                                            : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    {route.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00A8E1] to-transparent"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Hire Me CTA */}
                <Link href="#contact">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#00A8E1] text-white px-4 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-black shadow-lg shadow-[#00A8E1]/20 border border-white/10"
                    >
                        Hire Me
                    </motion.div>
                </Link>
            </div>
        </motion.header>
    )
}
