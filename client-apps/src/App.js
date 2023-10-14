import logo from './assets/images/logo/svg/full.svg';
import illustration from './assets/images/illustrations/undraw_shopping_app_flsj.svg'
import DefaultButton from './assets/components/DefaultButton';
import { useLocation } from 'react-router-dom';
import { FaGoogle, FaApple } from 'react-icons/fa6';

function LandingButtons(params) {
    const salesAssistant = (
        <div className='bottom-container buttons'>
            <DefaultButton text='Sign-in as Sales Assistant' isCentered='true' isLarge='true' hasIcon='' />
            <a href="/" className='signin-link'>
                Sign in as Customer instead
            </a>
        </div>
    ); 
    const customer = (
        <div className='bottom-container buttons'>
            <div className='google-button d-grid'>
                <button type="button" className="btn rounded-4 shadow-sm btn-lg btn-block">
                    <FaGoogle />
                    <div className='text'>Sign-in with Google</div>
                </button>
            </div>
            <div className='apple-button d-grid'>
                <button type="button" className="btn rounded-4 shadow-sm btn-lg btn-block">
                    <FaApple />
                    <div className='text'>Sign-in with Apple ID</div>
                </button>
            </div>
            <a href="https://github.com" className='signin-link'>
                Sign-in with your email
            </a>   
        </div>
    );

    return <>{params.user === 'sa' ? salesAssistant : customer}</>; 
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
            <LandingButtons user={params.user}/>
        </div>
    );
}

function App() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const user = searchParams.get('u');

    return (
        <Landing user={user}/>
    );
}

export default App;