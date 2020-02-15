import React, {useState, useEffect} from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import Qrgen from '../components/qrModal'
import axios from 'axios'
import '../App.css'
import { User } from '../App'



// const liStyle = {
//     display: "flex",
//     listStyleType: "none"
// }

// const liStyle2 = {
//     display:"flex",
//     marginLeft:"20px"

// }

const btnStyle = {
    display:"flex"
}

const btnStyle2 = {
    marginLeft:"20px"
}

// state = {
//     booking: null
// };


// const book = () => {
//     axios.get('http://localhost:5000/api/v1/bookings/new')
//             .then(result => {
//                 console.log(result)
//                 this.setState({
//                     booking: result.data
//                 })
//             })
        
// }

// book()

// a = [1, 2, 3]
// a.map(item => {
//     return <p>{item}</p>
// })


const UserProfile = () => {
    const { currentUser } = React.useContext(User)
    // console.log(currentUser)
    const [modal, setModal] = useState(false);
    const [id, setId] = useState(null);
    const toggle = (id) =>{
        setId(id)
        setModal(!modal)
    } 
    const closeModal =()=>{
        setId(null)
        setModal(!modal)
    }
    // const [mode, setMode] = useState(true)

    const [booking, setBooking] = useState([])
    // const [store, setStore] = useState({})


    useEffect(() => {
        // axios.get(`http://localhost:5000/api/v1/bookings/?user_id=2`)
        axios.get(`https://dropandgo.herokuapp.com/api/v1/bookings?user_id=${currentUser.id}`)

            .then(result => {
                // console.log(result)
                setBooking(result.data)
                // setStore(result.data.store)
            })
    
    }, [currentUser])

    console.log('booking is ', booking)

    // let { id } = useParams()

    return(
        <div>
            {/* #code here for calling API to the databse so we can either use a for loop or just .map the list of bookings
            from database */}
            <div style={{textAlign:"center"}}>
                <h2 className="profileBookingTitle">My Bookings</h2>
            </div>
            {
                id ? <Qrgen modal={modal} toggle={closeModal} booking_id={id}/> :
                <>
            { booking.map((book=>(
                <div>
                <Card style={{border:"1px solid #40739E", marginRight:"5vw", marginLeft:"5vw", paddingBottom:"20px", borderRadius:"10px", marginTop:"10px"}}>
                    <CardHeader style={{fontWeight:"bold", textAlign:"center", fontSize:"2rem"}}>Luggage Station at KL Sentral</CardHeader>
                    <CardBody style={{display: "flex", justifyContent: "center"}}>
                        <div  style={btnStyle}>
                                <div scope="row">
                                    <div className="leftVariable">Drop off</div>
                                    <div className="leftVariable">Pick up</div>
                                    <div className="leftVariable">Luggage</div>
                                    <div className="leftVariable">Status</div>
                                    <div className="leftVariable">Price</div>
                                    <div className="leftVariable">Address</div>
                                    <div className="leftVariable">Operating hours</div>
                                </div>
                                <div scope="row" style={btnStyle2}>
                                    <div className="rightVariable">{book.check_in_date_time}</div>
                                    <div className="rightVariable">{book.check_out_date_time}</div>
                                    <div className="rightVariable">{book.number_of_bag}</div>
                                    <div className="rightVariable">{book.status}</div>
                                    <div className="rightVariable">{book.price}</div>
                                    <div className="rightVariable">{book.store.area}</div>
                                    <div className="rightVariable">{book.store.opening_hours}</div>
                                </div>                 
                        </div>                           
                    </CardBody>
                    <div style={{textAlign:"center", marginTop:"20px"}}>
                        <Button style={{textAlign:"center", color:"#fff", background:"#40739E", border:"1px solid #40739E", width: "140px", fontWeight:"bold", fontSize:"1.5rem"}} onClick={()=>toggle(book.id)} >View Qr Code</Button>
                    </div>
                </Card>
            </div>
             ))) 
             
                
        }
        </>
        }
        </div>
        
    )
}
export default UserProfile