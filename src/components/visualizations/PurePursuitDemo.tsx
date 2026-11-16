import { Component, lazy, Suspense, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Box, RotateCcw, Route } from 'lucide-react';
import { pursuitGeometry, WHEELBASE } from '../../lib/pursuit';
import styles from './Demos.module.css';
const PursuitScene = lazy(() => import('./PursuitScene'));
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className={styles.fallback}>
        3D is unavailable in this browser. The interactive 2D geometry above remains fully
        functional.
      </p>
    ) : (
      this.props.children
    );
  }
}

export default function PurePursuitDemo() {
  const [lookahead, setLookahead] = useState(2);
  const [bend, setBend] = useState(0.16);
  const [three, setThree] = useState(false);
  const gridId = useId().replace(/:/g, '');
  const geo = pursuitGeometry(lookahead, bend);
  const degree = (geo.steering * 180) / Math.PI;
  const px = (x: number) => 180 + x * 75;
  const py = (y: number) => 225 - y * 75;
  const path = (points: { x: number; y: number }[]) =>
    points.map((p, i) => `${i ? 'L' : 'M'}${px(p.x).toFixed(2)},${py(p.y).toFixed(2)}`).join(' ');
  return (
    <div className={styles.demo}>
      <header className={styles.demoHeader}>
        <h3>
          <Route size={17} />
          Pure Pursuit / geometry lab
        </h3>
        <span>Interactive · illustrative model</span>
      </header>
      <svg
        className={styles.plot}
        viewBox="0 0 720 420"
        role="img"
        aria-label={`Pure Pursuit geometry. Lookahead ${lookahead.toFixed(1)} metres, target x ${geo.x.toFixed(2)}, y ${geo.y.toFixed(2)}, steering ${degree.toFixed(1)} degrees.`}
      >
        <defs>
          <pattern
            id={gridId}
            width="37.5"
            height="37.5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M37.5 0H0V37.5"
              fill="none"
              stroke="#487397"
              strokeOpacity=".13"
            />
          </pattern>
        </defs>
        <rect
          width="720"
          height="420"
          fill={`url(#${gridId})`}
        />
        <path
          d="M45 225H665M180 365V45"
          stroke="#53718a"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <path
          d="m655 220 10 5-10 5M175 55l5-10 5 10"
          stroke="#799db9"
        />
        <text
          x="603"
          y="247"
          fill="#829fb8"
          fontSize="11"
          fontFamily="monospace"
        >
          x / forward
        </text>
        <text
          x="195"
          y="55"
          fill="#829fb8"
          fontSize="11"
          fontFamily="monospace"
        >
          y / left
        </text>
        <circle
          cx="180"
          cy="225"
          r={lookahead * 75}
          stroke="#d4b079"
          strokeOpacity=".4"
          strokeDasharray="5 7"
          fill="#d4b07903"
        />
        <path
          d={path(geo.path)}
          stroke="#469fed"
          strokeWidth="3"
          fill="none"
        />
        <path
          d={path(geo.arc)}
          stroke="#65d3c2"
          strokeWidth="2"
          strokeDasharray="8 5"
          fill="none"
        />
        <path
          d={`M180 225L${px(geo.x)} ${py(geo.y)}`}
          stroke="#dfbb80"
          strokeWidth="1.5"
        />
        <circle
          cx={px(geo.x)}
          cy={py(geo.y)}
          r="12"
          fill="#40a2f32b"
          stroke="#5bb5ff"
        />
        <circle
          cx={px(geo.x)}
          cy={py(geo.y)}
          r="4"
          fill="#94d9ff"
        />
        <text
          x={px(geo.x) + 17}
          y={py(geo.y) - 13}
          fill="#c5e6ff"
          fontSize="11"
          fontFamily="monospace"
        >
          lookahead target
        </text>
        <text
          x={px(geo.x) / 2 + 90}
          y={py(geo.y) / 2 + 130}
          fill="#d7bc92"
          fontSize="11"
          fontFamily="monospace"
        >
          L
          <tspan
            baselineShift="sub"
            fontSize="8"
          >
            d
          </tspan>{' '}
          = {lookahead.toFixed(1)} m
        </text>
        <g transform="translate(180 225)">
          <rect
            x="-20"
            y="-15"
            width="46"
            height="30"
            rx="5"
            fill="#193c58"
            stroke="#b1dbf5"
          />
          <rect
            x="-15"
            y="-20"
            width="13"
            height="6"
            rx="1"
            fill="#94aab9"
          />
          <rect
            x="-15"
            y="14"
            width="13"
            height="6"
            rx="1"
            fill="#94aab9"
          />
          <rect
            x="12"
            y="-20"
            width="14"
            height="6"
            rx="1"
            fill="#6ac1fb"
            transform={`rotate(${-degree} 19 -17)`}
          />
          <rect
            x="12"
            y="14"
            width="14"
            height="6"
            rx="1"
            fill="#6ac1fb"
            transform={`rotate(${-degree} 19 17)`}
          />
          <path
            d="M-7 0H16m-5-5 5 5-5 5"
            stroke="#d4eaff"
            strokeWidth="2"
          />
        </g>
        <text
          x="126"
          y="276"
          fill="#9cb5ca"
          fontSize="11"
          fontFamily="monospace"
        >
          vehicle frame
        </text>
      </svg>
      <div className={styles.legend}>
        <span>
          <i />
          Reference path
        </span>
        <span>
          <i />
          Pursuit arc
        </span>
        <span>
          <i />
          Lookahead distance
        </span>
      </div>
      <div className={styles.controls}>
        <div>
          <label htmlFor="lookahead">
            Lookahead distance <output htmlFor="lookahead">{lookahead.toFixed(1)} m</output>
          </label>
          <input
            id="lookahead"
            type="range"
            min=".6"
            max="3"
            step=".1"
            value={lookahead}
            onChange={(e) => setLookahead(Number(e.target.value))}
          />
          <div className={styles.controlEnds}>
            <span>Near / responsive</span>
            <span>Far / smoother</span>
          </div>
        </div>
        <div>
          <label htmlFor="bend">
            Trajectory bend <output htmlFor="bend">{bend.toFixed(2)} m⁻¹</output>
          </label>
          <input
            id="bend"
            type="range"
            min="-.2"
            max=".2"
            step=".01"
            value={bend}
            onChange={(e) => setBend(Number(e.target.value))}
          />
          <div className={styles.controlEnds}>
            <span>Right turn</span>
            <span>Left turn</span>
          </div>
        </div>
      </div>
      <dl
        className={styles.metrics}
        aria-live="polite"
      >
        <div>
          <dt>Curvature κ</dt>
          <dd>
            {geo.curvature.toFixed(3)} <small>m⁻¹</small>
          </dd>
        </div>
        <div>
          <dt>Steering δ</dt>
          <dd>{degree.toFixed(2)}°</dd>
        </div>
        <div>
          <dt>Wheelbase L</dt>
          <dd>
            {WHEELBASE} <small>m</small>
          </dd>
        </div>
      </dl>
      <button
        className={styles.threeToggle}
        aria-expanded={three}
        onClick={() => setThree(!three)}
      >
        {three ? <RotateCcw size={15} /> : <Box size={15} />}{' '}
        {three ? 'Close spatial view' : 'Explore the geometry in 3D'}
      </button>
      {three && (
        <SceneBoundary>
          <Suspense
            fallback={
              <p
                className={styles.fallback}
                role="status"
              >
                Loading spatial view…
              </p>
            }
          >
            <PursuitScene
              lookahead={lookahead}
              bend={bend}
            />
          </Suspense>
        </SceneBoundary>
      )}
      <p className={styles.note}>
        Geometric demonstration with a stationary vehicle and a synthetic path y = bx². The target
        is the forward intersection with the lookahead circle. κ = 2y / (x² + y²), δ = atan(0.31κ).
        This is not a dynamic vehicle simulation or recorded project telemetry.
      </p>
    </div>
  );
}
