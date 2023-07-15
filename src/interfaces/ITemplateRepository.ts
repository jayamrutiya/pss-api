import { Template } from "@prisma/client";
import { UpsertTemplate } from "../types/Template";

export interface ITemplateRepository {
  createTemplate(templateData: UpsertTemplate): Promise<Template>;

  updateTemplate(id: number, templateData: UpsertTemplate): Promise<Template>;

  getTemplatesByType(type: string, userId: number): Promise<Template[]>;

  deleteTemplate(id: number, userId: number): Promise<Template>;
}
