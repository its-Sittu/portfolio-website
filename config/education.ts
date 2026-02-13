export interface EducationEntry {
    degree: string;
    specialization: string;
    institution: string;
    period: string;
    description: string;
    icon: string;
    status: string;
    color: string;
    image?: string;
}

export const educationData: EducationEntry[] = [
    {
        degree: "Bachelor of Technology",
        specialization: "Computer Science & Engineering",
        institution: "LNCT Group of Colleges",
        period: "Sept 2023 - June 2027",
        description: "Focusing on advanced algorithms, cloud computing, and immersive web technologies. Actively maintaining a high academic standing while building production-ready digital products.",
        icon: "graduation",
        status: "Pursuing",
        color: "#00A8E1",
        image: "/education-btech.jpg"
    },
    {
        degree: "Higher Secondary (12th)",
        specialization: "Physics, Chemistry & Math (PCM)",
        institution: "Zila High School, Medininagar",
        period: "Completed: 2023",
        description: "Foundation in logical reasoning and scientific principles. Excelled in mathematics and physics, laying the groundwork for a career in engineering.",
        icon: "book",
        status: "Completed",
        color: "#10B981",
        image: "/education-12th.jpg"
    },
    {
        degree: "Secondary School (10th)",
        specialization: "General Education",
        institution: "Kisan High School, Oriya",
        period: "Completed: 2021",
        description: "Broad base of academic knowledge with a focus on problem-solving and critical thinking skills.",
        icon: "building",
        status: "Completed",
        color: "#A855F7",
        image: "/education-10th.jpg"
    }
]
