"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { feature } from "topojson-client";
import { getCoords } from "@/lib/geo";
import type { Company } from "@/types";

interface DotDatum {
  id: string;
  lat: number;
  lng: number;
  company: Company;
  isSelected: boolean;
}

export interface AtlasSceneProps {
  companies: Company[];
  selectedId: string | null;
  onSelect: (company: Company) => void;
  onHover: (id: string | null) => void;
  width: number;
  height: number;
}

// World countries topology — unpkg serves with CORS, fetched once at module load.
const COUNTRIES_URL = "https://unpkg.com/world-atlas@2/countries-110m.json";

let cachedFeatures: object[] | null = null;
let cachedPromise: Promise<object[]> | null = null;

function loadCountryFeatures(): Promise<object[]> {
  if (cachedFeatures) return Promise.resolve(cachedFeatures);
  if (cachedPromise) return cachedPromise;
  cachedPromise = fetch(COUNTRIES_URL)
    .then((r) => r.json())
    .then((topo) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const feats = (feature(topo as any, (topo as any).objects.countries) as any).features as object[];
      cachedFeatures = feats;
      return feats;
    })
    .catch(() => []);
  return cachedPromise;
}

export default function AtlasScene({
  companies,
  selectedId,
  onSelect,
  onHover,
  width,
  height,
}: AtlasSceneProps) {
  const globeRef = useRef<any>(null);
  const [countryFeatures, setCountryFeatures] = useState<object[]>(cachedFeatures || []);
  // Hide canvas until camera is at the correct position — the first three-globe frame
  // renders at default (Africa, altitude 2.5), and a visible jump from that to North
  // America at altitude 2.1 reads as a zoom-in. We hide opacity until POV is set.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (cachedFeatures) return;
    loadCountryFeatures().then(setCountryFeatures);
  }, []);

  // Translucent globe — far-hemisphere dots remain visible through the sphere.
  const globeMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: "#161b30",
      emissive: "#0b1024",
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      side: THREE.DoubleSide,
      shininess: 6,
    });
  }, []);

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
    globeRef.current.pointOfView({ lat: 39, lng: -98, altitude: 2.1 }, 0);
    // Wait one animation frame so three-globe paints the corrected camera position
    // before we reveal the canvas. Prevents the visible Africa-to-NA snap on mount.
    requestAnimationFrame(() => setReady(true));
  }, []);

  return (
    <div style={{ opacity: ready ? 1 : 0, transition: "none" }}>
    <Globe
      ref={globeRef}
      width={width}
      height={height}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={globeMaterial}
      // Subtle indigo rim to keep silhouette readable
      showAtmosphere
      atmosphereColor="#a5b4fc"
      atmosphereAltitude={0.05}
      // Hex-tile base layer over continents — gives the sphere visual texture so rotation feels real,
      // and the dotted-Earth aesthetic is the "understated" core of this view.
      hexPolygonsData={countryFeatures}
      hexPolygonResolution={3}
      hexPolygonMargin={0.45}
      hexPolygonUseDots
      hexPolygonAltitude={0.003}
      hexPolygonColor={() => "rgba(99, 102, 241, 0.22)"}
      // Entity dots
      pointsData={dots}
      pointLat="lat"
      pointLng="lng"
      pointAltitude={0.006}
      pointRadius={(d: any) => (d.isSelected ? 0.34 : 0.24)}
      pointColor={(d: any) => (d.isSelected ? "#fafafa" : "rgba(196,205,255,0.95)")}
      pointResolution={12}
      pointsTransitionDuration={0}
      onPointClick={(point: any) => {
        if (point?.company) onSelect(point.company);
      }}
      onPointHover={(point: any) => {
        onHover(point?.id ?? null);
        document.body.style.cursor = point ? "pointer" : "grab";
      }}
    />
    </div>
  );
}
