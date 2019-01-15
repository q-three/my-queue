const axios = require('axios')

function music(){
  
}

function video(url){
  return axios.get(url)
  .then(response => response.data.results.slice(0, 5) )
  .catch(err => err)
}

module.exports = {music, video}