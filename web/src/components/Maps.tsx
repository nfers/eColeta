import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';


const Maps = () => {

	const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([0, 0]);
	const [ initialPosition, setinitialPosition ] = useState<[number, number]>([0, 0]);
	
	function handleMapClick(event: LeafletMouseEvent) {
		setSelectedPosition([
			event.latlng.lat,
			event.latlng.lng
		])
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords;

			setinitialPosition([latitude, longitude]);
		})
	}, []);

	return (
		<section id="maps">
			<Map center={initialPosition} zoom={15} onClick={handleMapClick}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={selectedPosition} />
			</Map>
		</section>
	)
}

export default Maps;