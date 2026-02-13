"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

interface EagleCanvasProps {
    typingSpeed: number
    isSubmitted: boolean
    onReturnComplete?: () => void
}

export function EagleCanvas({ typingSpeed, isSubmitted, onReturnComplete }: EagleCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const mixerRef = useRef<THREE.AnimationMixer | null>(null)
    const eagleRef = useRef<THREE.Group | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Store original values for return
    const originalPos = { x: 0, y: 0, z: 0 }
    const originalScale = 0.015

    useEffect(() => {
        if (!containerRef.current) return

        // --- Scene Setup ---
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            45,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        )
        camera.position.set(2, 1, 5)
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true // Transparent background
        })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        containerRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 1)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        // --- Model Loading ---
        const loader = new GLTFLoader()
        loader.load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Stork.glb',
            (gltf) => {
                const model = gltf.scene
                model.scale.set(originalScale, originalScale, originalScale)
                model.rotation.y = Math.PI / 2
                scene.add(model)
                eagleRef.current = model

                // Animation
                const mixer = new THREE.AnimationMixer(model)
                const action = mixer.clipAction(gltf.animations[0])
                action.play()
                mixerRef.current = mixer

                setIsLoading(false)
            },
            undefined,
            (error) => console.error('Error loading eagle model:', error)
        )

        // --- Animation Loop ---
        const clock = new THREE.Clock()
        const animate = () => {
            requestAnimationFrame(animate)
            const delta = clock.getDelta()

            if (mixerRef.current) {
                mixerRef.current.update(delta)
            }

            // Gentle floating/idle movement
            if (eagleRef.current && !isSubmitted) {
                eagleRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1
                eagleRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.05
            }

            renderer.render(scene, camera)
        }
        animate()

        // --- Resize Handling ---
        const handleResize = () => {
            if (!containerRef.current) return
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement)
            }
            renderer.dispose()
        }
    }, [])

    // Effect: Update animation speed based on typing
    useEffect(() => {
        if (mixerRef.current && !isSubmitted) {
            gsap.to(mixerRef.current, {
                timeScale: 1 + typingSpeed * 2,
                duration: 0.5,
                ease: "power2.out"
            })
        }
    }, [typingSpeed, isSubmitted])

    // Effect: Full takeoff & return cycle on submission
    useEffect(() => {
        if (isSubmitted && eagleRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onReturnComplete) onReturnComplete()
                }
            })

            // 1. Takeoff (Fly up and Away)
            tl.to(eagleRef.current.position, {
                y: 10,
                z: -10,
                x: 5,
                duration: 2,
                ease: "power2.in"
            })
            tl.to(eagleRef.current.scale, {
                x: 0.003,
                y: 0.003,
                z: 0.003,
                duration: 2,
                ease: "power2.in"
            }, "<")

            // Speed up wings during takeoff
            if (mixerRef.current) {
                gsap.to(mixerRef.current, { timeScale: 5, duration: 0.5 })
            }

            // 2. Short Delay in the "sky"
            tl.to({}, { duration: 1 })

            // 3. Return Glide (Back to original)
            tl.to(eagleRef.current.position, {
                x: originalPos.x,
                y: originalPos.y,
                z: originalPos.z,
                duration: 2,
                ease: "power2.out"
            })
            tl.to(eagleRef.current.scale, {
                x: originalScale,
                y: originalScale,
                z: originalScale,
                duration: 2,
                ease: "power2.out"
            }, "<")

            // Slow down wings upon return
            tl.add(() => {
                if (mixerRef.current) {
                    gsap.to(mixerRef.current, { timeScale: 1, duration: 1.5 })
                }
            }, ">-1")
        }
    }, [isSubmitted])

    return (
        <div ref={containerRef} className="w-full h-full min-h-[400px] relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-[#00A8E1]/40 animate-pulse font-bold tracking-widest uppercase text-xs">
                    Loading Eagle...
                </div>
            )}
        </div>
    )
}
