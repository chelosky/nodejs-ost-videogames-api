import { 
    initialVideogames ,
    getAllContentFromVideogames,
    populateInitialVideogames
} from '../helpers/videogame.helper';
import { 
    api , 
    BEARER_TOKEN_TEST,
    REGEX_APPLICATION_JSON,
    closeOpenHandles
} from '../helpers/general.helpers';

describe('Videogames API', () => {

    beforeEach(async () => {
        await populateInitialVideogames();
    });

    describe('GET Videogame', () => {

        test('Should be a json response content type', async () => {
            await api
                    .get('/api/v1/videogame')
                    .expect(200)
                    .expect('Content-Type', REGEX_APPLICATION_JSON); //regex
        });

        test('Should verify mock videogames data', async () => {
            const {data} = await getAllContentFromVideogames();
            expect(data).toHaveLength(initialVideogames.length);
            expect(data).toContain(initialVideogames[0].title);
            expect(data).toContain(initialVideogames[1].title);
        });

    });

    describe('POST Videogame', () => {
  
        test('Should insert new videogame', async() => {
            const newVG = {
                title: 'NEW VG',
                saga: 'NEW VGS',
                description: 'NEW VGS VG',
                image: '',
                correlative: 3
            };
            await api
                .post('/api/v1/videogame')
                .set('Authorization', BEARER_TOKEN_TEST)
                .send(newVG)
                .expect(200)
                .expect('Content-Type', REGEX_APPLICATION_JSON);
    
            const {data} = await getAllContentFromVideogames();
            expect(data).toHaveLength(initialVideogames.length + 1);
            expect(data).toContain(newVG.title);
        });    

    });
    
    afterAll(async () => {
        await closeOpenHandles();
    });
});