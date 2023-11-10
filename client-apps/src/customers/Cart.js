import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import illustration from "../assets/images/illustrations/new-cart.svg"
import { FaArrowLeft, FaQrcode, FaNfcSymbol, FaLocationDot, FaHashtag, FaPercent, FaQuestion, FaPlus, FaWeightScale } from "react-icons/fa6"
import Loader from "../assets/components/Loader";
import { makeAPIRequest } from "../assets/components/Utils";
import DigitalLabel from "../assets/components/DigitalLabel";

export function ProductDigitalLabel() {
    const [processing, setProcessing] = useState(true);
    const [data, setData] = useState(null);
    const { iddispenser } = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await makeAPIRequest('GetDigitalLabel', null, {
                iddispenser: iddispenser,
                store_id: JSON.parse(sessionStorage.getItem('store')).id
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
        navigator('..');
    }
    return (
        <div className="page">
            {processing && <Loader />}
            {!processing &&
                <DigitalLabel
                    data={data}
                    goBack={handleGoBack}
                    textBack={'Get back to cart'}
                />
            }
        </div>
    )
}

function CartManagement(props) {
    const [processing, setProcessing] = useState(true);
    const [cartData, setCartData] = useState(null);

    const navigator = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await makeAPIRequest('GetCart', null, {
                idcart: sessionStorage.getItem('cart_id')
            }, true);

            if (response.code === 200) {
                setCartData(response.body);
            }
            else {
                console.error(`API request failed with code ${response.code}:`, response.body);
            }
            setProcessing(false);
        }
        fetchData();
    });


    const showDigitalLabel = async (dispenser_id) => {
        navigator("./label/" + dispenser_id);
    }

    const formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    })


    let total = 0;
    let productList = [];

    if (!processing) {
        (cartData.cart.Products).forEach((item) => {
            total += parseFloat(item.price);

            productList.push(
                <div key={item.id} className="product-item" onClick={() => showDigitalLabel(item.MerchLot.Dispenser.id)}>
                    <div className="product-info">
                        <div className="name">{item.name}</div>
                        <div className="weight"><FaWeightScale /> {("" + parseFloat(item.weight / 1000).toFixed(2)).replace('.', ',')} kg</div>
                    </div>
                    <div className="product-price">{formatter.format(item.price)}</div>
                </div>
            )
        });
    }

    const handleAddProduct = () => {
        navigator("./add");
    }

    if (processing)
        return <Loader />;

    return (
        <div className="cartmanagement">
            <div className="top-component">
                <div className="cart-info">
                    <div className="store-name"><FaLocationDot /> {JSON.parse(sessionStorage.getItem('store')).name}</div>
                    <div className="cart-id"><FaHashtag /> Cart ID: {sessionStorage.getItem('cart_id')}</div>
                </div>
                <div className="checkout">
                    <div className="total">
                        <div className="label">Total</div>
                        <div className="value">{formatter.format(total)}</div>
                    </div>
                    <div className="button">Checkout</div>
                </div>
            </div>
            <div className="product-list">
                {productList}
            </div>
            <div className="bottom-component">
                <div className="service-buttons">
                    <div className="offers"><FaPercent /> Offers</div>
                    <div className="assistance"><FaQuestion /> Assistance</div>
                </div>
                <div className="plus-button" onClick={() => handleAddProduct()}>
                    <FaPlus />
                </div>
            </div>
        </div>
    )
}

function WelcomePage(props) {
    return (
        <div className="welcomepage">
            {props.hasBack &&
                <div className="back-button" onClick={() => props.goBack()}>
                    <FaArrowLeft /> {props.textBack}
                </div>
            }
            <div className="illustration">
                <img
                    src={illustration}
                    alt='New cart illustration'
                    width='80%'
                />
            </div>
            <div className="content-text">
                You're creating a new cart in the store
                <span className="store-name"> {JSON.parse(sessionStorage.getItem('store')).name}</span>
            </div>
            <div className="scanning-method-selection-box">
                <div className="content-text">Select the scanning method you intend to use during the shopping session</div>
                <div className="scanning-method-buttons">
                    <div className="qr" onClick={() => props.openCart('qr')}>
                        <FaQrcode />
                        <div className="scan-method-name">QR code</div>
                    </div>
                    <div className="nfc">
                        <FaNfcSymbol />
                        <div className="scan-method-name">NFC tag</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Cart(props) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!!sessionStorage.getItem('cart_id'))
            setOpen(true);

        setProcessing(false);
    }, []);

    const handleGoBack = () => {
        navigate('../home');
    }

    const handleOpenCart = async (scanMethod) => {
        setProcessing(true);

        const response = await makeAPIRequest('GenerateCart', null, {
            store_id: JSON.parse(sessionStorage.getItem('store')).id
        }, true);

        if (response.code === 201) {
            console.log(response.body);
            sessionStorage.setItem('cart_id', response.body.id);
            setOpen(true);
        }
        else {
            console.error(`API request failed with code ${response.code}:`, response.body);
        }
        setProcessing(false);
    }

    return (
        <div id="cart" className="page">
            {(open && !processing) && <CartManagement />}
            {processing && <Loader />}
            {(!open && !processing) &&
                <WelcomePage
                    hasBack={true}
                    goBack={handleGoBack}
                    textBack='Go back'
                    openCart={handleOpenCart}
                />}
        </div>
    )
}