const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

require('dotenv').config()

request(process.env.DATA_URL, (error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html)

    let newArr = []
    const main = $('tbody').children('tr');
    main.each((i, row) => {
      let text, countryData = {};
      $(row).children('td').each((j, el) => {
        text = $(el).text();
        if (j == 1) countryData.country = text;
        if (j == 5) countryData.popDensity = text;
      });
      newArr.push(countryData)
    })
    fs.writeFileSync('populationData.json', JSON.stringify(newArr));
  }
})