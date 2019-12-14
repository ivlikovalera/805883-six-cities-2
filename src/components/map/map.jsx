import React from 'react';
import L from 'leaflet';
import {PropTypes as pt} from 'prop-types';
import {connect} from 'react-redux';
import {getActiveOfferId} from './../../reducer/data/selector.js';

const icon = L.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [30, 30]
});

const activeIcon = L.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [30, 30]
});

class Map extends React.PureComponent {
  componentDidMount() {
    const {centerOfMap, pins, activeOfferId} = this.props;
    this.map = L.map(`map`, {
      center: centerOfMap ? [centerOfMap.latitude, centerOfMap.longitude] : [0, 0],
      zoom: centerOfMap ? centerOfMap.zoom : 0,
      layers: [
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution:
            `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
            contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
      ]
    });
    this._handlePinsAdd(pins, activeOfferId);
  }

  componentDidUpdate() {
    const {centerOfMap, pins, activeOfferId} = this.props;
    this.map.setView([centerOfMap.latitude, centerOfMap.longitude], centerOfMap.zoom);
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });

    this._handlePinsAdd(pins, activeOfferId);
  }

  _handlePinsAdd(pins, activeOfferId) {
    this.markers = [];
    pins.forEach((pin)=> {
      const latitude = pin.location.latitude;
      const longitude = pin.location.longitude;
      const coordinates = [latitude, longitude];
      this.markers.push(L.marker(coordinates, {icon: activeOfferId === pin.id ? activeIcon : icon}).addTo(this.map));
    });
  }

  render() {
    return <div id="map" style={{width: `100%`, height: `100%`}} />;
  }
}

Map.propTypes = {
  activeOfferId: pt.number,
  pins: pt.arrayOf(pt.shape({
    id: pt.number,
    location: pt.shape({
      latitude: pt.number,
      longitude: pt.number,
    })
  })),
  centerOfMap: pt.shape({
    latitude: pt.number,
    longitude: pt.number,
    zoom: pt.number
  })
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeOfferId: getActiveOfferId(state),
});

export default connect(mapStateToProps)(Map);
