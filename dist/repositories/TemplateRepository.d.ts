import { ITemplateRepository } from "../interfaces/ITemplateRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { Template } from "@prisma/client";
import { UpsertTemplate } from "../types/Template";
export declare class TemplateRepository implements ITemplateRepository {
    private _loggerService;
    private _databaseService;
    constructor(loggerService: ILoggerService, databaseService: IDatabaseService);
    createTemplate(templateData: UpsertTemplate): Promise<Template>;
    updateTemplate(id: number, templateData: UpsertTemplate): Promise<Template>;
    getTemplatesByType(type: string, userId: number): Promise<Template[]>;
    deleteTemplate(id: number, userId: number): Promise<Template>;
    getTemplateById(id: number, userId: number): Promise<Template | null>;
}
