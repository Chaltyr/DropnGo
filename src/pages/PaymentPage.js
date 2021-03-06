import React, { useState, useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import moment from "moment";
import { User } from '../App'
import { useHistory } from 'react-router-dom'



function PaymentPage({setMessage, setOpenAlert, setColor}) {    
    const [instance, setInstance] = useState(null)
    const { currentUser, isLoading, setIsLoading } = React.useContext(User)
    const [clientToken, setClientToken] = useState(null)
   

   
    let history = useHistory();
    let { state } = useLocation()

    // if you do history.push('/payment', {a: 1, b: 2})
    // then state will be {a:1, b:2}
    // console.log(state)
    // console.log(instance)


    useEffect(() => {
        axios.get('https://dropandgo.herokuapp.com/api/v1/payments/new')
            .then(result => {
                setClientToken(result.data.client_token)
                // setPayButton(false)
            })
    }, [])

    const buy = () => {
        setIsLoading(true)
        console.log(instance)
        instance.requestPaymentMethod()
        .then(result => {
            console.log(result)
            console.log(result.nonce)
            axios({
                    url: `https://dropandgo.herokuapp.com/api/v1/bookings/inc_payment`,
                    method: 'post',
                    data: {
                        "user": currentUser.id,
                        "store": state.store_id,
                        "check_in_date_time": state.dropOffDate,
                        "check_out_date_time": state.pickUpDate,
                        "number_of_bag": state.luggageNum,
                        "price": state.cost,
                        "nonce": result.nonce
                    }
                })
                    .then(response => {
                        setMessage("Booking Confirmed")
                        setOpenAlert(true)
                        setColor("success")
                        const { booking_id } = response.data
                        console.log(booking_id)
                        let path = `/booking/${booking_id}`
                        const { cost } = state
                        console.log(cost)
                        setIsLoading(false)
                        history.push(path, {
                            cost,
                            booking_id
                        })
                        console.log(response) // {success: true or false}
                    })
            })
    }
    
    if (!state) {
        return 'You can only access this page from booking page'
    }
    
    if (clientToken === null) return isLoading
       

    return (
        <div>
            <div className="product">
                <div className="template-content">
                    <div>
                    
                    <h1>Luggage Storage {state.area}</h1>
                    
                        <p><strong>Drop off:</strong> {moment(state.dropOffDate).format('llll')}</p>
                        <p><strong>Pick-up:</strong> {moment(state.pickUpDate).format('llll')}</p>
                        <p><strong>Bags:</strong> {state.luggageNum}</p>
                    </div>
                        <div className="total-block">
                
                             <p className="total"><strong>Total:</strong>  RM{state.cost}</p>
                        </div>
                </div>
            {/* <h2>Price: RM{state.cost}</h2>
            <h4>Start Date: {moment(state.dropOffDate).format('llll')}</h4>
            <h4>Start Date: {moment(state.pickUpDate).format('llll')}</h4>
            <h4>Number of luggage: {state.luggageNum}</h4> */}
            <br></br>
            <DropIn
                options={{ authorization: clientToken }}
                onInstance={i => {setInstance(i)}}
                // if (instance) {setPayButton(false)}

            />
         </div>
            { instance ?
            <button className="PayButton" onClick={buy}>PAY RM{state.cost}</button>
            :
            <button className="PayButton" style={{visibility:"hidden"}} onClick={buy}>PAY RM{state.cost}</button>
            }
        </div>

    )

}

export default PaymentPage
