import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import UnitMarker from "./UnitMarker";
import axios from 'axios';

export default class MapContainer extends Component {
    state = {
        locations: []
    };

    componentWillMount() {
        axios.get('http://www.nathanmundo.com/api/test')
            .then(res => {
                const locations = res.data;
                this.setState({ locations });
            });
    }

    render() {
        const position = [35.225625, -80.840122];


        const LeafletMarkers = this.state.locations.map((location, index) => (
            <UnitMarker
                eventKey={index}
                position={{lat: location.lat, lng: location.lng}}
                name={location.name}
                address={location.address}
                npa={location.npa}
            />
        ));

        return (
            <Map center={position} zoom={10}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {LeafletMarkers}
            </Map>
        )
    }
}