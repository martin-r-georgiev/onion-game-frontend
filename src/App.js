import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group'; 

import './App.css';

import StartScreen from './components/StartScreen';
import GameBody from './components/GameBody';

const App = () => {

	const [showStartScreen, setShowStartScreen] = useState(true);
	const [mounted, setMounted] = useState(false);

	const startGameEvent = () => {
		setShowStartScreen(false);
		setMounted(false);
		console.log("Started game!");
	}

	useEffect(() => {
		setMounted(true);
		console.log("Spam?");
	}, [mounted])

	return (
		<>
		{ showStartScreen ?
			<CSSTransition in={mounted} classNames="fade" timeout={500} unmountOnExit>
				<StartScreen onClickEvent={startGameEvent}/>
			</CSSTransition>
			:
			<CSSTransition in={mounted} classNames="fade" timeout={500} unmountOnExit>
				<GameBody/>
			</CSSTransition>
		}
		</>
	);
}

export default App;
