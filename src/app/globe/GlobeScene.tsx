"use client";

import { useEffect, useMemo, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { getCoords } from "@/lib/geo";
import type { Company } from "@/types";

interface DotDatum {
  id: string;
  lat: number;
  lng: number;
  company: Company;
  isSelected: boolean;
}

export interface GlobeSceneProps {
  companies: Company[];
  selectedId: string | null;
  onSelect: (company: Company) => void;
  onHover: (id: string | null) => void;
  focusCoords: [number, number] | null;
}

export default function GlobeScene({
  companies,
  selectedId,
  onSelect,
  onHover,
  focusCoords,
}: GlobeSceneProps) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Translucent globe — far-hemisphere dots stay visible through the sphere.
  const globeMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: "#1c2240",
      emissive: "#0b1024",
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      side: THREE.DoubleSide,
      shininess: 6,
    });
  }, []);

  // Resolve dots from companies
  const dots = useMemo<DotDatum[]>(() => {
    return companies
      .map((c) => {
        const coords = getCoords(c.city, c.state);
        if (!coords) return null;
        return {
          id: c.id,
          lat: coords[0],
          lng: coords[1],
          company: c,
          isSelected: selectedId === c.id,
        } as DotDatum;
      })
      .filter((d): d is DotDatum => d !== null);
  }, [companies, selectedId]);

  // Globe is static — operator can drag-rotate but no ambient spin
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.12;
      controls.enableRotate = true;
      controls.rotateSpeed = 0.5;
      controls.enableZoom = true;
      controls.zoomSpeed = 0.7;
      controls.enablePan = false;
      controls.minDistance = 280;
      controls.maxDistance = 800;
    }
    // Initial point of view — bias to North America (only set once, no transition on first mount)
    if (!focusCoords) {
      globeRef.current.pointOfView({ lat: 39, lng: -98, altitude: 2.1 }, 0);
    }
  }, [focusCoords]);

  // When focusCoords changes (entity clicked), zoom camera to that point
  useEffect(() => {
    if (!globeRef.current || !focusCoords) return;
    globeRef.current.pointOfView(
      { lat: focusCoords[0], lng: focusCoords[1], altitude: 0.9 },
      1400
    );
  }, [focusCoords]);

  // Track container size for responsive globe
  const dimensions = useMemo(() => {
    if (typeof window === "undefined") return { width: 1200, height: 800 };
    return { width: window.innerWidth, height: window.innerHeight - 56 };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(4, 7, 20, 1)"
        // Translucent dark sphere with a soft indigo rim to keep silhouette readable
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor="#6366f1"
        atmosphereAltitude={0.10}
        // Dots
        pointsData={dots}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.005}
        pointRadius={(d: any) => (d.isSelected ? 0.4 : 0.32)}
        pointColor={(d: any) => (d.isSelected ? "#e0e7ff" : "#a5b4fc")}
        pointResolution={12}
        pointsTransitionDuration={0}
        onPointClick={(point: any) => {
          if (point?.company) onSelect(point.company);
        }}
        onPointHover={(point: any) => {
          onHover(point?.id ?? null);
          document.body.style.cursor = point ? "pointer" : "default";
        }}
      />
    </div>
  );
}
