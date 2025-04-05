import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from 'gsap';
import Cohort from "./Cohort.jsx";
import Foresight from "./Foresight.jsx";
import Objective from "./Objective.jsx";
import Resolution from "./Resolution.jsx";

// Custom Info Card Components




const WireframeGlobe = () => {
    const globeRef = useRef();
    const nodesRef = useRef([]);
    const [interactiveNodes, setInteractiveNodes] = useState([]);
    const interactiveProps = useRef({});
    const { camera } = useThree();
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const originalCameraPosition = new THREE.Vector3(0, 0, 70);
    const [selectedNodeIndex, setSelectedNodeIndex] = useState(null);

    const glowSpeed = 1.5;
    const maxNodeSize = 3;
    const baseInteractiveSize = 0.6;
    const numInteractiveNodes = 4; // Increased to include HOME, LOGIN, REGISTER, FAQ

    const hoverWords = ["Cohort","Objective","Resoultion","Foresight"];

    // Define routes for each node
    const nodeRoutes = [];

    const nodeColor = "#4a6fa5";
    const nodeColorDarker = "#345183"; // A darker shade of #4a6fa5
    const hoverColor = "#808080";

    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.001;
        }

        interactiveNodes.forEach((index, i) => {
            if (nodesRef.current[index]) {
                const node = nodesRef.current[index];

                if (!interactiveProps.current[index]) {
                    interactiveProps.current[index] = {
                        sizeOffset: Math.random() * 0.5 + 0.5,
                        colorOffset: Math.random() * 0.5 + 0.5,
                    };
                }

                const props = interactiveProps.current[index];
                const sizeFactor =
                    baseInteractiveSize +
                    (maxNodeSize - baseInteractiveSize) *
                    0.5 *
                    (1 + Math.sin(state.clock.elapsedTime * glowSpeed * props.sizeOffset));
                node.scale.set(sizeFactor, sizeFactor, sizeFactor);

                // Different color for navigation nodes
                const baseColor = i >= 6 ? new THREE.Color("#50c878") : new THREE.Color("#ffa500");
                const darkColor = i >= 6 ? new THREE.Color("#2e8b57") : new THREE.Color("#ff4500");

                const colorFactor =
                    0.5 + 0.5 * Math.sin(state.clock.elapsedTime * glowSpeed * props.colorOffset);
                node.material.color = baseColor.clone().lerp(darkColor, colorFactor);
            }
        });
    });

    const { points, lines } = useMemo(() => {
        const pointsArray = [];
        for (let i = 0; i < 150; i++) {
            const phi = Math.acos(-1 + (2 * i) / 150);
            const theta = Math.sqrt(150 * Math.PI) * phi;
            pointsArray.push(
                new THREE.Vector3(
                    25 * Math.sin(phi) * Math.cos(theta),
                    25 * Math.sin(phi) * Math.sin(theta),
                    25 * Math.cos(phi)
                )
            );
        }

        const linesArray = [];
        for (let i = 0; i < pointsArray.length; i++) {
            for (let j = i + 1; j < pointsArray.length; j++) {
                if (pointsArray[i].distanceTo(pointsArray[j]) < 15 && Math.random() > 0.85) {
                    linesArray.push([pointsArray[i], pointsArray[j]]);
                }
            }
        }
        return { points: pointsArray, lines: linesArray };
    }, []);

    useEffect(() => {
        // Select interactive nodes
        const selectedIndices = [];

        // First select 6 nodes for the original interactive purposes (Strategy, Progress, etc.)
        for (let i = 0; i < 6; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * points.length);
            } while (selectedIndices.includes(randomIndex));
            selectedIndices.push(randomIndex);
        }

        // Select 4 more nodes for navigation purposes (Home, Login, Register, FAQ)
        for (let i = 0; i < 4; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * points.length);
            } while (selectedIndices.includes(randomIndex));
            selectedIndices.push(randomIndex);
        }

        setInteractiveNodes(selectedIndices);

        points.forEach((_, index) => {
            const isInteractive = selectedIndices.includes(index);
            const interactiveIndex = selectedIndices.indexOf(index);
            let color;

            if (isInteractive) {
                if (interactiveIndex >= 5) { // Navigation nodes
                    color = "#50c878"; // Green for navigation nodes
                } else { // Info nodes
                    color = "#ffa500"; // Orange for original interactive nodes
                }
            } else {
                color = index % 2 === 0 ? nodeColor : nodeColorDarker; // Alternate colors for non-interactive nodes
            }

            nodesRef.current[index].material = new THREE.MeshBasicMaterial({
                color: color,
            });
            nodesRef.current[index].userData = { index };
        });
    }, [points.length, numInteractiveNodes, nodeColor, nodeColorDarker]);

    const handleNodeClick = (event) => {
        const intersectedObject = event.object;
        const index = intersectedObject?.userData?.index;

        if (intersectedObject && intersectedObject.userData && interactiveNodes.includes(index)) {
            const nodeIndex = interactiveNodes.indexOf(index);
            const route = nodeRoutes[nodeIndex];

            if (route) {
                // Navigate to a new page for navigation nodes
                window.location.href = route;
            } else {
                // Original behavior for info nodes
                setIsZoomedIn(true);
                gsap.to(camera.position, {
                    x: intersectedObject.position.x,
                    y: intersectedObject.position.y,
                    z: intersectedObject.position.z - maxNodeSize,
                    duration: 0.9,
                    ease: "power3.inOut",
                    onComplete: () => {
                        setSelectedNodeIndex(index);
                    },
                });
            }
        }
    };

    const handleCloseInfoCard = () => {
        setSelectedNodeIndex(null);
        gsap.to(camera.position, {
            x: originalCameraPosition.x,
            y: originalCameraPosition.y,
            z: originalCameraPosition.z,
            duration: 0.9,
            ease: "power3.inOut",
        });
    };

    const renderInfoCard = () => {
        if (selectedNodeIndex === null) return null;

        const nodeIndex = interactiveNodes.indexOf(selectedNodeIndex);

        switch (nodeIndex) {
            case 0: return <Cohort />;
            case 1: return <Objective />;
            case 2: return <Resolution />;
            case 3: return <Foresight />;
            default: return null;
        }
    };

    return (
        <>
            <group ref={globeRef}>
                {/* Render the connections (lines) */}
                {lines.map((line, index) => (
                    <line key={`line-${index}`}>
                        <bufferGeometry attach="geometry">
                            <bufferAttribute
                                attach="attributes-position"
                                array={new Float32Array([
                                    line[0].x,
                                    line[0].y,
                                    line[0].z,
                                    line[1].x,
                                    line[1].y,
                                    line[1].z,
                                ])}
                                itemSize={3}
                                count={2}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial
                            attach="material"
                            color="#8ecae6"
                            transparent={true}
                            opacity={0.6}
                            linewidth={1}
                        />
                    </line>
                ))}

                {/* Render the nodes */}
                {points.map((point, index) => {
                    const isInteractive = interactiveNodes.includes(index);
                    const nodeIndex = interactiveNodes.indexOf(index);
                    const isNavNode = nodeIndex >= 6 && nodeIndex < 10;

                    return (
                        <mesh
                            key={`node-${index}`}
                            ref={(el) => (nodesRef.current[index] = el)}
                            position={[point.x, point.y, point.z]}
                            onClick={handleNodeClick}
                            onPointerOver={(e) => {
                                e.object.material.color.set(hoverColor);
                                document.body.style.cursor = 'pointer';
                            }}
                            onPointerOut={(e) => {
                                let color;
                                if (isInteractive) {
                                    if (isNavNode) {
                                        color = "#50c878"; // Green for navigation nodes
                                    } else {
                                        color = "#ffa500"; // Orange for info nodes
                                    }
                                } else {
                                    color = index % 2 === 0 ? nodeColor : nodeColorDarker;
                                }
                                e.object.material.color.set(color);
                                document.body.style.cursor = 'default';
                            }}
                        >
                            <sphereGeometry args={[0.4, 32, 32]} />
                            {isInteractive && (
                                <Html
                                    position={[0, 2, 0]}
                                    center
                                    distanceFactor={20}

                                    style={{
                                        pointerEvents: "none",
                                        color:  "black",
                                        fontFamily: "Arial",
                                        fontSize: "4em",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {hoverWords[nodeIndex]}
                                </Html>
                            )}
                        </mesh>
                    );
                })}

                {/* Render info card when a node is selected */}
                {selectedNodeIndex !== null && (
                    <Html
                        position={[0, 0, 0]}
                        center
                        style={{
                            pointerEvents: 'auto', // Enable interaction
                        }}
                    >
                        <div style={{ position: 'relative' }}>
                            {renderInfoCard()}
                            <button
                                onClick={handleCloseInfoCard}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.2em',
                                    cursor: 'pointer',
                                    color:'black'
                                }}>X
                            </button>
                        </div>
                    </Html>
                )}

                {/* Render "About Us" text above the globe */}
                <Html
                    position={[50, 10, -30]} // Adjust position as needed
                    center
                    style={{ cursor: "pointer" }}
                >
                    <div
                        style={{
                            color: "black",
                            fontFamily: "Arial",
                            fontSize: "4em",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                        }}
                    >
                        About Us !!!
                    </div>
                </Html>
            </group>
        </>
    );
};

const AboutUs = () => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 70], fov: 50 }}
                style={{ width: "100%", height: "100%", background: "#f8f9fa" }}
            >
                <ambientLight intensity={1.5} />
                <WireframeGlobe />
                <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default AboutUs;