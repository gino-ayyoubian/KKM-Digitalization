
import React, { useEffect, useRef, memo } from 'react';
import { Project } from '../types';

// FIX: Add global declaration for window.google to resolve TypeScript errors
// for the dynamically loaded Google Maps API script.
declare global {
    interface Window {
        google: any;
    }
}

interface InteractiveMapProps {
    projects: Project[];
    activeProject: Project | null;
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
    // FIX: Replaced specific google.maps types with `any` to resolve TypeScript errors
    // for the dynamically loaded Google Maps API, which doesn't provide compile-time type info.
    const googleMap = useRef<any | null>(null);
    const markers = useRef<any[]>([]);
    const infoWindow = useRef<any | null>(null);

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
                        const content = `
                            <div style="font-family: sans-serif; color: #002D56;">
                                <h3 style="font-weight: bold; margin: 0 0 5px 0;">${project.name}</h3>
                                <p style="font-size: 13px; margin: 0;">${project.description}</p>
                            </div>
                        `;
                        infoWindow.current?.setContent(content);
                        infoWindow.current?.open(map, marker);
                    });
                    return marker;
                });
            }
        });
    }, [projects]);
    
    useEffect(() => {
        if (googleMap.current && activeProject) {
            googleMap.current.panTo(activeProject.coordinates);
            googleMap.current.setZoom(10);

            const activeMarker = markers.current[projects.findIndex(p => p.name === activeProject.name)];
            if (activeMarker && infoWindow.current) {
                const content = `
                    <div style="font-family: sans-serif; color: #002D56;">
                        <h3 style="font-weight: bold; margin: 0 0 5px 0;">${activeProject.name}</h3>
                        <p style="font-size: 13px; margin: 0;">${activeProject.description}</p>
                    </div>
                `;
                infoWindow.current.setContent(content);
                infoWindow.current.open(googleMap.current, activeMarker);
            }
        }
    }, [activeProject, projects]);

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default memo(InteractiveMap);