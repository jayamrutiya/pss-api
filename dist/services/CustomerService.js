"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const NotFound_1 = require("../errors/NotFound");
const fs_1 = require("fs");
const path_1 = require("path");
const BadRequest_1 = require("../errors/BadRequest");
let CustomerService = class CustomerService {
    constructor(loggerService, customerRepository, customerTemplateRepository) {
        this._loggerService = loggerService;
        this._customerRepository = customerRepository;
        this._customerTemplateRepository = customerTemplateRepository;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async upsertCustomer(id, customerData) {
        const customerRepoData = {
            ...customerData,
            date: customerData.date ? new Date(customerData.date) : null,
            ywdATabelData: JSON.stringify(customerData.ywdATabelData),
            otherLegalHears: JSON.stringify(customerData.otherLegalHears),
            tableSDT: JSON.stringify(customerData.tableSDT.map((d) => {
                return {
                    ledgerFolio: customerData.ledgerFolio,
                    startDistinctiveNumber: d.distinctiveNumber?.split("-")[0],
                    endDistinctiveNumber: d.distinctiveNumber?.split("-")[1],
                    ...d,
                };
            })),
            totalShares: customerData.tableSDT.length > 0
                ? customerData.tableSDT
                    .map((d) => Number(d.totalShareQuantity))
                    .reduce((prev, next) => prev + next)
                    .toString()
                : "0",
            nomineeBirthdate: customerData.nomineeBirthdate
                ? new Date(customerData.nomineeBirthdate)
                : null,
            bonusDate: customerData.bonusDate
                ? new Date(customerData.bonusDate)
                : null,
            splitDate: customerData.splitDate
                ? new Date(customerData.splitDate)
                : null,
            notaryDate: customerData.notaryDate
                ? new Date(customerData.notaryDate)
                : null,
            deathOfHolderFirstHolder: customerData.deathOfHolderFirstHolder
                ? new Date(customerData.deathOfHolderFirstHolder)
                : null,
            deathOfHolderSecondHolder: customerData.deathOfHolderSecondHolder
                ? new Date(customerData.deathOfHolderSecondHolder)
                : null,
            referenceLetterdate: customerData.referenceLetterdate
                ? new Date(customerData.referenceLetterdate)
                : null,
            currentYear: customerData.currentYear || null,
            dpId: customerData.dematNumber?.slice(0, 8) || null,
            clientId: customerData.dematNumber?.slice(8, 16) || null,
        };
        console.log('customerRepoData:- ', customerRepoData);
        if (!id) {
            return await this._customerRepository.createCustomer(customerRepoData);
        }
        else {
            return await this._customerRepository.updateCustomer(id, customerRepoData);
        }
    }
    async getCustomers(userId, customerMasterId) {
        const customersData = await this._customerRepository.getCustomers(userId, customerMasterId);
        const customers = customersData.map((d) => {
            return {
                ...d,
                tableSDT: JSON.parse(d?.tableSDT),
                ywdATabelData: JSON.parse(d?.ywdATabelData),
                otherLegalHears: JSON.parse(d?.otherLegalHears),
            };
        });
        return customers;
    }
    async getCustomer(id, userId) {
        const getCustomer = await this._customerRepository.getCustomer(id, userId);
        if (!getCustomer) {
            throw new NotFound_1.NotFound("Customer not found.");
        }
        const customer = {
            ...getCustomer,
            tableSDT: JSON.parse(getCustomer?.tableSDT),
            ywdATabelData: JSON.parse(getCustomer?.ywdATabelData),
            otherLegalHears: JSON.parse(getCustomer?.otherLegalHears),
        };
        return customer;
    }
    async deleteCustomer(id, userId) {
        const getCustomer = await this._customerRepository.getCustomer(id, userId);
        if (!getCustomer) {
            throw new NotFound_1.NotFound("Customer Not found.");
        }
        const getCustomerTemplateMaster = await this._customerTemplateRepository.getCustomerTemplateMasters(id);
        for (let i = 0; i < getCustomerTemplateMaster.length; i++) {
            const data = getCustomerTemplateMaster[i];
            if (data.storeDocName) {
                await (0, fs_1.unlinkSync)((0, path_1.join)("./src/public", data.storeDocName));
            }
        }
        return await this._customerRepository.deleteCustomer(id, userId);
    }
    async upsertCustomerMaster(id, name, companyName, userId) {
        if (id) {
            return await this._customerRepository.updateCustomerMaster(id, name, companyName, userId);
        }
        const createCustomerMaster = await this._customerRepository.createCustomerMaster(name, companyName, userId);
        return createCustomerMaster;
    }
    async getAllMasterCustomers(userId) {
        return await this._customerRepository.getAllMasterCustomers(userId);
    }
    async deleteCustomerMaster(userId, id) {
        const getAllDocs = await this.getAllDocument(id);
        if (getAllDocs.length > 0) {
            throw new BadRequest_1.BadRequest("Please delete all documents.");
        }
        const getAllCustomers = await this._customerRepository.getCustomers(userId, id);
        for (let i = 0; i < getAllCustomers.length; i++) {
            const data = getAllCustomers[i];
            await this.deleteCustomer(data.id, userId);
        }
        return await this._customerRepository.deleteCustomerMaster(id);
    }
    async createDocument(customerMasterId, name, originalName, storeDocName, mimeType, sizeInBytes, url) {
        return await this._customerRepository.createDocument(customerMasterId, name, originalName, storeDocName, mimeType, sizeInBytes, url);
    }
    async getAllDocument(customerMasterId) {
        return await this._customerRepository.getAllDocument(customerMasterId);
    }
    async deleteDocument(id) {
        const deleteDoc = await this._customerRepository.deleteDocument(id);
        await (0, fs_1.unlinkSync)((0, path_1.join)("./src/public/", deleteDoc.storeDocName));
        return deleteDoc;
    }
};
CustomerService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.CustomerRepository)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.CustomerTemplateRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map