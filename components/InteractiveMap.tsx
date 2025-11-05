import React, { useEffect, useRef, memo, useCallback } from 'react';
import { MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';

declare global {
    interface Window {
        google: any;
        markerClusterer: any; // Add markerClusterer to the window interface
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
    'Industrial Solutions': 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49 1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49.42l.38-2.65c.61-.25 1.17-.59-1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22-.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z', // Material Icons 'settings'
    'Default': 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z', // Default pin
};

interface InteractiveMapProps {
    projects: MapMarker[];
    activeProject: MapMarker | null;
    onMarkerSelect?: (projectName: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ projects, activeProject, onMarkerSelect }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMap = useRef<any | null>(null);
    const markers = useRef<any[]>([]);
    const infoWindow = useRef<any | null>(null);
    const markerClusterer = useRef<any | null>(null);
    const userLocationMarker = useRef<any | null>(null);
    const pulsingMarkerElement = useRef<HTMLElement | null>(null);
    const { t } = useLanguage();

    const getInfoWindowContent = (project: MapMarker) => {
        return `
        <div style="font-family: 'Open Sans', sans-serif; color: #002D56; padding: 5px; max-width: 250px;">
            <h3 style="font-weight: 700; font-family: 'Montserrat', sans-serif; margin: 0 0 8px 0; font-size: 16px;">${project.name}</h3>
            <p style="font-size: 14px; margin: 0 0 12px 0; line-height: 1.5;">${project.description}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${project.coordinates.lat},${project.coordinates.lng}" target="_blank" rel="noopener noreferrer" style="color: #0A92EF; text-decoration: none; font-weight: bold; font-size: 14px; flex-shrink: 0;">${t('GetDirections')} &rarr;</a>
        </div>
        `;
    };

    const handleMarkerAnimation = useCallback((marker: any) => {
        // Clear previous animation
        if (pulsingMarkerElement.current) {
            pulsingMarkerElement.current.classList.remove('animate-marker-pulse');
            pulsingMarkerElement.current = null;
        }

        if (!marker) return;

        // Apply new animation
        const pinElement = marker.content as HTMLElement;
        if (pinElement) {
            pinElement.classList.add('animate-marker-pulse');
            pulsingMarkerElement.current = pinElement;
        }
    }, []);

    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current) return;

            const loadScript = (src: string, id: string) => {
                return new Promise<void>((resolve, reject) => {
                    let script = document.getElementById(id) as HTMLScriptElement;
                    if (script && script.dataset.loaded) {
                        return resolve();
                    }
                    if (script && !script.dataset.loaded) {
                        const onLoad = () => resolve();
                        const onError = (e: any) => reject(e);
                        script.addEventListener('load', onLoad);
                        script.addEventListener('error', onError);
                        return;
                    }

                    script = document.createElement('script');
                    script.id = id;
                    script.src = src;
                    script.async = true;
                    script.defer = true;
                    script.onload = () => {
                        script.dataset.loaded = 'true';
                        resolve();
                    };
                    script.onerror = (error) => {
                        console.error(`Error loading script: ${src}`, error);
                        reject(error);
                    };
                    document.head.appendChild(script);
                });
            };

            try {
                await Promise.all([
                    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&v=weekly`, 'googleMapsScript'),
                    loadScript('https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js', 'markerClustererScript')
                ]);
            } catch (error) {
                if (mapRef.current) {
                    mapRef.current.innerHTML = '<div style="text-align: center; padding: 2rem;">Error loading map components. Please try again.</div>';
                }
                console.error('Failed to load map scripts:', error);
                return;
            }

            const { Map } = await window.google.maps.importLibrary("maps");
            const { AdvancedMarkerElement: Marker, PinElement, GlyphElement } = await window.google.maps.importLibrary("marker");
            const { MarkerClusterer } = window.markerClusterer;
            
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
                    handleMarkerAnimation(null);
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
                                const userPin = new PinElement({
                                    background: '#4285F4',
                                    borderColor: '#ffffff',
                                    glyph: '',
                                    scale: 0.8
                                });
                                userLocationMarker.current = new Marker({ content: userPin.element });
                                userLocationMarker.current.map = map;
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
                
                 const pinElement = new PinElement({
                    background: color,
                    borderColor: '#FFFFFF',
                    glyph: new GlyphElement({
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
                    title: project.name,
                    content: pinElement.element,
                });

                marker.addListener('click', () => {
                    onMarkerSelect?.(project.name);
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
    }, [projects, t, onMarkerSelect, handleMarkerAnimation]);
    
    useEffect(() => {
        if (googleMap.current && activeProject) {
            googleMap.current.panTo(activeProject.coordinates);
            
            const zoomLevel = activeProject.type === 'office' ? 12 : 10;
            if (googleMap.current.getZoom() < zoomLevel - 2) {
                googleMap.current.setZoom(zoomLevel);
            }

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