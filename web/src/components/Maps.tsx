import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';


const Maps = () => {
	return (
		<section id="maps">
			<Map center={[-16.6698391, -49.2112945]} zoom={15}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={[-16.6698391, -49.2112945]} />
			</Map>
		</section>
	)
}

export default Maps;