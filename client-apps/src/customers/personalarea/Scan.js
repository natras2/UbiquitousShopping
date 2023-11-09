import { useState } from "react";
import QrReader from 'react-qr-scanner';
import Loader from "../../assets/components/Loader";
import { makeAPIRequest } from "../../assets/components/Utils";
import { FaArrowLeft, FaLocationDot, FaHashtag, FaTag, FaHourglassHalf, FaCompass, FaCircleInfo } from "react-icons/fa6";

function Scanner(props) {

    const handleScan = (scanData) => {
        if (scanData != null) {
            let readData = JSON.parse(scanData.text);
            if (readData 
                && readData !== null
                && readData !== "" 
                && readData.hasOwnProperty('iddispenser') 
                && readData.iddispenser > 0) {
                    
                console.log(`Read data`, readData);

                props.handler(readData);
            }
        }
    };
    const handleError = (error) => {
        console.log(error);
    }

    return (
        <div className="scanner">
            <div className="title">Scan a dispenser QR code</div>
            <div className="camera-wrapper">
                <QrReader
                    facingmode='rear'
                    delay={500}
                    onError={handleError}
                    onScan={handleScan}
                    className="camera"
                    constraints={{
                        audio: false,
                        video: { facingMode: "environment" }
                    }}
                />
            </div>
            <div className="description-box">
                <FaCircleInfo />
                <div className="description">Retrieve the Digital Label of the product: the useful informations about the merch in the dispenser, like the price, the expiration date, the nutritional and traceability information.</div>
            </div>
        </div>
    )
}

function DigitalLabel(props) { //ADD PROPS AS PARAMETER
     /*
    let props = {
        hasBack: true,
        goBack: '',
        textBack: 'New scan',
        data: {
            merch: {
                "name": "Red Apples",
                "category": "Fruit",
                "description": "Our organic Red Apples are hand-picked at the peak of freshness, delivering unbeatable taste and nutrition",
                "price_per_milligram": "0.000000500",
                "vendor": "Agricola Manarini S.r.l.",
                "expiration_date": "2023-10-31T00:00:00.000Z",
                "traceability_info": {
                    "lot_number": "VGT12345",
                    "origin": "Local Farm, Organic Certification",
                    "harvested_date": "2023-10-01",
                    "packaged_date": "2023-10-02",
                    "distributed_by": "High-Quality Grocers Inc.",
                    "contact_info": "contact@highqualitygrocers.com"
                },
                "nutritional_info": {
                    "calories": 30,
                    "protein": "2g",
                    "carbohydrates": "6g",
                    "fiber": "3g",
                    "sugar": "2g",
                    "fat": "0g",
                    "vitamin_a": "50% Daily Value",
                    "vitamin_c": "70% Daily Value",
                    "iron": "6% Daily Value",
                    "calcium": "2% Daily Value"
                }
            }
        }
    };
    */

    const date = new Date(Date.parse(props.data.merch.expiration_date));
    const dateCheck = (date - new Date()) / 1000 / 60 / 60 / 24;

    const formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    })

    const nutritionalList = [];
    const nutritionalInfo = Object.keys(props.data.merch.nutritional_info);
    for (let i = 0; i < Math.min( nutritionalInfo.length, 8); i++) {
        nutritionalList.push(
            <div key={nutritionalInfo[i]} className="nutritional-record">
                <div className="nutritional-property">{nutritionalInfo[i].replace('_', ' ')}</div>
                <div className="nutritional-value">{props.data.merch.nutritional_info[nutritionalInfo[i]]}</div>
            </div>
        );
    }

    return (
        <>
            { props.hasBack && 
                <div className="back-button" onClick={() => props.goBack()}> 
                    <FaArrowLeft /> {props.textBack}
                </div>
            }
            <div className="digitallabel">
                <div className="name">{props.data.merch.name}</div>
                <div className="merchlot-info">
                    <div className="store-name"><FaLocationDot /> {JSON.parse(sessionStorage.getItem('store')).name}</div>
                    <div className="merchlot-id"><FaHashtag /> Lot: {props.data.merch.traceability_info.lot_number}</div>
                </div>
                <div className="price"><FaTag /> {formatter.format((props.data.merch.price_per_milligram * 1000000))} per kg</div>
                <div className="description">{props.data.merch.description}</div>
                <div className="info-cards">
                    <div className={`best-before ${ (dateCheck < 3) ? 'critical': (dateCheck < 3) ? 'warning' : '' }`}>
                        <div className="intro"><FaHourglassHalf /> Best before</div>
                        <div className="main">{date.toLocaleDateString('it-IT')}</div>
                    </div>
                    <div className="traceability-infos">
                        <div className="intro"><FaCompass /> Know the artisan</div>
                        <div className="main">{props.data.merch.vendor}</div>
                    </div>
                </div>
                <div className="nutritional-information">
                    <div className="header">Nutritional information</div>
                    <div className="subheader">per 100g of product</div>
                    <div className="nutritional-list">
                        {nutritionalList}
                    </div>
                </div>
            </div>
        </>
    );
}

function Scan() {
    const [scanning, setScanning] = useState(true); //SWITCH BACK TO TRUE
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState(null);

    const handleScan = async (readData) => {
        setProcessing(true);

        const response = await makeAPIRequest('GetDigitalLabel', null, { 
            iddispenser: readData.iddispenser, 
            store_id: JSON.parse(sessionStorage.getItem('store')).id
        }, true);

        if (response.code === 200) {
            console.log(response.body);
            setData(response.body);
            setScanning(false);
        }
        else {
            console.error(`API request failed with code ${response.code}:`, response.body);
        }
        setProcessing(false);
    }

    const handleNewScan = () => {
        setData(null);
        setScanning(true);
    }

    return (
        <div id="scan">
            {(scanning && !processing) && <Scanner handler={handleScan} error='' />}
            {processing && <Loader />}
            {(!scanning && !processing) && <DigitalLabel data={data} goBack={handleNewScan} hasBack={true} textBack={'New scan'}/>}
        </div>
    )
}

export default Scan;