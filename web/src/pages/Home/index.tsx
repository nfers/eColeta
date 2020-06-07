import React from 'react';
import logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import './home.css'

const Home = () => {
	return (
		<div id="page-home">
			<div className="content">
				<header>
				<img src={logo} alt="ecoleta"/>
				</header>
				
				<main>
					<h1>Seu marketplace de coleta de resíduos</h1>
					<p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
				</main>

				<a href="/cadastro">
					<span>
						<FiLogIn />
					</span>
					<strong>Cadastre um ponto de coleta</strong>
				</a>

			</div>
		</div>
	)
}


export default Home;