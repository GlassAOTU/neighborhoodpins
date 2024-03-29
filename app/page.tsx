'use client'

import { useEffect, useRef } from "react";
import styles from "./Home.module.css";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function Home() {
  const boundLimit = [
    [-74.056, 40.535], // southwest coordinates
    [-71.850, 41.197]  // northeast coordinates
  ]

  async function reverseGeocode(longitude: any, latitude: any) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=address&access_token=${process.env.TOKEN}`)
      .then(response => response.json())
      .then(data => {
        // Check if features and context exist in the response
        if (data.features && data.features.length > 0 && data.features[0].context) {
          // Access the `context` array within `features[0]`
          const contextArray = data.features[0].context;

          // Extract the "text" values from each object in the context array
          const textValues = contextArray.map((item: { text: any; }) => item.text);

          // TODO: Remove this printing
          // Now you have an array of "text" values
          console.log(data.features[0]['text']);
          console.log(textValues)

          // You can store `textValues` or do something else with it
        } else {
          console.log('No context data found in the response');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const mapContainer = useRef(null);
  mapboxgl.accessToken = process.env.TOKEN;
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-73.41023123049351, 40.809516255241356],
      zoom: 10,
      maxBounds: boundLimit,
      maxPitch: 0
    });

    console.log("map launched")

    // disable double click to zoom
    map.doubleClickZoom.disable();
    // adds zoom zontrols
    map.addControl(new mapboxgl.NavigationControl())
    // add locate button
    map.addControl(
      new mapboxgl.GeolocateControl({
        mapboxgl: mapboxgl,
        positionOptions: {
          enableHighAccuracy: true,
        }
      })
    );
    // add search bar limiting results to long island
    map.addControl(
      new MapboxGeocoder({
        mapboxgl: mapboxgl,
        accessToken: process.env.TOKEN!,
        bbox: [-73.798552, 40.553910, -71.900128, 41.260419],
      }), 'top-left'
    );

    // on double click
    map.on('dblclick', (e: { lngLat: any; point: any; }) => {
      var coords = e.lngLat;
      var features = map.queryRenderedFeatures(e.point);
      // console.log(coords);

      // check to see if the double click took place on a road
      if (features.length > 0) {
        if ((map.queryRenderedFeatures(e.point))[0].sourceLayer == "road") {

          reverseGeocode(coords['lng'], coords['lat'])

          // create a popup for the marker
          const popup = new mapboxgl.Popup({ offset: 0 })
            .setLngLat(coords)
            .setHTML(`<h2>${coords["lat"]}</h2><h2>${coords["lng"]}</h2>`)
            .addTo(map);

          // make a marker and add it to the map at the clicked location
          const el = document.createElement('div');
          el.id = 'marker';
          new mapboxgl.Marker()
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(map);
        }
      }
    });
  })

  return (
    <main className={styles.main}>
      <div ref={mapContainer} className="map-container" style={{ height: '100vh', width: '100vw' }} />
    </main>
  );
}
