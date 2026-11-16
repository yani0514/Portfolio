import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import { pursuitGeometry, WHEELBASE } from '../../lib/pursuit';
import styles from './Demos.module.css';

export default function PursuitScene({ lookahead, bend }: { lookahead: number; bend: number }) {
  const geo = pursuitGeometry(lookahead, bend);
  return (
    <div
      className={styles.threeView}
      role="img"
      aria-label="Interactive three-dimensional view of the same Pure Pursuit geometry. Drag to orbit; scroll to zoom."
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [5, 5, 6], fov: 43 }}
        gl={{ antialias: true }}
        fallback={
          <p className={styles.fallback}>WebGL is unavailable; use the 2D diagram above.</p>
        }
      >
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[3, 8, 4]}
          intensity={2}
        />
        <gridHelper args={[14, 28, '#244a65', '#132e43']} />
        <Line
          points={geo.path.map((p) => [p.x, 0.03, -p.y])}
          color="#469fed"
          lineWidth={2}
        />
        <Line
          points={geo.arc.map((p) => [p.x, 0.05, -p.y])}
          color="#65d3c2"
          lineWidth={2}
        />
        <Line
          points={[
            [0, 0.06, 0],
            [geo.x, 0.06, -geo.y],
          ]}
          color="#dfbb80"
          lineWidth={1}
        />
        <Line
          points={Array.from({ length: 81 }, (_, i) => [
            Math.cos((i / 80) * Math.PI * 2) * lookahead,
            0.02,
            Math.sin((i / 80) * Math.PI * 2) * lookahead,
          ])}
          color="#8f815f"
          lineWidth={1}
        />
        <mesh position={[WHEELBASE / 2, 0.14, 0]}>
          <boxGeometry args={[0.5, 0.16, 0.27]} />
          <meshStandardMaterial
            color="#447c9f"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
        {[0, WHEELBASE].flatMap((x) =>
          [-0.17, 0.17].map((z) => (
            <mesh
              key={`${x}-${z}`}
              position={[x, 0.08, z]}
              rotation={[Math.PI / 2, 0, x > 0 ? -geo.steering : 0]}
            >
              <cylinderGeometry args={[0.08, 0.08, 0.07, 16]} />
              <meshStandardMaterial color="#101a22" />
            </mesh>
          )),
        )}
        <mesh position={[geo.x, 0.08, -geo.y]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#7ac9ff"
            emissive="#248fe8"
            emissiveIntensity={0.6}
          />
        </mesh>
        <axesHelper args={[0.9]} />
        <OrbitControls
          target={[1.4, 0, 0]}
          minDistance={3}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 - 0.05}
          enablePan={false}
        />
      </Canvas>
      <span>Drag to orbit · scroll to zoom · X forward, ground-plane Y left</span>
    </div>
  );
}
