import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para ícones do Leaflet no React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Ícone de Carro (Simulado com SVG simples via DivIcon ou URL externa se necessário, 
// por enquanto mantemos marker padrão mas com cor diferente seria ideal no futuro)
const carIcon = L.divIcon({
  html: '<div style="font-size: 24px;">🚗</div>',
  className: 'dummy-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const userIcon = L.divIcon({
  html: '<div style="background-color: #2563eb; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
  className: 'user-dot',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Componente para atualizar o centro do mapa
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Hook para buscar rota OSRM
const useRoute = (start: [number, number] | null, end: [number, number] | null) => {
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!start || !end) return;

    const fetchRoute = async () => {
      try {
        // OSRM espera lon,lat
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        
        if (data.routes && data.routes[0]) {
          // OSRM retorna [lon, lat], Leaflet precisa de [lat, lon]
          const coords = data.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);
          setRoute(coords);
        }
      } catch (error) {
        console.error("Erro ao buscar rota:", error);
      }
    };

    fetchRoute();
  }, [start, end]);

  return route;
};

// Componente de Rota
const RoutePolyline = ({ start, end }: { start: [number, number], end: [number, number] }) => {
  const route = useRoute(start, end);
  return route.length > 0 ? <Polyline positions={route} color="#2563eb" weight={5} opacity={0.7} /> : null;
};

interface MapProps {
  destination?: [number, number] | null; // Destino opcional para traçar rota
  showInstructors?: boolean;
}

const Map = ({ destination = null, showInstructors = true }: MapProps) => {
  const [position, setPosition] = useState<[number, number]>([-23.5505, -46.6333]); // SP Default

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Erro ao pegar localização:", err);
          // Fallback para SP se falhar
        }
      );
    }
  }, []);

  // Instrutores simulados ao redor da posição do usuário
  const nearbyInstructors = [
    { id: 1, name: 'Carlos', offset: [0.002, 0.002] },
    { id: 2, name: 'Ana', offset: [-0.002, 0.003] },
    { id: 3, name: 'Pedro', offset: [0.001, -0.003] },
  ];

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={true} 
        className="h-full w-full"
        zoomControl={false} // Custom controls ficam melhores no app
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // CartoDB Voyager (mais limpo e moderno)
        />
        
        <MapUpdater center={position} />

        {/* Marcador do Usuário */}
        <Marker position={position} icon={userIcon}>
          <Popup>Você</Popup>
        </Marker>

        {/* Marcador do Destino e Rota */}
        {destination && (
          <>
            <Marker position={destination} />
            <RoutePolyline start={position} end={destination} />
          </>
        )}

        {/* Instrutores próximos (só aparecem se não tiver rota ativa ou se solicitado) */}
        {showInstructors && !destination && nearbyInstructors.map(inst => (
            <Marker 
                key={inst.id} 
                position={[
                    position[0] + inst.offset[0], 
                    position[1] + inst.offset[1]
                ]}
                icon={carIcon}
            >
            <Popup>{inst.name}</Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default Map;
