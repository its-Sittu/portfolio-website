"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Earth } from "@/components/earth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black scroll-snap-align-start">
            {/* Background Gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/80 to-transparent" />

            {/* Content */}
            <div className="w-full relative z-20 flex h-full flex-col justify-start gap-6 pt-40 md:pt-48 px-8 md:px-20 lg:px-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl space-y-5"
                >
                    {/* Availability Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 px-3 mb-4">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium text-gray-300">Available for work</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                            Hi, This is
                        </h1>
                        <h1 className="text-5xl font-extrabold tracking-tight text-[#00A8E1] sm:text-6xl md:text-7xl">
                            Sittu Kumar Singh
                        </h1>
                    </div>

                    <div className="space-y-4 pt-2">
                        <p className="text-xl text-gray-200 md:text-2xl font-medium">
                            Full Stack Developer & UI/UX Enthusiast
                        </p>
                        <div className="space-y-1">
                            <p className="max-w-[600px] text-base text-gray-400 leading-relaxed">
                                I craft exceptional digital experiences with clean code and elegant design.
                            </p>
                            <p className="max-w-[600px] text-base text-gray-400 leading-relaxed">
                                Specialized in the **MERN Stack** and **Next.js**.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-6">
                        <Link href="#contact">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button size="lg" className="bg-[#00A8E1] text-white hover:bg-[#00A8E1]/90 font-black px-10 rounded-xl shadow-xl shadow-[#00A8E1]/30 text-base">
                                    Hire Me
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/resume.pdf" target="_blank">
                            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-bold px-8 rounded-xl backdrop-blur-sm">
                                <Play className="mr-2 h-4 w-4 fill-current rotate-90" />
                                Resume
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* 3D Earth Background */}
            <div className="absolute right-0 top-4 h-full w-full md:w-2/3 lg:w-1/2 opacity-70 mix-blend-screen overflow-hidden">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <Earth />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent z-20" />
        </section>
    )
}
