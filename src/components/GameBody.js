import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import '../App.css';

import Nav from './Nav';

const GameBody = ({username, onClickEvent}) => {

    const [classNames, setClassNames] = useState("");
    const [gameBodyClasses, setGameBodyClasses] = useState("game-body");
    const [navClassNames, setNavClassNames] = useState("container-fluid nav-bar");
    const [navDropdownClassNames, setNavDropdownClassNames] = useState("dropdown-content");

    var real_button_ref = useRef();
    var onion_button_ref = useRef();

    const [themeCounter, setThemeCounter] = useState(0);

    //const [article, setArticle] = useState({});
    let article = useRef({});

    const [title, setTitle] = useState("");
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const [mode, setMode] = useState("light");

    const [guesses, setGuesses] = useState(0);
    const [correctGuesses, setCorrectGuesses] = useState(0);

    const getNewsArticle = async () => {
        await fetch(`http://localhost:8000/api/article`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(res => {
            if(res.ok) return res.json();
            else {
                return {};
            }
        } )
        .then((data) => {
            //console.log("Retreiving article");
            //setArticle(data);
            article.current = data;
            setTitle(data.details);
        }).catch(err => {
            console.error('Caught error: ', err);
            setTitle("Game Server could not be reached");
        })
    };

    const sendUserGuess = async (isCorrect) => {
        await fetch(`http://localhost:8000/api/article`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                    user: username,
                    mode: mode,
                    correct: isCorrect,
                })
        })
        .catch(err => {
            console.error('Caught error: ', err);
        })
    } 

    const makeGuess = (isTheOnion) => {
        //console.log(article.current);
        if (Object.keys(article.current).length !== 0 && article.current.isTheOnion !== 'undefined') {
            if(article.current.isTheOnion === isTheOnion) {
                correctAnimationTrigger();
                setCorrectGuesses (prev => prev + 1);
                setScore (prev => prev + 1);
                sendUserGuess(true);
            } else {
                incorrectAnimationTrigger();
                setScore(0);
                sendUserGuess(false);
            }
            setGuesses (prev => prev + 1);

            if(score > highscore) {
                setHighscore(score);
            }
        }
    }

    const handleKeyPresses = (event) => {
        if(real_button_ref.current && onion_button_ref.current) {
            if(!real_button_ref.current.hasAttribute("disabled") || !onion_button_ref.current.hasAttribute("disabled")) {
                if(event.keyCode === 37) {
                    onGuessClickEvent(false);
                } else if (event.keyCode === 39) {
                    onGuessClickEvent(true);
                }
            }
        }
    }

    useEffect(async () => {
        await getNewsArticle();
        window.addEventListener('keydown', handleKeyPresses);

        return () => {
            window.removeEventListener('keydown', handleKeyPresses);
        };
    }, []);

    const onGuessClickEvent = (isTheOnion) => {
        if(real_button_ref.current && onion_button_ref.current) {
            real_button_ref.current.setAttribute("disabled", "disabled");
            onion_button_ref.current.setAttribute("disabled", "disabled");
        }
        makeGuess(isTheOnion);
    }

    const correctAnimationTrigger = () => {
        setClassNames("game-correct");
    }

    const incorrectAnimationTrigger = () => {
        setClassNames("game-incorrect");
    }

    const onAnimationEnd = async () => {
        await getNewsArticle();

        if(real_button_ref.current && onion_button_ref.current) {
            real_button_ref.current.removeAttribute("disabled");
            onion_button_ref.current.removeAttribute("disabled");
        }

        setThemeCounter(themeCounter + 1);
        setClassNames("");
    };

    if(themeCounter >= 10) {
        setMode(prev => prev === "light" ? "dark" : "light");
        gameBodyClasses.includes("dark-theme") ?  setGameBodyClasses(prev => prev.replace(" dark-theme", "")) : setGameBodyClasses(prev => prev + " dark-theme");
        navClassNames.includes("dark-theme") ?  setNavClassNames(prev => prev.replace(" dark-theme", "")) : setNavClassNames(prev => prev + " dark-theme");
        navDropdownClassNames.includes("dark-theme") ?  setNavDropdownClassNames(prev => prev.replace(" dark-theme", "")) : setNavDropdownClassNames(prev => prev + " dark-theme");
        setThemeCounter(0);
    }
 
    return (
    <div className={gameBodyClasses} onKeyDown={(e) => {handleKeyPresses(e)}}>
        <div className={classNames} onAnimationEnd={onAnimationEnd}>
            <Nav username={username} onClickEvent={onClickEvent} classNames={navClassNames} dropdownClassNames={navDropdownClassNames} correct={correctGuesses} total={guesses}/>
            <div className="container">
                <div className="row d-flex align-items-start">
                    <div className="col">
                        <h1>{title}</h1>
                    </div>
                </div>
                <div className="row d-flex align-items-center justify-content-around game-body-buttons">
                    <div className="col">
                        <button type="button" className="btn btn-success play-button" onClick={() => {onGuessClickEvent(false)}} ref={real_button_ref}>
                            <FontAwesomeIcon icon={faCheck} style={{fontSize: "15px", marginRight: "5px"}}/>
                            Real News
                        </button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-danger play-button" onClick={() => {onGuessClickEvent(true)}} ref={onion_button_ref}>
                            <FontAwesomeIcon icon={faTimes} style={{fontSize: "15px", marginRight: "5px"}}/>
                            The Onion
                        </button>
                    </div>
                </div>
                <div className="row d-flex align-items-end justify-content-between score-bar">
                    <div className="col">
                        <h4>High Score: {highscore}</h4>
                    </div>
                    <div className="col">
                        <h4>Score: {score}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default GameBody;