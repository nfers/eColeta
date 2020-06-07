import React, { 
	useState, 
	useEffect, 
	ChangeEvent, 
	FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Maps from './../../components/Maps';

import api from '../../services/api';
import apiUf from '../../services/apiUF';
import apiCity from '../../services/apiCity';

import './style.css';
import logo from '../../assets/logo.svg';

interface Item {
	id: number;
	title: string;
	image_url: string;
}

interface IBGEUF {
	sigla: string;
}

interface IBGECities {
	nome: string;
}

const CreatePoint = () => {

	const [items, setItems] = useState<Item[]>([]);
	const [ufs, setUfs] = useState<string[]>([]);
	const [city, setCity] = useState<string[]>([]);
	const [ufSelected, setUfSelected] = useState('0');
	const [cityfSelected, setCitySelected] = useState('0');
	const [ selectedItems, setSelectedItems ] = useState<number[]>([]);

	const [ formData, setFormData ] = useState({
		name: '', 
		email: '',
		whatsapp: '',
	});

	useEffect(() => {
		api.get('items').then(response => {
			setItems(response.data.data[0])
		});
	}, []);
	
	useEffect(() => {
		apiUf.get<IBGEUF[]>('estados').then(res => {
			const ufInitials = res.data.map(uf => uf.sigla)

			setUfs(ufInitials);
		})
	}, []);

	useEffect(() => {
		if (ufSelected === '0') {
			return;
		};

		apiCity.get<IBGECities[]>(`${ufSelected}/municipios`).then(res => {
			const citiesNames = res.data.map(city => city.nome);

			setCity(citiesNames);
		});
	}, [ufSelected]);

	function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
		const uf = event.target.value;
		setUfSelected(uf)
	}

	function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
		const city = event.target.value;

		setCitySelected(city)
	};

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value})
	};

	function handleSelectItem(id: number) {
		const itemSelected = selectedItems.findIndex(item => item === id);

		if (itemSelected >= 0) {
			const filteredItems = selectedItems.filter(item => item !== id);
			setSelectedItems(filteredItems);
		} else {
		setSelectedItems([...selectedItems, id]);
		}
	}

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


	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const { name , email, whatsapp } = formData;
		const uf = ufSelected;
		const city = cityfSelected;

		const [ latitude, longitude ] = selectedPosition;
		const items = selectedItems;
		const data = {
			name, 
			email, 
			whatsapp, 
			city, 
			uf,
			latitude, 
			longitude, 
			items
		}
		await api.post('points', data);

		alert('Ponto de Coleta Criado')
		
	}

	return (
		<div id="page-create-point">
			<header>
				<img src={logo} alt="Ecoleta" />

				<Link to="/" >
					<FiArrowLeft />
					Voltar para Home
				</Link>
			</header>

			<form onSubmit={handleSubmit}>
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
					<input type="text" name="name" id="name" onChange={handleInputChange}/>
				</div>

				<div className="field-group">
					<div className="field">
						<label htmlFor="email">E-mail</label>
						<input type="email" name="email" id="email" onChange={handleInputChange}/>
					</div>

					<div className="field">
						<label htmlFor="whatsapp">Whatsapp</label>
						<input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
					</div>

				</div>

				<fieldset>
					<legend>
						<h2>Endereço</h2>
						<span>Selecione o Endereço no Mapa</span>
					</legend>

					<section id="maps">
			<Map center={initialPosition} zoom={15} onClick={handleMapClick}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={selectedPosition} />
			</Map>
		</section>

					<div className="field-group">
						<div className="field">
							<label htmlFor="uf">UF</label>
							<select
								name="uf" id="uf"
								value={ufSelected}
								onChange={handleSelectUf}
							>
								<option value="0">Selecione uma UF</option>
								{ufs.map(uf => (
									<option key={uf} value={uf}>{uf}</option>
								))}
							</select>
						</div>

						<div className="field">
							<label htmlFor="city">Cidade</label>
							<select 
								name="city" 
								id="city"
								value={cityfSelected}
								onChange={handleSelectCity}
							>
								<option value="0">Selecine uma Cidade</option>
								{city.map( cities => (
									<option key={cities} value={cities}>{cities}</option>
								))}
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
							<li 
								className={selectedItems.includes(item.id) ? 'selected' : ''}
								key={item.id} 
								onClick={() => handleSelectItem(item.id)}
							>							
								<img src={item.image_url} alt={item.title} />
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