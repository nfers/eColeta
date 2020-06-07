import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';

import './style.css';
import logo from '../../assets/logo.svg';

interface Item {
	id: number;
	title: string;
	image_url: string;
}

const CreatePoint = () => {

	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		api.get('items').then(response => {			
			setItems(response.data.data[0])
		});
	}, []);

	return (
		<div id="page-create-point">
			<header>
				<img src={logo} alt="Ecoleta" />

				<Link to="/" >
					<FiArrowLeft />
					Voltar para Home
				</Link>
			</header>

			<form>
				<h1>
					Cadastro do
					<br />Ponto de Coleta
				</h1>

				<fieldset>
					<legend>
						<h2>Dados</h2>
					</legend>
				</fieldset>

				<div className="field">
					<label htmlFor="name">Nome da Entidade</label>
					<input type="text" name="name" id="name" />
				</div>

				<div className="field-group">
					<div className="field">
						<label htmlFor="email">E-mail</label>
						<input type="email" name="email" id="email" />
					</div>

					<div className="field">
						<label htmlFor="whatsapp">Whatsapp</label>
						<input type="text" name="whatsapp" id="whatsapp" />
					</div>

				</div>

				<fieldset>
					<legend>
						<h2>Endereço</h2>
						<span>Selecione o Endereço no Mapa</span>
					</legend>

					<Map center={[-16.6698391, -49.2112945]} zoom={15}>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			      <Marker position={[-16.6698391, -49.2112945]} />
					</Map>
					<div className="field-group">
						<div className="field">
							<label htmlFor="uf">UF</label>
							<select name="uf" id="uf">
								<option value="0">Selecine a UF</option>
							</select>
						</div>
						<div className="field">
							<label htmlFor="city">Cidade</label>
							<select name="city" id="city">
								<option value="0">Selecine uma Cidade</option>
							</select>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>
						<h2>Ítens de Coleta</h2>
						<span>Selecione um ou mais itens abaixo</span>
					</legend>

					<ul className="items-grid">
	{items.map(item => (
		<li className="selected" key={item.id}>
		<img src={item.image_url} alt="teste" />
		<span key={item.id}>{item.title}</span>
	</li>
	))}
					
					</ul>

				</fieldset>
				<button type="submit">
					Cadastrar Ponto de Coleta
				</button>
			</form>

		</div>
	);
}

export default CreatePoint;