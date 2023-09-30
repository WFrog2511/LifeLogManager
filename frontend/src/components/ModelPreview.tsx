import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

type ModelProps = {
  url: string;
};

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

type ModelPreviewProps = {
  fileUrl: string;
};

const ModelPreview: React.FC<ModelPreviewProps> = ({ fileUrl }) => {
  return (
    <Canvas style={{ width: '400px', height: '400px' }}>
      <Suspense fallback={null}>
        <Model url={fileUrl} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ModelPreview;
