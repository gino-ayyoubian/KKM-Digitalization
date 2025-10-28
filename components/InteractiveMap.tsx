
import React, { useEffect, useRef, memo } from 'react';
import { MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';

// FIX: Add global declaration for window.google to resolve TypeScript errors
// for the dynamically loaded Google Maps API script.
declare global {
    interface Window {
        google: any;
    }
}

interface InteractiveMapProps {
    projects: MapMarker[];
    activeProject: MapMarker | null;
}

const loadGoogleMapsScript = (callback: () => void) => {
    const existingScript = document.getElementById('googleMapsScript');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`;
        script.id = 'googleMapsScript';
        document.body.appendChild(script);
        script.onload = () => {
            if(window.google) {
                callback();
            }
        };
    } else {
        if(window.google) {
            callback();
        }
    }
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ projects, activeProject }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMap = useRef<any | null>(null);
    const markers = useRef<any[]>([]);
    const infoWindow = useRef<any | null>(null);
    const { t } = useLanguage();

    const getInfoWindowContent = (project: MapMarker) => `
        <div style="font-family: 'Open Sans', sans-serif; color: #002D56; padding: 5px; max-width: 250px;">
            <h3 style="font-weight: 700; font-family: 'Montserrat', sans-serif; margin: 0 0 8px 0; font-size: 16px;">${project.name}</h3>
            <p style="font-size: 14px; margin: 0 0 12px 0; line-height: 1.5;">${project.description}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${project.coordinates.lat},${project.coordinates.lng}" target="_blank" rel="noopener noreferrer" style="color: #0A92EF; text-decoration: none; font-weight: bold; font-size: 14px;">${t('GetDirections')} &rarr;</a>
        </div>
    `;

    useEffect(() => {
        loadGoogleMapsScript(() => {
            if (mapRef.current && !googleMap.current) {
                const map = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 32.4279, lng: 53.6880 }, // Center of Iran
                    zoom: 5,
                    mapId: 'KKM_MAP_ID', 
                });
                googleMap.current = map;
                infoWindow.current = new window.google.maps.InfoWindow();

                markers.current = projects.map(project => {
                    const marker = new window.google.maps.Marker({
                        position: project.coordinates,
                        map,
                        title: project.name,
                    });

                    marker.addListener('click', () => {
                        infoWindow.current?.setContent(getInfoWindowContent(project));
                        infoWindow.current?.open(map, marker);
                    });
                    return marker;
                });
            }
        });
    }, [projects, t]);
    
    useEffect(() => {
        if (googleMap.current && activeProject) {
            googleMap.current.panTo(activeProject.coordinates);
            googleMap.current.setZoom(10);

            const activeMarker = markers.current.find(marker => marker.getTitle() === activeProject.name);

            if (activeMarker && infoWindow.current) {
                infoWindow.current.setContent(getInfoWindowContent(activeProject));
                infoWindow.current.open(googleMap.current, activeMarker);
            }
        }
    }, [activeProject, projects, t]);

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default memo(InteractiveMap);