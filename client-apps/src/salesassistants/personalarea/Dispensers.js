import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../assets/components/Loader";
import illustration from "../../assets/images/illustrations/refill-extract.svg"
import { FaArrowLeft, FaArrowRight, FaBoxArchive, FaHashtag, FaHourglassHalf, FaSort, FaTriangleExclamation } from "react-icons/fa6";
import { makeAPIRequest } from "../../assets/components/Utils";
import DefaultButton from "../../assets/components/DefaultButton";

function RefillingView(props) {
    return (
        <div id="refilling-view" className="page">
            <div className="top-content">
                <img
                    src={illustration}
                    alt='Customer landing illustration'
                    width='80%'
                />
                <div className="title">Refill the amount of {props.data} in the dispenser</div>
                <div className="content">
                    <p>Remember to leave everything as you found it! Click on the button when you’re done.</p>
                </div>
            </div>
            <DefaultButton to='#' text='Done' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='false' handler={props.handler}/>
        </div>
    )
}

export function DispenserOverview() {
    const [processing, setProcessing] = useState(true);
    const [refilling, setRefilling] = useState(false);
    const [data, setData] = useState(null);
    const { iddispenser } = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await makeAPIRequest('GetDispenser', null, {
                idstore: JSON.parse(sessionStorage.getItem('store')).id,
                iddispenser: iddispenser,
            }, true);

            if (response.code === 200) {
                setData(response.body);
            }
            else {
                console.error(`API request failed with code ${response.code}:`, response.body);
            }
            setProcessing(false);
        }
        fetchData();
    }, [iddispenser]);

    const handleGoBack = () => {
        navigator('..', { replace: true });
    }

    const handleStartRefill = async () => {
        setProcessing(true);

        const response = await makeAPIRequest('LockDispenser', null, { 
            iddispenser: data.id,
            idstore: JSON.parse(sessionStorage.getItem('store')).id,
        }, true);

        if (response.code === 200) {
            setRefilling(true);
        }
        else {
            console.error(`API request failed with code ${response.code}:`, response.body);
        }
        setProcessing(false);
    }

    const handleRefill = async () => {
        setProcessing(true);

        const response = await makeAPIRequest('RefillDispenser', null, { 
            idstore: JSON.parse(sessionStorage.getItem('store')).id,
            iddispenser: data.id,
        }, true);

        if (response.code === 200) {
            navigator('..', { replace: true });
        }
        else {
            console.error(`API request failed with code ${response.code}:`, response.body);
        }
        setProcessing(false);
    }

    let current_weight = 0;
    let weight_threshold = 0;
    let date = null;

    if (!!data) {
        date = new Date(Date.parse(data.MerchLot.expiration_date));
        current_weight = parseFloat(data.current_weight);
        weight_threshold = parseFloat(data.MerchLot.Merch.weight_threshold);
    }

    return (
        <>
            {processing && <Loader />}
            {(!processing && refilling) && 
                <RefillingView 
                    data={data.MerchLot.Merch.name}
                    handler={handleRefill}
                />}
            {(!processing && !refilling) &&
                <div id="dispenser-overview" className="page">
                    <div className="top-content">
                        <div className="back-button" onClick={() => handleGoBack()}>
                            <FaArrowLeft /> Go back
                        </div>
                        <div className="dispenser-card">
                            <div className="dispenser-id"><FaHashtag /> Dispenser ID: {data.id}</div>
                            <div className="merch-name">{data.MerchLot.Merch.name}</div>
                            {(current_weight < weight_threshold) &&
                                <div className="provision-message">Provide at least <span className="weight">{("" + ((weight_threshold - current_weight) / 1000).toFixed(2)).replace(".", ",")} kg</span> of product</div>
                            }
                            <div className="same-lot">
                                <div className="title">From the same Lot</div>
                                <div className="lot-number"><FaHashtag /> Lot number: {data.MerchLot.traceability_info.lot_number}</div>
                                <div className="info-box">
                                    <div className="exipiration-box">
                                        <div className="name"><FaHourglassHalf /> Expiry date</div>
                                        <div className="value">{date.toLocaleDateString('it-IT')}</div>
                                    </div>
                                    <div className="weight-box">
                                        <div className="name"><FaBoxArchive /> Remaining quantity</div>
                                        <div className="value">{("" + (data.MerchLot.quantity / 1000).toFixed(2)).replace(".", ",")} kg</div>
                                    </div>
                                </div>
                            </div>
                            <div className="other-lot">
                                <div className="message">Use another Lot</div>
                                <FaArrowRight />
                            </div>
                        </div>
                        <div className="message">Click on the following button to proceed with the provisioning of the dispenser</div>
                    </div>
                    <DefaultButton to='#' text='Refill' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='false' handler={handleStartRefill} />
                </div>
            }
        </>
    )
}

function Dispensers() {
    const [processing, setProcessing] = useState(true);
    const [dispensers, setDispensers] = useState(null);

    const navigator = useNavigate();

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

    let dispensersList = [];

    const handleReverse = () => {
        let reversed_dispensers = [...dispensers]
        reversed_dispensers.reverse();
        setDispensers(reversed_dispensers);
    };

    const handleOverview = (dispenser_id) => {
        navigator("./" + dispenser_id);
    }

    if (!!dispensers) {
        dispensers.forEach(item => {

            const date = new Date(Date.parse(item.MerchLot.expiration_date));
            const dateCheck = (date - new Date()) / 1000 / 60 / 60 / 24;

            let current_weight = parseFloat(item.current_weight);
            let weight_threshold = parseFloat(item.MerchLot.Merch.weight_threshold);

            dispensersList.push(
                <div key={item.id} className="dispenser-item" onClick={() => handleOverview(item.id)}>
                    <div className="generalities">
                        <div className="dispenser-id"><FaHashtag /> Dispenser ID: {item.id}</div>
                        <div className="lot-number"><FaHashtag /> Lot number: {item.MerchLot.traceability_info.lot_number}</div>
                    </div>
                    <div className="merch">
                        <div className="name">{item.MerchLot.Merch.name}</div>
                        <div className="weight">{("" + (current_weight / 1000).toFixed(2)).replace(".", ",")} kg</div>
                    </div>
                    <div className="info-cards">
                        <div className="threshold-card">
                            <FaTriangleExclamation />
                            <div className={`circle ${(current_weight / weight_threshold < 0.7) ? 'critical' : (current_weight / weight_threshold < 1.2) ? 'warning' : ''}`}></div>
                            <div className="name">Threshold</div>
                            <div className="value">{("" + (weight_threshold / 1000).toFixed(2)).replace(".", ",")} kg</div>
                        </div>
                        <div className="expire-card">
                            <FaHourglassHalf />
                            <div className={`circle ${(dateCheck < 4) ? 'critical' : (dateCheck < 8) ? 'warning' : ''}`}></div>
                            <div className="name">Expiry date</div>
                            <div className="value">{date.toLocaleDateString('it-IT')}</div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            {processing && <Loader selector='has-navbar' />}
            {!processing &&
                <div id="dispensers">
                    <div className="order">
                        Order by:
                        <div className="selector">Dispenser ID</div>
                        <div className="sort" onClick={() => handleReverse()}><FaSort /></div>
                    </div>
                    <div className="dispensers-list">
                        {dispensersList}
                    </div>
                </div>
            }
        </>
    );
}

export default Dispensers;