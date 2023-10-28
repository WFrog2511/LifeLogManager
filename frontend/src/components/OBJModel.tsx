import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type OBJPreviewProps = {
    url: string;
};

const OBJPreview: React.FC<OBJPreviewProps> = ({ url }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.text())
            .then(objString => {
                init(objString);
            });
    }, [url]);

    const init = (objString: string) => {
        const width = containerRef.current?.clientWidth || 400;
        const height = containerRef.current?.clientHeight || 400;

        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);

        if (containerRef.current?.children.length === 0) {
            containerRef.current?.appendChild(renderer.domElement);
        }
        console.log("a");

        // Add light
        const ambientLight = new THREE.AmbientLight(0x404040, 1.0);  // soft white light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(ambientLight);
        scene.add(directionalLight);

        // Load OBJ file
        const loader = new OBJLoader();
        const object = loader.parse(objString);
        scene.add(object);

        // Add controls
        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    };

    return <div ref={containerRef} style={{ width: '100%'}} />;
};

export default OBJPreview;
