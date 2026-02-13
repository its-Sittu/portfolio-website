"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, useCursor } from "@react-three/drei"
import * as THREE from "three"
import { useSphere } from "@react-three/cannon"

const SKILLS = [
    "React", "Next.js", "TypeScript", "Node.js",
    "Tailwind", "Three.js", "MongoDB", "PostgreSQL",
    "Git", "Docker", "AWS", "Framer Motion"
]

function SkillBall({ position, name }: { position: [number, number, number], name: string }) {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [1],
        linearDamping: 0.8,
        angularDamping: 0.8,
        friction: 0.1,
        restitution: 0.7
    }))
    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    return (
        <mesh
            ref={ref as any}
            onPointerOver={() => {
                setHovered(true)
                api.applyImpulse([0, 2, 0], [0, 0, 0])
            }}
            onPointerOut={() => setHovered(false)}
            onClick={() => api.applyImpulse([0, 10, 0], [0, 0, 0])}
        >
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                color={hovered ? "#00A8E1" : "#0A0A0A"}
                emissive={hovered ? "#00A8E1" : "#000000"}
                emissiveIntensity={hovered ? 2 : 0}
                roughness={0.05}
                metalness={0.95}
                envMapIntensity={2}
            />
            <Text
                position={[0, 0, 1.05]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Geist-Bold.ttf"
                outlineWidth={0.02}
                outlineColor="#000000"
            >
                {name}
            </Text>
        </mesh>
    )
}

export function SkillCapsules() {
    const [positions, setPositions] = useState<[number, number, number][]>([])

    useState(() => {
        const p = SKILLS.map(() => [
            (Math.random() - 0.5) * 10,
            5 + Math.random() * 10,
            (Math.random() - 0.5) * 5
        ] as [number, number, number])
        setPositions(p)
    })

    if (positions.length === 0) return null

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            {SKILLS.map((skill, i) => (
                <SkillBall
                    key={skill}
                    position={positions[i]}
                    name={skill}
                />
            ))}
        </>
    )
}
