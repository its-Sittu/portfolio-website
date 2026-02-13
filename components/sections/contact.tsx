"use client"

import { useState } from "react"
import { ContactForm } from "@/components/contact-form"
import { Section } from "@/components/section"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { siteConfig } from "@/config/site"
import { EagleCanvas } from "@/components/eagle-canvas"

export function ContactSection() {
    const [typingSpeed, setTypingSpeed] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleTypingChange = (isTyping: boolean) => {
        setTypingSpeed(isTyping ? 1 : 0)
    }

    const handleFormSubmit = () => {
        setIsSubmitted(true)
    }

    return (
        <Section id="contact" isFullHeight={false} centerContent={false} className="w-full pt-0 pb-8 md:pb-12 lg:pb-16 px-8 md:px-20 lg:px-32 relative">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Form & Info */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="space-y-3">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="font-heading text-3xl leading-[1.1] sm:text-4xl text-white tracking-tight"
                            >
                                Turning Ideas into <span className="text-[#00A8E1]">Reality</span>.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="max-w-[32rem] leading-normal text-gray-400 text-sm sm:text-base"
                            >
                                I&apos;m currently open to new opportunities. Fill out the form or reach out via email.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative bg-[#0A0A0A]/40 backdrop-blur-sm rounded-[2rem] p-1 bg-gradient-to-tr from-[#00A8E1]/20 via-transparent to-purple-600/20">
                                <div className="bg-[#0A0A0A] rounded-[1.9rem] p-6 md:p-10 border border-white/5 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white mb-6 tracking-tight uppercase text-xs tracking-[0.2em] opacity-50">Drop me a line</h3>
                                    <ContactForm
                                        onTypingChange={handleTypingChange}
                                        onSubmitSuccess={handleFormSubmit}
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Right Column: 3D Eagle */}
                    <div className="relative h-[350px] md:h-[450px] lg:h-[550px] order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-full h-full"
                        >
                            <EagleCanvas
                                typingSpeed={typingSpeed}
                                isSubmitted={isSubmitted}
                                onReturnComplete={() => setIsSubmitted(false)}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
