import React from 'react';
import L from 'leaflet';
import {PropTypes as pt} from 'prop-types';

const icon = L.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

export default class Map extends React.PureComponent {

  _addPins(pins) {
    this.markers = [];
    pins.forEach((pin)=> {
      const latitude = pin.location.latitude;
      const longitude = pin.location.longitude;
      const coordinates = [latitude, longitude];
      this.markers.push(L.marker(coordinates, {icon}).addTo(this.map));
    });
  }
  componentDidMount() {
    const {pins, activeCity} = this.props;
    this.map = L.map(`map`, {
      center: [activeCity.location.latitude, activeCity.location.longitude],
      zoom: 10,
      layers: [
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution:
          `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
      ]
    });

    this._addPins(pins);
  }

  componentDidUpdate() {
    const {activeCity, pins} = this.props;
    this.map.setView([activeCity.location.latitude, activeCity.location.longitude], 10);
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });

    this._addPins(pins);
  }

  render() {
    return <div id="map" style={{width: `100%`, height: `100%`}} />;
  }
}

Map.propTypes = {
  latitude: pt.number,
  longitude: pt.number,
  pins: pt.array,
  activeCity: pt.shape({
    location: pt.shape({
      latitude: pt.number,
      longitude: pt.number,
    })
  })
};
