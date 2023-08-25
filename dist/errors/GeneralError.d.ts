export declare class GeneralError extends Error {
    code: number;
    status: string;
    constructor(code: number, status: string, message: string);
    getCode(): number;
    toJSON(): {
        code: number;
        status: string;
        message: string;
    };
}
