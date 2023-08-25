import { PrismaClient } from "@prisma/client";
import { IDatabaseService } from "../interfaces/IDatabaseService";
export declare class DatabaseService implements IDatabaseService {
    private _db;
    constructor();
    Client(): PrismaClient;
    disconnect(): Promise<void>;
}
