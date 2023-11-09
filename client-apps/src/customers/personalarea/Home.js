import { FaLocationDot } from "react-icons/fa6";
import illustration from "../../assets/images/illustrations/customer-home-planting.svg"

function Home() {
    const account = JSON.parse(sessionStorage.getItem('account'));

    const handleScroll = (event) => {
        const container = event.target;
        const scrollAmount = event.deltaY;
        container.scrollTo({
            top: 0,
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
        });
    };


    return (
        <div id="home">
            <div className="top-content">
                <div className="welcome-text">Hi, {account.name}!</div>
                <div className="sustainability-banner">
                    <img
                        src={illustration}
                        alt='Customer landing illustration'
                        width='105%'
                    />
                </div>
                <div className="offers">
                    <div className="header">Your promotions</div>
                    <div className="carousel" onWheel={handleScroll}>
                        <div className="item">
                            {/* Item content */}
                        </div>
                        <div className="item">
                            {/* Item content */}
                        </div>
                        <div className="item">
                            {/* Item content */}
                        </div>
                    </div>
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