import DefaultButton from "../assets/components/DefaultButton";
import LoginForm from "../assets/components/LoginForm";

function Login() {
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
                </div>
                <div className='bottom-container buttons'>
                    <DefaultButton to='#' text='Sign-in to your account' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='true'/>
                </div>
            </form>
        </div>
    );
}

export default Login;