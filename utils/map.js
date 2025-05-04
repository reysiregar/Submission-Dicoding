import L from 'leaflet';

const initMap = (mapElement, onLocationClick) => {
  const map = L.map(mapElement).setView([51.505, -0.09], 13); // Set to a default location
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  map.on('click', (e) => {
    onLocationClick(e.latlng);
    L.marker(e.latlng).addTo(map)
      .bindPopup('Lokasi Baru')
      .openPopup();
  });
};

export { initMap };