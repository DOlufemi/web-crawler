const express = require ('express')
const bodyParser = require('body-parser');
const cors = require ('cors')
const crawl = require('./crawl');

const app = express()
app.use(cors())


app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/', crawl)



app.listen(3000, () => {
  console.log('Running')
})
