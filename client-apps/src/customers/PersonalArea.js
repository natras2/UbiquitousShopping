import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { makeAPIRequest } from "../assets/components/Utils";
import { FaHouse } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import Home from "./personalarea/Home";
import Scan from "./personalarea/Scan";
import Loader from "../assets/components/Loader";

function History() {

}
function Profile() {

}
function CustomerBottomNavbar(props) {
    return (
        <div id='customer-bottom-navbar'>
            <div className={`home-button ${ (props.active === 'Home') ? 'active' : '' }`} onClick={() => props.handler('Home')}>
                <FaHouse />
                <div className='item-name'>Home</div>
            </div>
            <div className={`scan-button ${ (props.active === 'Scan') ? 'active' : '' }`} onClick={() => props.handler('Scan')}>
                <FaMagnifyingGlass />
                <div className='item-name'>Scan</div>
            </div>
            <div className='cart-button'>
                <div onClick={() => props.handler('Cart')}>
                    <div>
                        <FaCartShopping />
                    </div>
                </div>
            </div>
            <div className={`history-button ${ (props.active === 'History') ? 'active' : '' }`} onClick={() => props.handler('History')}>
                <FaClockRotateLeft />
                <div className='item-name'>History</div>
            </div>
            <div className={`profile-button ${ (props.active === 'Profile') ? 'active' : '' }`} onClick={() => props.handler('Profile')}>
                <FaUser />
                <div className='item-name'>Profile</div>
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
                sessionStorage.setItem('store_id', 1);
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
            {page === 'Scan' && <Scan />}
            {page === 'History' && <History />}
            {page === 'Profile' && <Profile />}
            <CustomerBottomNavbar active={page} handler={handleCurrentPage} />
        </div>
    );
    
}