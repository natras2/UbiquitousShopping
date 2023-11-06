import { useEffect, useState } from "react";
import { makeAPIRequest } from "../assets/components/Utils";

function Home() {
    const account = sessionStorage.getItem('account');

    return (
        <div id="home">
            {account}
        </div>
    );
}
function Scan() {

}
function History() {

}
function Profile() {

}
function CustomerBottomNavbar(props) {

}

export default function PersonalArea(props) {
    const { page, setPage } = useState(props.page);

    useEffect(() => {
        async function fetchData() {
            const response = await makeAPIRequest('GetAccountInformation', null, null, true);

            if (response.code === 200) {
                sessionStorage.setItem('account', response.body );
            }
            else {
                console.error(`API request failed with code ${response.code}:`, response.body);
            }
        }
        fetchData();
    }, []);

    function handleCurrentPage() {

    }

    return (
        <div id='personalarea' className='page'>
            {page === 'Home' && <Home />}
            {page === 'Scan' && <Scan />}
            {page === 'History' && <History />}
            {page === 'Profile' && <Profile />}
            <CustomerBottomNavbar onClick={handleCurrentPage} />
        </div>
    );
}