import { GeneralError } from './GeneralError';
export declare class BadRequest extends GeneralError {
    errors?: Record<string, unknown>;
    constructor(message: string, errors?: Record<string, unknown>);
    toJSON(): {
        code: number;
        status: string;
        message: string;
        errors: Record<string, unknown> | undefined;
    };
}
