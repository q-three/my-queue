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


function games(URL){
  
}

function places(URL){
  return axios.get(URL)
  .then(response => response.data.candidates)
  .catch(err => err)
}
module.exports = {music, video, games, places}