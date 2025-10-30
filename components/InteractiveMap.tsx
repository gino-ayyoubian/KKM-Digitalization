import React, { useEffect, useRef, memo, useCallback } from 'react';
import { MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';

declare global {
    interface Window {
        google: any;
        handleViewDetailsClick: (projectName: string) => void;
    }
}

const ICON_COLORS: { [key: string]: string } = {
    'Head Office': '#001A33',
    'Branch Office': '#002D56',
    'Oil & Gas Infrastructure': '#FFC107',
    'Power Generation': '#0A92EF',
    'Upstream Services': '#89CFF0',
    'Industrial Solutions': '#5a646a',
    'Default': '#F85959',
};

const ICON_PATHS: { [key: string]: string } = {
    'Head Office': 'M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2z', // Material Icons 'location_city'
    'Branch Office': 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', // Material Icons 'home'
    'Power Generation': 'M7 2v11h3v9l7-12h-4l4-8H7z', // Material Icons 'flash_on'
    'Oil & Gas Infrastructure': 'M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58s4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.78c0-1.41.62-2.91 1.76-4.04L12 5.09l4.24 4.65c1.14 1.14 1.76 2.64 1.76 4.04 0 1.41-.62 2.91-1.76 4.04-1.13 1.14-2.64 1.76-4.24 1.76z', // Material Icons 'opacity' (water drop)
    'Upstream Services': 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z', // Material Icons 'build'
    'Industrial Solutions': 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49 1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49.42l.38-2.65c.61-.25 1.17-.59-1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z', // Material Icons 'settings'
    'Default': 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z', // Default pin
};

interface InteractiveMapProps {
    projects: MapMarker[];
    activeProject: MapMarker | null;
    onViewDetails?: (projectName: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ projects, activeProject, onViewDetails }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMap = useRef<any | null>(null);
    const markers = useRef<any[]>([]);
    const infoWindow = useRef<any | null>(null);
    const markerClusterer = useRef<any | null>(null);
    const userLocationMarker = useRef<any | null>(null);
    const pulsingMarkerElement = useRef<HTMLElement | null>(null);
    const pulseTimeoutRef = useRef<number | null>(null);
    const { t } = useLanguage();

    const onViewDetailsRef = useRef(onViewDetails);
    useEffect(() => {
        onViewDetailsRef.current = onViewDetails;
    }, [onViewDetails]);

    useEffect(() => {
        window.handleViewDetailsClick = (projectName: string) => {
            onViewDetailsRef.current?.(projectName);
        };
        return () => {
            delete window.handleViewDetailsClick;
        };
    }, []);

    const getInfoWindowContent = (project: MapMarker) => {
        const escapedProjectName = project.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        
        const detailsButtonHtml = project.type === 'project' && onViewDetails
            ? `<button onclick="window.handleViewDetailsClick('${escapedProjectName}')" style="background-color: #FFC107; color: #002D56; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-left: 8px;">${t('ViewCaseStudy')}</button>`
            : '';

        return `
        <div style="font-family: 'Open Sans', sans-serif; color: #002D56; padding: 5px; max-width: 250px;">
            ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.name}" style="width: 100%; height: auto; max-height: 140px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">` : ''}
            <h3 style="font-weight: 700; font-family: 'Montserrat', sans-serif; margin: 0 0 8px 0; font-size: 16px;">${project.name}</h3>
            <p style="font-size: 14px; margin: 0 0 12px 0; line-height: 1.5;">${project.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <a href="https://www.google.com/maps/dir/?api=1&destination=${project.coordinates.lat},${project.coordinates.lng}" target="_blank" rel="noopener noreferrer" style="color: #0A92EF; text-decoration: none; font-weight: bold; font-size: 14px; flex-shrink: 0;">${t('GetDirections')} &rarr;</a>
                ${detailsButtonHtml}
            </div>
        </div>
        `;
    };

    const handleMarkerAnimation = useCallback((marker: any) => {
        // Clear previous animation
        if (pulseTimeoutRef.current) {
            clearTimeout(pulseTimeoutRef.current);
        }
        if (pulsingMarkerElement.current) {
            pulsingMarkerElement.current.classList.remove('animate-marker-pulse');
            pulsingMarkerElement.current = null;
        }

        if (!marker) return;

        const pinElement = marker.content as HTMLElement;
        if (pinElement) {
            pinElement.classList.add('animate-marker-pulse');
            pulsingMarkerElement.current = pinElement;

            // Stop animation after 4 seconds (2 cycles)
            pulseTimeoutRef.current = window.setTimeout(() => {
                pinElement.classList.remove('animate-marker-pulse');
                pulsingMarkerElement.current = null;
                pulseTimeoutRef.current = null;
            }, 4000);
        }
    }, []);

    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current) return;

            if (!window.google?.maps) {
                const scriptId = 'googleMapsScript';
                if (!document.getElementById(scriptId)) {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.id = scriptId;
                        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&loading=async`;
                        script.async = true;
                        script.defer = true;
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                }
            }
            
            while (!window.google?.maps?.Map || !window.google?.maps?.marker?.Marker || !window.google?.maps?.markerclusterer?.MarkerClusterer) {
                 await new Promise(resolve => setTimeout(resolve, 100));
            }

            const { Map } = window.google.maps;
            const { Marker } = window.google.maps.marker;
            const { MarkerClusterer } = window.google.maps.markerclusterer;
            
            if (!googleMap.current) {
                const map = new Map(mapRef.current, {
                    center: { lat: 32.4279, lng: 53.6880 },
                    zoom: 5,
                    mapId: 'KKM_MAP_ID',
                    disableDefaultUI: true,
                    zoomControl: true,
                });
                googleMap.current = map;
                infoWindow.current = new window.google.maps.InfoWindow();
                
                infoWindow.current.addListener('closeclick', () => {
                    handleMarkerAnimation(null); // Clear animation when info window is closed
                });
                
                const locationButton = document.createElement("button");
                locationButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#333"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7z"/></svg>`;
                locationButton.title = "Center on my location";
                Object.assign(locationButton.style, { backgroundColor: '#fff', border: 'none', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0,0,0,.3)', cursor: 'pointer', margin: '10px', padding: '8px' });
                map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
                
                locationButton.addEventListener("click", () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(pos => {
                            const userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                            if (!userLocationMarker.current) {
                                userLocationMarker.current = new Marker({ map, icon: { path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8zM-1-13h2v6h-2zm0 8h2v2h-2z', fillColor: '#4285F4', fillOpacity: 1, strokeWeight: 0, scale: 0.8, anchor: new window.google.maps.Point(12, 12)} });
                            }
                            userLocationMarker.current.position = userPos;
                            map.setCenter(userPos);
                            map.setZoom(12);
                        }, () => alert('Geolocation failed. Please ensure location permissions are enabled for this site.'));
                    } else {
                        alert("Your browser doesn't support geolocation.");
                    }
                });
            }

            if (markerClusterer.current) markerClusterer.current.clearMarkers();
            markers.current.forEach(marker => marker.map = null);

            const newMarkers = projects.map(project => {
                const categoryKey = project.category || 'Default';
                const color = ICON_COLORS[categoryKey] || ICON_COLORS.Default;
                const path = ICON_PATHS[categoryKey] || ICON_PATHS.Default;
                
                 let glyphScale = 0.8;
                 if (categoryKey.includes('Office')) glyphScale = 0.5;
                
                 const pinElement = new window.google.maps.marker.PinElement({
                    background: color,
                    borderColor: '#FFFFFF',
                    glyph: new window.google.maps.marker.GlyphElement({
                        path: path,
                        scale: glyphScale,
                        strokeWeight: 1,
                        fillColor: '#FFFFFF',
                        fillOpacity: 1,
                    }),
                    scale: 1.2
                });

                const marker = new Marker({
                    position: project.coordinates,
                    map: googleMap.current,
                    title: project.name,
                    content: pinElement.element,
                });

                marker.addListener('click', () => {
                    handleMarkerAnimation(marker);
                    infoWindow.current?.setContent(getInfoWindowContent(project));
                    infoWindow.current?.open({
                        map: googleMap.current,
                        anchor: marker
                    });
                });
                return marker;
            });

            markers.current = newMarkers;
            markerClusterer.current = new MarkerClusterer({
                map: googleMap.current,
                markers: newMarkers,
                onClusterClick: (event, cluster, map) => {
                    if (cluster.bounds) {
                        map.fitBounds(cluster.bounds);
                    }
                },
            });
            
        };

        initMap().catch(console.error);
    }, [projects, t, handleMarkerAnimation]);
    
    useEffect(() => {
        if (googleMap.current && activeProject) {
            googleMap.current.panTo(activeProject.coordinates);
            googleMap.current.setZoom(10);

            const activeMarker = markers.current.find(marker => marker.title === activeProject.name);
            if (activeMarker && infoWindow.current) {
                handleMarkerAnimation(activeMarker);
                
                setTimeout(() => {
                    infoWindow.current.setContent(getInfoWindowContent(activeProject));
                    infoWindow.current.open({ map: googleMap.current, anchor: activeMarker });
                }, 300);
            }
        } else {
            infoWindow.current?.close();
            handleMarkerAnimation(null);
        }
    }, [activeProject, handleMarkerAnimation]);

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default memo(InteractiveMap);