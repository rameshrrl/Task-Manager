import { generateToken } from "../helpers/generateToken";

test('generateToken', () => {
    const data = await generateToken('sample@gmail.com');
    expect(data).toBe(String);
})