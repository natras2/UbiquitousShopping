import { FaLocationDot } from "react-icons/fa6";

function Home() {
    const account = JSON.parse(sessionStorage.getItem('account'));

    return (
        <div id="home">
            <div className="top-content">
                <div className="welcome-text">Hi, {account.name}!</div>
                <div className="sustainability-banner"></div>
                <div className="offers">
                    <div className="title"></div>
                    <div className="carousel"></div>
                </div>
            </div>
            <div className="bottom-content localization-banner">
                <div className="subtitle">It looks like you're in</div>
                <div className="shop"><FaLocationDot /> {JSON.parse(sessionStorage.getItem('store')).name}</div>
                <div className="new-cart">New cart</div>
            </div>
        </div>
    );
}

export default Home;