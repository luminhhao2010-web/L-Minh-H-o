import React, { useEffect, useRef, useState } from 'react';
import { MAP_MARKERS, BIEN_DONG_CENTER } from '../data/mapData';
import { MapMarkerItem, MarkerCategory } from '../types';
import { MascotKienSang } from './MascotKienSang';
import { 
  Compass, 
  Layers, 
  MapPin, 
  Anchor, 
  Handshake, 
  Droplet, 
  Info, 
  Maximize2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Coins,
  CheckCircle2,
  X
} from 'lucide-react';
import { playTingTingSound, playClickSound } from '../utils/audio';

// Leaflet is imported dynamically or via window.L
import L from 'leaflet';

interface TabMapProps {
  visitedMarkers: string[];
  onVisitMarker: (markerId: string) => void;
  onRewardCoins?: (amount: number, id: string) => void;
}

export const TabMap: React.FC<TabMapProps> = ({ visitedMarkers, onVisitMarker }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const overlaysLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const nauticalOverlayRef = useRef<L.ImageOverlay | null>(null);
  const seamarkLayerRef = useRef<L.TileLayer | null>(null);

  const [activeCategory, setActiveCategory] = useState<MarkerCategory | 'all'>('all');
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerItem | null>(null);
  const [mapType, setMapType] = useState<'carto' | 'ocean' | 'satellite'>('carto');
  const [showChartImageModal, setShowChartImageModal] = useState(false);
  const [chartOpacity, setChartOpacity] = useState<number>(0.85);

  // Sync nautical chart opacity
  useEffect(() => {
    if (nauticalOverlayRef.current) {
      nauticalOverlayRef.current.setOpacity(chartOpacity);
    }
  }, [chartOpacity]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: [BIEN_DONG_CENTER.lat, BIEN_DONG_CENTER.lng],
      zoom: 5,
      minZoom: 4,
      maxZoom: 12,
      zoomControl: false,
    });

    // Custom Zoom control at top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Attribution
    map.attributionControl.setPrefix('Bản đồ Biển Đông • Chuyên đề Địa lí 11');

    mapInstanceRef.current = map;
    markersLayerGroupRef.current = L.layerGroup().addTo(map);
    overlaysLayerGroupRef.current = L.layerGroup().addTo(map);

    // Initial base tile layer (Hải đồ)
    updateBaseTile('carto', map);

    // Add maritime zones and agreements overlays
    addMaritimeOverlays();

    // Clean up
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer
  const updateBaseTile = (type: 'carto' | 'ocean' | 'satellite', mapObj?: L.Map) => {
    const map = mapObj || mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Remove existing nautical chart overlays if any
    if (nauticalOverlayRef.current) {
      map.removeLayer(nauticalOverlayRef.current);
      nauticalOverlayRef.current = null;
    }
    if (seamarkLayerRef.current) {
      map.removeLayer(seamarkLayerRef.current);
      seamarkLayerRef.current = null;
    }

    let tileUrl = '';
    let attribution = '';

    if (type === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri &mdash; Earthstar Geographics';
    } else if (type === 'ocean') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri World Ocean Base';
    } else {
      // CartoDB Voyager clear nautical style
      tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
    }

    L.tileLayer(tileUrl, {
      maxZoom: 18,
      attribution,
      subdomains: 'abcd',
    }).addTo(map);

    // If 'carto' (Hải đồ số), re-add the high-res nautical chart image layer & seamarks
    if (type === 'carto') {
      const nauticalBounds: L.LatLngBoundsExpression = [
        [0.8, 100.0],   // Nam Biển Đông (Natuna, Malacca, Singapore)
        [24.8, 122.0]   // Bắc Biển Đông (Eo biển Đài Loan, Vịnh Bắc Bộ)
      ];

      const overlay = L.imageOverlay('/nautical-chart-bien-dong.jpg', nauticalBounds, {
        opacity: chartOpacity,
        interactive: false,
        zIndex: 2,
        alt: 'Hình hải đồ số Biển Đông'
      }).addTo(map);
      nauticalOverlayRef.current = overlay;

      const seamarks = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        maxZoom: 18,
        opacity: 0.8,
        attribution: '&copy; <a href="https://www.openseamap.org">OpenSeaMap</a>'
      }).addTo(map);
      seamarkLayerRef.current = seamarks;
    }
  };

  // Add Special Legal & Agreement Overlays
  const addMaritimeOverlays = () => {
    const overlayGroup = overlaysLayerGroupRef.current;
    if (!overlayGroup) return;
    overlayGroup.clearLayers();

    // 1. Vùng đánh cá chung Vịnh Bắc Bộ (Hiệp định 25/12/2000)
    // Giới hạn từ đường đóng cửa vịnh đến vĩ tuyến 20°B, cách đường phân định 30.5 hải lý mỗi bên
    const tonkinFishingPolygon = L.polygon([
      [20.0, 107.0],
      [20.0, 108.6],
      [18.0, 107.8],
      [17.4, 107.3],
      [17.4, 106.8],
      [18.5, 106.5],
    ], {
      color: '#00E5FF',
      weight: 2,
      dashArray: '5, 8',
      fillColor: '#00E5FF',
      fillOpacity: 0.15,
    });
    tonkinFishingPolygon.bindTooltip('Vùng Đánh Cá Chung Vịnh Bắc Bộ (Hiệp định 25/12/2000)', {
      sticky: true,
      className: 'bg-slate-900/90 text-cyan-300 font-bold border border-cyan-400 text-xs px-2 py-1 rounded shadow-lg'
    });
    overlayGroup.addLayer(tonkinFishingPolygon);

    // 2. Tuyến vận tải hàng hải quốc tế qua Biển Đông
    const shippingRoute = L.polyline([
      [1.3, 103.8],   // Singapore
      [4.0, 105.5],
      [8.0, 109.5],
      [12.5, 112.5],
      [16.5, 116.0],
      [20.5, 119.5],  // Eo biển Đài Loan / Luzon
    ], {
      color: '#FFD700',
      weight: 2.5,
      dashArray: '6, 10',
      opacity: 0.8,
    });
    shippingRoute.bindTooltip('Tuyến Hàng Hải Quốc Tế Huyết Mạch (Thái Bình Dương - Ấn Độ Dương)', {
      sticky: true,
      className: 'bg-slate-900/90 text-yellow-300 font-bold border border-yellow-400 text-xs px-2 py-1 rounded shadow-lg'
    });
    overlayGroup.addLayer(shippingRoute);

    // 3. Vùng nước lịch sử Việt Nam - Campuchia (1982)
    const historicWaters = L.polygon([
      [10.3, 103.5],
      [10.4, 104.2],
      [9.8, 103.9],
      [9.7, 103.4],
    ], {
      color: '#A855F7',
      weight: 2,
      dashArray: '4, 6',
      fillColor: '#A855F7',
      fillOpacity: 0.18,
    });
    historicWaters.bindTooltip('Vùng Nước Lịch Sử Việt Nam - Campuchia (Hiệp định 1982)', {
      sticky: true,
      className: 'bg-slate-900/90 text-purple-300 font-bold border border-purple-400 text-xs px-2 py-1 rounded shadow-lg'
    });
    overlayGroup.addLayer(historicWaters);
  };

  // Render Markers on Map based on filter
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersLayerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    const filtered = activeCategory === 'all' 
      ? MAP_MARKERS 
      : MAP_MARKERS.filter(m => m.category === activeCategory);

    filtered.forEach((markerData) => {
      const isVisited = visitedMarkers.includes(markerData.id);
      
      // Determine Icon Style based on category & sovereignty
      let iconHtml = '';
      let markerColor = '#00E5FF';
      let iconSymbol = '📍';

      if (markerData.category === 'sovereignty') {
        markerColor = '#EF4444'; // Red sovereignty
        iconSymbol = '⭐';
      } else if (markerData.category === 'cooperation') {
        markerColor = '#10B981'; // Green cooperation
        iconSymbol = '🤝';
      } else if (markerData.category === 'ports') {
        markerColor = '#3B82F6'; // Blue ports
        iconSymbol = '⚓';
      } else if (markerData.category === 'resources') {
        markerColor = '#F59E0B'; // Amber resources
        iconSymbol = '🛢️';
      }

      iconHtml = `
        <div class="relative flex items-center justify-center transform transition-transform duration-300 hover:scale-125 cursor-pointer group">
          <div class="absolute -inset-1.5 rounded-full blur-sm opacity-70 animate-pulse" style="background-color: ${markerColor}"></div>
          <div class="relative w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-xl text-sm" style="background-color: ${markerColor}">
            ${iconSymbol}
          </div>
          ${markerData.category === 'sovereignty' ? `
            <div class="absolute -top-6 whitespace-nowrap bg-red-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow-lg border border-yellow-300 pointer-events-none">
              ${markerData.name} (Việt Nam)
            </div>
          ` : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([markerData.lat, markerData.lng], { icon: customIcon });

      // Click Event
      marker.on('click', () => {
        playClickSound();
        setSelectedMarker(markerData);
        if (!visitedMarkers.includes(markerData.id)) {
          onVisitMarker(markerData.id);
          playTingTingSound();
        }
      });

      // Hover Tooltip
      marker.bindTooltip(`
        <div class="font-bold text-xs text-white">${markerData.name}</div>
        <div class="text-[10px] text-cyan-200">${markerData.subtitle}</div>
        ${markerData.sovereigntyNotice ? `<div class="text-[10px] text-red-300 font-semibold mt-0.5">${markerData.sovereigntyNotice}</div>` : ''}
      `, {
        direction: 'top',
        offset: [0, -14],
        className: 'bg-slate-900/95 border border-cyan-500/50 p-2 rounded-lg shadow-xl'
      });

      layerGroup.addLayer(marker);
    });
  }, [activeCategory, visitedMarkers, onVisitMarker]);

  // Quick Map Navigation Helper
  const flyToLocation = (lat: number, lng: number, zoom: number = 7) => {
    playClickSound();
    mapInstanceRef.current?.flyTo([lat, lng], zoom, { duration: 1.2 });
  };

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[580px] flex flex-col bg-[#0A2540] overflow-hidden">
      {/* Map Control Bar / Quick Filters */}
      <div className="z-20 bg-[#0A2540]/90 border-b border-cyan-500/20 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 backdrop-blur-md">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-xs font-bold text-cyan-300 mr-1 hidden sm:inline flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Lớp hiển thị:
          </span>
          {[
            { id: 'all', label: 'Tất cả', count: MAP_MARKERS.length, color: 'bg-slate-800' },
            { id: 'sovereignty', label: 'Chủ quyền Hoàng Sa - Trường Sa', count: 2, color: 'bg-red-500/20 text-red-300 border-red-500/40' },
            { id: 'cooperation', label: 'Hợp tác Hòa bình (Vịnh Bắc Bộ, v.v.)', count: 4, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
            { id: 'ports', label: 'Cảng biển & Tuyến Hàng hải', count: 4, color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
            { id: 'resources', label: 'Tài nguyên & Thủy sản', count: 2, color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => { playClickSound(); setActiveCategory(cat.id as any); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Quick Zoom Buttons & Map Tiles */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Tile Selector */}
          <div className="flex items-center rounded-lg bg-slate-900/80 p-0.5 border border-white/10 text-xs">
            <button
              onClick={() => { playClickSound(); setMapType('carto'); updateBaseTile('carto'); }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                mapType === 'carto' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hải đồ
            </button>
            <button
              onClick={() => { playClickSound(); setMapType('ocean'); updateBaseTile('ocean'); }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                mapType === 'ocean' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Đại dương
            </button>
            <button
              onClick={() => { playClickSound(); setMapType('satellite'); updateBaseTile('satellite'); }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                mapType === 'satellite' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vệ tinh
            </button>
          </div>

          {/* Special Quick Action for Nautical Chart Image */}
          {mapType === 'carto' && (
            <button
              onClick={() => { playClickSound(); setShowChartImageModal(true); }}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/50 text-cyan-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-cyan-500/10"
              title="Phóng to xem hình Hải đồ gốc chi tiết"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Xem hình Hải đồ</span>
            </button>
          )}

          {/* Quick Focus Landmarks */}
          <button
            onClick={() => flyToLocation(16.5, 112.0, 7)}
            className="px-2.5 py-1 rounded-lg bg-red-600/30 hover:bg-red-600/50 border border-red-500/50 text-red-200 text-xs font-bold transition-all"
            title="Đến Quần đảo Hoàng Sa (TP. Đà Nẵng)"
          >
            Hoàng Sa
          </button>
          <button
            onClick={() => flyToLocation(9.0, 113.5, 7)}
            className="px-2.5 py-1 rounded-lg bg-red-600/30 hover:bg-red-600/50 border border-red-500/50 text-red-200 text-xs font-bold transition-all"
            title="Đến Quần đảo Trường Sa (Tỉnh Khánh Hòa)"
          >
            Trường Sa
          </button>
          <button
            onClick={() => flyToLocation(19.5, 107.5, 6)}
            className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs font-bold transition-all hidden md:inline"
            title="Đến Vịnh Bắc Bộ (Hiệp định 2000)"
          >
            Vịnh Bắc Bộ
          </button>
          <button
            onClick={() => flyToLocation(BIEN_DONG_CENTER.lat, BIEN_DONG_CENTER.lng, 5)}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all"
            title="Xem toàn cảnh Biển Đông"
          >
            Toàn cảnh
          </button>
        </div>
      </div>

      {/* Map Display Frame */}
      <div className="relative flex-1 w-full h-full">
        {/* Leaflet Map DOM Element */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Nautical Chart Quick Control Bar (when 'carto' - Hải đồ is active) */}
        {mapType === 'carto' && (
          <div className="absolute top-4 right-14 z-20 bg-slate-900/90 border border-cyan-500/40 rounded-xl px-3 py-2 shadow-2xl backdrop-blur-md text-xs hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hải đồ số:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">Độ mờ:</span>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={chartOpacity}
                onChange={(e) => setChartOpacity(parseFloat(e.target.value))}
                className="w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                title={`Độ đậm hải đồ: ${Math.round(chartOpacity * 100)}%`}
              />
              <span className="text-[10px] text-cyan-200 font-mono w-7 text-right">
                {Math.round(chartOpacity * 100)}%
              </span>
            </div>
            <button
              onClick={() => { playClickSound(); setShowChartImageModal(true); }}
              className="px-2 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 border border-cyan-400/30 text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <Maximize2 className="w-3 h-3 text-cyan-300" />
              <span>Xem ảnh gốc</span>
            </button>
          </div>
        )}

        {/* Floating Guide Badge with Mascot Kiến Sáng */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-3 shadow-2xl backdrop-blur-md max-w-xs pointer-events-auto flex items-center gap-3">
          <div className="flex-shrink-0">
            <MascotKienSang size={50} expression="waving" />
          </div>
          <div className="text-xs text-slate-200">
            <div className="font-bold text-cyan-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Bản đồ số tương tác
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Bấm vào các điểm Marker trên bản đồ để mở tư liệu Chuyên đề Địa lí 11 và nhận <span className="text-yellow-400 font-bold">+5 Xu</span>!
            </p>
          </div>
        </div>

        {/* Legend Box */}
        <div className="absolute top-4 left-4 z-20 bg-slate-900/90 border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-md hidden sm:block text-xs">
          <div className="font-bold text-white mb-2 flex items-center gap-1.5 border-b border-white/10 pb-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> Chú giải Địa danh & Pháp lý
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-red-300">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-white"></span>
              <span>Chủ quyền Hoàng Sa & Trường Sa (Việt Nam)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
              <span>Vùng Hợp tác Hòa bình (Vịnh Bắc Bộ 2000)</span>
            </div>
            <div className="flex items-center gap-2 text-blue-300">
              <span className="w-3 h-3 rounded-full bg-blue-500 border border-white"></span>
              <span>Hệ thống Cảng biển lớn (SGK Địa lí 11)</span>
            </div>
            <div className="flex items-center gap-2 text-amber-300">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
              <span>Tài nguyên Dầu khí & Ngư trường</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-300 pt-1 border-t border-white/10">
              <span className="w-4 h-0.5 bg-yellow-400 border-dashed"></span>
              <span>Tuyến hàng hải quốc tế huyết mạch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Marker Detail Modal / Drawer */}
      {selectedMarker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0A2540] via-[#0D3059] to-[#081B30] border border-cyan-400/50 rounded-2xl shadow-2xl overflow-hidden text-white max-h-[90vh] flex flex-col">
            {/* Top Accent bar */}
            <div className={`h-2 ${
              selectedMarker.category === 'sovereignty' 
                ? 'bg-gradient-to-r from-red-500 via-yellow-400 to-red-600' 
                : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400'
            }`} />

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    selectedMarker.category === 'sovereignty'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  }`}>
                    {selectedMarker.badge}
                  </span>
                  <span className="text-xs text-slate-400">
                    Tọa độ: {selectedMarker.lat}°B, {selectedMarker.lng}°Đ
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  {selectedMarker.name}
                  {selectedMarker.category === 'sovereignty' && (
                    <span className="text-yellow-400 text-base">🇻🇳</span>
                  )}
                </h3>
                {selectedMarker.sovereigntyNotice && (
                  <p className="text-sm font-bold text-red-400 mt-0.5">
                    {selectedMarker.sovereigntyNotice}
                  </p>
                )}
                <p className="text-xs text-cyan-200/80 mt-1">
                  {selectedMarker.subtitle}
                </p>
              </div>

              <button
                onClick={() => { playClickSound(); setSelectedMarker(null); }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                title="Đóng"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm no-scrollbar">
              {/* Overview Card */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-slate-200 leading-relaxed">
                  {selectedMarker.description}
                </p>
              </div>

              {/* Grid of Details based on Textbook */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                  <div className="text-xs font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Vị trí địa lí & Không gian
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMarker.details.geography}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                  <div className="text-xs font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cơ sở Pháp lý & UNCLOS 1982
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMarker.details.legalStatus}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20">
                  <div className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-amber-400" /> Tiềm năng Kinh tế Biển
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMarker.details.economicPotential}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-purple-500/20">
                  <div className="text-xs font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                    <Handshake className="w-3.5 h-3.5 text-purple-400" /> Ý nghĩa Hợp tác Hòa bình
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMarker.details.peacefulCooperation}
                  </p>
                </div>
              </div>

              {/* Key Facts from Textbook */}
              {selectedMarker.details.keyFacts.length > 0 && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                  <div className="text-xs font-bold text-cyan-200 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Dữ liệu trọng tâm cần nhớ (SGK Địa lí 11):
                  </div>
                  <ul className="space-y-1.5">
                    {selectedMarker.details.keyFacts.map((fact, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Kiến Sáng Note */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 flex items-center gap-3">
                <MascotKienSang size={46} expression="thinking" />
                <div className="text-xs text-orange-200">
                  <span className="font-bold text-orange-300">Lời khuyên từ Kiến Sáng: </span>
                  Hãy ghi nhớ địa danh này để chuẩn bị làm tốt các câu hỏi trong Trạm Hải Đăng trắc nghiệm nhé!
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-slate-900/60 flex items-center justify-between">
              <div className="text-xs text-emerald-300 flex items-center gap-1.5 font-semibold">
                <Coins className="w-4 h-4 text-yellow-400" /> Đã ghi nhận khám phá (+5 Xu thưởng)
              </div>
              <button
                onClick={() => { playClickSound(); setSelectedMarker(null); }}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Tiếp tục quan sát bản đồ
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Full-screen Nautical Chart Image Modal */}
      {showChartImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#0A2540] via-[#0D3059] to-[#081B30] border border-cyan-400/50 rounded-2xl shadow-2xl overflow-hidden text-white max-h-[94vh] flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    Hình Hải đồ Số Biển Đông & Vùng Biển Lân Cận
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      Chuyên đề Địa lí 11
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Bản đồ địa hình đáy biển, độ sâu đẳng sâu, tọa độ hàng hải và Quần đảo Hoàng Sa - Trường Sa (Việt Nam)
                  </p>
                </div>
              </div>
              <button
                onClick={() => { playClickSound(); setShowChartImageModal(false); }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Body with Zoom/Scroll */}
            <div className="relative flex-1 overflow-auto p-4 bg-slate-950/90 flex items-center justify-center min-h-[350px]">
              <img
                src="/nautical-chart-bien-dong.jpg"
                alt="Hải đồ số Biển Đông"
                className="max-w-full max-h-[66vh] object-contain rounded-xl shadow-2xl border border-white/15"
              />
            </div>

            {/* Footer with Key Info */}
            <div className="px-5 py-3.5 border-t border-white/10 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2 text-slate-300">
                <span className="flex items-center gap-1.5 text-red-300 font-bold bg-red-950/50 px-2 py-1 rounded border border-red-500/30">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Hoàng Sa & Trường Sa thuộc chủ quyền Việt Nam
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-300">Phạm vi: 3°N - 26°B | 100° - 121°Đ</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-300">Độ sâu TB: 1.212m (Hố sâu Manila: 5.559m)</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/nautical-chart-bien-dong.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Mở ảnh gốc kích thước lớn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
