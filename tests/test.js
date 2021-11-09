import { generateToken } from "../helpers/generateToken";

test('generateToken', () => {
    return fetchData(generateToken('sample@gmail.com')).then(data => {
        expect(data).toBe(String);
    });
})