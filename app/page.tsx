"use client"

import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/sections/about"
import { ProjectsSection } from "@/components/sections/projects"
import { SkillsSection } from "@/components/sections/skills"
import { ExperienceSection } from "@/components/sections/experience"
import { CertificationsSection } from "@/components/sections/certifications"
import { AchievementsSection } from "@/components/sections/achievements"
import { EducationSection } from "@/components/sections/education"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificationsSection />
      <AchievementsSection />
      <EducationSection />
      <ContactSection />
    </div>
  )
}
