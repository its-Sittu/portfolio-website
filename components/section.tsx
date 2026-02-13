"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Section({
    children,
    className,
    id,
    isFullHeight = true,
    centerContent = true
}: {
    children: React.ReactNode,
    className?: string,
    id?: string,
    isFullHeight?: boolean,
    centerContent?: boolean
}) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "scroll-snap-align-start flex flex-col",
                isFullHeight && "min-h-screen",
                centerContent && "justify-center",
                className
            )}
        >
            {children}
        </motion.section>
    )
}
