import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef } from "react"
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
})

interface ContactFormProps {
    onTypingChange?: (isTyping: boolean) => void
    onSubmitSuccess?: () => void
}

export function ContactForm({ onTypingChange, onSubmitSuccess }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            title: "",
            message: "",
        },
    })

    const handleTyping = () => {
        if (onTypingChange) onTypingChange(true)
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = setTimeout(() => {
            if (onTypingChange) onTypingChange(false)
        }, 1000)
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            const templateParams = {
                name: values.name,
                email: values.email,
                title: values.title,
                message: values.message,
            }

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
            )

            setSubmitStatus("success")
            if (onSubmitSuccess) onSubmitSuccess()
            form.reset()
        } catch (error) {
            console.error("EmailJS Error:", error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" onChange={handleTyping}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Name</FormLabel>
                                <FormControl>
                                    <div className="group relative">
                                        <Input
                                            placeholder="Your full name"
                                            {...field}
                                            className="h-12 bg-white/[0.02] border-white/10 rounded-xl px-5 focus-visible:ring-0 focus-visible:border-[#00A8E1] transition-all group-hover:border-white/20 text-white"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-[#00A8E1]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-[10px] ml-1 text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email</FormLabel>
                                <FormControl>
                                    <div className="group relative">
                                        <Input
                                            placeholder="john@example.com"
                                            {...field}
                                            className="h-12 bg-white/[0.02] border-white/10 rounded-xl px-5 focus-visible:ring-0 focus-visible:border-[#00A8E1] transition-all group-hover:border-white/20 text-white"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-[#00A8E1]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-[10px] ml-1 text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Subject / Project Title</FormLabel>
                            <FormControl>
                                <div className="group relative">
                                    <Input
                                        placeholder="What's this about?"
                                        {...field}
                                        className="h-12 bg-white/[0.02] border-white/10 rounded-xl px-5 focus-visible:ring-0 focus-visible:border-[#00A8E1] transition-all group-hover:border-white/20 text-white"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-[#00A8E1]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage className="text-[10px] ml-1 text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Message</FormLabel>
                            <FormControl>
                                <div className="group relative">
                                    <Textarea
                                        placeholder="Hello! I'd like to talk about..."
                                        {...field}
                                        className="min-h-[120px] bg-white/[0.02] border-white/10 rounded-xl px-5 py-3 focus-visible:ring-0 focus-visible:border-[#00A8E1] transition-all group-hover:border-white/20 resize-none whitespace-pre-wrap break-all overflow-x-hidden overflow-y-auto w-full box-border text-white"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-[#00A8E1]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage className="text-[10px] ml-1 text-red-500" />
                        </FormItem>
                    )}
                />

                <div className="pt-2">
                    <AnimatePresence mode="wait">
                        {submitStatus === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-sm"
                            >
                                <CheckCircle2 size={18} />
                                Message sent successfully!
                            </motion.div>
                        ) : submitStatus === "error" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm"
                            >
                                <AlertCircle size={18} />
                                Failed to send. Please check your credentials.
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 bg-gradient-to-r from-[#00A8E1] to-purple-600 hover:from-[#00A8E1] hover:to-purple-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#00A8E1]/20 border-none group"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin w-5 h-5" />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            Send Message
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    )}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </form>
        </Form>
    )
}
