import { useState } from 'react';
import { Link } from "react-router-dom";
import DefaultButton from "../assets/components/DefaultButton";
import Select from 'react-select'

function Header(props) {
    return (
        <>
            <h1 className='title'>New account</h1>
            <h5 className='subtitle'>Step {props.progressive} of 3</h5>
            <div className="my-4">Let’s start to know each other!</div>
        </>
    )
}

function Step1(props) {
    const options = [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
        { value: 'O', label: 'Other' }
    ]
    return (
        <div id='step1'>
            <div className='top-container'>
                <Header progressive='1' />
                <div className="mb-2">
                    <input type="text" className="form-control" id="text" placeholder="Name" name="name" onChange={props.handleChange} required />
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <div className="mb-2">
                    <input type="text" className="form-control" id="text" placeholder="Surname" name="surname" onChange={props.handleChange} required />
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <div className="mb-2">
                    <Select className="form-control" placeholder='Sex' name='sex' onChange={props.handleChange} options={options} />
                </div>
                <div className="mb-2">
                    <input type="text" className="form-control" id="text" placeholder="Address" name="address" onChange={props.handleChange} required />
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
            </div>
            <div className='bottom-container buttons'>
                <DefaultButton to='#' text='Continue' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='false' handler={props.handleContinue}/>
                <div className="divider"></div>
                <Link to="/login">
                    Sign-in to your account
                </Link>   
            </div>
        </div>
    )
}

function Step2(props) {
    const options = [
        { value: 'id', label: 'ID Card' },
        { value: 'patent', label: 'Patent' },
        { value: 'passport', label: 'Passport' }
    ]
    return (
        <div id='step2'>
            <div className='top-container'>
                <Header progressive='2' />
                <div className="mb-2">
                    <Select className="form-control" name='id_type' placeholder='ID document type' onChange={props.handleChange} options={options} />
                </div>
                <div className="mb-2">
                    <input type="text" className="form-control" id="number" placeholder="ID document number" name="id_number" onChange={props.handleChange} required />
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
            </div>
            <div className='bottom-container buttons'>
                <DefaultButton to='#' text='Continue' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='false' handler={props.handleContinue}/>
                <div className="divider"></div>
                <Link to="#" onClick={props.goBack}>
                    Go back
                </Link>   
            </div>
        </div>
    )
}

function Step3(props) {
    return (
        <div id='step3'>
            <div className='top-container'>
                <Header progressive='3' />
                <div className="mb-2">
                    <input type="email" className="form-control" id="email" placeholder="E-mail address" name="email" onChange={props.handleChange} required />
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={props.handleChange} required />
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
            </div>
            <div className='bottom-container buttons'>
                <DefaultButton to='#' text='Continue' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='false' handler={props.handleContinue}/>
                <div className="divider"></div>
                <Link to="#" onClick={props.goBack}>
                    Go back
                </Link>   
            </div>
        </div>
    )
}

export default function Register() {
    var data = {
        name: '',
        surname: '',
        address: '',
        sex: '',
        id_type: '',
        id_number: '',
        email: '',
        password: '',
    };
    const [step, setStep] = useState(1);

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

    function handleContinue() {
        // CHECK IF THE DATA HAVE BEEN FILLED CORRECTLY
        setStep(step + 1);
    }

    function goBack() {
        setStep(step - 1);
    }

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        if (data.hasOwnProperty(name)) {
            data[name] = value;
        }
    }
    
    return (
        <div id='signup' className='page'>
            <form method="post" onSubmit={handleSubmit}>
                {step === 1 &&
                    <Step1 onChange={handleChange} onContinue={handleContinue} />
                }
                {step === 2 &&
                    <Step2 goBack={goBack} onChange={handleChange} onContinue={handleContinue} />
                }
                {step === 3 &&
                    <Step3 goBack={goBack} onChange={handleChange} onContinue={handleContinue} />
                }
            </form>
        </div>
    );
}