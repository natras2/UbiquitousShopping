import { useState } from "react";
import Loader from "../../assets/components/Loader";
import { makeAPIRequest } from "../../assets/components/Utils";
import Scanner from "../../assets/components/Scanner";
import DigitalLabel from "../../assets/components/DigitalLabel";

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

    const handleNewScan = () => {
        setData(null);
        setScanning(true);
    }

    return (
        <div id="scan">
            {(scanning && !processing) && <Scanner handler={handleScan} target='Customer' />}
            {processing && <Loader />}
            {(!scanning && !processing) && <DigitalLabel data={data} goBack={handleNewScan} textBack={'New scan'}/>}
        </div>
    )
}

export default Scan;