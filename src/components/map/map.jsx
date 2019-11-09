import React from 'react';
import L from 'leaflet';
import {PropTypes as pt} from 'prop-types';

const AMSTERDAM = [52.38333, 4.9];
const icon = L.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

export default class Map extends React.PureComponent {
  componentDidMount() {
    const {pins} = this.props;
    this.map = L.map(`map`, {
      center: AMSTERDAM,
      zoom: 10,
      layers: [
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution:
          `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
      ]
    });
    pins.forEach((pin)=> {
      const latitude = pin.location.latitude;
      const longitude = pin.location.longitude;
      const coordinates = [latitude, longitude];
      L.marker(coordinates, {icon}).addTo(this.map);
    });

  }

  render() {
    return <div id="map" style={{width: `100%`, height: `100%`}} />;
  }
}

Map.propTypes = {
  latitude: pt.number,
  longitude: pt.number,
  pins: pt.array
};
