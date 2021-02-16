import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group'; 

import './App.css';

import StartScreen from './components/StartScreen';
import GameBody from './components/GameBody';

const App = () => {

	const [showStartScreen, setShowStartScreen] = useState(true);
	const [mounted, setMounted] = useState(false);

	const [username, setUsername] = useState(null);

	const startGameEvent = () => {
		setShowStartScreen(false);
		setMounted(false);
		console.log("Started game!");
	}

	const resetGameEvent = () => {
		setShowStartScreen(true);
		setMounted(false);
		console.log("Game reset!");
	}

	useEffect(() => {
		setMounted(true);
	}, [mounted])

	return (
		<>
		{ showStartScreen ?
			<CSSTransition in={mounted} classNames="fade" timeout={500} unmountOnExit>
				<StartScreen onClickEvent={startGameEvent} setUsername={setUsername}/>
			</CSSTransition>
			:
			<CSSTransition in={mounted} classNames="fade" timeout={500} unmountOnExit>
				<GameBody username={username} onClickEvent={resetGameEvent}/>
			</CSSTransition>
		}
		</>
	);
}

export default App;
