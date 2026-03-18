import { useState, useMemo } from 'react';
import type { TechnologyNode, Sector } from '../../types';
import { sectors } from '../../data/mockData';
import clsx from 'clsx';

interface Props {
  data: TechnologyNode[];
  selectedNode: TechnologyNode | null;
  onNodeSelect: (node: TechnologyNode) => void;
}

export function RadarChart({ data, selectedNode, onNodeSelect }: Props) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // SVG coordinates and sizes
  const SIZE = 800;
  const CENTER = SIZE / 2;
  
  // Timeframe radii
  const RADIUS_0_2 = 120;
  const RADIUS_3_5 = 240;
  const RADIUS_6_10 = 360;

  // Calculate positions deterministically based on sector and timeframe
  const nodePositions = useMemo(() => {
    const positioned: Record<string, { x: number; y: number }> = {};
    
    sectors.forEach((sector: Sector, sectorIndex: number) => {
      const sectorNodes = data.filter(d => d.categoryId === sector.id);
      
      // Calculate angle range for this sector
      const angleStep = (2 * Math.PI) / sectors.length;
      const startAngle = sectorIndex * angleStep - Math.PI / 2; // Start from top
      
      sectorNodes.forEach((node, i) => {
        // Determine radius based on timeframe
        let minR = 0;
        let maxR = 0;
        switch (node.timeframe) {
          case '0-2': minR = 40; maxR = RADIUS_0_2 - 20; break;
          case '3-5': minR = RADIUS_0_2 + 20; maxR = RADIUS_3_5 - 20; break;
          case '6-10': minR = RADIUS_3_5 + 20; maxR = RADIUS_6_10 - 20; break;
        }
        
        // Spread nodes evenly within their sector angle
        const nodeAngleStep = angleStep / (sectorNodes.length + 1);
        const nodeAngle = startAngle + nodeAngleStep * (i + 1);
        
        // Position roughly in the middle of their timeframe band
        const radius = minR + (maxR - minR) / 2;
        
        positioned[node.id] = {
          x: CENTER + radius * Math.cos(nodeAngle),
          y: CENTER + radius * Math.sin(nodeAngle),
        };
      });
    });
    
    return positioned;
  }, [data]);

  return (
    <div className="relative w-full aspect-square max-w-[800px] mx-auto">
      
      <svg 
        viewBox={`0 0 ${SIZE} ${SIZE}`} 
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Circles / Timeframes */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS_6_10} className="fill-white/40 stroke-white/60" strokeWidth="2" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS_3_5} className="fill-white/60 stroke-white/80" strokeWidth="2" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS_0_2} className="fill-white/80 stroke-white" strokeWidth="2" />

        {/* Outer Ring Labels */}
        <text x={CENTER} y={CENTER - RADIUS_6_10 - 15} textAnchor="middle" className="fill-slate-500 text-xs font-bold tracking-widest uppercase">6 - 10 Years</text>
        <text x={CENTER} y={CENTER - RADIUS_3_5 - 15} textAnchor="middle" className="fill-slate-600 text-xs font-bold tracking-widest uppercase">3 - 5 Years</text>
        <text x={CENTER} y={CENTER - RADIUS_0_2 - 15} textAnchor="middle" className="fill-slate-700 text-xs font-bold tracking-widest uppercase">0 - 2 Years</text>

        {/* Sector Background Lines */}
        {sectors.map((_: Sector, i: number) => {
          const angle = (i * 2 * Math.PI) / sectors.length - Math.PI / 2;
          const x2 = CENTER + RADIUS_6_10 * Math.cos(angle);
          const y2 = CENTER + RADIUS_6_10 * Math.sin(angle);
          return (
            <line 
              key={i} 
              x1={CENTER} y1={CENTER} x2={x2} y2={y2} 
              className="stroke-slate-300/50" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Nodes */}
        {data.map((node) => {
          const pos = nodePositions[node.id];
          if (!pos) return null;
          
          const sector = sectors.find((s: Sector) => s.id === node.categoryId);
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNode === node.id;
          
          // Node size based on importance (1 to 5)
          const radius = 6 + (node.importance * 1.5);

          return (
            <g 
              key={node.id}
              className={clsx(
                "transition-all duration-300 cursor-pointer origin-center outline-none",
                isSelected || isHovered ? "scale-110" : "scale-100",
                isSelected ? "opacity-100 ring" : (selectedNode ? "opacity-40" : "opacity-100")
              )}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onNodeSelect(node)}
              transform={`translate(${pos.x}, ${pos.y})`}
            >
              {isSelected && (
                <circle 
                  r={radius + 8} 
                  fill="none" 
                  stroke={sector?.color} 
                  strokeWidth="2" 
                  className="animate-ping opacity-50"
                  cx="0" cy="0"
                />
              )}
              <circle 
                r={radius + 4} 
                fill={sector?.color} 
                opacity="0.2"
                cx="0" cy="0"
              />
              <circle 
                r={radius} 
                fill={sector?.color} 
                filter="url(#glow)"
                className="transition-all duration-300"
                cx="0" cy="0"
              />
              
              {/* Tooltip text inside SVG (Optional, showing names for larger nodes or on hover) */}
              {(isHovered || isSelected) && (
                <text 
                  y={-(radius + 12)}
                  textAnchor="middle" 
                  className="fill-slate-900 text-[13px] font-bold drop-shadow-md pointer-events-none select-none transition-opacity bg-white"
                >
                  {node.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Legend overlays */}
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md border border-white/50 rounded-lg p-4 shadow-lg">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Sectors</h4>
        <div className="space-y-2">
          {sectors.map((sector: Sector) => (
            <div key={sector.id} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></span>
              {sector.name}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
