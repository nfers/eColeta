import React, { useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';


const Maps = () => {

	const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([0, 0]);
	
	function handleMapClick(event: LeafletMouseEvent) {
		
		setSelectedPosition([
			event.latlng.lat,
			event.latlng.lng
		])
	}

	return (
		<section id="maps">
			<Map center={[-16.6698391, -49.2112945]} zoom={15} onClick={handleMapClick}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={selectedPosition} />
			</Map>
		</section>
	)
}

export default Maps;