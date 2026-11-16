import { useState } from 'react';
import { Code2 } from 'lucide-react';
import styles from './Demos.module.css';
const lines = [
  'function steering(target, wheelbase) {',
  '  const { x, y } = target;',
  '  const distance2 = x * x + y * y;',
  '  if (distance2 === 0) {',
  '    return 0;',
  '  }',
  '  const curvature = 2 * y / distance2;',
  '  const angle = Math.atan(wheelbase * curvature);',
  '  return clamp(angle, -MAX_STEER, MAX_STEER);',
  '}',
];
const coverageSources = { unit: [1, 2, 3, 4, 5, 7, 8], integration: [1, 2, 3, 4, 7, 8, 9] };
const executable = [1, 2, 3, 4, 5, 7, 8, 9];
function combinedCoverage(unit: boolean, integration: boolean) {
  return new Set([
    ...(unit ? coverageSources.unit : []),
    ...(integration ? coverageSources.integration : []),
  ]);
}
export default function CoverageDemo() {
  const [unit, setUnit] = useState(true);
  const [integration, setIntegration] = useState(false);
  const covered = combinedCoverage(unit, integration);
  const count = executable.filter((x) => covered.has(x)).length;
  return (
    <div className={styles.demo}>
      <header className={styles.demoHeader}>
        <h3>
          <Code2 size={17} />
          Multi-source coverage explorer
        </h3>
        <span>Illustrative · synthetic data</span>
      </header>
      <div className={styles.sourceControls}>
        <label>
          <input
            type="checkbox"
            checked={unit}
            onChange={(e) => setUnit(e.target.checked)}
          />
          Unit tests
        </label>
        <label>
          <input
            type="checkbox"
            checked={integration}
            onChange={(e) => setIntegration(e.target.checked)}
          />
          Integration tests
        </label>
      </div>
      <div className={styles.editorTitle}>
        <span>controller.ts</span>
        <span role="status">
          {count} / {executable.length} executable lines covered
        </span>
      </div>
      <div
        className={styles.code}
        aria-label="Example code with combined line coverage"
      >
        {lines.map((line, i) => {
          const eligible = executable.includes(i + 1);
          const hit = covered.has(i + 1);
          return (
            <div
              key={i}
              className={`${styles.codeLine} ${eligible ? (hit ? styles.covered : styles.uncovered) : ''}`}
            >
              <span className={styles.lineNo}>{i + 1}</span>
              <span
                className={styles.lineState}
                aria-label={eligible ? (hit ? 'Covered' : 'Uncovered') : 'Not executable'}
              >
                {eligible ? (hit ? '✓' : '×') : '·'}
              </span>
              <code>{line}</code>
            </div>
          );
        })}
      </div>
      <p className={styles.note}>
        This example uses union coverage: a line is covered when any selected source covers it. The
        sample is a concept illustration, not the current VS Code extension. Lines 6 and 10 contain
        only closing braces and are excluded from the total.
      </p>
    </div>
  );
}
