const model = require('../models/search')
const api = require('../api')

function music(req, res, next){
  const URL = `https://itunes.apple.com/search?term=${createQuery(req.body.query)}&entity=album&limit=5`
  return model.music(URL)
  .then(result => {
    console.log(result)
    const sanitizedRes = result.data.results.map(ele => {
      return {
        img: ele.artworkUrl100,
        title: ele.artistName,
        url: `https://itunes.apple.com/us/artist/search/${ele.artistId}`,
        desc: ele.collectionName
      }
    })
    res.status(200).send(sanitizedRes)
  })
  .catch(next)
}

function video(req, res, next){
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${api.tmdbKey}&query=${createQuery(req.body.query)}`
  return model.video(URL)
  .then(response => {
    const sanitizedRes = response.map(ele => {
      ele.img = `https://image.tmdb.org/t/p/h100${ele.poster_path}`
      ele.url = `https://www.themoviedb.org/movie/${ele.id}`
      return ele
    })
    res.status(200).send(sanitizedRes)
  })
  .catch(next)
}

function games(req, res, next){
  let preImgRes
  const URL = `https://api-v3.igdb.com/games/?search=${createQuery(req.body.query)}&fields=name,cover,url`
  return model.games(URL)
  .then(response => {
    preImgRes = response
    console.log(response)
    const promiseArray = response.map(game => {
      model.covers(`https://api-v3.igdb.com/covers/?filter[id][eq]=${game.cover}&fields=image_id`)
    })
    return Promise.all(promiseArray)
    .then(responses => {
      console.log(responses)
      let sanitizedRes = preImgRes.map((ele, i) => {
        ele.img = `https://images.igdb.com/igdb/image/upload/t_cover_small/${responses[i]}.jpg`
        ele.desc = ele.name
        return ele
      })
      res.status(200).send(sanitizedRes)      
    })
    .catch(err => err)
    // img: https://images.igdb.com/igdb/image/upload/t_cover_small/${...}.jpg
    
    
  })

}

function places(req, res, next){
  const URL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${createQuery(req.body.query)}&inputtype=textquery&fields=photos,name,formatted_address&locationbias=ipbias&key=${api.googleKey}`
  return model.places(URL)
  .then(response => {
    console.log(response)
    const sanitizedRes = response.map(ele => {
      return {
        img: `https://maps.googleapis.com/maps/api/place/photo?maxheight=100&photoreference=${ele.photos[0].photo_reference}&key=${api.googleKey}`,
        title: ele.name,
        desc: ele.formatted_address,  
        url: `https://www.google.com/search?q=${createQuery(req.body.query)}`
      }
    })
    res.status(200).send(sanitizedRes)
  })
  .catch(next)

}

function createQuery(str){
  let query = str.split(' ')
  return query.join('+')
}

module.exports = {music, video, games, places}