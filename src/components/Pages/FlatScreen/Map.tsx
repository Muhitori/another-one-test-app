import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filler from './Filler';
import useStyles from './styles';

type Map = google.maps.Map;

interface Coordinates {
  lat: number;
  lng: number;
}

interface Params {
  placeId?: string;
}

const setMarker = (coordinates: Coordinates, map: Map) => {
  const svgMarker = {
    url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    fillColor: 'red',
    fillOpacity: 1,
    labelOrigin: new window.google.maps.Point(55, 15),
    scaledSize: new window.google.maps.Size(30, 30),
  };

  const marker = new window.google.maps.Marker({
    position: coordinates,
    label: {
      text: 'Voypost',
      color: 'red',
    },
    icon: svgMarker,
  });
  marker.setMap(map);
};

const MapFrame: React.FC = () => {
  const classes = useStyles();
  const { placeId } = useParams<Params>();
  const ref = React.useRef<HTMLElement | null>(null);
  const [map, setMap] = useState<Map | undefined>();
  const [error, setError] = useState(false);

  const isQueryOK = useCallback(
    (status) => status === window.google.maps.places.PlacesServiceStatus.OK,
    [],
  );

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom: 16,
        }),
      );
    }
  }, [map]);

  useEffect(() => {
    if (placeId && map) {
      new window.google.maps.places.PlacesService(map).getDetails(
        { placeId },
        (results, status) => {
          if (isQueryOK(status)) {
            setError(false);
            if (results?.geometry?.location) {
              const { location } = results.geometry;

              const newCoordinates = {
                lat: location.lat(),
                lng: location.lng(),
              };
              map.setCenter(newCoordinates);
              setMarker(newCoordinates, map);
            }
          } else {
            setError(true);
          }
        },
      );
    }
  }, [isQueryOK, map, placeId]);

  return error ? (
    <Filler text="Failed to load Flat" />
  ) : (
    <Box className={classes.map} ref={ref} />
  );
};

export default React.memo(MapFrame);
