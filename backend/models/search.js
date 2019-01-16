const axios = require('axios')

function music(URL){
    return axios.get(URL)
    .then(response => response)
    .catch(err => err)
}

function video(URL){
  return axios.get(URL)
  .then(response => response.data.results.slice(0, 5) )
  .catch(err => err)
}

module.exports = {music, video}