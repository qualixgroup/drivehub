import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

// Componente para atualizar o centro do mapa
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Mock de instrutores próximos
const MOCK_INSTRUCTORS = [
  { id: 1, name: 'Instrutor Carlos', lat: -22.9068, lng: -43.1729, vehicle: 'Gol Branco' },
  { id: 2, name: 'Instrutora Ana', lat: -22.9080, lng: -43.1750, vehicle: 'Onix Prata' },
  { id: 3, name: 'Instrutor Pedro', lat: -22.9050, lng: -43.1710, vehicle: 'HB20 Preto' },
];

const Map = () => {
  const [position, setPosition] = useState<[number, number]>([-22.9068, -43.1729]); // Rio de Janeiro (Centro) default

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Erro ao pegar localização:", err);
        }
      );
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={true} 
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={position} />

        {/* Marcador do Usuário */}
        <Marker position={position}>
          <Popup>
            Você está aqui
          </Popup>
        </Marker>

        {/* Marcadores dos Instrutores (simulando "carrinhos" próximos) */}
        {MOCK_INSTRUCTORS.map(inst => (
            // Pequeno deslocamento aleatório para simular posições relativas se estivermos usando a pos fixa
            <Marker 
                key={inst.id} 
                position={[
                    position[0] + (Math.random() * 0.01 - 0.005), 
                    position[1] + (Math.random() * 0.01 - 0.005)
                ]}
            >
            <Popup>
              <strong>{inst.name}</strong><br/>
              {inst.vehicle}<br/>
              ⭐ 4.9
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default Map;
