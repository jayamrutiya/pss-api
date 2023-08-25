import { Template } from "@prisma/client";
import { CreateTemplateService } from "../types/Template";
export interface ITemplateService {
    upsertTemplate(templateData: CreateTemplateService): Promise<Template>;
    getTemplatesByType(type: string, userId: number): Promise<Template[]>;
    getTemplateById(id: number, userId: number): Promise<Template | null>;
    deleteTemplate(id: number, userId: number): Promise<Template>;
}
