import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

require('dotenv').config()




export default function Numbers(props) {

    const[show, setShow] = useState(false);
    const[ticketNumber, setTicketNumber] = useState({})
    const[tickets, setTickets] = useState([])
    const[cart, setCart] = useState([]);
    const[fullCart, setFullCart] = useState([])
    const[total, setTotal] = useState(0);
    const[link, setLink] = useState("");

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const[numbers, setNumbers] = useState([]);

    const[out, setOut] = useState(false);
    

    useEffect(()=>{
        axios.get('https://rifa-beneficiente-mauri.herokuapp.com/numbers')
            .then(res=>{
                setTickets(res.data.sort())
            })

        if(total === 10){
            setLink("https://mpago.la/1YgCovj")
        }
        else if(total === 20){
            setLink("https://mpago.la/1aNQ37Q")
        }
        else if(total === 30){
            setLink("https://mpago.la/2UDJHDw")
        }
        else if(total === 40){
            setLink("https://mpago.la/18ZWviF")
        }
        else if(total === 50){
            setLink("https://mpago.la/2Wrzuad")
        }        
        else if(total === 60){
            setLink("https://mpago.la/1yWetZM")
        }
        else if(total === 70){
            setLink("https://mpago.la/17m5DJZ")
        }
        else if(total === 80){
            setLink("https://mpago.la/2Mmeobw")
        }
        else if(total === 90){
            setLink("https://mpago.la/2mVE9Wt")
        }
        else if(total === 100){
            setLink("https://mpago.la/2BrVH8t")
        }
            
            
            
            
            
            

    })

    const clickedNumber = (props) =>{
        props.active = true;
        console.log(props)

    }

    const handleClick = (props) =>{
        if(props.isTaken){

        }
        else setShow(true)
        setTicketNumber(props);

    }

    const addTicket = (props) =>{
        if(cart.includes(props.number) || cart.length > 9){console.log("ta aqui já")}
        else{
            setCart(current=> [...current, props.number]);
            setTotal(current=> current+10);
            setFullCart(current=> [...current, props]);
            console.log(fullCart)    
        }        
    }



    const updateTicket = (props) =>{
        
        const numberToUpdate = {
            number: props.number,
            isTaken: true
        }

        axios.post('https://rifa-beneficiente-mauri.herokuapp.com/numbers/update/'+props._id, numberToUpdate)
        .then(res=> console.log(res.data))
    }

    const payUp = () =>{
        fullCart.map(number=>(
            updateTicket(number)))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const buyer ={
            name: name,
            email: email,
            phone: phone,
            numbers: cart
        }

        axios.post('https://rifa-beneficiente-mauri.herokuapp.com/numbers/addBuyer', buyer)
        .then(res=> console.log(res.data));

        payUp();

        window.location.href = link;



    }

    return (
    <div>
        <div className="cart-banner">
            <FontAwesomeIcon className="icon" icon={faCartArrowDown} />
            <h1>R$ {total},00    Nº {cart.join(", ")}</h1>
           <div className="pay-button" onClick={(e)=>{setOut(true)}}>Pagar</div>

        </div>

        <div className="board">
                    {tickets.map(ticket=>(
                        <div key={ticket.number} className={ticket.isTaken ? 'numberTaken' : 'numbers'}
                        onClick={(e) => {handleClick(ticket)}}>{ticket.number}</div>
            ))}

            <div className="modal" style={{display:  show ? 'flex' : 'none'}} onClick={()=> setShow(false)}>
                <div className="checkout">
                    <h1>Checkout R$ {total}</h1>
                    <p>{cart.join(", ")}</p>
                    <p>Ao clicar no botão abaixo você Adicionará o bilhete escolhido ao carrinho, você pode adicionar até 10 bilhetes por compra.</p>
                    <p>Depois de escolhidos os números basta clicar em Pagar. Não se preocupe! A compra é 100% segura e garantida, em menos de 24hs você receberá o cupom de seu número de rifa no email cadastrado</p>
                    {/* <a href="https://www.letecacom.live" onClick={(e)=>{updateTicket(ticketNumber)}}>Link</a> */}
                    <div className="numbers" onClick={(e)=>{addTicket(ticketNumber)}}>+ Carrinho</div>
                </div>
            </div>

            <div className="modal" style={{display:  out ? 'flex' : 'none'}} >
                <div className="checkout">
                    <p onClick={(e)=>{setOut(false)}}>x</p>
                    <h1>Finalizando compra R$ {total}</h1>
                    <p>{cart.join(", ")}</p>
                    <p>Por favor insira os seus dados nos campos abaixo</p>
                    <form onSubmit={handleSubmit} >
                        <label>Nome
                            <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
                        </label>

                        <label>Email
                            <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                        </label>

                        <label>Telefone
                            <input type="number" value={phone} onChange={e=>setPhone(e.target.value)}/>
                        </label>
                    </form>
                    <p>Agora é só clicar no botão abaixo e você será direcionado a página de pagamento</p>
                    <p>O pagamento é 100% seguro e você pode escolher pagar em cartão de crédito ou boleto bancário</p>
                    <p>Assim que seu pagamento for aprovado você receberá seus bilhetes por email</p>
                    
                    
                    {/* <a href="https://www.letecacom.live" onClick={(e)=>{updateTicket(ticketNumber)}}>Link</a> */}
                   <div className="numbers" onClick={handleSubmit}> Finalizar</div>
                </div>
            </div>          
        </div>
    </div>

    )
}
