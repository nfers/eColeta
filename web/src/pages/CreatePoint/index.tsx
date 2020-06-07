import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';
import logo from '../../assets/logo.svg';

const CreatePoint = () => {
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
				</fieldset>
			</form>

		</div>
	);
}

export default CreatePoint;