"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerTemplateService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const BadRequest_1 = require("../errors/BadRequest");
const helper_1 = require("../config/helper");
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importStar(require("fs"));
const path_1 = require("path");
const NotFound_1 = require("../errors/NotFound");
const html_docx_js_1 = __importDefault(require("html-docx-js"));
let CustomerTemplateService = class CustomerTemplateService {
    constructor(loggerService, customerTemplateRepository, customerRepository, templateRepository) {
        this._loggerService = loggerService;
        this._customerTemplateRepository = customerTemplateRepository;
        this._customerRepository = customerRepository;
        this._templateRepository = templateRepository;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async replaceTemplateData(customerData, template) {
        const customer = {
            ...customerData,
            tableSDT: JSON.parse(customerData.tableSDT),
            ywdATabelData: JSON.parse(customerData.ywdATabelData),
            otherLegalHears: JSON.parse(customerData.otherLegalHears),
        };
        let str, find, replace;
        str = template.details;
        //try OLH
        //table otherLegalHears :-
        find = "[[olhnameInPancardExactSpelling]]";
        let olhnamepan = "";
        for (let index = 0; index < customer.otherLegalHears.length; index++) {
            const customerYWD = customer.otherLegalHears[index];
            olhnamepan += `${customerYWD.nameInPancardExactSpelling},`;
        }
        str = (0, helper_1.replaceAll)(str, find, olhnamepan);
        find = "[[olhnameInPancard1]]";
        let olhnamepan1 = olhnamepan.split(",")[0];
        str = (0, helper_1.replaceAll)(str, find, olhnamepan1);
        find = "[[olhnameInPancard2]]";
        let olhnamepan2 = olhnamepan.split(",")[1];
        str = (0, helper_1.replaceAll)(str, find, olhnamepan2);
        find = "[[olhnameInPancard3]]";
        let olhnamepan3 = olhnamepan.split(",")[2];
        str = (0, helper_1.replaceAll)(str, find, olhnamepan3);
        find = "[[olhnameInaadharcard]]";
        let olhnameaadhar = "";
        for (let index = 0; index < customer.otherLegalHears.length; index++) {
            const customerYWD = customer.otherLegalHears[index];
            olhnameaadhar += `${customerYWD.nameInAadharcardExactSpelling};`;
        }
        str = (0, helper_1.replaceAll)(str, find, olhnameaadhar);
        find = "[[olhnameInaadharcard1]]";
        let olhnameInaadharcard1 = olhnameaadhar.split(",")[0];
        str = (0, helper_1.replaceAll)(str, find, olhnameInaadharcard1);
        find = "[[olhnameInaadharcard2]]";
        let olhnameInaadharcard2 = olhnameaadhar.split(",")[1];
        str = (0, helper_1.replaceAll)(str, find, olhnameInaadharcard2);
        find = "[[olhnameInaadharcard3]]";
        let olhnameInaadharcard3 = olhnameaadhar.split(",")[2];
        str = (0, helper_1.replaceAll)(str, find, olhnameInaadharcard3);
        find = "[[olhaddressaddhar]]";
        let olhaddaadhar = "";
        for (let index = 0; index < customer.otherLegalHears.length; index++) {
            const customerYWD = customer.otherLegalHears[index];
            olhaddaadhar += `${customerYWD.addressSameInAadharcard};`;
        }
        str = (0, helper_1.replaceAll)(str, find, olhaddaadhar);
        find = "[[olhaddressaddhar1]]";
        let olhaddressaddhar1 = olhaddaadhar.split(",")[0];
        str = (0, helper_1.replaceAll)(str, find, olhaddressaddhar1);
        find = "[[olhaddressaddhar2]]";
        let olhaddressaddhar2 = olhaddaadhar.split(",")[1];
        str = (0, helper_1.replaceAll)(str, find, olhaddressaddhar2);
        find = "[[olhaddressaddhar3]]";
        let olhaddressaddhar3 = olhaddaadhar.split(",")[2];
        str = (0, helper_1.replaceAll)(str, find, olhaddressaddhar3);
        find = "[[olhage]]";
        let olhage = "";
        for (let index = 0; index < customer.otherLegalHears.length; index++) {
            const customerYWD = customer.otherLegalHears[index];
            olhage += `${customerYWD.age},`;
        }
        str = (0, helper_1.replaceAll)(str, find, olhage);
        find = "[[olhage1]]";
        let olhage1 = olhage.split(",")[0];
        str = (0, helper_1.replaceAll)(str, find, olhage1);
        find = "[[olhage2]]";
        let olhage2 = olhage.split(",")[1];
        str = (0, helper_1.replaceAll)(str, find, olhage2);
        find = "[[olhage3]]";
        let olhage3 = olhage.split(",")[2];
        str = (0, helper_1.replaceAll)(str, find, olhage3);
        find = "[[olhdaughterson]]";
        let olhdaughterson = "";
        for (let index = 0; index < customer.otherLegalHears.length; index++) {
            const customerYWD = customer.otherLegalHears[index];
            olhdaughterson += `${customerYWD.daughter ? customerYWD.daughter : customerYWD.son},`;
        }
        str = (0, helper_1.replaceAll)(str, find, olhdaughterson);
        find = "[[olhdaughterson1]]";
        let olhdaughterson1 = olhdaughterson.split(",")[0];
        str = (0, helper_1.replaceAll)(str, find, olhdaughterson1);
        find = "[[olhdaughterson2]]";
        let olhdaughterson2 = olhdaughterson.split(",")[1];
        str = (0, helper_1.replaceAll)(str, find, olhdaughterson2);
        find = "[[olhdaughterson3]]";
        let olhdaughterson3 = olhdaughterson.split(",")[2];
        str = (0, helper_1.replaceAll)(str, find, olhdaughterson3);
        //error 
        // try SDT
        find = "[[distinctiveNumber]]";
        let bd = "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bd += `${customerYWD.distinctiveNumber},`;
        }
        str = (0, helper_1.replaceAll)(str, find, bd);
        find = "[[shareCertificateNumber]]";
        let bs = "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bs += `${customerYWD.shareCertificateNumber},`;
        }
        str = (0, helper_1.replaceAll)(str, find, bs);
        find = "[[totalShareQuantity]]";
        let bt = "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bt += `${customerYWD.totalShareQuantity},`;
        }
        str = (0, helper_1.replaceAll)(str, find, bt);
        //and error
        //noticeTable
        find = "[[noticeTable]]";
        const headn = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
    <thead>
      <tr>
        <td style="text-align:center"  scope="col">Folio No.</td>
        <td style="text-align:center"  scope="col">Certificate Number</td>
        <td style="text-align:center"  scope="col">Distinctive Number(s)</td>
        <td style="text-align:center"  scope="col">Shares held in each Certificate</td>
      </tr>
    </thead>
    <tbody>`;
        const footn = `</tbody>
    </table>`;
        let bodyn = "";
        bodyn += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bodyn += `<tr>
			<td style="text-align:center" >${customer.ledgerFolio}</td>
			<td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
			<td style="text-align:center" >${customerYWD.distinctiveNumber}</td>
			<td style="text-align:center" >${customerYWD.totalShareQuantity}of Rs.${customer.faceValueAsOnToday} /-FV</td>
		</tr>`;
        }
        const datan = headn + bodyn + footn;
        str = (0, helper_1.replaceAll)(str, find, datan);
        //folioCertiDistShareInCerti
        find = "[[folioCertiDistShareInCerti]]";
        const headf = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
    <thead>
      <tr>
        <td style="text-align:center"  scope="col">Folio No.</td>
        <td style="text-align:center"  scope="col">Certificate Nos.</td>
        <td style="text-align:center"  scope="col">Distinctive Nos. From</td>
        <td style="text-align:center"  scope="col">Shares held in each Certificate</td>
      </tr>
    </thead>
    <tbody>`;
        const footf = `</tbody>
    </table>`;
        let bodyf = "";
        bodyf += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bodyf += `<tr>
			<td style="text-align:center" >${customer.ledgerFolio}</td>
			<td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
			<td style="text-align:center" >${customerYWD.distinctiveNumber}</td>
			<td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
		</tr>`;
        }
        const dataf = headf + bodyf + footf;
        str = (0, helper_1.replaceAll)(str, find, dataf);
        //folioShareCertiDist
        find = "[[folioShareCertiDist]]";
        const hf = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
      <thead>
        <tr>
          <td style="text-align:center"  scope="col">Folio Number</td>
          <td style="text-align:center"  scope="col">No. of Shares</td>
          <td style="text-align:center"  scope="col">Certificate Numbers</td>
          <td style="text-align:center"  scope="col">Distinctive No. (From)</td>
          <td style="text-align:center"  scope="col">Distinctive No. (To)</td>
        </tr>
      </thead>
      <tbody>`;
        const ff = `</tbody>
      </table>`;
        let bf = "";
        bf += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bf += `<tr>
        <td style="text-align:center" >${customer.ledgerFolio}</td>
        <td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
        <td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
        <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[0]}</td>
        <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[1]
                ? customerYWD.distinctiveNumber?.split("-")[1]
                : customerYWD.distinctiveNumber?.split("-")[0]}</td>
      </tr>`;
        }
        const df = hf + bf + ff;
        str = (0, helper_1.replaceAll)(str, find, df);
        //folioCertiDistSharesNameShareHolder
        find = "[[folioCertiDistSharesNameShareHolder]]";
        const hof = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
      <thead>
        <tr>
          <td style="text-align:center"  scope="col">Folio No</td>
          <td style="text-align:center"  scope="col">Certificate No</td>
          <td style="text-align:center"  scope="col">Distinctive Nos.</td>
          <td style="text-align:center"  scope="col">No of Shares</td>
          <td style="text-align:center"  scope="col">Name of the Shareholder/s</td>
        </tr>
      </thead>
      <tbody>`;
        const fof = `</tbody>
      </table>`;
        let bof = "";
        bof += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bof += `<tr>
        <td style="text-align:center" >${customer.ledgerFolio}</td>
        <td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
        <td style="text-align:center" >${customerYWD.distinctiveNumber}</td>
        <td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
        <td style="text-align:center" >${customer.deathHolderName1} (deceased) jointly ${customer.deathHolderName2 ? customer.deathHolderName2 + "(deceased)" : ""}</td>
      </tr>`;
        }
        const dof = hof + bof + fof;
        str = (0, helper_1.replaceAll)(str, find, dof);
        //folioSecuCertiNoDisti
        find = "[[folioSecuCertiNoDisti]]";
        const hdf = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
      <thead>
        <tr>
          <td style="text-align:center"  scope="col"></td>
          <td style="text-align:center"  scope="col">FOLIO NO.</td>
          <td style="text-align:center"  scope="col">No. of securities </td>
          <td style="text-align:center"  scope="col">Security Certificate No.</td>
          <td style="text-align:center"  scope="col" colspan=2>Distinctive Nos. From-To</td>
        </tr>
      </thead>
      <tbody>`;
        const fdf = `</tbody>
      </table>`;
        let bdf = "";
        bdf += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bdf += `<tr>
      <td style="text-align:center" >${index + 1})</td>
      <td style="text-align:center" >${customer.ledgerFolio}</td>
      <td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
      <td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
        <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[0]}</td>
        <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[1]
                ? customerYWD.distinctiveNumber?.split("-")[1]
                : customerYWD.distinctiveNumber?.split("-")[0]}</td>
      </tr>`;
        }
        const dff = hdf + bdf + fdf;
        str = (0, helper_1.replaceAll)(str, find, dff);
        //nameComCertiDistFolioSerHeld
        find = "[[nameComCertiDistFolioSerHeld]]";
        const hedf = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
      <thead>
        <tr>
          <td style="text-align:center"  scope="col">Name of the Company</td>
          <td style="text-align:center"  scope="col">Certificate No.</td>
          <td style="text-align:center"  scope="col">Distinctive No.</td>
          <td style="text-align:center"  scope="col">Folio No.</td>
          <td style="text-align:center"  scope="col">No. and Face value of securities held</td>
        </tr>
      </thead>
      <tbody>`;
        const fedf = `</tbody>
      </table>`;
        let bedf = "";
        bedf += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bedf += `<tr>
      <td style="text-align:center" >${customer.companyName}</td>
      <td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
      <td style="text-align:center" >${customerYWD.distinctiveNumber}</td>
      <td style="text-align:center" >${customer.ledgerFolio}</td>
      <td style="text-align:center" >${customerYWD.totalShareQuantity} OF F.V RS.${customer.faceValueAsOnToday}/-</td>
      </tr>`;
        }
        const daaf = hedf + bedf + fedf;
        str = (0, helper_1.replaceAll)(str, find, daaf);
        //folioCertiDistFDistTNoShare
        find = "[[folioCertiDistFDistTNoShare]]";
        const heedf = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
      <thead>
        <tr>
          <td style="text-align:center"  scope="col">Folio No.</td>
          <td style="text-align:center"  scope="col">Certificate No.</td>
          <td style="text-align:center"  scope="col">Distinctive No. From</td>
          <td style="text-align:center"  scope="col">Distinctive No. To</td>
          <td style="text-align:center"  scope="col">No. of shares held</td>
        </tr>
      </thead>
      <tbody>`;
        const feedf = `</tbody>
      </table>`;
        let beedf = "";
        beedf += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            beedf += `<tr>
      <td style="text-align:center" >${customer.ledgerFolio}</td>
      <td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
      <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[0]}</td>
      <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[1]
                ? customerYWD.distinctiveNumber?.split("-")[1]
                : customerYWD.distinctiveNumber?.split("-")[0]}</td>
      <td style="text-align:center" >${customerYWD.totalShareQuantity} of Rs.${customer.faceValueAsOnToday}/-</td>
         
      </tr>`;
        }
        const ddata = heedf + beedf + feedf;
        str = (0, helper_1.replaceAll)(str, find, ddata);
        //nameComFolioNoSecperClaim
        find = "[[nameComFolioNoSecperClaim]]";
        const hdata = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
      <thead>
        <tr>
          <td style="text-align:center"  scope="col">Name of the Company</td>
          <td style="text-align:center"  scope="col">Folio No.</td>
          <td style="text-align:center"  scope="col">No. of Securities</td>
          <td style="text-align:center"  scope="col">% of Claim</td>
        </tr>
      </thead>
      <tbody>`;
        const fdata = `</tbody>
      </table>`;
        let bdata = "";
        bdata += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bdata += `<tr>
      <td style="text-align:center" >${customer.companyName}</td>
      <td style="text-align:center" >${customer.ledgerFolio}</td>
      <td style="text-align:center" >${customerYWD.totalShareQuantity} of Rs.${customer.faceValueAsOnToday}/-</td>
      <td style="text-align:center" >100 %</td>
      </tr>`;
        }
        const dataa = hdata + bdata + fdata;
        str = (0, helper_1.replaceAll)(str, find, dataa);
        //nameComFolioCertDistNEDistShares
        find = "[[nameComFolioCertDistNEDistShares]]";
        const headdata = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
      <thead>
        <tr>
        <td style="text-align:center"  scope="col">Folio No.</td>
          <td style="text-align:center"  scope="col">Cert. No.</td>
          <td style="text-align:center"  scope="col">Start Dist. No.</td>
          <td style="text-align:center"  scope="col">End Dist. No.</td>
          <td style="text-align:center"  scope="col">Shares</td>
        </tr>
      </thead>
      <tbody>`;
        const footerdata = `</tbody>
      </table>`;
        let bodydata = "";
        bodydata += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bodydata += `<tr>
      <td style="text-align:center" >${customer.ledgerFolio}</td>
      <td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
      <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[0]}</td>
      <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[1]
                ? customerYWD.distinctiveNumber?.split("-")[1]
                : customerYWD.distinctiveNumber?.split("-")[0]}</td>
      <td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
      </tr>`;
        }
        const dataData = headdata + bodydata + footerdata;
        str = (0, helper_1.replaceAll)(str, find, dataData);
        //folioShareCertiDistFT
        find = "[[folioShareCertiDistFT]]";
        const hdft = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
          <thead>
            <tr>
              <td style="text-align:center"  scope="col">Folio No.</td>
              <td style="text-align:center"  scope="col">Certificate No.</td>
              <td style="text-align:center"  scope="col">Distinctive No. From</td>
              <td style="text-align:center"  scope="col">Distinctive No. To</td>
              <td style="text-align:center"  scope="col">No. of shares held</td>
            </tr>
          </thead>
          <tbody>`;
        const fdft = `</tbody>
          </table>`;
        let bdft = "";
        bdft += "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bdft += `<tr>
          <td style="text-align:center" >${customer.ledgerFolio}</td>
          <td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
          <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[0]}</td>
          <td style="text-align:center" >${customerYWD.distinctiveNumber?.split("-")[1]
                ? customerYWD.distinctiveNumber?.split("-")[1]
                : customerYWD.distinctiveNumber?.split("-")[0]}</td>
          <td style="text-align:center" >${customerYWD.totalShareQuantity} of Rs.${customer.faceValueAsOnToday}/-</td>
          </tr>`;
        }
        const d1data = hdft + bdft + fdft;
        str = (0, helper_1.replaceAll)(str, find, d1data);
        // certiDistNoSecurity
        find = "[[certiDistNoSecurity]]";
        const h1 = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary" bordercolor="black">
 <thead>
   <tr>
     <th scope="col">CERTIFICATE NO.</th>
     <th scope="col">DISTINCTIVE NOS.</th>
     <th scope="col">NO. OF SECURITIES</th>
   </tr>
 </thead>
 <tbody>`;
        const f1 = `</tbody>
 </table>`;
        let b1 = "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            b1 += `<tr>
   <td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
   <td style="text-align:center" >${customerYWD.distinctiveNumber}</td>
   <td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
 </tr>`;
        }
        const datacdn = h1 + b1 + f1;
        str = (0, helper_1.replaceAll)(str, find, datacdn);
        //tables nameFolioShareFVCertiDistNo:-
        find = "[[nameFolioShareFVCertiDistNo]]";
        const hname = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary" bordercolor="black">
    <thead>
      <tr>
        <th scope="col">NAME</th>
        <th scope="col">FOLIO NUMBER</th>
        <th scope="col">SHARES</th>
        <th scope="col">FV</th>
        <th scope="col">CERTIFICATE NO</th>
        <th scope="col">DISTINCTIVE NO</th>
      </tr>
    </thead>
    <tbody>`;
        const fname = `</tbody>
    </table>`;
        let bname = "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            bname += `<tr>
			<td style="text-align:center" >${customer.deathHolderName1} (Deceased) Jointly ${customer.deathHolderName2}</td>
			<td style="text-align:center" >${customer.ledgerFolio}</td>
			<td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
			<td style="text-align:center" >${customer.faceValueAsOnToday}</td>
			<td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
			<td style="text-align:center" >${customerYWD.distinctiveNumber}</td>
		</tr>`;
        }
        const dname = hname + bname + fname;
        str = (0, helper_1.replaceAll)(str, find, dname);
        //tables ywdATable:-
        find = "[[ywdATable]]";
        const header = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
    <thead>
      <tr>
        <th scope="col">Year</th>
        <th scope="col">Warrant No.</th>
        <th scope="col">DD/MICR No.</th>
        <th scope="col">Amount ₹</th>
      </tr>
    </thead>
    <tbody>`;
        const footer = `</tbody>
    </table>`;
        let body = "";
        for (let index = 0; index < customer.ywdATabelData.length; index++) {
            const customerYWD = customer.ywdATabelData[index];
            body += `<tr>
			<td style="text-align:center" >${customerYWD.year}</td>
			<td style="text-align:center" >${customerYWD.warrantNo}</td>
			<td style="text-align:center" >${customerYWD.ddMicrNo}</td>
			<td style="text-align:center" >${customerYWD.amount}</td>
		</tr>`;
        }
        const data = header + body + footer;
        str = (0, helper_1.replaceAll)(str, find, data);
        //tables tableSDT:-
        find = "[[tableSDT]]";
        const h = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary" bordercolor="black">
    <thead>
      <tr>
        <th scope="col">Share Certificate Number</th>
        <th scope="col">Distinctive Number</th>
        <th scope="col">Total Share Quantity</th>
      </tr>
    </thead>
    <tbody>`;
        const f = `</tbody>
    </table>`;
        let b = "";
        for (let index = 0; index < customer.tableSDT.length; index++) {
            const customerYWD = customer.tableSDT[index];
            b += `<tr>
			<td style="text-align:center" >${customerYWD.shareCertificateNumber}</td>
			<td style="text-align:center" >${customerYWD.distinctiveNumber}</td>
			<td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
		</tr>`;
        }
        const dataSDT = h + b + f;
        str = (0, helper_1.replaceAll)(str, find, dataSDT);
        //table otherLegalHears :-
        find = "[[otherLegalHears]]";
        const head = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
    <thead>
      <tr>
        <th scope="col">Name In Pancard Exact Spelling</th>
        <th scope="col">Address Same In AadharCard</th>
        <th scope="col">Name In Aadhar Card Exect Spelling</th>
        <th scope="col">Age</th>
        <th scope="col">Daughter</th>
        <th scope="col">Son</th>
      </tr>
    </thead>
    <tbody>`;
        const foot = `</tbody>
    </table>`;
        let bod = "";
        for (let index = 0; index < customer.otherLegalHears.length; index++) {
            const customerYWD = customer.otherLegalHears[index];
            bod += `<tr>
			<td style="text-align:center" >${customerYWD.nameInPancardExactSpelling}</td>
			<td style="text-align:center" >${customerYWD.addressSameInAadharcard}</td>
			<td style="text-align:center" >${customerYWD.nameInAadharcardExactSpelling}</td>
      <td style="text-align:center" >${customerYWD.age}</td>
			<td style="text-align:center" >${customerYWD.daughter}</td>
			<td style="text-align:center" >${customerYWD.son}</td>
		</tr>`;
        }
        const dataOtherLegalHears = head + bod + foot;
        str = (0, helper_1.replaceAll)(str, find, dataOtherLegalHears);
        //basic details
        find = "[[companyName]]";
        replace = customer.companyName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[companyAddress]]";
        replace = customer.companyAddress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[date]]";
        const date = new Date(customer.date);
        replace = (0, moment_1.default)(date).format("DD-MM-YYYY");
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[companyNumber]]";
        replace = customer.companyNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[emailId]]";
        replace = customer.emailId;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[registerTransferAgentName]]";
        replace = customer.registerTransferAgentName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[registerTransferAgentAdress]]";
        replace = customer.registerTransferAgentAdress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[registerTransferAgentContactNumber]]";
        replace = customer.registerTransferAgentContactNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[registerTransferAgentEmail]]";
        replace = customer.registerTransferAgentEmail;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[ledgerFolio]]";
        replace = customer.ledgerFolio;
        str = (0, helper_1.replaceAll)(str, find, replace);
        if (customer.bonusDate) {
            find = "[[bonusDate]]";
            replace = (0, moment_1.default)(customer.bonusDate).format("DD MMM YYYY");
            str = (0, helper_1.replaceAll)(str, find, replace);
            //
            find = "[[bonusSplit]]";
            replace = "bonus";
            str = (0, helper_1.replaceAll)(str, find, replace);
        }
        else if (customer.splitDate) {
            find = "[[splitDate]]";
            replace = (0, moment_1.default)(customer.splitDate).format("DD MMM YYYY");
            str = (0, helper_1.replaceAll)(str, find, replace);
            //
            find = "[[bonusSplit]]";
            replace = "split";
            str = (0, helper_1.replaceAll)(str, find, replace);
        }
        find = "[[notaryDate]]";
        replace = (0, moment_1.default)(customer.notaryDate).format("DD MMM YYYY");
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[totalShares]]";
        replace = customer.totalShares;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[faceValueAsOnToday]]";
        replace = customer.faceValueAsOnToday;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[holdShareQuantitySelf]]";
        replace = customer.holdShareQuantitySelf;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[companyHoldUndeliveredShareQuantity]]";
        replace = customer.companyHoldUndeliveredShareQuantity;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[holdShareQuantitySelfFaceValue]]";
        replace = customer.holdShareQuantitySelfFaceValue;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[oldCompanyName]]";
        replace = customer.oldCompanyName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[oldQuantityholdShare]]";
        replace = customer.oldQuantityholdShare;
        str = (0, helper_1.replaceAll)(str, find, replace);
        //2.	First Holder
        find = "[[fhnameInPancardExactSpelling]]";
        replace = customer.fhnameInPancardExactSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhrateInPercentage]]";
        replace = customer.fhrateInPercentage;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhbusiness]]";
        replace = customer.fhbusiness;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhpinCode]]";
        replace = customer.fhpinCode;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhnameAsPerShareCertificate]]";
        replace = customer.fhnameAsPerShareCertificate;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhfatherOrHusbandName]]";
        replace = customer.fhfatherOrHusbandName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhcontactNumber]]";
        replace = customer.fhcontactNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhemail]]";
        replace = customer.fhemail;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhpancardNumber]]";
        replace = customer.fhpancardNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhcity]]";
        replace = customer.fhcity;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhaddressSameInAadharcard]]";
        replace = customer.fhaddressSameInAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fholdAddressCompanyRegister]]";
        replace = customer.fholdAddressCompanyRegister;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhgender]]";
        replace = customer.fhgender;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhstate]]";
        replace = customer.fhstate;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhage]]";
        replace = customer.fhage;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhaadharCardNumber]]";
        replace = customer.fhaadharCardNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhnameInAadharcardExactSpeling]]";
        replace = customer.fhnameInAadharcardExactSpeling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        //3.	joint  Holder
        find = "[[jhnameInPancardExactSpelling]]";
        replace = customer.jhnameInPancardExactSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhnameAsPerShareCertificate]]";
        replace = customer.jhnameAsPerShareCertificate;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhfatherOrHusbandName]]";
        replace = customer.jhfatherOrHusbandName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhcontactNumber]]";
        replace = customer.jhcontactNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhemail]]";
        replace = customer.jhemail;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhpancardNumber]]";
        replace = customer.jhpancardNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhcity]]";
        replace = customer.jhcity;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhaddressSameInAadharcard]]";
        replace = customer.jhaddressSameInAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jholdAddressCompanyRegister]]";
        replace = customer.jholdAddressCompanyRegister;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhgender]]";
        replace = customer.jhgender;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhstate]]";
        replace = customer.jhstate;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhage]]";
        replace = customer.jhage;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhaadharCardNumber]]";
        replace = customer.jhaadharcardNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhnameInAadharcardExactSpeling]]";
        replace = customer.jhnameInAadharcardExactSpeling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        //4.	first holder Bank Details Holder
        find = "[[fhbankName]]";
        replace = customer.fhbankName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhbankAddress]]";
        replace = customer.fhbankAddress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhholderAddressInBank]]";
        replace = customer.fhholderAddressInBank;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhaccountTypeSavingorCurrent]]";
        replace = customer.fhaccountTypeSavingorCurrent;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhaccountNumber]]";
        replace = customer.fhaccountNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhbankTelephoneNumber]]";
        replace = customer.fhbankTelephoneNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhbankIfscCode]]";
        replace = customer.fhbankIfscCode;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhbankEmail]]";
        replace = customer.fhbankEmail;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhnineDigitMICRNumber]]";
        replace = customer.fhnineDigitMICRNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fhnameAsPerBankAccount]]";
        replace = customer.fhnameAsPerBankAccount;
        str = (0, helper_1.replaceAll)(str, find, replace);
        //5.	joint holder Bank Details Holder
        find = "[[jhbankName]]";
        replace = customer.jhbankName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhbankAddress]]";
        replace = customer.jhbankAddress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhholderAddressInBank]]";
        replace = customer.jhholderAddressInBank;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhaccountTypeSavingorCurrent]]";
        replace = customer.jhaccountTypeSavingorCurrent;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhaccountNumber]]";
        replace = customer.jhaccountNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhbankTelephoneNumber]]";
        replace = customer.jhbankTelephoneNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhbankIfscCode]]";
        replace = customer.jhbankIfscCode;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhbankEmail]]";
        replace = customer.jhbankEmail;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhnineDigitMICRNumber]]";
        replace = customer.jhnineDigitMICRNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[jhnameAsPerBankAccount]]";
        replace = customer.jhnameAsPerBankAccount;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 6.	Demat Details
        find = "[[dpName]]";
        replace = customer.dpName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[dematNumber]]";
        // let replace1 = customer.dematNumber;
        replace = customer.dematNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[dpId]]";
        // it'll take first 8 digit from dematNumber
        // replace = replace1?.slice(0, 8)
        replace = customer.dpId;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[clientId]]";
        // it'll take last 8 digit from dematNumber
        // replace = replace1?.slice(8, 16)
        replace = customer.clientId;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[cdslOrNsdl]]";
        replace = customer.cdslOrNsdl;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[nameAsPerDematAccount]]";
        replace = customer.nameAsPerDematAccount;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[nomineeName]]";
        replace = customer.nomineeName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[nomineeFatherOrHusbandName]]";
        replace = customer.nomineeFatherOrHusbandName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[nomineeAddress]]";
        replace = customer.nomineeAddress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[nomineeHolderRelationShip]]";
        replace = customer.nomineeHolderRelationShip;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[nomineeBirthdate]]";
        replace = (0, moment_1.default)(customer.nomineeBirthdate).format("DD-MM-YYYY");
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 7.	Witness 1
        find = "[[w1NameInPancardExactSpelling]]";
        replace = customer.w1NameInPancardExactSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[w1addressSameInAadharcard]]";
        replace = customer.w1addressSameInAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[w1nameInAadharcardExactSpelling]]";
        replace = customer.w1nameInAadharcardExactSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 8.	Witness 2
        find = "[[w2NameInPancardExactSpelling]]";
        replace = customer.w2nameInPancardExactSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[w2addressSameInAadharcard]]";
        replace = customer.w2addressSameInAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[w2nameInAadharcardExactSpelling]]";
        replace = customer.w2nameInAadharcardExactSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 9.	Surety-1
        find = "[[s1nameInPancardExactSpelling]]";
        replace = customer.w2nameInAadharcardExactSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s1nameInAadharcard]]";
        replace = customer.s1nameInAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s1addressAadharcard]]";
        replace = customer.s1addressAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s1age]]";
        replace = customer.s1age;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s1income]]";
        replace = customer.s1income;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s1email]]";
        replace = customer.s1email;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s1mobileNumber]]";
        replace = customer.s1mobileNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s1itReturnShowAddress]]";
        replace = customer.s1itReturnShowAddress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 10.	Surety-2
        find = "[[s2nameInPancardExactSpelling]]";
        replace = customer.w2nameInAadharcardExactSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s2nameInAadharcard]]";
        replace = customer.s2nameInAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s2addressAadharcard]]";
        replace = customer.s2addressAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s2age]]";
        replace = customer.s2age;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s2income]]";
        replace = customer.s2income;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s2email]]";
        replace = customer.s2email;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s2mobileNumber]]";
        replace = customer.s2mobileNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[s2itReturnShowAddress]]";
        replace = customer.s2itReturnShowAddress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 11. RTA Letter
        find = "[[policeStationName]]";
        replace = customer.policeStationName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        //  12 .	Name Change Upon Marriage/Gazette
        find = "[[oldName]]";
        replace = customer.oldName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[newName]]";
        replace = customer.newname;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 13.	Succession
        find = "[[deathHolderName1]]";
        replace = customer.deathHolderName1;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[deathHolderName2]]";
        replace = customer.deathHolderName2;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[deathHolderFirstCity]]";
        replace = customer.deathHolderFirstCity;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[deathHolderSecondCity]]";
        replace = customer.deathHolderSecondCity;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[deathOfAddress]]";
        replace = customer.deathOfAddress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[certificateDeathHolderName1]]";
        replace = customer.certificateDeathHolderName1;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[certificateDeathHolderName2]]";
        replace = customer.certificateDeathHolderName2;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[legalNamePancard]]";
        replace = customer.legalNamePancard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[successionCertificateNumberYear]]";
        replace = customer.successionCertificateNumberYear;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[successionCertificateCourtOrderDateAndYear]]";
        replace = customer.successionCertificateCourtOrderDateAndYear;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 14.	Legal Heir Applicant
        find = "[[nameInPancardExectSpelling]]";
        replace = customer.nameInPancardExectSpelling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[nameAsPerShareCertificate]]";
        replace = customer.nameAsPerShareCertificate;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[fatherOrHusbandName]]";
        replace = customer.fatherOrHusbandName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[contactNumber]]";
        replace = customer.contactNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[email]]";
        replace = customer.email;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[pancardNumber]]";
        replace = customer.pancardNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[city]]";
        replace = customer.city;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[deathOfHolderFirstHolder]]";
        replace = (0, moment_1.default)(customer.deathOfHolderFirstHolder).format("DD-MM-YYYY");
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[deathOfHolderSecondHolder]]";
        replace = (0, moment_1.default)(customer.deathOfHolderSecondHolder).format("DD-MM-YYYY");
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[addressSameInAadharcard]]";
        replace = customer.addressSameInAadharcard;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[oldAddressCompanyRegister]]";
        replace = customer.oldAddressCompanyRegister;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[gender]]";
        replace = customer.gender;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[state]]";
        replace = customer.gender;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[age]]";
        replace = customer.age;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[aadharcardNumber]]";
        replace = customer.aadharcardNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[nameInAdharcardExactSpeling]]";
        replace = customer.nameInAdharcardExactSpeling;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 15.	LHA Bank Details Holder
        find = "[[lhabankName]]";
        replace = customer.lhabankName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhabankAddress]]";
        replace = customer.lhabankAddress;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhaholderAddressInBank]]";
        replace = customer.lhaholderAddressInBank;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhaaccountTypeSavingorCurrent]]";
        replace = customer.lhaaccountTypeSavingorCurrent;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhaaccountNumber]]";
        replace = customer.lhaaccountNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhabankTelephoneNumber]]";
        replace = customer.lhabankTelephoneNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhabankIfscCode]]";
        replace = customer.lhabankIfscCode;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhanineDigitMICRNumber]]";
        replace = customer.lhanineDigitMICRNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhanameAsPerBankAccount]]";
        replace = customer.lhanameAsPerBankAccount;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 16.	LHA Demat Details
        find = "[[lhadpName]]";
        replace = customer.lhadpName;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhadematNumber]]";
        replace = customer.lhadematNumber;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhacdslOrNsdl]]";
        replace = customer.lhacdslOrNsdl;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[lhanameAsPerDematAccount]]";
        replace = customer.lhanameAsPerDematAccount;
        str = (0, helper_1.replaceAll)(str, find, replace);
        // 17.	OTHER LEGAL HEAR (multiple)
        //  18.	IEPF
        find = "[[iepfDividendAmount]]";
        replace = customer.iepfDividendAmount;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[iepfDividendYear]]";
        replace = customer.iepfDividendYear;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[referenceLetterNo]]";
        replace = customer.referenceLetterNo;
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[referenceLetterdate]]";
        replace = (0, moment_1.default)(customer.referenceLetterdate).format("DD-MM-YYYY");
        str = (0, helper_1.replaceAll)(str, find, replace);
        find = "[[currentYear]]";
        replace = new Date().getFullYear();
        str = (0, helper_1.replaceAll)(str, find, replace);
        return str;
    }
    async createCustomerTemplate(userId, customerTemplateDataa) {
        const response = [];
        for (let i = 0; i < customerTemplateDataa.length; i++) {
            const customerTemplateData = customerTemplateDataa[i];
            const getCustomer = await this._customerRepository.getCustomer(customerTemplateData.customerId, userId);
            const getCustomerTemplates = await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(customerTemplateData.customerId, customerTemplateData.templateType);
            if (customerTemplateData.isCustomMainContentTemplate) {
                if (customerTemplateData.id) {
                    const d = await this._customerTemplateRepository.updateCustomerTemplate(customerTemplateData.id, {
                        id: customerTemplateData.id,
                        customerId: customerTemplateData.customerId,
                        isCustomMainContentTemplate: customerTemplateData.isCustomMainContentTemplate,
                        order: customerTemplateData.order,
                        templateId: null,
                        templateType: customerTemplateData.templateType,
                        templateData: customerTemplateData.templateData,
                        templateTitle: customerTemplateData.templateTitle,
                    });
                    response.push(d);
                }
                else {
                    const d = await this._customerTemplateRepository.createCustomerTemplate({
                        id: customerTemplateData.id,
                        customerId: customerTemplateData.customerId,
                        isCustomMainContentTemplate: customerTemplateData.isCustomMainContentTemplate,
                        order: getCustomerTemplates.length + 1,
                        templateId: null,
                        templateType: customerTemplateData.templateType,
                        templateData: customerTemplateData.templateData,
                        templateTitle: customerTemplateData.templateTitle,
                    });
                    response.push(d);
                }
            }
            else {
                const getTemplate = await this._templateRepository.getTemplateById(customerTemplateData.templateId, userId);
                if (!getCustomer || !getTemplate) {
                    throw new BadRequest_1.BadRequest("Please select valid customer or template.");
                }
                const replacedCustomerTemplateData = await this.replaceTemplateData(getCustomer, getTemplate);
                if (customerTemplateData.id) {
                    const d = await this._customerTemplateRepository.updateCustomerTemplate(customerTemplateData.id, {
                        id: customerTemplateData.id,
                        customerId: customerTemplateData.customerId,
                        isCustomMainContentTemplate: customerTemplateData.isCustomMainContentTemplate,
                        order: customerTemplateData.order,
                        templateId: customerTemplateData.templateId,
                        templateType: customerTemplateData.templateType,
                        templateData: replacedCustomerTemplateData,
                        templateTitle: getTemplate.title,
                    });
                    response.push(d);
                }
                else {
                    const d = await this._customerTemplateRepository.createCustomerTemplate({
                        ...customerTemplateData,
                        order: customerTemplateData.templateType === "MAIN_CONTENT"
                            ? getCustomerTemplates.length + 1
                            : null,
                        templateTitle: getTemplate.title,
                        templateType: getTemplate.type,
                        templateData: replacedCustomerTemplateData,
                    });
                    response.push(d);
                }
            }
        }
        return response;
    }
    async createWordFileCustomerTemplate(customerId) {
        try {
            const types = [
                "COMMON_CONTENT",
                "REFE_LINE",
                "SUBJECT",
                "MAIN_CONTENT",
                "SUMMARY",
                "AGREEMENT",
            ];
            const getTemplateData = await this._customerTemplateRepository.createWordFileCustomerTemplate(customerId);
            let body = "";
            let CCData = getTemplateData.map(async (d) => {
                if (d.templateType === "COMMON_CONTENT") {
                    body += d.templateData;
                }
            });
            // body += "<br />";
            let RLData = getTemplateData.map(async (d) => {
                if (d.templateType === "REFE_LINE") {
                    body += d.templateData;
                }
            });
            body += `
      <p><strong>Subject</strong>:</p>`;
            // subject
            let count = 0;
            let SData = getTemplateData.map(async (d) => {
                if (d.templateType === "SUBJECT") {
                    count = count + 1;
                    d.templateData = d.templateData?.replace("<p>", `<p style="margin-left:40px">${count}. `);
                    body += d.templateData;
                }
            });
            body +=
                "<pre><span style='font-size:16px'><span style='font-family:Tahoma,Geneva,sans-serif'>Dear Sir / Madam,</span></span></pre><div style='margin-left:40px; text-align:justify;'>";
            //main content
            const MCData = getTemplateData.filter((d) => {
                return d.templateType === "MAIN_CONTENT";
            });
            let check = MCData.sort((a, b) => (a.order > b.order ? 1 : -1));
            check.map((d) => {
                // d.templateData = d.templateData?.replace("<p>", `<p style="margin-bottom: 0;">`)!;
                body += d.templateData;
                body += "<br />";
            });
            body += "</div>";
            body +=
                "<p>I am enclosing the following documents towards proof of my identification and address.</p><br />";
            // body += "<div style='page-break-after:always'></div>";
            //summary
            let scount = 0;
            // body += "<div style='margin-left:40px;'>"
            let SUTitleData = getTemplateData.map((d) => {
                if (d.templateType === "SUMMARY") {
                    scount = scount + 1;
                    // body += scount + ". " + d.templateTitle;
                    body += `<p style='margin-left:40px;'>${scount}. ${d.templateTitle}</p>`;
                }
            });
            body += "<br />";
            //summary
            const getCustomer = await this._customerRepository.getCustomer(customerId, 1);
            body +=
                "<p>Yours faithfully,</p><p>_______________________</p><p>" +
                    getCustomer?.fhnameInPancardExactSpelling +
                    "</p>";
            body += `<p style="page-break-before: always;">&nbsp;</p>`;
            let count1 = 0;
            let SUData = getTemplateData.map((d) => {
                if (d.templateType === "SUMMARY") {
                    count1 += 1;
                    body += d.templateData;
                    body += `<p style="page-break-before: always;">&nbsp;</p>`;
                }
            });
            body += `<p style="page-break-before: always;">&nbsp;</p>`;
            let agreementData = getTemplateData.map((d) => {
                if (d.templateType === "AGREEMENT") {
                    body += d.templateData;
                }
            });
            const converted = await html_docx_js_1.default.asBlob(body).arrayBuffer();
            const fileName = `Forwarding-Letter_${customerId}.docx`;
            const folderPath = (0, path_1.join)(__dirname, "/document");
            await fs_1.default.mkdirSync(folderPath, { recursive: true });
            const docxFilePath = (0, path_1.join)(folderPath, fileName);
            const saveFile = await (0, fs_1.writeFileSync)(docxFilePath, Buffer.from(converted));
            return { filePath: docxFilePath, fileName };
        }
        catch (error) {
            console.log("error:-" + error);
            throw error;
        }
    }
    async getCustomerTemplateByTypeAndCustomerId(customerId, templateType, userId) {
        const getCustomerTemplates = await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(customerId, templateType);
        const response = [];
        for (let i = 0; i < getCustomerTemplates.length; i++) {
            const customerTemplateent = getCustomerTemplates[i];
            if (customerTemplateent.isCustomMainContentTemplate) {
                const updateCustomerTemplate = await this._customerTemplateRepository.updateCustomerTemplate(customerTemplateent.id, {
                    id: customerTemplateent.id,
                    customerId: customerTemplateent.customerId,
                    isCustomMainContentTemplate: customerTemplateent.isCustomMainContentTemplate,
                    order: customerTemplateent.order,
                    templateId: customerTemplateent.templateId,
                    templateType: customerTemplateent.templateType,
                    templateData: customerTemplateent.templateData,
                    templateTitle: customerTemplateent.templateTitle,
                });
                response.push(updateCustomerTemplate);
            }
            else {
                const replacedCustomerTemplateData = await this.replaceTemplateData(customerTemplateent.Customer, customerTemplateent.Template);
                const updateCustomerTemplate = await this._customerTemplateRepository.updateCustomerTemplate(customerTemplateent.id, {
                    id: customerTemplateent.id,
                    customerId: customerTemplateent.customerId,
                    isCustomMainContentTemplate: customerTemplateent.isCustomMainContentTemplate,
                    order: customerTemplateent.order,
                    templateId: customerTemplateent.templateId,
                    templateType: customerTemplateent.templateType,
                    templateData: replacedCustomerTemplateData,
                    templateTitle: customerTemplateent.templateTitle,
                });
                response.push(updateCustomerTemplate);
            }
        }
        if (getCustomerTemplates.length === 0 &&
            (templateType === "COMMON_CONTENT" ||
                templateType === "REFE_LINE" ||
                templateType === "AGREEMENT")) {
            const getCustomer = await this._customerRepository.getCustomer(customerId, userId);
            const getTemplate = await this._templateRepository.getTemplatesByType(templateType, userId);
            if (!getCustomer || !getTemplate) {
                throw new BadRequest_1.BadRequest("Please select valid customer or template.");
            }
            const replacedCustomerTemplateData = await this.replaceTemplateData(getCustomer, getTemplate[0]);
            const data = await this._customerTemplateRepository.createCustomerTemplate({
                id: null,
                customerId,
                isCustomMainContentTemplate: false,
                order: null,
                templateId: getTemplate[0].id,
                templateType: getTemplate[0].type,
                templateData: replacedCustomerTemplateData,
                templateTitle: getTemplate[0].title,
            });
            response.push(data);
        }
        return response;
    }
    async getCustomerTemplateStatus(customerId, templateType, userId) {
        const getCustomerTemplates = await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(customerId, templateType);
        return { isAvailable: getCustomerTemplates.length > 0 };
    }
    async deleteCustomerTemplateById(id) {
        return await this._customerTemplateRepository.deleteCustomerTemplateById(id);
    }
    async getFiltterTemplate(customerId, templateType, userId) {
        const all = await this._templateRepository.getTemplatesByType(templateType, userId);
        const selected = await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(customerId, templateType);
        return await all.filter(({ id: id1 }) => !selected.some(({ templateId: id2 }) => id2 === id1));
    }
    async getCustomerTemplateById(id) {
        const getData = await this._customerTemplateRepository.getCustomerTemplateById(id);
        if (!getData) {
            throw new NotFound_1.NotFound("Customer Template Not Found");
        }
        return getData;
    }
};
CustomerTemplateService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.CustomerTemplateRepository)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.CustomerRepository)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.TemplateRepository)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CustomerTemplateService);
exports.CustomerTemplateService = CustomerTemplateService;
//# sourceMappingURL=CustomerTemplateService.js.map