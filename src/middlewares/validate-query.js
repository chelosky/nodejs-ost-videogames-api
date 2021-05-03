import {collection} from '../utils/helpers';

const validateQuery = (model) => {

    return (req, res, next) => {
        let query_sanity = {};
        Object.keys(req.query).forEach((key) => {
            if (req.query[key] && collection.queries[model].includes(key)) {
                query_sanity[key] = req.query[key]
            }
        });
        req.query = query_sanity;
        next();
    }
}

module.exports = {
    validateQuery
}