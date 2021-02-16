import '../App.css';

const StartScreen = ({onClickEvent}) => {
    return (
    <div className="start-window">
        <header className="header">
        </header>
        <div className="container">
            <div className="row d-flex">
                <div className="col start-header">
                    <h1>The Onion or not?</h1>
                    <p>Try to correctly guess which news article is real and which - fake</p>
                    <button type="button" className="btn btn-lg btn-outline-light play-button" onClick={onClickEvent}>Play</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default StartScreen;