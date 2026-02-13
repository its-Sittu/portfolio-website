export interface Achievement {
    title: string;
    description: string;
    date: string;
    icon: string;
    image?: string;
}

export const achievements: Achievement[] = [
    {
        title: "1st Place – Spark Tank | Green Bricks Project",
        description: "Secured 1st position in Spark Tank for presenting the innovative Green Bricks Project, focusing on sustainable and eco-friendly construction solutions. Demonstrated strong problem-solving, innovation, and presentation skills while competing against multiple teams.",
        date: "2024",
        icon: "trophy",
        image: "/spark tank .jpg"
    },
    {
        title: "SIH Hackathon – First Round Qualified",
        description: "Successfully qualified the first round of Smart India Hackathon (SIH) at the college level. Collaborated with a team to develop an innovative problem-solving approach, presented the idea effectively, and demonstrated strong technical and analytical skills during the evaluation process.",
        date: "2025",
        icon: "code",
        image: "/sih.jpg"
    },
    {
        title: "Java DSA Final Test – 3rd Rank",
        description: "Secured 3rd rank in the Java DSA Final Test (J34 Batch) at Sheriyans Coding School. Demonstrated strong understanding of data structures and algorithms, problem-solving ability, and consistent performance under timed evaluation. Applied optimized approaches and clean coding practices to solve complex problems efficiently.",
        date: "2025",
        icon: "book",
        image: "/java.jpg"
    },
]
