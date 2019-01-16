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
    const resWithImg = response.map(ele => {
      ele.img = `https://image.tmdb.org/t/p/h100${ele.poster_path}`
      ele.url = `https://www.themoviedb.org/movie/${ele.id}`
      return ele
    })
    res.status(200).send(resWithImg)
  })
  .catch(next)
}

function games(req, res, next){

}

function places(req, res, next){

}

function createQuery(str){
  let query = str.split(' ')
  return query.join('+')
}

module.exports = {music, video, games, places}