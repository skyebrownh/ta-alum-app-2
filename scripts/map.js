

  // create marker popup
  const popup = new mapboxgl.Popup({ offset: 25 })
    .setText('This is AInc Alumni member text info.');

  // TODO: populate JSON from mongodb

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

  // configure clustering
  // map.on('load', function() {
  //   map.addSource("earthquakes", {
  //     type: "geojson",
  //     data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
  //     cluster: true,
  //     clusterMaxZoom: 14, // Max zoom to cluster points on
  //   });
  //   map.addLayer({
  //     id: "clusters",
  //     type: "circle",
  //     source: "earthquakes",
  //     filter: ["has", "point_count"],
  //     paint: {
  //       // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
  //       // with three steps to implement three types of circles:
  //       //   * Blue, 20px circles when point count is less than 100
  //       //   * Yellow, 30px circles when point count is between 100 and 750
  //       //   * Pink, 40px circles when point count is greater than or equal to 750
  //       "circle-color": [
  //         "step",
  //         ["get", "point_count"],
  //         "#51bbd6",
  //         100,
  //         "#f1f075",
  //         750,
  //         "#f28cb1"
  //       ],
  //       "circle-radius": [
  //         "step",
  //         ["get", "point_count"],
  //         20,
  //         100,
  //         30,
  //         750,
  //         40
  //       ]
  //     }
  //   });
  //   map.addLayer({
  //     id: "cluster-count",
  //     type: "symbol",
  //     source: "earthquakes",
  //     filter: ["has", "point_count"],
  //     layout: {
  //       "text-field": "{point_count_abbreviated}",
  //       "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
  //       "text-size": 12
  //     }
  //   });
  //   map.addLayer({
  //     id: "unclustered-point",
  //     type: "circle",
  //     source: "earthquakes",
  //     filter: ["!", ["has", "point_count"]],
  //     paint: {
  //       "circle-color": "#11b4da",
  //       "circle-radius": 4,
  //       "circle-stroke-width": 1,
  //       "circle-stroke-color": "#fff"
  //     }
  //   });
  //   // inspect a cluster on click
  //   map.on('click', 'clusters', function (e) {
  //     const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
  //     const clusterId = features[0].properties.cluster_id;
  //     map.getSource('earthquakes').getClusterExpansionZoom(clusterId, function (err, zoom) {
  //       if (err) return;
    
  //       map.easeTo({
  //         center: features[0].geometry.coordinates,
  //         zoom: zoom
  //       });
  //     });
  //   });
    
  //   map.on('mouseenter', 'clusters', function () {
  //     map.getCanvas().style.cursor = 'pointer';
  //   });
  //   map.on('mouseleave', 'clusters', function () {
  //     map.getCanvas().style.cursor = '';
  //   });
  // });