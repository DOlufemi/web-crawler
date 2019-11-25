const cheerio = require('cheerio');
const axios = require('axios');
const mongoose = require('mongoose')
const Property = require('./Property')


const url = 'https://www.airbnb.co.uk/rooms/28299515?location=London%2C%20United%20Kingdom&toddlers=0&_set_bev_on_new_domain=1572300146_ZKC6996OiM8G0CT3&source_impression_id=p3_1572300147_bRb1KSr%2FXjuPRPDg&guests=1&adults=1'
let images =  new Set
let amenities = new Set
const meta = {amenities: {}}

module.exports = async (req, res) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data)
  $("div:contains('guests')").each((i, e) => {
    if($(e).text().match('[[0-9]+\\s+guests$')) {
      const [value, key] = $(e).text().split(' ')
      meta[key] = value
    }
  });

  $("div:contains('bedroom')").each((i, e) => {
    if($(e).text().match('[[0-9]+\\s+bedroom$')) {
      const [value, key] = $(e).text().split(' ')
      meta[key] = value
    }
  })

  $("div:contains('bed')").each((i, e) => {
    if($(e).text().match('[[0-9]+\\s+bed$')) {
      const [value, key] = $(e).text().split(' ')
      meta[key] = value
    }
  })

  $("div:contains('shared bathrooms')").each((i, e) => {
    if($(e).text().match('^[[0-9]+\\s+shared bathrooms$')) {
      const [value, ...key] = $(e).text().split(' ')
      meta[key.join(' ')] = value
    }
  })

  $("div:contains('Wifi')").each((i, e) => {
    if($(e).text().match('^Wifi$')) {
      amenities = amenities.add('Wifi')
    }
  })

  $("div:contains('Kitchen')").each((i, e) => {
    if($(e).text().match('^Kitchen$')) {
      amenities = amenities.add('Kitchen')
    }
  })

  $("div:contains('Dryer')").each((i, e) => {
    if($(e).text().match('^Dryer$')) {
      amenities = amenities.add('Dryer')
    }
  })
  $("img").each((i, e) => {
    const a = $(e).attr('src')
    const src = `${a}`
    if(!src.includes('profile')){
      images = images.add(a)
    }
  })
  try{
    await Property.create({ ...meta, images: Array.from(images), amenities: Array.from(amenities)})
    return res.json({...meta, images: Array.from(images), amenities: Array.from(amenities), })
  }catch(e){
    console.log(e);
  }
}
