import {collection} from '../utils/helpers';
import * as CONSTANT from '../constants';

const validateQuery = (model) => {

    return (req, res, next) => {
        let query_sanity = {};
        let limit = parseInt(req.query[CONSTANT.LIMIT_KEY], 10) || CONSTANT.DEFAULT_LIMIT;
        let page = req.query[CONSTANT.NUM_PAGE_KEY] > 1 ? parseInt(req.query[CONSTANT.NUM_PAGE_KEY], 10) : 1;

        Object.keys(req.query).forEach((key) => {
            if (req.query[key] && collection.queries[model].includes(key)) {
                query_sanity[key] = generateValidParam(model, key, req.query[key]); 
            }
        });
        req.query = {...query_sanity, limit, page};
        next();
    }
}

const generateValidParam = (model, key, value) => {
    switch(collection.queries_types[model][key]) {
        case CONSTANT.TYPE_STRING:
          return { "$regex": value, "$options": "i" };
        case CONSTANT.TYPE_NUMBER:
          return Number(value);
        default:
          return value;
    }
}

module.exports = {
    validateQuery
}