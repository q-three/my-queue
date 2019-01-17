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
  	return axios({
	    url:URL,
	    method: 'POST',
    	headers:{
      	'Accept':'application/json',
      	'user-key': process.env.IGDBKEY
    	},
    	data: 'fields game,name'
  	})
  	.then(response => response.data.slice(0,5))
  	.catch(err => err)
}

function covers(URL){
  	return axios({
	    url: URL,
	    method: 'POST',
	    headers: {
      	'Accept': 'application/json',
				'user-key': process.env.IGDBKEY
    	},
    	// data: 'fields image_id;'
 	 })
    .then(response => {
    	  return response.data
    })
    .catch(err => err)
}

function places(URL){
 	 return axios.get(URL)
  	.then(response => response.data.candidates)
  	.catch(err => err)
}
module.exports = {music, video, games, covers, places}