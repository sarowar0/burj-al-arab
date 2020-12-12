import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(), 
        checkOut: new Date()
    });


    const handleCheckIn = (date) => {
        const newDate = {...selectedDate}
        newDate.checkIn = date;
        setSelectedDate(newDate)
    }

    const handleCheckOut = (date) => {
        const newDate = {...selectedDate}
        newDate.checkOut = date;
        setSelectedDate(newDate)
    }
    

    const handleBookings = () => {
        const newBookings = {...loggedInUser, ...selectedDate};
        fetch("http://localhost:4200/addUser", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBookings)
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                alert("Booking added to successfully")
            }
        })
    }

    return (
        <div>
   
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In"
                        value={selectedDate.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <button onClick={handleBookings} className='btn btn-primary mx-auto d-block'>Book Now</button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;