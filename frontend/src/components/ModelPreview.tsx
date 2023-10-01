import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

type ModelProps = {
  url: string;
};

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} receiveShadow castShadow />;
};

type ModelPreviewProps = {
  fileUrl: string;
};

const ModelPreview: React.FC<ModelPreviewProps> = ({ fileUrl }) => {
  return (
    <Canvas style={{ width: '400px', height: '400px' }} camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Model url={fileUrl} />
      </Suspense>
      <directionalLight
        color={0xffffff}
        intensity={1.0}
        position={[0, 10, 5]}
        castShadow
      />
      <ambientLight intensity={0.3} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelPreview;
