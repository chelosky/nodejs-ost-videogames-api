import * as CONSTANT from '../constants';

const collection = {
    limit: 20,
    queries: {
      videogame: [
        'title',
        'saga',
        'description'
      ],
      soundtrack: [
        'name', 
        'videogame'
      ],
    },
    queries_types: {
      videogame: {
        title: CONSTANT.TYPE_STRING,
        saga: CONSTANT.TYPE_STRING,
        description: CONSTANT.TYPE_STRING
      },
      soundtrack:{
        name: CONSTANT.TYPE_STRING,
        videogame: CONSTANT.TYPE_ID
      }
    }
}
  
module.exports = {
    collection,
}