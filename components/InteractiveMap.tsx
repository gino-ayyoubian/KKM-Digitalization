import * as React from 'react';
import type { MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';

declare global {
    interface Window {
        google: any;
        __googleMapsApiCallback: () => void;
    }
}

// Icon configurations
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
    'Head Office': 'M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2z',
    'Branch Office': 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    'Power Generation': 'M7 2v11h3v9l7-12h-4l4-8H7z',
    'Oil & Gas Infrastructure': 'M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58s4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.78c0-1.41.62-2.91 1.76-4.04L12 5.09l4.24 4.65c1.14 1.14 1.76 2.64 1.76 4.04 0 1.41-.62 2.91-1.76 4.04-1.13 1.14-2.64 1.76-4.24 1.76z',
    'Upstream Services': 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z',
    'Industrial Solutions': 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17-.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19-.15-.24-.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49 1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49.42l.38-2.65c.61-.25 1.17-.59-1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22-.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z',
    'Default': 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
};

let mapsApiPromise: Promise<any> | null = null;
const SCRIPT_ID = 'google-maps-api-script';
const MAP_CALLBACK_NAME = '__googleMapsApiCallback';

const loadMapsApi = () => {
    if (mapsApiPromise) {
        return mapsApiPromise;
    }

    mapsApiPromise = new Promise(async (resolve, reject) => {
        const getLibraries = async () => {
            try {
                const [maps, marker] = await Promise.all([
                    window.google.maps.importLibrary('maps'),
                    window.google.maps.importLibrary('marker'),
                ]);
                return { ...maps, ...marker };
            } catch (error) {
                throw error;
            }
        };

        if (window.google?.maps?.importLibrary) {
            getLibraries().then(resolve).catch(reject);
            return;
        }

        window[MAP_CALLBACK_NAME] = () => {
            getLibraries().then(resolve).catch(reject);
            delete window[MAP_CALLBACK_NAME];
        };

        if (document.getElementById(SCRIPT_ID)) {
            // Script is already loading, the callback will be triggered.
            return;
        }
        
        if (!process.env.API_KEY) {
            const error = new Error("Google Maps API Key is missing.");
            console.error(error);
            return reject(error);
        }

        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&v=weekly&loading=async&callback=${MAP_CALLBACK_NAME}`;
        script.async = true;
        script.defer = true;
        script.onerror = (e) => {
            script.remove();
            delete window[MAP_CALLBACK_NAME];
            const error = new Error(`Failed to load Google Maps script. Error: ${e.toString()}`);
            console.error(error);
            mapsApiPromise = null; // Allow retry
            reject(error);
        };
        
        document.head.appendChild(script);
    });

    return mapsApiPromise;
};

interface InteractiveMapProps {
    projects: MapMarker[];
    activeProject: MapMarker | null;
    hoveredProjectName?: string | null;
    onMarkerSelect?: (projectName: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ projects, activeProject, hoveredProjectName, onMarkerSelect }) => {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const [mapIsReady, setMapIsReady] = React.useState(false);
    
    const mapApi = React.useRef<any>(null);
    const mapInstance = React.useRef<any>(null);
    const markers = React.useRef<Map<string, any>>(new Map());
    const infoWindow = React.useRef<any>(null);
    const markerClusterer = React.useRef<any>(null);
    const userLocationMarker = React.useRef<any>(null);
    const pulsingMarkerElement = React.useRef<HTMLElement | null>(null);
    const hoveredMarkerRef = React.useRef<{ name: string; originalZIndex?: number } | null>(null);
    
    const locationButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const locationClickListenerRef = React.useRef<(() => void) | null>(null);
    
    const { t } = useLanguage();

    // Effect 1: Initialization. Runs once.
    React.useEffect(() => {
        const mapElement = mapRef.current;
        if (!mapElement) return;

        let isMounted = true;

        loadMapsApi().then(maps => {
            if (!isMounted || !mapElement) return;

            if (!maps || !maps.Map || !maps.AdvancedMarkerElement || !maps.MarkerClusterer || !maps.PinElement) {
                const error = new Error("Google Maps loaded but required components are missing.");
                console.error(error, maps);
                if (mapElement) mapElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:2rem;color:#c00;background-color:#fdd;">${error.message}</div>`;
                return;
            }

            mapApi.current = {
                Map: maps.Map,
                AdvancedMarkerElement: maps.AdvancedMarkerElement,
                PinElement: maps.PinElement,
                GlyphElement: maps.GlyphElement,
                MarkerClusterer: maps.MarkerClusterer,
                ControlPosition: maps.ControlPosition,
                InfoWindow: maps.InfoWindow,
            };
            const { Map, ControlPosition, InfoWindow } = mapApi.current;
            
            mapInstance.current = new Map(mapElement, {
                center: { lat: 32.4279, lng: 53.6880 },
                zoom: 5,
                mapId: 'KKM_MAP_ID',
                disableDefaultUI: true,
                zoomControl: true,
            });
            
            infoWindow.current = new InfoWindow();
            
            const locationButton = document.createElement("button");
            locationButtonRef.current = locationButton; 
            locationButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#333"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7z"/></svg>`;
            locationButton.title = "Center on my location";
            Object.assign(locationButton.style, { backgroundColor: '#fff', border: 'none', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0,0,0,.3)', cursor: 'pointer', margin: '10px', padding: '8px' });
            mapInstance.current.controls[ControlPosition.RIGHT_BOTTOM].push(locationButton);
            
            const locationClickListener = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(pos => {
                        const userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                        if (!userLocationMarker.current) {
                            const { PinElement, AdvancedMarkerElement } = mapApi.current;
                            const userPin = new PinElement({ background: '#4285F4', borderColor: '#ffffff', glyph: '', scale: 0.8 });
                            userLocationMarker.current = new AdvancedMarkerElement({ content: userPin.element, map: mapInstance.current });
                        }
                        userLocationMarker.current.position = userPos;
                        mapInstance.current.setCenter(userPos);
                        mapInstance.current.setZoom(12);
                    }, () => alert('Geolocation failed.'));
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            };
            locationClickListenerRef.current = locationClickListener; 
            locationButton.addEventListener("click", locationClickListener);

            setMapIsReady(true);

        }).catch(error => {
            console.error("Failed to load and initialize Google Map", error);
            if (mapElement) {
                mapElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:2rem;color:#c00;background-color:#fdd;">${error.message}</div>`;
            }
        });

        return () => {
            isMounted = false;
            
            if (locationButtonRef.current && locationClickListenerRef.current) {
                locationButtonRef.current.removeEventListener('click', locationClickListenerRef.current);
            }
            if (mapInstance.current && mapApi.current && mapInstance.current.controls) {
                try {
                  mapInstance.current.controls[mapApi.current.ControlPosition.RIGHT_BOTTOM].clear();
                } catch(e) {
                  // In case map instance is already destroyed
                }
            }

            if (markerClusterer.current) {
                markerClusterer.current.clearMarkers();
            }

            mapInstance.current = null;
            mapApi.current = null;
            markers.current.clear();
            infoWindow.current = null;
            markerClusterer.current = null;
            userLocationMarker.current = null;
            pulsingMarkerElement.current = null;
            locationButtonRef.current = null;
            locationClickListenerRef.current = null;
            setMapIsReady(false);
        };
    }, []);

    const getInfoWindowContent = React.useCallback((project: MapMarker) => `
        <div style="font-family: 'Open Sans', sans-serif; color: #002D56; padding: 5px; max-width: 250px;">
            <h3 style="font-weight: 700; font-family: 'Montserrat', sans-serif; margin: 0 0 8px 0; font-size: 16px;">${project.name}</h3>
            <p style="font-size: 14px; margin: 0 0 12px 0; line-height: 1.5;">${project.description}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${project.coordinates.lat},${project.coordinates.lng}" target="_blank" rel="noopener noreferrer" style="color: #0A92EF; text-decoration: none; font-weight: bold; font-size: 14px; flex-shrink: 0;">${t('GetDirections')} &rarr;</a>
        </div>
    `, [t]);

    const handleMarkerAnimation = React.useCallback((marker: any) => {
        if (pulsingMarkerElement.current) {
            pulsingMarkerElement.current.classList.remove('animate-marker-pulse');
        }
        if (marker?.content) {
            marker.content.classList.add('animate-marker-pulse');
            pulsingMarkerElement.current = marker.content as HTMLElement;
        } else {
            pulsingMarkerElement.current = null;
        }
    }, []);

    // Effect 2: Update Markers when projects change OR map becomes ready
    React.useEffect(() => {
        if (!mapIsReady || !mapApi.current || !mapInstance.current) return;

        const { AdvancedMarkerElement, PinElement, GlyphElement, MarkerClusterer } = mapApi.current;

        markerClusterer.current?.clearMarkers();
        markers.current.clear();

        const newMarkerInstances = projects.map(project => {
            const categoryKey = project.category || 'Default';
            const color = ICON_COLORS[categoryKey] || ICON_COLORS.Default;
            const path = ICON_PATHS[categoryKey] || ICON_PATHS.Default;
            const pinElement = new PinElement({
                background: color,
                borderColor: '#FFFFFF',
                glyph: new GlyphElement({ path, scale: categoryKey.includes('Office') ? 0.5 : 0.8, strokeWeight: 1, fillColor: '#FFFFFF', fillOpacity: 1 }),
                scale: 1.2
            });

            const marker = new AdvancedMarkerElement({ position: project.coordinates, title: project.name, content: pinElement.element });
            marker.addListener('click', () => onMarkerSelect?.(project.name));
            markers.current.set(project.name, marker);
            return marker;
        });

        markerClusterer.current = new MarkerClusterer({ map: mapInstance.current, markers: newMarkerInstances });

    }, [projects, mapIsReady, onMarkerSelect]);

    // Effect 3: Handle active project selection
    React.useEffect(() => {
        if (!mapIsReady || !mapInstance.current || !infoWindow.current) return;
        
        infoWindow.current.close();
        handleMarkerAnimation(null);

        if (activeProject) {
            mapInstance.current.panTo(activeProject.coordinates);
            const zoomLevel = activeProject.type === 'office' ? 12 : 10;
            if (mapInstance.current.getZoom() < zoomLevel - 2) {
                mapInstance.current.setZoom(zoomLevel);
            }
            const activeMarkerInstance = markers.current.get(activeProject.name);
            if (activeMarkerInstance) {
                handleMarkerAnimation(activeMarkerInstance);
                setTimeout(() => {
                    if (infoWindow.current && mapInstance.current) { // Check again in case of unmount
                        infoWindow.current.setContent(getInfoWindowContent(activeProject));
                        infoWindow.current.open({ map: mapInstance.current, anchor: activeMarkerInstance });
                    }
                }, 300);
            }
        }
    }, [activeProject, mapIsReady, getInfoWindowContent, handleMarkerAnimation]);
    
    // Effect 4: Handle hovered project
    React.useEffect(() => {
        if (!mapIsReady) return;
    
        // Reset previously hovered marker
        if (hoveredMarkerRef.current) {
            const marker = markers.current.get(hoveredMarkerRef.current.name);
            if (marker && marker.content) {
                marker.content.style.transform = '';
                marker.zIndex = hoveredMarkerRef.current.originalZIndex;
            }
            hoveredMarkerRef.current = null;
        }
    
        // Set new hovered marker, but only if it's not the currently active (pulsing) one
        if (hoveredProjectName && hoveredProjectName !== activeProject?.name) {
            const marker = markers.current.get(hoveredProjectName);
            if (marker && marker.content) {
                hoveredMarkerRef.current = { name: hoveredProjectName, originalZIndex: marker.zIndex };
                marker.content.style.transition = 'transform 0.2s ease-out';
                marker.content.style.transform = 'scale(1.4)';
                marker.zIndex = 999;
            }
        }
    }, [hoveredProjectName, activeProject, mapIsReady]);

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default React.memo(InteractiveMap);