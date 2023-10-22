import Select from 'react-select'
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState } from 'react';

function TextualField(props) {
    const [fieldValue, setFieldValue] = useState(props.value); // Initialize state with prop value

    const handleFieldChange = (e) => {
        setFieldValue(e.target.value); // Update state with input value
        props.handleChange(e);
    };
    return (
        <div className="mb-2">
            <input 
                type={props.type} 
                className="form-control" 
                id={props.name} 
                value={fieldValue}
                placeholder={props.placeholder} 
                name={props.name} 
                onChange={handleFieldChange} 
                required />
            <div className="invalid-feedback">Please fill out this field.</div>
            {(props.type === 'password' && props.isRegistering === 'true') &&
                <PasswordStrengthBar 
                    className='password-strength-bar' 
                    minLength={8} 
                    scoreWords={['Weak', 'Weak', 'Okay', 'Good', 'Strong']}
                    shortScoreWord='Too short'
                    password={fieldValue} />
            }
        </div>
    )
}
function SelectField(props) {
    const [fieldValue, setFieldValue] = useState(props.value); // Initialize state with prop value

    const handleFieldChange = (selectedOption) => {
        var e = {
            target: {
                name: props.name,
                value: selectedOption.value
            }
        };
        props.handleChange(e);
        setFieldValue(selectedOption.value); // Update state with input value
    };
    const style = {
        control: base => ({
            ...base,
            border: 0,
            // This line disable the blue border
            boxShadow: "none"
        })
    };
    return (
        <div className="mb-2">
            <Select 
                className="form-control" 
                name={props.name} 
                value={props.options.find(option => option.value === fieldValue)} 
                placeholder={props.placeholder} 
                onChange={handleFieldChange} 
                options={props.options} 
                styles={style} />
        </div>
    )
}

export default function InputField(props) {
    let field;
    switch (props.type) {
        case 'text':
            field = (
                <TextualField 
                    type='text' 
                    name={props.name}
                    value={props.value}
                    placeholder={props.placeholder} 
                    handleChange={props.handleChange} 
                    isRegistering={props.isRegistering}
                />
            );
            break;
        case 'password':
            field = (
                <TextualField 
                    type='password' 
                    name={props.name} 
                    value={props.value}
                    placeholder={props.placeholder}
                    handleChange={props.handleChange}
                    isRegistering={props.isRegistering}
                />
            );
            break;
        case 'email':
            field = (
                <TextualField 
                    type='email' 
                    name={props.name}
                    value={props.value} 
                    placeholder={props.placeholder} 
                    handleChange={props.handleChange} 
                    isRegistering={props.isRegistering} 
                />
            );
            break;
        case 'select':
            field = (
                <SelectField 
                    name={props.name} 
                    value={props.value} 
                    placeholder={props.placeholder} 
                    handleChange={props.handleChange} 
                    options={props.options} 
                    isRegistering={props.isRegistering} />
            );
            break;
        default:
            field = '';
    }
    return (
        <>
            <>{field}</>
            {props.showGuide === 'true' &&
                <div className='input-guide mb-2'>Why do we ask for it?</div>
            }
        </>
    )
}