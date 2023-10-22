import { Link } from "react-router-dom";
import DefaultButton from "../assets/components/DefaultButton";
import LoginForm from "../assets/components/LoginForm";
import InputField from "../assets/components/InputField";

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
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });
    
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }
    
    return (
        <div id='login' className='page'>
            <form method="post" onSubmit={handleSubmit}>
                <div className='top-container'>
                    <h1 className="mb-4">Sign-in</h1>
                    <LoginForm />
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