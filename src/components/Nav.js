import '../App.css';

const Nav = ({username, onClickEvent, classNames, correct, total}) => {

    let accuracy = Math.round(((correct / total) + Number.EPSILON) * 10000) / 100;

    return (
    <div className={classNames}>
        <div className="row d-flex justify-content-between p-2">
            <div className="col d-flex justify-content-start">
                <button type="button" className="btn btn-outline-dark pill-button" onClick={onClickEvent}>Back to menu</button>
            </div>
            <div className="col d-flex justify-content-end">
            <div className="dropdown">
                <h4 className="dropdown-btn">{username}</h4>
                    <div className="dropdown-content">
                        <p><b>Correct Guesses:</b> {correct}</p>
                        <p><b>Total Guesses:</b> {total}</p>
                        <p><b>Accuracy:</b> {accuracy}%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Nav;