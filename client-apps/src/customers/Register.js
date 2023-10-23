import { useState } from 'react';
import { Link } from "react-router-dom";
import DefaultButton from "../assets/components/DefaultButton";
import InputField from '../assets/components/InputField';

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
                <InputField type="text" placeholder="Name" name="name" value={props.values.name} handleChange={props.handleChange} isRegistering='true'/>
                <InputField type="text" placeholder="Surname" name="surname" value={props.values.surname} handleChange={props.handleChange} isRegistering='true'/>
                <InputField type="select" placeholder='Sex' name='sex' value={props.values.sex} handleChange={props.handleChange} options={options} showGuide='true' guideText='' isRegistering='true' />
                <InputField type="address" placeholder='Address' name='address' value={props.values.address} handleChange={props.handleChange} showGuide='true' guideText='' isRegistering='true' />
                {/*<InputField type="text" placeholder="Address" name="address" value={props.values.address} handleChange={props.handleChange} showGuide='true' guideText='' isRegistering='true'/>*/}
            </div>
            <div className='bottom-container buttons'>
                <DefaultButton to='#' text='Continue' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='false' handler={props.onContinue}/>
                <div className="divider"></div>
                <Link to="../login">
                    Sign-in to your account
                </Link>   
            </div>
        </div>
    )
}

function Step2(props) {
    const options = [
        { value: 'id', label: 'ID Card' },
        { value: 'licence', label: 'Driver licence' },
        { value: 'passport', label: 'Passport' }
    ]
    return (
        <div id='step2'>
            <div className='top-container'>
                <Header progressive='2' />
                <InputField type="select" placeholder='ID document type' name='id_type' value={props.values.id_type} handleChange={props.handleChange} options={options}  isRegistering='true' />
                <InputField type="text" placeholder="ID document number" name="id_number" value={props.values.id_number} handleChange={props.handleChange} showGuide='true' guideText='' isRegistering='true'/>
            </div>
            <div className='bottom-container buttons'>
                <DefaultButton to='#' text='Continue' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='false' handler={props.onContinue}/>
                <div className="divider"></div>
                <Link to="." onClick={props.goBack}>
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
                <InputField type="email" placeholder="E-mail address" name="email" value={props.values.email} handleChange={props.handleChange} isRegistering='true'/>
                <InputField type="password" placeholder="Password" name="password" value={props.values.password} handleChange={props.handleChange} isRegistering='true'/>
            </div>
            <div className='bottom-container buttons'>
                <DefaultButton to='#' text='Create a new account' icon='' isCentered='true' isLarge='true' isButton='true' isSubmit='true' />
                <div className="divider"></div>
                <Link to="." onClick={props.goBack}>
                    Go back
                </Link>   
            </div>
        </div>
    )
}

export default function Register() {
    const [data, setData] = useState({
        name: '',
        surname: '',
        address: '',
        sex: '',
        id_type: '',
        id_number: '',
        email: '',
        password: '',
    });
    const [step, setStep] = useState(1);

    function handleSubmit(e) {
        console.log("WHY AM I HERE!?");
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        // You can pass formData as a fetch body directly:
        // fetch('/some-api', { method: form.method, body: formData });
    
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
        const { name, value } = e.target;
        if (data.hasOwnProperty(name)) {
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    
    return (
        <div id='signup' className='page'>
            <form method="post" onSubmit={handleSubmit}>
                {step === 1 &&
                    <Step1 handleChange={handleChange} onContinue={handleContinue} values={ 
                        {
                            name: data.name, 
                            surname: data.surname,
                            sex: data.sex, 
                            address: data.address,
                        } 
                    } />
                }
                {step === 2 &&
                    <Step2 goBack={goBack} handleChange={handleChange} onContinue={handleContinue} values={ 
                        {
                            id_type: data.id_type, 
                            id_number: data.id_number
                        } 
                    } />
                }
                {step === 3 &&
                    <Step3 goBack={goBack} handleChange={handleChange} values={ 
                        {
                            email: data.email, 
                            password: data.password
                        } 
                    } />
                }
            </form>
        </div>
    );
}