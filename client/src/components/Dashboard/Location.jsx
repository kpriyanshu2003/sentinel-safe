import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useStore } from "@/zustand/store";
import { getMetricsHighlighted } from "@/zustand/store";
const Location = ({ data }) => {
  const update = useStore((state) => state.update);
  // const { fetchData } = getMetricsHighlighted();
  const state = getMetricsHighlighted();
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_mapAccessToken;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [85.8161, 20.3555], // starting position [lng, lat]
      zoom: 15,
      // maxBounds: boundsN
    });

    const createGeoJSONCircle = function (center, radiusInKm, points) {
      if (!points) points = 64;
      const coords = {
        latitude: center[1],
        longitude: center[0],
      };

      const km = radiusInKm;

      const ret = [];
      const distanceX =
        km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
      const distanceY = km / 110.574;

      let theta, x, y;
      for (let i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
      }
      ret.push(ret[0]);

      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [ret],
              },
            },
          ],
        },
      };
    };

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places",
      countries: "in",
      autocomplete: false,
    });

    map.addControl(geocoder);

    map.on("style.load", function () {
      fetch("https://sentinel-safe-backend.vercel.app/locmetrics")
        .then((response) => response.json())
        .then((responseData) => {
          console.log("Response Data:", responseData.data);

          const polygonCoordinates = responseData.data.map((item) => ({
            coordinates: [item.longitude, item.latitude],
            color: item.color,
          }));

          const coordinatesArray = polygonCoordinates.map(
            (item) => item.coordinates
          );

          const coordinatesColor = polygonCoordinates.map((item) => item.color);
          console.log("Coordinates Arraydddd:", coordinatesArray);
          // const polygonCoordinatesss = [
          //   [20.354031,85.812629],
          //   [20.3539,85.8136 ],
          //   [20.356502,85.827579],
          //   [20.353293,85.810526 ],
          // ];
          const polygonCoordinatesss = [
            [85.812629, 20.354031],
            [85.8136, 20.3539],
            [85.827579, 20.356502],
            [85.810526, 20.353293],
          ];

          const coordinatesColorrr = ["#06be06", "#03036c", "#0ed1f6", "red"];

          console.log("Coordinates:", polygonCoordinatesss);
          polygonCoordinatesss.forEach((coord, index) => {
            const sourceName = `polygon${index}`;
            map.addSource(sourceName, createGeoJSONCircle(coord, 0.1));

            map.addLayer({
              id: sourceName,
              type: "fill",
              source: sourceName,
              layout: {},
              paint: {
                "fill-color": coordinatesColorrr[index],
                "fill-opacity": 0.4,
              },
            });

            map.on("click", sourceName, function (e) {
              const centerCoordinates = e.lngLat.toArray();

              console.log("Center Coordinates:", centerCoordinates);
              // const state = getMetricsHighlighted();
              // const displayMetrics = state.fetchData(
              //   centerCoordinates[1],
              //   centerCoordinates[0]
              // );
              // console.log("display Metrics:", displayMetrics);
              state.fetchData(centerCoordinates[1], centerCoordinates[0]);
              for (let i = 0; i < polygonCoordinates.length; i++) {
                const coord = polygonCoordinates[i];
                console.log(
                  "Coordinates loop:",
                  coord.coordinates[0],
                  coord.coordinates[1]
                );
                if (
                  coord.coordinates[0] === centerCoordinates[0] &&
                  coord.coordinates[1] === centerCoordinates[1]
                ) {
                  console.log("Match");
                  getMetricsHighlighted
                    .getState()
                    .fetchData(centerCoordinates[1], centerCoordinates[0]);
                  return;
                }
              }

              // If no match found
              console.log("No match found for the clicked coordinates.");
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          throw error;
        });
    });

    map.on("click", function (e) {
      const clickedCoords = e.lngLat.toArray();
      updateCoordinates(clickedCoords);
      const marker = new mapboxgl.Marker().setLngLat(clickedCoords).addTo(map);
    });

    return () => map.remove();
  }, []);

  const updateCoordinates = (clickedCoords) => {
    update(clickedCoords[1], clickedCoords[0]);
  };

  const bears = useStore((state) => state);
  console.log("clicked:", bears);

  return (
    <div id="map" className={`w-full h-full transition-all duration-500`}></div>
  );
};

export default Location;
