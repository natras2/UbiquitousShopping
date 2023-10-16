function LoginForm() {
    return (
        <>
            <div className="mb-2">
                <input type="email" className="form-control" id="email" placeholder="E-mail address" name="email" required />
                <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password" name="password" required />
                <div className="invalid-feedback">Please fill out this field.</div>
            </div>
        </>
    );
}

export default LoginForm;