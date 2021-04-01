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

app.get('/employee', async (req, res) => {
    let result = await pool.query('SELECT * FROM Employee')
    
    res.send(JSON.stringify(result["rows"]))
}) 

app.get('/customer', async (req, res) => {
    let result = await pool.query('SELECT * FROM Customer')
    
    res.send(JSON.stringify(result["rows"]))
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
