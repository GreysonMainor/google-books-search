//import logo from './logo.svg';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from "./components/Header";


function App() {
  return (
    <div className="App">
       <Header />
       <ToastContainer />
    </div>
  );
}

export default App;
