import InputField from "./InputField";

function LoginForm() {
    return (
        <>
            <InputField type="email" placeholder="E-mail address" name="email" isRegistering='false'/>
            <InputField type="password" placeholder="Password" name="password" isRegistering='false'/>
        </>
    );
}

export default LoginForm;