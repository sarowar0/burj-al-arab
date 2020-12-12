import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Bookings.css';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [bookings, setBookings] = useState([])
    console.log(bookings);


    useEffect(() => {
        fetch(`http://localhost:4200/bookings?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: sessionStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(bookings => setBookings(bookings))
    }, [])

    return (
        <div className="bookings">
            <h3 className='text-center'>You have booked {bookings.length} room</h3>
            <div className="container">
                <div className="row">
                    {
                        bookings.map(booking =>
                            <div className='col-md-4 bordered'>
                                <div className='p-3'>
                                    <h5>{booking.name}</h5>
                                    <h6>{booking.email}</h6>
                                    <p>{new Date(booking.checkIn).toDateString('dd/MM/yyyy')}</p>
                                    <p>{new Date(booking.checkOut).toDateString('dd/MM/yyyy')}</p>
                                    <button className='btn btn-warning'>Remove Booking</button>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Bookings;