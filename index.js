require('dotenv').config()
const { Pool, Client } = require('pg')
const express = require('express');
const app = express()
const port = 3000

const pool = new Pool({
    user: process.env.USER,
    host: 'web0.eecs.uottawa.ca',
    database: 'group_b01_g03',
    password: process.env.PASS,
    port: 15432,
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/hotel_brand', async (req, res) => {
    let result = await pool.query('SELECT * FROM HotelBrand')
    
    res.send(JSON.stringify(result["rows"]))
}) 
//--------------------------------INSERTIONS----------------------------------------------------

app.get('/hotel_chain', async (req, res) => {
    let result = await pool.query('SELECT * FROM HotelChain')
    
    res.send(JSON.stringify(result["rows"]))
}) 

app.post('/hotel_chain', async (req, res) => {
    await pool.query(
        `INSERT INTO HotelChain(street_num, street_name, city, prov, zip, num_stars, num_rooms, room_price, email)VALUES
        (${req.query.street_num}, ${req.query.street_name}, ${req.query.city}, ${req.query.prov}, ${req.query.zip}, ${req.query.num_stars}, 
            ${req.query.num_rooms}, ${req.query.room_price}, ${req.query.email})`
      );
}) 


app.get('/employee', async (req, res) => {
    let result = await pool.query('SELECT * FROM Employee')
    
    res.send(JSON.stringify(result["rows"]))
}) 

app.post('/employee', async (req, res) => {
    await pool.query(
        `INSERT INTO Employee(sin_num, first_name, last_name, street_num, street_name, city, prov, zip, salary, inst_position)VALUES
        (${req.query.sin_num}, ${req.query.first_name}, ${req.query.last_name}, ${req.query.street_num}, ${req.query.street_name}, ${req.query.city}, 
            ${req.query.prov}, ${req.query.zip}, ${req.query.salary}, ${req.query.inst_position})`
      );
}) 

app.get('/customer', async (req, res) => {
    let result = await pool.query('SELECT * FROM Customer')
    
    res.send(JSON.stringify(result["rows"]))
}) 

app.post('/customer', async (req, res) => {
    await pool.query(
        `INSERT INTO Customer(sin_num, first_name, last_name, street_num, street_name, city, prov, zip, salary, inst_position)VALUES
        (${req.query.sin_num}, ${req.query.first_name}, ${req.query.last_name}, ${req.query.street_num}, ${req.query.street_name}, ${req.query.city}, 
            ${req.query.prov}, ${req.query.zip}, ${req.query.salary}, ${req.query.inst_position})`
      );
}) 

app.get('/bookinginfo', async (req, res) => {
    let result = await pool.query('SELECT * FROM BookingInfo')
    res.send(JSON.stringify(result["rows"]))
})
app.post('BookingInfo', async (req, res) => {
    await pool.query(
        `INSERT INTO BookingInfo(room_type, num_occupants, date_check_in, date_check_out, renting_paid)VALUES
        (${req.query.room_type}, ${req.query.num_occupants}, ${req.query.date_check_in}, ${req.query.date_check_out}, ${req.query.renting_paid},)`
      );
}) 

//----------------------------------DELETIONS--------------------------------------------------------------

app.delete('/HotelChain', async (req, res) => {
    await pool.query( 
        `DELETE FROM HotelChain WHERE Chain_ID = ${req.query.Chain_ID} ` 
      );
}) 

app.delete(`/Employee`, async (req, res)=> {
    await pool.query(
        `DELETE FROM Employee WHERE sin_num = ${req.query.sin_num} `
    );
})

app.delete(`/Customer`, async (req, res)=>{
    await pool.query(
        `DELETE FROM Customer WHERE sin_num = ${req.query.sin_num}`
    );
})

app.delete(`BookingInfo`, async (req, res)=>{
    await pool.query(
        `DELETE FROM BookingInfo WHERE booking_id = ${req.query.booking_id}`
        );
})

//-------------------------------UPDATES--------------------------------------------------------------------

app.put('/HotelChain', async (req, res) => {
    if (req.query.street_num) {
     await pool.query(`UPDATE HotelChain SET street_num = ${req.query.street_num} WHERE Chain_ID = ${req.query.Chain_ID} `)
    }
    if(req.query.street_name){
        await pool.query(`UPDATE Hotelchain SET street_name = ${req.query.street_name} WHERE Chain_ID = ${req.query.Chain_ID}`)
    }
    if(req.query.city){
        await pool.query(`UPDATE Hotelchain SET city = ${req.query.city} WHERE Chain_ID = ${req.query.Chain_ID}`)
    }
    if(req.query.prov){
        await pool.query(`UPDATE Hotelchain SET prov = ${req.query.prov} WHERE Chain_ID = ${req.query.Chain_ID}`)
    }
    if(req.query.zip){
        await pool.query(`UPDATE Hotelchain SET zip = ${req.query.zip} WHERE Chain_ID = ${req.query.Chain_ID}`)
    }
    if(req.query.num_stars){
        await pool.query(`UPDATE Hotelchain SET num_stars = ${req.query.num_stars} WHERE Chain_ID = ${req.query.Chain_ID}`)
    }
    if(req.query.num_rooms){
        await pool.query(`UPDATE Hotelchain SET num_rooms = ${req.query.num_rooms} WHERE Chain_ID = ${req.query.Chain_ID}`)
    }
    if(req.query.room_price){
        await pool.query(`UPDATE Hotelchain SET room_price = ${req.query.room_price} WHERE Chain_ID = ${req.query.Chain_ID}`)
    }
    if(req.query.email){
        await pool.query(`UPDATE Hotelchain SET email = ${req.query.email} WHERE Chain_ID = ${req.query.Chain_ID}`)
    }
})

app.put('/Employee', async (req, res) => {
    if (req.query.first_name) {
     await pool.query(`UPDATE Employee SET first_name = ${req.query.first_name} WHERE employee_ID = ${req.query.employee_ID} `)
    }
    if (req.query.last_name) {
        await pool.query(`UPDATE Employee SET last_name = ${req.query.last_name} WHERE employee_ID = ${req.query.employee_ID} `)
    }
    if (req.query.street_num) {
        await pool.query(`UPDATE Employee SET street_num = ${req.query.street_num} WHERE employee_ID = ${req.query.employee_ID} `)
    }
    if (req.query.street_name) {
        await pool.query(`UPDATE Employee SET street_name = ${req.query.street_name} WHERE employee_ID = ${req.query.employee_ID} `)
    }
    if (req.query.city) {
        await pool.query(`UPDATE Employee SET city = ${req.query.city} WHERE employee_ID = ${req.query.employee_ID} `)
    }
    if (req.query.prov) {
        await pool.query(`UPDATE Employee SET prov = ${req.query.prov} WHERE employee_ID = ${req.query.employee_ID} `)
    }
    if (req.query.zip) {
        await pool.query(`UPDATE Employee SET zip = ${req.query.zip} WHERE employee_ID = ${req.query.employee_ID} `)
    }
    if (req.query.salary) {
        await pool.query(`UPDATE Employee SET salary = ${req.query.salary} WHERE employee_ID = ${req.query.employee_ID} `)
    }
    if (req.query.inst_position) {
        await pool.query(`UPDATE Employee SET inst_position = ${req.query.inst_position} WHERE employee_ID = ${req.query.employee_ID} `)
    }
})

app.put(`Customer`, async(req, res)=>{
    if (req.query.first_name) {
        await pool.query(`UPDATE Customer SET first_name = ${req.query.first_name} WHERE sin_num = ${req.query.sin_num} `)
    }
    if (req.query.last_name) {
        await pool.query(`UPDATE Customer SET last_name = ${req.query.last_name} WHERE sin_num = ${req.query.sin_num} `)
    }
    if (req.query.address) {
        await pool.query(`UPDATE Customer SET address = ${req.query.address} WHERE sin_num = ${req.query.sin_num} `)
    }
    if (req.query.date_registered) {
        await pool.query(`UPDATE Customer SET date_registered = ${req.query.date_registered} WHERE sin_num = ${req.query.sin_num} `)
    }
    
})

app.put(`BookingInfo`, async(req, res)=>{
    if (req.query.room_id) {
        await pool.query(`UPDATE BookingInfo SET room_id = ${req.query.room_id} WHERE booking_id = ${req.query.booking_id} `)
    }
    if (req.query.room_type) {
        await pool.query(`UPDATE BookingInfo SET room_type = ${req.query.room_type} WHERE booking_id = ${req.query.booking_id} `)
    }
    if (req.query.num_occupants) {
        await pool.query(`UPDATE BookingInfo SET num_occupants = ${req.query.num_occupants} WHERE booking_id = ${req.query.booking_id} `)
    }
    if (req.query.date_check_in) {
        await pool.query(`UPDATE BookingInfo SET date_check_in = ${req.query.date_check_in} WHERE booking_id = ${req.query.booking_id} `)
    }
    if (req.query.date_check_out) {
        await pool.query(`UPDATE BookingInfo SET date_check_out = ${req.query.date_check_out} WHERE booking_id = ${req.query.booking_id} `)
    }
    if (req.query.renting_paid) {
        await pool.query(`UPDATE BookingInfo SET renting_paid = ${req.query.renting_paid} WHERE booking_id = ${req.query.booking_id} `)
    }
    

})


app.get('/room', async (req, res) => {
    let result = await pool.query('SELECT * FROM Room')
    
    res.send(JSON.stringify(result["rows"]))
}) 

app.get('/room_info', async (req, res) => {
    let result = await pool.query('SELECT * FROM RoomInfo')
    
    res.send(JSON.stringify(result["rows"]))
}) 

app.get('/booking_info', async (req, res) => {
    let result = await pool.query('SELECT * FROM BookingInfo')
    
    res.send(JSON.stringify(result["rows"]))
}) 

app.get('/bookinginfo', async (req, res) => {
    await pool.query(
        `INSERT INTO BookingInfo(room_type, num_occupants, date_check_in, date_check_out, renting_paid)VALUES
        (${req.query.room_type}, ${req.query.num_occupants}, ${req.query.date_check_in}, ${req.query.date_check_out}, ${req.query.renting_paid})`
      );
}) 

app.get('/history', async (req, res) => {
    let result = await pool.query('SELECT * FROM History')
    
    res.send(JSON.stringify(result["rows"]))
}) 


  //-------------------------------CUSTOMER COMMANDS--------------------------------------------------------------------

app.get('/check_available_rooms', async (req, res) => {
    await pool.query(
        `SELECT * 
        FROM ROOMS 
        WHERE Room_ID NOT IN 
        (
            SELECT Room_ID 
            FROM   BOOKINGinfo B
                   
            WHERE  (date_check_in <= ${req.query.date_check_in} AND date_check_out >= ${req.query.date_check_in})
                   OR (date_check_in < ${req.query.date_check_out} AND date_check_out >= ${req.query.date_check_out} )
                   OR (${req.query.date_check_in} <= date_check_in AND ${req.query.date_check_out} >= date_check_in)
        )`
      );
}) 

app.get('/check_availability', async (req, res) => {
    let result = await pool.query(`SELECT room_id, customer_id FROM Books WHERE employee_id = ${req.query.employee_id} AND customer_id IS null`)
    
    res.send(JSON.stringify(result["rows"]))
}) 

app.get('/check_booked', async (req, res) => {
    let result = await pool.query(`SELECT room_id, customer_id FROM Books WHERE employee_id = ${req.query.employee_id} AND customer_id IS NOT null`)
    
    res.send(JSON.stringify(result["rows"]))
}) 
