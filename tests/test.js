import { generateToken } from "../helpers/generateToken";
import { generateResponse } from "../helpers/response";

// test('generateToken', async () => {
//     const token = await generateToken('sample@gmail.com');
//     expect(token).toReturn(String);
// })

test('generate success response', () => {
    const response = generateResponse('success', true, {});
    expect(response.status).toBeTruthy();
})

test('generate failure response', () => {
    const response = generateResponse('failed');
    expect(response.status).toBeFalsy();
})