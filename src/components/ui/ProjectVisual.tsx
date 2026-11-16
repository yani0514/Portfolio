import { useId } from 'react';
import type { ProjectVisual as VisualKind } from '../../data/projects';

export function ProjectVisual({ kind, className = '' }: { kind: VisualKind; className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className={className}
      viewBox="0 0 480 300"
      fill="none"
      role="img"
      aria-label={`${kind} — illustrative project artwork`}
    >
      <defs>
        <linearGradient
          id={`${id}bg`}
          x1="0"
          y1="0"
          x2="480"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#142d40" />
          <stop
            offset="1"
            stopColor="#08131e"
          />
        </linearGradient>
        <radialGradient id={`${id}glow`}>
          <stop
            stopColor="#238cff"
            stopOpacity=".23"
          />
          <stop
            offset="1"
            stopColor="#238cff"
            stopOpacity="0"
          />
        </radialGradient>
        <pattern
          id={`${id}grid`}
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M30 0H0V30"
            stroke="#6388ab"
            strokeOpacity=".12"
          />
        </pattern>
      </defs>
      <rect
        width="480"
        height="300"
        fill={`url(#${id}bg)`}
      />
      <rect
        width="480"
        height="300"
        fill={`url(#${id}grid)`}
      />
      <ellipse
        cx="270"
        cy="160"
        rx="230"
        ry="170"
        fill={`url(#${id}glow)`}
      />
      {kind === 'racing' && (
        <>
          <path
            d="M-30 270C110 280 130 45 280 75S370 300 510 50"
            stroke="#2572a5"
            strokeWidth="38"
            strokeOpacity=".2"
          />
          <path
            d="M-30 270C110 280 130 45 280 75S370 300 510 50"
            stroke="#57b5ff"
            strokeWidth="2"
            strokeDasharray="8 9"
          />
          <g transform="translate(235 170) rotate(-25)">
            <ellipse
              cy="25"
              rx="98"
              ry="40"
              fill="#030a12"
              opacity=".7"
            />
            <rect
              x="-78"
              y="-48"
              width="33"
              height="37"
              rx="7"
              fill="#070f18"
              stroke="#5f7382"
            />
            <rect
              x="-78"
              y="23"
              width="33"
              height="37"
              rx="7"
              fill="#070f18"
              stroke="#5f7382"
            />
            <rect
              x="42"
              y="-48"
              width="33"
              height="37"
              rx="7"
              fill="#070f18"
              stroke="#5f7382"
            />
            <rect
              x="42"
              y="23"
              width="33"
              height="37"
              rx="7"
              fill="#070f18"
              stroke="#5f7382"
            />
            <path
              d="M-56-33H52L66-15V40H-62V-18Z"
              fill="#172e40"
              stroke="#8fc1df"
              strokeWidth="2"
            />
            <rect
              x="-35"
              y="-18"
              width="63"
              height="40"
              rx="4"
              fill="#355267"
              stroke="#698faa"
            />
            <path
              d="M-46 32H49M36-28V30"
              stroke="#389bff"
              strokeWidth="4"
            />
            <rect
              x="-19"
              y="-30"
              width="30"
              height="43"
              rx="4"
              fill="#152333"
            />
            <ellipse
              cx="-4"
              cy="-26"
              rx="20"
              ry="10"
              fill="#b6ccd6"
            />
            <ellipse
              cx="-4"
              cy="-30"
              rx="20"
              ry="10"
              fill="#e6eff1"
            />
            <ellipse
              cx="-4"
              cy="-30"
              rx="7"
              ry="4"
              fill="#1d4c69"
            />
            <path
              d="M55-21H68M55 22H68"
              stroke="#9cdaff"
              strokeWidth="4"
            />
          </g>
          <path
            d="M258 106L350 40M258 106L415 90M258 106L418 170"
            stroke="#2a93d0"
            strokeOpacity=".4"
          />
          <circle
            cx="350"
            cy="40"
            r="4"
            fill="#65c5ff"
          />
        </>
      )}
      {kind === 'coverage' && (
        <>
          <rect
            x="48"
            y="35"
            width="384"
            height="234"
            rx="8"
            fill="#08111c"
            stroke="#396078"
          />
          <path
            d="M48 61H432"
            stroke="#253d50"
          />
          <circle
            cx="64"
            cy="48"
            r="3"
            fill="#658297"
          />
          <circle
            cx="76"
            cy="48"
            r="3"
            fill="#658297"
          />
          <circle
            cx="88"
            cy="48"
            r="3"
            fill="#658297"
          />
          <path
            d="M130 61V269"
            stroke="#253d50"
          />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <g key={i}>
              <rect
                x="65"
                y={81 + i * 21}
                width={40 + (i % 3) * 8}
                height="4"
                rx="2"
                fill="#3c576e"
              />
              <rect
                x="145"
                y={81 + i * 21}
                width="3"
                height="15"
                fill={i === 5 ? '#d48780' : '#4fb2a9'}
              />
              <rect
                x="160"
                y={82 + i * 21}
                width={i === 5 ? 230 : 100 + (i % 3) * 45}
                height="14"
                rx="2"
                fill={i === 5 ? '#873c3a55' : '#28746c40'}
              />
              <path
                d={`M175 ${89 + i * 21}h${25 + (i % 2) * 20}m8 0h${34 + (i % 3) * 19}m10 0h22`}
                stroke={i % 3 === 0 ? '#b4a1e4' : '#78b7ce'}
                strokeWidth="3"
              />
            </g>
          ))}
        </>
      )}
      {kind === 'iot' && (
        <>
          <g transform="translate(65 42)">
            <path
              d="M0 0H350L335 210H15Z"
              fill="#0a1521"
              stroke="#557d98"
              strokeWidth="3"
            />
            <path
              d="M10 210H340L385 227H-30Z"
              fill="#2c4559"
              stroke="#6a8597"
            />
            <rect
              x="20"
              y="20"
              width="310"
              height="171"
              fill="#0c2030"
            />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  x={35 + i * 96}
                  y="40"
                  width="81"
                  height="52"
                  rx="4"
                  fill="#122f42"
                  stroke="#294a60"
                />
                <path
                  d={`M${47 + i * 96} 54h20`}
                  stroke="#6f93ac"
                  strokeWidth="3"
                />
                <path
                  d={`M${47 + i * 96} 73h40`}
                  stroke="#68c9ee"
                  strokeWidth="7"
                />
              </g>
            ))}
            <path
              d="M35 158L58 148L78 159L104 120L127 136L145 130L170 150L196 110L218 129L245 117L265 141L300 108"
              stroke="#4ab5f5"
              strokeWidth="2"
            />
            <path
              d="M35 175H310M35 140H310M35 105H310"
              stroke="#44647c"
              strokeOpacity=".35"
            />
          </g>
        </>
      )}
      {kind === 'artmart' && (
        <>
          <rect
            x="150"
            y="48"
            width="184"
            height="208"
            fill="#182b38"
            stroke="#a4825b"
            strokeWidth="12"
          />
          <rect
            x="170"
            y="69"
            width="144"
            height="165"
            fill="#c8c5b3"
          />
          <path
            d="M170 211L202 122L244 190L275 98L314 186V234H170Z"
            fill="#30576b"
          />
          <circle
            cx="215"
            cy="104"
            r="18"
            fill="#d9a765"
          />
          <path
            d="M47 150H113m-12-12 12 12-12 12M373 150h60m-12-12 12 12-12 12"
            stroke="#5884a3"
          />
        </>
      )}
      {(kind === 'ai' || kind === 'tutti') && (
        <>
          {[70, 150, 230].map((y, i) => (
            <g key={y}>
              <path
                d={`M90 ${y}L240 90M90 ${y}L240 210M240 ${y}L390 150`}
                stroke="#4697c4"
                strokeOpacity=".5"
              />
              <circle
                cx="90"
                cy={y}
                r="16"
                fill="#102b3f"
                stroke="#71b6df"
              />
              <circle
                cx="240"
                cy={y}
                r={i === 1 ? 24 : 16}
                fill="#143950"
                stroke="#5dbdff"
              />
              <circle
                cx="390"
                cy={y}
                r="16"
                fill="#102b3f"
                stroke="#71b6df"
              />
            </g>
          ))}
          <path
            d="M90 70V230M390 70V230"
            stroke="#3d769c"
            strokeDasharray="3 7"
          />
        </>
      )}
      {kind === 'ml' && (
        <>
          <path
            d="M65 40V250H430"
            stroke="#5f839e"
          />
          <path
            d="M75 235C160 235 179 100 250 100S330 70 420 48"
            stroke="#5dbdff"
            strokeWidth="3"
          />
          {Array.from({ length: 25 }, (_, i) => (
            <circle
              key={i}
              cx={85 + i * 13}
              cy={230 - i * 7 + Math.sin(i * 3) * 29}
              r="4"
              fill={i % 3 ? '#5bb5d8' : '#c7a77a'}
              fillOpacity=".8"
            />
          ))}
        </>
      )}
      {kind === 'security' && (
        <>
          <path
            d="M240 42L326 77V148C326 200 288 238 240 258C192 238 154 200 154 148V77Z"
            fill="#0e2b3b"
            stroke="#5aaad4"
            strokeWidth="2"
          />
          <rect
            x="204"
            y="133"
            width="72"
            height="58"
            rx="8"
            fill="#213f53"
            stroke="#87bcd9"
          />
          <path
            d="M217 133V116a23 23 0 0 1 46 0v17"
            stroke="#87bcd9"
            strokeWidth="5"
          />
          <circle
            cx="240"
            cy="157"
            r="6"
            fill="#87cfff"
          />
          <path
            d="M240 163v11M77 110h48M355 110h48M77 190h48M355 190h48"
            stroke="#4688ad"
            strokeWidth="2"
          />
        </>
      )}
      <path
        d="M18 35V18H35M445 18H462V35M18 265V282H35M445 282H462V265"
        stroke="#6da1c4"
        strokeOpacity=".5"
      />
    </svg>
  );
}
