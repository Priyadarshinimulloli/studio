'use client';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';

// Helper Interfaces
interface Location {
  lat: number;
  lng: number;
}

interface Supplier {
  id: string;
  name: string;
  position: Location;
  isVerified: boolean;
}

interface GroupOrder {
  id: string;
  product: string;
  position: Location;
  route: Location[];
  nextIndex: number;
}

// Custom icons for markers
const supplierIcon = new Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [32, 32],
});

const groupOrderIcon = new Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
});

const centerPosition = { lat: 28.6139, lng: 77.209 }; // Delhi

// Interpolates movement from current toward next point
function moveTowards(current: Location, target: Location, step: number): Location {
  const latDiff = target.lat - current.lat;
  const lngDiff = target.lng - current.lng;
  const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  if (distance < step) return target;
  return {
    lat: current.lat + (latDiff / distance) * step,
    lng: current.lng + (lngDiff / distance) * step,
  };
}

const LiveMapGeoTracking: React.FC = () => {
  // Example supplier data
  const suppliers: Supplier[] = [
    { id: 'sup1', name: 'Fresh Veggies Co.', position: { lat: 28.619, lng: 77.216 }, isVerified: true },
    { id: 'sup2', name: 'Spice Traders', position: { lat: 28.607, lng: 77.202 }, isVerified: true },
    { id: 'sup3', name: 'Bread & Dough', position: { lat: 28.615, lng: 77.195 }, isVerified: false },
  ];

  // Example group order deliveries and their routes
  const initialOrders: GroupOrder[] = [
    {
      id: 'grp1',
      product: 'Potatoes',
      position: { lat: 28.608, lng: 77.210 },
      route: [
        { lat: 28.608, lng: 77.210 },
        { lat: 28.610, lng: 77.205 },
        { lat: 28.612, lng: 77.200 },
        { lat: 28.615, lng: 77.198 },
      ],
      nextIndex: 1,
    },
    {
      id: 'grp2',
      product: 'Onions',
      position: { lat: 28.620, lng: 77.220 },
      route: [
        { lat: 28.620, lng: 77.220 },
        { lat: 28.618, lng: 77.217 },
        { lat: 28.616, lng: 77.215 },
        { lat: 28.613, lng: 77.210 },
      ],
      nextIndex: 1,
    },
  ];

  const [groupOrders, setGroupOrders] = useState<GroupOrder[]>(initialOrders);
  const stepSize = 0.0004; // How far a marker "travels" per update

  // Animate group order marker movement along routes every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGroupOrders(prevOrders =>
        prevOrders.map(order => {
          if (order.nextIndex >= order.route.length) return order; // Already reached end
          const target = order.route[order.nextIndex];
          const currentPos = order.position;
          const newPos = moveTowards(currentPos, target, stepSize);
          let nextIdx = order.nextIndex;
          if (
            Math.abs(newPos.lat - target.lat) < 0.0001 &&
            Math.abs(newPos.lng - target.lng) < 0.0001
          ) {
            nextIdx = order.nextIndex + 1;
          }
          return { ...order, position: newPos, nextIndex: nextIdx };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={centerPosition} zoom={14} style={{ height: '480px', width: '100%', borderRadius: '14px', margin: '0 auto' }} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Supplier Markers */}
      {suppliers.map(sup => (
        <Marker key={sup.id} position={sup.position} icon={supplierIcon}>
          <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
            {sup.name} {sup.isVerified ? '✅ Verified' : ''}
          </Tooltip>
        </Marker>
      ))}
      {/* Group Order Markers and Routes */}
      {groupOrders.map(order => (
        <React.Fragment key={order.id}>
          <Marker position={order.position} icon={groupOrderIcon}>
            <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
              Delivery: {order.product}
            </Tooltip>
          </Marker>
          <Polyline
            positions={order.route.map(loc => [loc.lat, loc.lng])}
            pathOptions={{ color: '#FF6B6B', weight: 5, dashArray: '8 8' }}
          />
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default LiveMapGeoTracking;
