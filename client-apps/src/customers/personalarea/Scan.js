import { useState } from "react";
import QrReader from 'react-qr-scanner';
import Loader from "../../assets/components/Loader";
import { makeAPIRequest } from "../../assets/components/Utils";

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
        </div>
    )
}

function DigitalLabel(props) {
    /* MOCK DATA
    let props = {
        data: {
            merch: {
                name: 'Lenticchie IGP',
                expiration_date: '2',
            }
        }
    };*/

    return (
        <div className="digitallabel">
            {props.data.merch.name} - {props.data.merch.expiration_date}
        </div>
    );
}

function Scan() {
    const [scanning, setScanning] = useState(true);
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

    return (
        <div id="scan">
            {(scanning && !processing) && <Scanner handler={handleScan} error='' />}
            {processing && <Loader />}
            {(!scanning && !processing) && <DigitalLabel data={data} />}
        </div>
    )
}

export default Scan;