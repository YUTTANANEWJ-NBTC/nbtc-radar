import { useState, useMemo, useRef } from 'react';
import type { TechnologyNode, Sector, TimeframeConfig } from '../../types';
import clsx from 'clsx';

interface Props {
  data: TechnologyNode[];
  sectors: Sector[];
  timeframes: TimeframeConfig;
  selectedNode: TechnologyNode | null;
  onNodeSelect: (node: TechnologyNode) => void;
  isInteractive?: boolean;
  onNodeUpdate?: (node: TechnologyNode) => void;
  onTimeframesUpdate?: (newTimeframes: TimeframeConfig) => void;
}

export function RadarChart({ data, sectors, timeframes, selectedNode, onNodeSelect, isInteractive = false, onNodeUpdate, onTimeframesUpdate }: Props) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteractive || !draggingNodeId || !svgRef.current) return;
    
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return;
    
    const x = (e.clientX - CTM.e) / CTM.a;
    const y = (e.clientY - CTM.f) / CTM.d;

    const nodeToUpdate = data.find(n => n.id === draggingNodeId);
    if (nodeToUpdate && onNodeUpdate) {
      onNodeUpdate({
        ...nodeToUpdate,
        customX: x,
        customY: y
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingNodeId && svgRef.current) {
       svgRef.current.releasePointerCapture(e.pointerId);
    }
    setDraggingNodeId(null);
  };

  // SVG coordinates and sizes
  const SIZE = 800;
  const CENTER = SIZE / 2;
  
  // Timeframe radii
  const RADIUS_0_2 = 120;
  const RADIUS_3_5 = 250;
  const RADIUS_6_10 = 380;

  // Calculate positions deterministically based on sector (top/bottom) and timeframe
  const nodePositions = useMemo(() => {
    const positioned: Record<string, { x: number; y: number }> = {};
    
    const satelliteNodes = data.filter(d => d.categoryId === 'satellite_space');
    const audioNodes = data.filter(d => d.categoryId === 'audiovisual_media');
    
    const positionNodes = (nodes: TechnologyNode[], isTop: boolean) => {
      const startAngle = isTop ? Math.PI + 0.15 : 0.15;
      const endAngle = isTop ? 2 * Math.PI - 0.15 : Math.PI - 0.15;
      const angleRange = endAngle - startAngle;
      
      nodes.forEach((node, i) => {
        let minR = 0, maxR = 0;
        switch (node.timeframe) {
          case '0-2': minR = 40; maxR = RADIUS_0_2 - 20; break;
          case '3-5': minR = RADIUS_0_2 + 20; maxR = RADIUS_3_5 - 20; break;
          case '6-10': minR = RADIUS_3_5 + 30; maxR = RADIUS_6_10 - 30; break;
        }
        
        // Stagger distance slightly based on index to avoid perfect circles visually
        const stagger = (i % 2 === 0) ? -10 : 10;
        const radius = minR + (maxR - minR) / 2 + stagger;
        
        const angleStep = angleRange / (nodes.length + 1);
        const nodeAngle = startAngle + angleStep * (i + 1);
        
        positioned[node.id] = {
          x: CENTER + radius * Math.cos(nodeAngle),
          y: CENTER + radius * Math.sin(nodeAngle),
        };
      });
    };
    
    positionNodes(satelliteNodes, true);
    positionNodes(audioNodes, false);
    
    return positioned;
  }, [data]);

  const getImportanceColor = (imp: number) => {
    switch(imp) {
      case 5: return '#5a0710';
      case 4: return '#ce2029';
      case 3: return '#ea5a5a';
      case 2: return '#f4979a';
      default: return '#fadce1';
    }
  };

  const getImportanceRadius = (imp: number) => {
    switch(imp) {
      case 5: return 14;
      case 4: return 10;
      case 3: return 8;
      case 2: return 6;
      default: return 4;
    }
  };

  return (
    <div className="relative w-full max-w-[900px] mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-rose-200 via-purple-100 to-indigo-200 p-8 shadow-2xl border border-white/40 flex flex-col">
      
      {/* Title */}
      <div className="z-10 mb-4 ml-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-4">
          <span className="text-red-600">NBTC</span> 
          <span className="w-1.5 h-10 bg-red-600 inline-block rounded-full"></span>
          2026 Thailand Emerging<br/>Technology Radar
        </h2>
      </div>

      <div className="relative w-full aspect-square">
        <svg 
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`} 
          className={clsx("w-full h-full drop-shadow-xl", isInteractive && "select-none")}
          onPointerMove={isInteractive ? handlePointerMove : undefined}
          onPointerUp={isInteractive ? handlePointerUp : undefined}
          onPointerCancel={isInteractive ? handlePointerUp : undefined}
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

          {/* Top/Bottom Sector Labels */}
          {sectors.find(s => s.id === 'satellite_space') && (
            <text x={CENTER} y={CENTER - RADIUS_6_10 - 20} textAnchor="middle" className="fill-slate-900 text-lg font-bold">กลุ่ม Satellite and Space</text>
          )}
          {sectors.find(s => s.id === 'audiovisual_media') && (
            <text x={CENTER} y={CENTER + RADIUS_6_10 + 35} textAnchor="middle" className="fill-slate-900 text-lg font-bold">กลุ่ม Audiovisual media</text>
          )}

          {/* Background Circles / Timeframes */}
          <circle cx={CENTER} cy={CENTER} r={RADIUS_6_10} className="fill-slate-400/20 stroke-slate-500/20" strokeWidth="1" />
          <circle cx={CENTER} cy={CENTER} r={RADIUS_3_5} className="fill-white/40 stroke-slate-400/30" strokeWidth="1" />
          <circle cx={CENTER} cy={CENTER} r={RADIUS_0_2} className="fill-white/70 stroke-slate-300/40" strokeWidth="1" />

          {/* Horizontal Split Line */}
          <line x1={0} y1={CENTER} x2={SIZE} y2={CENTER} className="stroke-slate-900" strokeWidth="4" />

          {/* Timeframe line labels */}
          <text x={CENTER + RADIUS_0_2 / 2} y={CENTER - 8} textAnchor="middle" className="fill-slate-800 text-sm font-semibold">{timeframes.shortLine}</text>
          <text x={CENTER + RADIUS_0_2 + (RADIUS_3_5 - RADIUS_0_2)/2} y={CENTER - 8} textAnchor="middle" className="fill-slate-800 text-sm font-semibold">{timeframes.mediumLine}</text>
          <text x={CENTER + RADIUS_3_5 + (RADIUS_6_10 - RADIUS_3_5)/2} y={CENTER - 8} textAnchor="middle" className="fill-slate-800 text-sm font-semibold">{timeframes.longLine}</text>

          {/* Nodes */}
          {data.map((node) => {
            const calculatedPos = nodePositions[node.id];
            if (!calculatedPos) return null;
            
            const pos = {
              x: node.customX !== undefined ? node.customX : calculatedPos.x,
              y: node.customY !== undefined ? node.customY : calculatedPos.y,
            };
            
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode === node.id;
            const isDragging = draggingNodeId === node.id;
            
            const radius = getImportanceRadius(node.importance);
            const color = getImportanceColor(node.importance);

            return (
              <g 
                key={node.id}
                className={clsx(
                  "origin-center outline-none touch-none",
                  isInteractive ? "cursor-grab" : "cursor-pointer transition-all duration-300",
                  isInteractive && isDragging ? "cursor-grabbing" : isInteractive ? "transition-all duration-300" : "",
                  (isSelected || isHovered) && !isDragging ? "scale-110" : "scale-100",
                  isSelected ? "opacity-100 ring" : (selectedNode ? "opacity-40" : "opacity-100")
                )}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  if (!isInteractive) onNodeSelect(node);
                }}
                onPointerDown={(e) => {
                  if (!isInteractive) return;
                  e.stopPropagation();
                  onNodeSelect(node);
                  if (svgRef.current) {
                     svgRef.current.setPointerCapture(e.pointerId);
                  }
                  setDraggingNodeId(node.id);
                }}
                transform={`translate(${pos.x}, ${pos.y})`}
              >
                {isSelected && (
                  <circle 
                    r={radius + 8} 
                    fill="none" 
                    stroke={color} 
                    strokeWidth="2" 
                    className="animate-ping opacity-50"
                    cx="0" cy="0"
                  />
                )}
                <circle 
                  r={radius + 4} 
                  fill={color} 
                  opacity="0.1"
                  cx="0" cy="0"
                />
                <circle 
                  r={radius} 
                  fill={color} 
                  className="transition-all duration-300"
                  cx="0" cy="0"
                />
                
                {/* Permanent Labels for nodes to match the image style */}
                <text 
                  x={node.categoryId === 'satellite_space' ? - (radius + 8) : (radius + 8)} 
                  y={4}
                  textAnchor={node.categoryId === 'satellite_space' ? "end" : "start"} 
                  className="fill-slate-900 text-[14px] font-medium drop-shadow-sm pointer-events-none"
                >
                  {node.name.length > 30 ? (
                    <>
                      <tspan x={node.categoryId === 'satellite_space' ? - (radius + 8) : (radius + 8)} dy="-0.6em">
                        {node.name.substring(0, 30)}
                      </tspan>
                      <tspan x={node.categoryId === 'satellite_space' ? - (radius + 8) : (radius + 8)} dy="1.2em">
                        {node.name.substring(30)}
                      </tspan>
                    </>
                  ) : (
                    node.name
                  )}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend overlays */}
      <div className="mt-8 w-full rounded-xl overflow-hidden shadow-lg border border-white/20 relative z-20">
        <div className="bg-gradient-to-r from-indigo-500/80 to-purple-400/80 backdrop-blur-md p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-around gap-8">
          
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-indigo-100">ระยะเวลา (Timeframe)</h4>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/80 border-2 border-white/30 flex items-center justify-center overflow-hidden shrink-0">
                    <div className="w-full h-full bg-white/20 translate-y-1/2 rounded-b-full"></div>
                  </div>
                  {isInteractive ? (
                    <input
                      type="text"
                      value={timeframes.shortLegend}
                      onChange={(e) => onTimeframesUpdate?.({ ...timeframes, shortLegend: e.target.value })}
                      className="bg-indigo-900/40 border border-indigo-300/30 rounded px-2 py-0.5 text-sm w-36 focus:outline-none focus:ring-1"
                    />
                  ) : (
                    <span>{timeframes.shortLegend}</span>
                  )}
                </div>
                {isInteractive && (
                  <div className="flex items-center gap-3 pl-[36px]">
                    <span className="text-xs text-indigo-300/80">Line text:</span>
                    <input
                      type="text"
                      value={timeframes.shortLine}
                      onChange={(e) => onTimeframesUpdate?.({ ...timeframes, shortLine: e.target.value })}
                      className="bg-indigo-900/40 border border-indigo-300/30 rounded px-2 py-0.5 text-xs w-24 focus:outline-none focus:ring-1"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/60 border-2 border-white/30 flex items-center justify-center overflow-hidden shrink-0">
                    <div className="w-full h-full bg-slate-400/20 translate-y-1/2 rounded-b-full"></div>
                  </div>
                  {isInteractive ? (
                    <input
                      type="text"
                      value={timeframes.mediumLegend}
                      onChange={(e) => onTimeframesUpdate?.({ ...timeframes, mediumLegend: e.target.value })}
                      className="bg-indigo-900/40 border border-indigo-300/30 rounded px-2 py-0.5 text-sm w-36 focus:outline-none focus:ring-1"
                    />
                  ) : (
                    <span>{timeframes.mediumLegend}</span>
                  )}
                </div>
                {isInteractive && (
                  <div className="flex items-center gap-3 pl-[36px]">
                    <span className="text-xs text-indigo-300/80">Line text:</span>
                    <input
                      type="text"
                      value={timeframes.mediumLine}
                      onChange={(e) => onTimeframesUpdate?.({ ...timeframes, mediumLine: e.target.value })}
                      className="bg-indigo-900/40 border border-indigo-300/30 rounded px-2 py-0.5 text-xs w-24 focus:outline-none focus:ring-1"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-400/20 border-2 border-slate-400/20 flex items-center justify-center overflow-hidden shrink-0">
                    <div className="w-full h-full bg-transparent"></div>
                  </div>
                  {isInteractive ? (
                    <input
                      type="text"
                      value={timeframes.longLegend}
                      onChange={(e) => onTimeframesUpdate?.({ ...timeframes, longLegend: e.target.value })}
                      className="bg-indigo-900/40 border border-indigo-300/30 rounded px-2 py-0.5 text-sm w-36 focus:outline-none focus:ring-1"
                    />
                  ) : (
                    <span>{timeframes.longLegend}</span>
                  )}
                </div>
                {isInteractive && (
                  <div className="flex items-center gap-3 pl-[36px]">
                    <span className="text-xs text-indigo-300/80">Line text:</span>
                    <input
                      type="text"
                      value={timeframes.longLine}
                      onChange={(e) => onTimeframesUpdate?.({ ...timeframes, longLine: e.target.value })}
                      className="bg-indigo-900/40 border border-indigo-300/30 rounded px-2 py-0.5 text-xs w-24 focus:outline-none focus:ring-1"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-indigo-100">ความสำคัญ (Importance)</h4>
            <div className="space-y-3 text-sm font-medium">
              {[
                { label: 'มีความสำคัญมากที่สุด', score: 5 },
                { label: 'มีความสำคัญมาก', score: 4 },
                { label: 'มีความสำคัญ', score: 3 },
                { label: 'มีความสำคัญน้อย', score: 2 },
                { label: 'มีความสำคัญน้อยที่สุด', score: 1 }
              ].map(item => (
                <div key={item.score} className="flex items-center gap-3">
                  <div className="w-8 flex justify-center">
                    <div 
                      className="rounded-full shrink-0" 
                      style={{ 
                        backgroundColor: getImportanceColor(item.score),
                        width: `${getImportanceRadius(item.score) * 1.5}px`,
                        height: `${getImportanceRadius(item.score) * 1.5}px`
                      }}
                    ></div>
                  </div>
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    <div className="flex text-rose-300 text-[10px]">
                      {Array.from({ length: item.score }).map((_, i) => <span key={i}>★</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
