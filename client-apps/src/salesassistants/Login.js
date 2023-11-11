import { useEffect, useState } from "react";
import DefaultButton from "../assets/components/DefaultButton";
import InputField from "../assets/components/InputField";
import { encryptPassword, makeAPIRequest } from "../assets/components/Utils";
import { useNavigate } from "react-router";
import Loader from "../assets/components/Loader";

function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [processing, setProcessing] = useState(false);
    
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        setProcessing(true);

        // Prevent the browser from reloading the page
        e.preventDefault();

        if (data.email === "" || data.password === "") 
            return;

        // generate data to fetch
        const form = { 
            email_address: data.email,
            password: encryptPassword(data.password),
        };

        const response = await makeAPIRequest('Login', form, { type: 'SalesAssistant' }, false);

        if (response.code === 200) {
            sessionStorage.setItem('token', response.body.token );
            navigate("../home");
        } 
        else {
            console.error(`API request failed with code ${response.code}:`, response.body);
            setProcessing(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        if (data.hasOwnProperty(name)) {
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    
    return (
        <>
            <div id='login' className='page'>
                <form method="post" onSubmit={handleSubmit}>
                    <div className='top-container'>
                        <h1 className="mb-4">Sign-in</h1>
                        <InputField type="email" placeholder="E-mail address" name="email" value={data.email} handleChange={handleChange} isRegistering='false' />
                        <InputField type="password" placeholder="Password" name="password" value={data.password} handleChange={handleChange}  isRegistering='false' />
                    </div>
                    <div className='bottom-container buttons'>
                        <DefaultButton to='#' text='Sign-in to your account' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='true'/>
                    </div>
                </form>
            </div>
            {processing && 
            <Loader selector='login'/>
            }
        </>
    );
}

export default Login;