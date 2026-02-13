"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Terminal } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    const routes = [
        { href: "/#home", label: "Home" },
        { href: "/#about", label: "About" },
        { href: "/#projects", label: "Projects" },
        { href: "/#skills", label: "Skills" },
        { href: "/#experience", label: "Experience" },
        { href: "/#contact", label: "Contact" },
    ]

    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-md transition-all duration-300 hover:bg-black/80">
            <div className="container flex h-16 items-center">
                <div className="flex flex-1 items-center md:hidden">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Terminal className="h-5 w-5 text-[#00A8E1]" />
                        <span className="font-bold text-white text-sm">
                            {siteConfig.name}
                        </span>
                    </Link>
                </div>
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Terminal className="h-6 w-6 text-[#00A8E1]" />
                        <span className="hidden font-bold sm:inline-block text-white">
                            {siteConfig.name}
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === route.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden order-first"
                        >
                            <Menu className="h-6 w-6 text-white" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] border-r border-white/10 bg-black/90 backdrop-blur-xl p-0">
                        <div className="px-7">
                            <Link
                                href="/"
                                className="flex items-center"
                                onClick={() => setIsOpen(false)}
                            >
                                <Terminal className="mr-2 h-4 w-4" />
                                <span className="font-bold">{siteConfig.name}</span>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-1 py-8 px-6">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "group flex items-center rounded-md px-3 py-4 text-lg font-medium transition-all hover:bg-white/5",
                                        pathname === route.href ? "text-white bg-white/10" : "text-white/60 hover:text-white"
                                    )}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                    </div>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
