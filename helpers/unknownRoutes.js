import { generateResponse } from "./response";

export const unknownRoute = (req, res) => {
    res.status(404).send(generateResponse('No such endpoint!'));
}