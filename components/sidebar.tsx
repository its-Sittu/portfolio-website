"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, FolderGit2, Wrench, Briefcase, Mail, Terminal, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRecruiterMode } from "@/context/recruiter-mode"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function Sidebar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode()

    const routes = [
        { href: "/", label: "Home", icon: Home },
        { href: "/about", label: "About", icon: User },
        { href: "/projects", label: "Projects", icon: FolderGit2 },
        { href: "/skills", label: "Skills", icon: Wrench },
        { href: "/experience", label: "Experience", icon: Briefcase },
        { href: "/contact", label: "Contact", icon: Mail },
    ]

    return (
        <>
            {/* Toggle Button (Visible when closed) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed right-6 top-6 z-50"
                    >
                        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)} className="bg-black/50 border-white/10 text-white backdrop-blur-md hover:bg-black/80">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            className="fixed right-0 top-0 z-50 h-full w-80 border-l border-white/10 bg-black/95 p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold text-white flex items-center gap-2">
                                    <Terminal className="text-[#00A8E1]" /> Menu
                                </span>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    {routes.map((route) => {
                                        const Icon = route.icon
                                        const isActive = pathname === route.href
                                        return (
                                            <Link
                                                key={route.href}
                                                href={route.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-3 rounded-md transition-all group",
                                                    isActive ? "bg-white/10 text-[#00A8E1]" : "text-gray-400 hover:text-white hover:bg-white/5"
                                                )}
                                            >
                                                <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-[#00A8E1]" : "text-gray-500 group-hover:text-white")} />
                                                <span className="font-medium">{route.label}</span>
                                            </Link>
                                        )
                                    })}
                                </div>

                                <div className="h-px bg-white/10 my-4" />

                                <div className="flex items-center justify-between px-4 py-3 rounded-md bg-white/5">
                                    <div className="flex items-center gap-2">
                                        <Settings className="h-4 w-4 text-gray-400" />
                                        <Label htmlFor="recruiter-mode" className="text-sm font-medium text-gray-300">Recruiter Mode</Label>
                                    </div>
                                    <Switch id="recruiter-mode" checked={isRecruiterMode} onCheckedChange={toggleRecruiterMode} />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
