import React, { useState } from 'react';

import '../App.css';

import Footer from './Footer';

const StartScreen = ({onClickEvent, setUsername}) => {

    const [name, setName] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();

        setUsername(name);
        onClickEvent();
    }

    return (
    <div className="start-window">
        <div className="container">
            <div className="row d-flex">
                <div className="col start-header">
                    <h1>The Onion or not?</h1>
                    <p>Try to correctly guess which news article is real and which - fake</p>
                </div>
            </div>
            <div className="row d-flex">
                <div className="col">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group d-flex justify-content-center">
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} id="username-form-input" placeholder="Full Name" required minLength={2}/>
                    </div>
                    <button type="submit" className="btn btn-lg btn-outline-light play-button">Play</button>
                </form> 
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    );
}

export default StartScreen;