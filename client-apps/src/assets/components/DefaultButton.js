function DefaultButton(props) {
    return (
        <div className='default-button d-grid'>
            <button 
              type="button" 
              className={"btn rounded-4 "+ (props.isCentered ? 'text-center ' : 'd-flex ') + "shadow-sm " + (props.isLarge ? 'btn-lg ' : '') + "btn-block"}>
                {props.hasIcon !== '' &&
                    <div className='icon'>{props.hasIcon}</div>
                }
                <div className='text'>{props.text}</div>
            </button>
        </div>
    );
}

export default DefaultButton;