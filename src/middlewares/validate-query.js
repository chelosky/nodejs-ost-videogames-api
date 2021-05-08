import {collection} from '../utils/helpers';
import * as CONSTANT from '../constants';

const validateQuery = (model) => {

    return (req, res, next) => {
        let query_sanity = {};
        
        Object.keys(req.query).forEach((key) => {
            if (req.query[key] && collection.queries[model].includes(key)) {
                query_sanity[key] = generateValidParam(model, key, req.query[key]); 
            }
        });
        req.query = query_sanity;
        next();
    }
}

const generateValidParam = (model, key, value) => {
    switch(collection.queries_types[model][key]) {
        case CONSTANT.TYPE_STRING:
          return { "$regex": value, "$options": "i" };
        case CONSTANT.TYPE_NUMBER:
          return value;
        default:
          return value;
    }
}

module.exports = {
    validateQuery
}