// add icons to map
  geojson.features.forEach((marker) => {
    // create DOM element for marker
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(popup) // binds popup to this marker
      .addTo(map);
  });