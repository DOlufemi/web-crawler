const express = require ('express')
const bodyParser = require('body-parser');
const cors = require ('cors')
const crawl = require('./crawl');
const mongoose = require('mongoose')
const Property = require('./Property')

mongoose.connect('mongodb+srv://root:root@cluster0-djmz2.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Behind the mainframe')
});
const app = express()
app.use(cors())


app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/', crawl)

app.get('/store', async (req, res) => {
  const list = await  Property.find();
  res.json(list)
})

app.listen(8080, () => {
  console.log('Running')
})
