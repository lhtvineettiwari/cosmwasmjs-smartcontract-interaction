import { ChainInfo } from './components/ChainInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

const clearSession = () => {
  sessionStorage.clear() // Perform log out functionality here
  window.location.reload();
};

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
            <Route  path="/" element={<ChainInfo/>} />
    </Routes>
    </BrowserRouter>
    {sessionStorage.getItem("rpcEndPoint") && sessionStorage.getItem("contractAddress") ? 
    <button id="logout-button" onClick={clearSession}>
      Log Out
    </button>: null}
    </div>
  );
}

export default App;
