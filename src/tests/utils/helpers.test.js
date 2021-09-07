import { validateObjectIdArray } from '../../utils/helpers';

describe('Test Helpers', () => {

    const validArray = ['6097060e9839bf651cc8452d', '609706059839bf651cc8451f'];
    const notValidArray = ['aaaaaaaaaa','bbbbbbbb','cccccccccc'];

    test('Should validate a valid objectId array', () => {
        const result = validateObjectIdArray(validArray);
        expect(result.length).toBe(validArray.length);
        expect(result).toEqual(validArray);
        expect(result[0]).toBe(validArray[0]);
        expect(result[1]).toBe(validArray[1]);
    });

    test('Should validate a not valid objectId array', () => {
        const result = validateObjectIdArray(notValidArray);
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

});