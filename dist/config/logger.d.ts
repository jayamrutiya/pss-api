/// <reference types="node" />
import winston from 'winston';
import { ILoggerService } from '../interfaces/ILoggerService';
export declare class LoggerService implements ILoggerService {
    private _logger;
    constructor();
    getLogger(): winston.Logger;
}
export declare const morganLogger: (req: import("http").IncomingMessage, res: import("http").ServerResponse, callback: (err?: Error | undefined) => void) => void;
