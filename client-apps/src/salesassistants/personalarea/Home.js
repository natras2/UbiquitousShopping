import { useNavigate } from "react-router";

const { FaHashtag, FaArrowRightFromBracket } = require("react-icons/fa6");

function Home() {
    const account = JSON.parse(sessionStorage.getItem('account'));
    const navigator = useNavigate();

    const handleLogout = () => {
        navigator('..');
    }

    return (
        <div id="home">
            <div className="account-overview">
                <div className="sa-info">
                    <div className="welcome-text">Hi, {account.name} {account.surname}</div>
                    <div className="sa-id"><FaHashtag /> Employee ID: {account.id}</div>
                </div>
                <div className="logout-button" onClick={() => handleLogout()}>
                    <FaArrowRightFromBracket />
                </div>
            </div>
        </div>
    )
}

export default Home;