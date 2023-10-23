import { useState } from "react";
import DefaultButton from "../assets/components/DefaultButton";
import InputField from "../assets/components/InputField";
import { encryptPassword } from "../assets/components/Utils";

function Login() {
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
    
        //fetch('/auth/login?user=sa', { method: e.target.method, body: form });
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
                </div>
                <div className='bottom-container buttons'>
                    <DefaultButton to='#' text='Sign-in to your account' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='true'/>
                </div>
            </form>
        </div>
    );
}

export default Login;