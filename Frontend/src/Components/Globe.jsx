  import React, { useRef, useMemo, useState, useEffect } from "react";
  import { Canvas, useFrame, useThree } from "@react-three/fiber";
  import { OrbitControls, Html } from "@react-three/drei";
  import * as THREE from "three";
  import gsap from "gsap";

  // Custom Info Card Components

  const WireframeGlobe = () => {
    const globeRef = useRef();
    const nodesRef = useRef([]);
    const [interactiveNodes, setInteractiveNodes] = useState([]);
    const interactiveProps = useRef({});
    const { camera } = useThree();
    // const [isZoomedIn, setIsZoomedIn] = useState(false);
    const originalCameraPosition = new THREE.Vector3(0, 0, 70);
    const [selectedNodeIndex, setSelectedNodeIndex] = useState(null);

    const glowSpeed = 1.5;
    const maxNodeSize = 3;
    const baseInteractiveSize = 0.6;
    const numInteractiveNodes = 12; // Increased to include HOME, LOGIN, REGISTER, FAQ

    const hoverWords = [
      "Intelligent Tracking",
      "Guard",
      "Alert",
      "Locate",
      "Safeguard ",
      "Detect",
      "Monitor ",
      "AI-Based Surveillance",
    ];

    // Define routes for each node
    const nodeRoutes = [];

    const nodeColor = "#4a6fa5";
    const nodeColorDarker = "#345183"; // A darker shade of #4a6fa5
    const hoverColor = "#808080";

    useFrame((state) => {
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.003;
        globeRef.current.rotation.x += 0.003;
        globeRef.current.rotation.z += 0.002;// Rotation along X axis for a smoother effect
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
          const baseColor = i >= 4 ? new THREE.Color("#CCFF33") : new THREE.Color("#ffa500");
          const darkColor = i >= 6 ? new THREE.Color("#2e8b57") : new THREE.Color("#ff4500");

          const colorFactor =
            0.5 + 0.5 * Math.sin(state.clock.elapsedTime * glowSpeed * props.colorOffset);
          node.material.color = baseColor.clone().lerp(darkColor, colorFactor);
        }
      });
    });

    const { points, lines } = useMemo(() => {
      const pointsArray = [];
      const radius = 25; // Define radius for the globe's size

      for (let i = 0; i < 150; i++) {
        // Distribute nodes evenly in spherical coordinates
        const phi = Math.acos(-1 + (2 * i) / 150);
        const theta = Math.sqrt(150 * Math.PI) * phi;
        pointsArray.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
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
          if (interactiveIndex >= 10) {
            color = "#50c878"; // Green for navigation nodes
          } else {
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

    return (
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
              onPointerOver={(e) => {
                e.object.material.color.set(hoverColor);
                document.body.style.cursor = "pointer";
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
                document.body.style.cursor = "default";
              }}
            >
              <sphereGeometry args={[0.4, 32, 32]} />
              {isInteractive && (
                <Html
                  position={[0, 2, 0]}
                  center
                  distanceFactor={22}
                  style={{
                    pointerEvents: "none",
                    color: "black",
                    fontWeight:"bold",
                    fontSize: "5em",
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
      </group>
    );
  };

  const Globe = () => {
    return (
      <div
        style={{
          width: "65vw",
          height: "85vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Canvas
    camera={{ position: [0, 0, 100], fov: 50 }}
    style={{
      position: "absolute",
      top: -100,
      right: -80,
      width: "100%",
      height: "100%"
    }}
  >
    <ambientLight intensity={1.5} />
    <WireframeGlobe />
    <OrbitControls enableZoom={true} enablePan={false} />
  </Canvas>

      </div>
    );
  };

  export default Globe;
