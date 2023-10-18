const express  = require("express")
const config  = require("config")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth-routes'))
app.use('/api/cost', require('./routes/costs-routes'))
app.use('/api/user', require('./routes/user-routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get("port") || 5001

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit()
    }
}

start()