import { useState } from "react";
import { useNavigate } from "react-router";
import { makeAPIRequest } from "../../assets/components/Utils";
import Loader from "../../assets/components/Loader";
import Scanner from "../../assets/components/Scanner";
import DigitalLabel from "../../assets/components/DigitalLabel";
import { FaPlus } from "react-icons/fa6";
import illustration from "../../assets/images/illustrations/refill-extract.svg"
import DefaultButton from "../../assets/components/DefaultButton";

function ExtractionView(props) {
    return (
        <div className="extraction-view">
            <div className="top-content">
                <img
                    src={illustration}
                    alt='Customer landing illustration'
                    width='80%'
                />
                <div className="title">Extract the amount of {props.data.merch.name} you wish from the dispenser</div>
                <div className="content">
                    <p>Remember to leave everything as you found it: this would prevent you from paying more than what you take.</p>
                    <p>Click on the button when you're done!</p>
                </div>
            </div>
            <DefaultButton to='#' text='Done' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='false' handler={props.handler}/>
        </div>
    )
}

function AddProduct(props) {
    const [scanning, setScanning] = useState(true);
    const [extracting, setExtracting] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState(null);
    
    const navigator = useNavigate();

    const handleScan = async (readData) => {
        setProcessing(true);

        const response = await makeAPIRequest('GetDigitalLabel', null, { 
            iddispenser: readData.iddispenser, 
            store_id: JSON.parse(sessionStorage.getItem('store')).id
        }, true);

        if (response.code === 200) {
            response.body.dispenser_id = readData.iddispenser;
            
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

    const handleBackToCart = () => {
        navigator('..');
    }

    const handleLockDispenser = async () => {
        setProcessing(true);

        const response = await makeAPIRequest('LockDispenser', null, { 
            iddispenser: data.dispenser_id,
            idstore: JSON.parse(sessionStorage.getItem('store')).id,
        }, true);

        if (response.code === 200) {
            setExtracting(true);
        }
        else {
            console.error(`API request failed with code ${response.code}:`, response.body);
        }
        setProcessing(false);
    }

    const handleAddProduct = async () => {
        setProcessing(true);

        const response = await makeAPIRequest('AddProduct', null, { 
            idcart: sessionStorage.getItem('cart_id'),
            dispenser_id: data.dispenser_id,
        }, true);

        if (response.code === 200) {
            navigator('..');
        }
        else {
            console.error(`API request failed with code ${response.code}:`, response.body);
        }
        setProcessing(false);
    }

    return (
        <div id="add-product" className="page">
            {processing && <Loader />}
            {(extracting && !processing) && <ExtractionView data={data} handler={handleAddProduct}/>}
            {(scanning && !processing && !extracting) && 
                <Scanner 
                    handler={handleScan} 
                    target='Customer'
                    goBack={handleBackToCart} 
                    textBack={'Get back to cart'}
                />
            }
            {(!scanning && !processing && !extracting) && 
                <div className="d-flex flex-column justify-content-between h-100">
                    <DigitalLabel 
                        data={data} 
                        goBack={handleNewScan} 
                        textBack={'New scan'}
                    />
                    <div className="add-button" onClick={() => handleLockDispenser()}><FaPlus /> Add to cart</div>
                </div>    
            }
        </div>
    );
}

export default AddProduct;