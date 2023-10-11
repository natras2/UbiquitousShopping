import logo from './assets/images/logo/svg/graphic.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          A new, zero-waste shopping experience is under construction.
        </p>
        <a
          className="App-link"
          href="https://github.com/natras2/UbiquitousShopping/wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check the documentation
        </a>
      </header>
    </div>
  );
}

export default App;
