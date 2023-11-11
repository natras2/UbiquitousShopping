import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { makeAPIRequest } from "../assets/components/Utils";
import Home from "./personalarea/Home";
import Carts from "./personalarea/Carts";
import Dispensers from "./personalarea/Dispensers";
import Validate from "./personalarea/Validate";
import Checkout from "./personalarea/Checkout";
import Loader from "../assets/components/Loader";
import { FaBoxArchive, FaCartShopping, FaCashRegister, FaHouse, FaIdCard } from "react-icons/fa6";

function SalesAssistantBottomNavbar(props) {
    return (
        <div id='salesassistant-bottom-navbar'>
            <div className={`home-button ${ (props.active === 'Home') ? 'active' : '' }`} onClick={() => props.handler('Home')}>
                <FaHouse />
                <div className='item-name'>Home</div>
            </div>
            <div className={`validate-button ${ (props.active === 'Validate') ? 'active' : '' }`} onClick={() => props.handler('Validate')}>
                <FaIdCard/>
                <div className='item-name'>Validate</div>
            </div>
            <div className='checkout-button'>
                <div onClick={() => props.handler('Checkout')}>
                    <div>
                        <FaCashRegister />
                    </div>
                </div>
            </div>
            <div className={`carts-button ${ (props.active === 'Carts') ? 'active' : '' }`} onClick={() => props.handler('Carts')}>
                <FaCartShopping />
                <div className='item-name'>Carts</div>
            </div>
            <div className={`dispensers-button ${ (props.active === 'Dispensers') ? 'active' : '' }`} onClick={() => props.handler('Dispensers')}>
                <FaBoxArchive />
                <div className='item-name'>Dispensers</div>
            </div>
        </div>
    );
}

export default function PersonalArea(props) {
    const [page, setPage] = useState(props.page);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await makeAPIRequest('GetAccountInformation', null, null, true);

            if (response.code === 200) {
                sessionStorage.setItem('store', JSON.stringify({ id: 1, name: 'Torino Lingotto', }));
                sessionStorage.setItem('account', JSON.stringify(response.body));
            }
            else {
                console.error(`API request failed with code ${response.code}:`, response.body);
            }
            setLoading(false);
        }
        if (!sessionStorage.getItem('account') || sessionStorage.getItem('account') === null)
            fetchData();
        else
            setLoading(false);
        
    }, []);

    const handleCurrentPage = (target) => {
        setPage(target);
        navigate('../' + target.toLowerCase());
    }
    
    if (loading) {
        return <Loader />;
    }
    
    return (
        <div id='personalarea' className='page'>
            {page === 'Home' && <Home />}
            {page === 'Validate' && <Validate />}
            {page === 'Checkout' && <Checkout />}
            {page === 'Carts' && <Carts />}
            {page === 'Dispensers' && <Dispensers />}
            <SalesAssistantBottomNavbar active={page} handler={handleCurrentPage} />
        </div>
    );
    
}