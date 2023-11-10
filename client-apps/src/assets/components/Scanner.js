import QrReader from 'react-qr-scanner';
import { FaArrowLeft, FaCircleInfo } from "react-icons/fa6";

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
        <div>
            {(!!props.goBack) && 
                <div className="back-button mb-3" onClick={() => props.goBack()}> 
                    <FaArrowLeft /> {props.textBack}
                </div>
            }
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
                    {props.target === 'Customer' &&
                        <div className="description">Retrieve the Digital Label of the product: the useful informations about the merch in the dispenser, like the price, the expiration date, the nutritional and traceability information.</div>
                    }
                    {props.target === 'SalesAssistant' &&
                        <div className="description">This operation allows you to check-in to the dispenser and to refill it with either a given Merch Lot.</div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Scanner;