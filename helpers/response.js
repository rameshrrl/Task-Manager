export const generateResponse = (message, status = false, data = null) => {
    const response = {
        status: status,
        message: message,
        response: data
    }
    return response;
}