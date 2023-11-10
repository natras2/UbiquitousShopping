import { MutatingDots } from  'react-loader-spinner'

function Loader(props) {
    return (
        <MutatingDots
            height="100"
            width="100"
            color="#9AB522"
            secondaryColor='#123B14'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass={`loader ${(!!props.selector) ? props.selector : ''}`}
            visible={true}
        />
    );
}

export default Loader;