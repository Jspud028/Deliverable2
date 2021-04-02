require('dotenv').config()
const { Pool, Client } = require('pg')
const express = require('express');
const app = express()
const port = 3000

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
        `INSERT INTO HotelChain(sin_num, first_name, last_name, street_num, street_name, city, prov, zip, salary, inst_position)VALUES
        (${req.query.sin_num}, ${req.query.first_name}, ${req.query.last_name}, ${req.query.street_num}, ${req.query.street_name}, ${req.query.city}, 
            ${req.query.prov}, ${req.query.zip}, ${req.query.salary}, ${req.query.inst_position})`
      );
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
        `INSERT INTO BookingInfo(room_type, num_occupants, date_checked_in, date_checked_out, renting_paid)VALUES
        (${req.query.room_type}, ${req.query.num_occupants}, ${req.query.date_checked_in}, ${req.query.date_checked_out}, ${req.query.renting_paid},)`
      );
}) 

app.get('/history', async (req, res) => {
    let result = await pool.query('SELECT * FROM History')
    
    res.send(JSON.stringify(result["rows"]))
}) 
const pool = new Pool({
    user: process.env.USER,
    host: 'web0.eecs.uottawa.ca',
    database: 'group_b01_g03',
    password: process.env.PASS,
    port: 15432,
  })

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
  })
