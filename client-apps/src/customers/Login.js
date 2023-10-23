import { useState } from "react";
import { Link } from "react-router-dom";
import DefaultButton from "../assets/components/DefaultButton";
import InputField from "../assets/components/InputField";
import { encryptPassword } from "../assets/components/Utils";

export function PasswordForgotten() {
    function handleSubmit(e) {

    }
    return (
        <div id='recover' className='page'>
            <form method="post" onSubmit={handleSubmit}>
                <div className='top-container'>
                    <h1 className='title'>Password forgotten?</h1>
                    <h5 className='subtitle'>Don't worry, we got you covered!</h5>
                    <div className="my-4">Insert your email address, we will send you the link to restore your password.</div>
                    <InputField type="email" placeholder="E-mail address" name="email" isRegistering='false'/>
                </div>
                <div className='bottom-container buttons'>
                    <DefaultButton to='#' text='Recover the password' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='true'/>
                    <div className="divider"></div>
                    <Link to="..">
                        Go back
                    </Link>   
                </div>
            </form>
        </div>
    )
}

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // generate data to fetch
        const form = {...data};
        form.password = encryptPassword(data.password);
    
        //fetch('/auth/login?user=customer', { method: e.target.method, body: form });
        console.log(form);
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
        <div id='login' className='page'>
            <form method="post" onSubmit={handleSubmit}>
                <div className='top-container'>
                    <h1 className="mb-4">Sign-in</h1>
                    <InputField type="email" placeholder="E-mail address" name="email" value={data.email} handleChange={handleChange} isRegistering='false' />
                    <InputField type="password" placeholder="Password" name="password" value={data.password} handleChange={handleChange}  isRegistering='false' />
                    <Link to="recover" className="float-end">
                        Password forgotten?
                    </Link>
                </div>
                <div className='bottom-container buttons'>
                    <DefaultButton to='#' text='Sign-in to your account' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='true'/>
                    <div className="divider"></div>
                    <Link to="/signup">
                        Create a new account
                    </Link>   
                </div>
            </form>
        </div>
    );
}