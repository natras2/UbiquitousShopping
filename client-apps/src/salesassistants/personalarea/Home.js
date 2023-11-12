import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../../assets/components/Loader";
import { makeAPIRequest } from "../../assets/components/Utils";
import { Link } from "react-router-dom";

const { FaHashtag, FaArrowRightFromBracket, FaTriangleExclamation, FaCookieBite, FaCheck } = require("react-icons/fa6");

function StoreOverview() {
    const [processing, setProcessing] = useState(true)
    const [dispensers, setDispensers] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await makeAPIRequest('GetDispensersList', null, {
                idstore: JSON.parse(sessionStorage.getItem('store')).id
            }, true);

            if (response.code === 200) {
                setDispensers(response.body);
            }
            else {
                console.error(`API request failed with code ${response.code}:`, response.body);
            }
            setProcessing(false);
        }
        fetchData();
    }, []);

    let alertList = [];
    let dispensersNumber = 0; 
    let dispenserOccurrences = 0;
        
    if (!!dispensers) {
        dispensers.forEach(item => {
            dispensersNumber += 1;
            let alert = false;

            let current_weight = parseFloat(item.current_weight);
            let weight_threshold = parseFloat(item.MerchLot.Merch.weight_threshold);

            let date = new Date(Date.parse(item.MerchLot.expiration_date));
            let dateCheck = (date - new Date()) / 1000 / 60 / 60 / 24;

            if (current_weight < weight_threshold || dateCheck < 8) {
                alert = true;
                dispenserOccurrences += 1;
            }
            
            if (alert) {
                alertList.push(
                    <div key={item.id} className="alert-item">
                        <div className="generalities">
                            <div className="dispenser"><FaHashtag /> Dispenser ID: {item.id}</div>
                            <div className="merch"><FaCookieBite /> {item.MerchLot.Merch.name}</div>
                        </div>
                        <div className="alerts">
                            {(current_weight < weight_threshold) &&
                                <div className="alert-message">{100 - (current_weight/weight_threshold * 100).toFixed(0)}% below threshold</div>
                            }
                            {(dateCheck <= 0) &&
                                <div className="alert-message">Expired by {Math.abs(dateCheck).toFixed(0)} day{(dateCheck !== 1) ? 's' : ''}</div>
                            }
                            {(dateCheck > 0 && dateCheck < 8) &&
                                <div className="alert-message">{dateCheck.toFixed(0)} day{(dateCheck !== 1) ? 's' : ''} to expire</div>
                            }
                        </div>

                    </div>
                );
            }

        });
    }

    return (
        <div className="store-overview">
            <div className="store-id"><FaHashtag /> Store ID: {JSON.parse(sessionStorage.getItem('store')).id}</div>
            <div className="store-name">{JSON.parse(sessionStorage.getItem('store')).name}</div>
            <div className="store-address">{JSON.parse(sessionStorage.getItem('store')).address}</div>
            {processing && <Loader selector='sa-home'/>}
            {!processing &&
            <> 
                <div className="alert-box">
                    <div className={`alert-overview ${(dispenserOccurrences === 0) ? '' : (dispenserOccurrences/dispensersNumber > 0.5) ? 'critical' : 'warning' }`}>
                        {dispenserOccurrences === 0 && <FaCheck /> }
                        {dispenserOccurrences > 0 && <FaTriangleExclamation /> }
                        {dispenserOccurrences} dispenser{(dispenserOccurrences !== 1) ? 's' : ''} demand{(dispenserOccurrences === 1) ? 's' : ''} attention</div>
                    <div className="alert-list">
                        {alertList}
                    </div>
                </div>
                <Link to={'../carts'}  className="carts-button btn w-100 btn-lg">Open carts</Link>
                <Link to={'../dispensers'} className="dispensers-button btn w-100 btn-lg">Dispensers</Link>
            </>
            }
        </div>
    );
}

function Home() {
    const account = JSON.parse(sessionStorage.getItem('account'));
    const navigator = useNavigate();

    const handleLogout = () => {
        navigator('..');
    }

    return (
        <div id="home" className="sa">
            <div className="account-overview">
                <div className="sa-info">
                    <div className="welcome-text">Hi, {account.name} {account.surname}</div>
                    <div className="sa-id"><FaHashtag /> Employee ID: {account.id}</div>
                </div>
                <div className="logout-button" onClick={() => handleLogout()}>
                    <FaArrowRightFromBracket />
                </div>
            </div>
            <StoreOverview />
        </div>
    )
}

export default Home;