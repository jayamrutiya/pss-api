import { ITemplateService } from "../interfaces/ITemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { ITemplateRepository } from "../interfaces/ITemplateRepository";
import { Template } from "@prisma/client";
import { CreateTemplateService } from "../types/Template";
export declare class TemplateService implements ITemplateService {
    private _loggerService;
    private _templateRepository;
    constructor(loggerService: ILoggerService, templateRepository: ITemplateRepository);
    upsertTemplate(templateData: CreateTemplateService): Promise<Template>;
    getTemplatesByType(type: string, userId: number): Promise<Template[]>;
    getTemplateById(id: number, userId: number): Promise<Template | null>;
    deleteTemplate(id: number, userId: number): Promise<Template>;
}
