import {useState} from 'react';
import './App.css';
import Main from './Main';
import NavBar from './Nav';


function App() {
  const [account, setAccount] = useState([]);
  return (
    <div className="overlay">
      <div className="App">
        <NavBar account={account} setAccount={setAccount} />
        <Main account={account} setAccount={setAccount} />
      </div>
      <div className="bg"></div>
    </div>
  );
}

export default App;
