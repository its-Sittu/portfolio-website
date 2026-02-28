"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"

const TECH_STACK = [
    { name: "React", color: "#61DAFB" },
    { name: "Node.js", color: "#339933" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "MongoDB", color: "#47A248" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "HTML5", color: "#E34F26" },
    { name: "CSS3", color: "#1572B6" },
    { name: "Next.js", color: "#FFFFFF" },
    { name: "Express", color: "#999999" },
    { name: "Tailwind", color: "#06B6D4" },
    { name: "Docker", color: "#2496ED" },
    { name: "Git", color: "#F05032" },
    { name: "AWS", color: "#FF9900" },
    { name: "GraphQL", color: "#E10098" },
    { name: "Redux", color: "#764ABC" },
]

function OrbitingTech({ tech, index, total }: { tech: { name: string; color: string }; index: number; total: number }) {
    const textRef = useRef<THREE.Group>(null!)

    // Spherical coordinates for full 3D orbit coverage
    const orbitalData = useRef({
        radius: 3.5 + (index % 3) * 0.4,
        theta: (index / total) * Math.PI * 2, // Horizontal angle
        phi: Math.acos(1 - 2 * (index / total)), // Vertical angle (covers sphere surface)
        speed: 0.15 + (index % 4) * 0.02,
        thetaOffset: Math.random() * Math.PI * 2,
        phiOffset: (index / total) * Math.PI,
    })

    useFrame((state) => {
        if (textRef.current) {
            const data = orbitalData.current
            const t = state.clock.elapsedTime * data.speed

            // Spherical coordinates rotation - orbits around entire sphere
            const theta = t + data.thetaOffset
            const phi = data.phi + Math.sin(t * 0.3) * 0.3 // Gentle vertical oscillation

            // Convert spherical to cartesian coordinates
            textRef.current.position.x = data.radius * Math.sin(phi) * Math.cos(theta)
            textRef.current.position.y = data.radius * Math.cos(phi)
            textRef.current.position.z = data.radius * Math.sin(phi) * Math.sin(theta)

            // Always face camera for readability
            textRef.current.lookAt(0, 0, 10)
        }
    })

    return (
        <group ref={textRef}>
            <Text
                fontSize={0.32}
                color={tech.color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="#000000"
                fontWeight="bold"
            >
                {tech.name}
            </Text>
        </group>
    )
}

export function Earth() {
    const meshRef = useRef<THREE.Mesh>(null!)
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2

            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.current.y * 0.3, 0.1)
            meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, mouse.current.x * 0.3, 0.1)
        }
    })

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    return (
        <group position={[0, -0.2, 0]}>
            {/* Main Earth */}
            <mesh ref={meshRef} scale={2}>
                <sphereGeometry args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
                <meshStandardMaterial
                    color="#00A8E1"
                    emissive="#00A8E1"
                    emissiveIntensity={1.2}
                    wireframe
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Tech Stack orbiting in full 3D sphere */}
            {TECH_STACK.map((tech, index) => (
                <OrbitingTech key={tech.name} tech={tech} index={index} total={TECH_STACK.length} />
            ))}
        </group>
    )
}
