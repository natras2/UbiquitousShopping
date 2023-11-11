import logo from './assets/images/logo/svg/full.svg';
import illustration from './assets/images/illustrations/undraw_shopping_app_flsj.svg'
import DefaultButton from './assets/components/DefaultButton';
import { useLocation, Link } from 'react-router-dom';
import { FaGoogle, FaApple } from 'react-icons/fa6';
import { useEffect } from 'react';

function LandingButtons(params) {
    const salesAssistant = (
        <div className='bottom-container buttons'>
            <DefaultButton to='login' text='Sign-in as Sales Assistant' icon='' isCentered='true' isLarge='true' isButton='false' />
            <div className="divider my-0"></div>
            <Link to="../" className='signin-link'>
                Sign in as Customer instead
            </Link>
        </div>
    ); 
    const customer = (
        <div className='bottom-container buttons'>
            <div className='google-button d-grid'>
                <Link to='.' type="button" className="btn rounded-4 shadow-sm btn-lg btn-block">
                    <FaGoogle />
                    <div className='text'>Sign-in with Google</div>
                </Link>
            </div>
            <div className='apple-button d-grid'>
                <Link to='.'  type="button" className="btn rounded-4 shadow-sm btn-lg btn-block">
                    <FaApple />
                    <div className='text'>Sign-in with Apple ID</div>
                </Link>
            </div>
            <div className="divider my-0"></div>
            <Link to="login" className='signin-link'>
                Sign-in with your email
            </Link>   
        </div>
    );

    return <>{params.isSA ? salesAssistant : customer}</>; 
}

function Landing(params) {
    return (
        <div id='landing' className='page'>
            <div className='top-container'>
                <div className='logo'>
                    <img 
                        src={logo} 
                        alt='Logo UbiShop' 
                        height={70}
                    />
                </div>
                <div className='illustration'>
                    <img 
                        src={illustration} 
                        alt='Shopping app illustration' 
                        height={230}
                    />
                </div>
            </div>
            <LandingButtons isSA={params.isSA}/>
        </div>
    );
}

function App(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    return (
        <Landing isSA={props.isSA || (searchParams.get('u') === 'sa' ? true : false )}/>
    );
}

export default App;