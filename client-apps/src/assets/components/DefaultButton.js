import { Link } from "react-router-dom";
import * as FontAwesome from "react-icons/fa6"
import React from "react";

function DefaultButton(props) {
    /* props
     * - to
     * - text
     * - icon
     * - isCentered
     * - isButton
     * - isSubmit
     * - isLarge
     * - handler
     */
    const { isCentered, isLarge, isSubmit, handler = () => {} } = props;
    const Icon = (props.icon !== '') ? FontAwesome[props.icon] : '';

    return (
        <div className='default-button d-grid'>
            {(props.isButton === '' || props.isButton === 'false') &&
            <Link 
              to={props.to} 
              type="button" 
              className={"btn rounded-4 "+ (props.isCentered ? 'justify-content-center ' : '' ) + "d-flex shadow-sm " + (props.isLarge ? 'btn-lg ' : '') + "btn-block"}>
                {props.icon !== '' &&
                    <div className='icon'><Icon /></div>
                }
                <div className='text'>{props.text}</div>
            </Link>
            }
            { props.isButton === 'true' &&
            <button
              type={ isSubmit === 'true' ? 'submit' : 'button' }
              className={"btn rounded-4 "+ (isCentered ? 'justify-content-center ' : '' ) + "d-flex shadow-sm " + (isLarge ? 'btn-lg ' : '') + "btn-block"}
              onClick={handler} >
                {props.icon !== '' &&
                    <div className='icon'><Icon /></div>
                }
                <div className='text'>{props.text}</div>
            </button>
            }
        </div>
    );
}

export default DefaultButton;