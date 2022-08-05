import './error.scss';

function Error(){
    return <div className="error">
        <div className="error__sign"></div>
        <div className="error__title">Oops! Error: 404! <br />Please, try again later!</div>
    </div>
}

export default Error;