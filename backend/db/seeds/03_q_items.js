exports.seed = function(knex, Promise) {
  	return knex('q_items').del()
  	.then(function () {
    	return knex('q_items').insert([
      	{id: 1, user_id: 1, type: 'music', read: false, starred: false, 
    	url: 'https://open.spotify.com/track/5OMwQFBcte0aWFJFqrr5oj', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/AnimalKesha.jpg/220px-AnimalKesha.jpg',
     	referral_id: 2, desc: 'Kesha\'s Tik Tok'},
      	{
        	id: 2, user_id: 1, type: 'game', read: false, starred: false,
        	url: 'https://open.spotify.com/track/5OMwQFBcte0aWFJFqrr5oj', img: '',
        	referral_id: 2, desc: 'DOOM'
      	},
      	{
	        id: 3, user_id: 1, type: 'link', read: false, starred: false,
    	    url: 'https://open.spotify.com/track/5OMwQFBcte0aWFJFqrr5oj', img: '',
        	referral_id: 2, desc: 'An example description to discern differences'
      	}
    	])
    	.then(() =>{
      	return knex.raw(`SELECT setval('q_items_id_seq', (SELECT max(id) FROM q_items));`)})
  	});
};
