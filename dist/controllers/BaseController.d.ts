import { Response, Request } from 'express';
export default class BaseController {
    /**
     * Sends a JSON response, using the response object
     * @param {response} res Response object
     * @param {object} metadata Metadata to send along with response
     * @param {object} data data to send
     */
    sendJSONResponse(res: Response, message: string | null, metadata: any | null, data: any | null): Response<any, Record<string, any>>;
    /**
     * Send a JSON formated error response
     * @param req Request object
     * @param res Response object
     * @param error error object
     */
    sendErrorResponse(req: Request, res: Response, err: Error): Response<any, Record<string, any>>;
    /**
     * Validate Request
     */
    validateRequest(req: Request): void;
}
