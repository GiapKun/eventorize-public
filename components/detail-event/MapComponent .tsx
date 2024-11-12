'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { getCoordinatesFromAddress } from '@/app/api/nominatim';

const customIcon = new L.Icon({
    iconUrl: '/vector.png',
    iconSize: [30, 30],                
    iconAnchor: [15, 30],               
    popupAnchor: [0, -30], 
});

const formatDate = (isoString: string): string => {
    const date = new Date(isoString);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
};

const MapComponent: React.FC<{ fullAddress: string; startDate: string; endDate: string; }> = ({ fullAddress, startDate, endDate }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);


    useEffect(() => {
        const fetchCoordinates = async () => {
            const coords = await getCoordinatesFromAddress(fullAddress);
            if (coords) {
                setPosition([coords[0], coords[1]] as [number, number]);
            }
        };
        fetchCoordinates();
    }, [fullAddress]);

    return (
        <div className="map-wrapper w-full md:w-auto">
            {position && (
                <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", zIndex: 10 }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={customIcon}>
                        <Popup>
                            {fullAddress}
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
            <div className="event-details p-4 bg-gray-100 ">
                <div className="time">
                    <div className="text-gray-700 mb-2 flex items-center">
                        <FaClock className="text-gray-600" />
                        <div className="ml-3 text-sm sm:text-base">
                            <span>Start Time: {formattedStartDate}</span>
                            <div>End Time: {formattedEndDate}</div>
                            <div className="text-green-600 mt-1">Add to calendar</div>
                        </div>
                    </div>
                </div>
                <div className="location text-gray-700 mt-4 flex items-center">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <div className="ml-3 text-sm sm:text-base">
                        <div>{fullAddress}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;