const express = require('express')
const app = express();

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000


app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + './index.html')
})

app.post('/', (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anna.vaigast@gmail.com',
            pass: 'rdmschool14'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'anna.vaigast@gmail.com',
        subject: `Message from Portfolio: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error);
            res.send('error')
        } else {
            console.log('Email send: ' + info.response)
            res.send('success')
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})