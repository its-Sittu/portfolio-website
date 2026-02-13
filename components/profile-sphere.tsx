"use client"

import { useRef, useState } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"


export function ProfileSphere() {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHovered] = useState(false)


    // Load profile texture - REPLACE with actual image path
    // For now using a placeholder color/texture
    // const texture = useLoader(TextureLoader, '/path/to/profile.jpg')

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
        }
    })



    return (
        <mesh
            ref={meshRef}
            scale={hovered ? 2.8 : 2.5}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                color="#ffffff"
                roughness={0.2}
                metalness={0.8}
            // map={texture} 
            />
        </mesh>
    )
}
