import logo from './logo.svg';
import './App.css';
import Numbers from './components/Numbers';

import React, {useState, useEffect} from 'react';



function App() {

  const[show, setShow] = useState(false);
  const[ticket, setTicket] = useState(0);

  const handleClick = () =>{
    
    setShow(true)
    
  }

  return (
    <div className="App">
      <header className="header">
            <h1>RIFA BENEFICENTE DO MAURI E DA ENI</h1>
            <h2>Serão 3 prêmios</h2>
            <h3>Sorteio dia 31 de março de 2021</h3>
            <div className="numbers" onClick={handleClick}>Prêmios</div>
      </header>

      
        <Numbers/>


            <div className="modal" style={{display:  show ? 'flex' : 'none'}} onClick={()=> {setShow(false)}}>
                <div className="checkout">
                    <h1>Prêmios</h1>
                    <h2>1º Óculos de Sol das óticas Magoo</h2>
                    <p>2º 1 batedeira cadence </p>
                    <p>3º 1 kit festa para 30 pessoas </p>
                    

                    {/* <a href="https://www.letecacom.live" onClick={(e)=>{updateTicket(ticketNumber)}}>Link</a> */}
                    
                </div>
            </div>



            <footer>
            <p>O sorteio será realizado dia 31 de março pelos números da loteria federal</p>
              <p>Desenvolvido por <a href="http://www.letecacom.live"><b>Leteca Comunicação</b></a></p>

            </footer>
        
      




    </div>
  );
}

export default App;
