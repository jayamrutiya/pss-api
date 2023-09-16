import { inject, injectable } from "inversify";
import { ICustomerTemplateService } from "../interfaces/ICustomerTemplateService";
import { ILoggerService } from "../interfaces/ILoggerService";
import { TYPES } from "../config/types";
import { ICustomerTemplateRepository } from "../interfaces/ICustomerTemplateRepository";
import {
  CreateCustomerTemplateInput,
  CustomerTemplateWithCustomerTemplate,
  UpdateCustomerTemplate,
} from "../types/CustomerTemplate";
import {
  Customer,
  CustomerTemplate,
  CustomerTemplateMaster,
  Template,
} from "@prisma/client";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ITemplateRepository } from "../interfaces/ITemplateRepository";
import { BadRequest } from "../errors/BadRequest";
import { replaceAll } from "../config/helper";
import moment from "moment";
import fs, { unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { NotFound } from "../errors/NotFound";
import htmlToDocx from "html-to-docx";
import htmlDocx from "html-docx-js";
import env from "../config/env";

@injectable()
export class CustomerTemplateService implements ICustomerTemplateService {
  private _loggerService: ILoggerService;
  private _customerTemplateRepository: ICustomerTemplateRepository;
  private _customerRepository: ICustomerRepository;
  private _templateRepository: ITemplateRepository;
  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.CustomerTemplateRepository)
    customerTemplateRepository: ICustomerTemplateRepository,
    @inject(TYPES.CustomerRepository) customerRepository: ICustomerRepository,
    @inject(TYPES.TemplateRepository) templateRepository: ITemplateRepository
  ) {
    this._loggerService = loggerService;
    this._customerTemplateRepository = customerTemplateRepository;
    this._customerRepository = customerRepository;
    this._templateRepository = templateRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async replaceTemplateData(
    customerData: Customer,
    template: Template
  ): Promise<string> {
    const customer = {
      ...customerData,
      tableSDT: JSON.parse(customerData.tableSDT!),
      ywdATabelData: JSON.parse(customerData.ywdATabelData!),
      otherLegalHears: JSON.parse(customerData.otherLegalHears!),
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
    str = replaceAll(str, find, olhnamepan);

    find = "[[olhnameInPancard1]]";
    let olhnamepan1 = olhnamepan.split(",")[0];
    str = replaceAll(str, find, olhnamepan1);

    find = "[[olhnameInPancard2]]";
    let olhnamepan2 = olhnamepan.split(",")[1];
    str = replaceAll(str, find, olhnamepan2);

    find = "[[olhnameInPancard3]]";
    let olhnamepan3 = olhnamepan.split(",")[2];
    str = replaceAll(str, find, olhnamepan3);

    find = "[[olhnameInaadharcard]]";
    let olhnameaadhar = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhnameaadhar += `${customerYWD.nameInAadharcardExactSpelling};`;
    }
    str = replaceAll(str, find, olhnameaadhar);

    find = "[[olhnameInaadharcard1]]";
    let olhnameInaadharcard1 = olhnameaadhar.split(",")[0];
    str = replaceAll(str, find, olhnameInaadharcard1);

    find = "[[olhnameInaadharcard2]]";
    let olhnameInaadharcard2 = olhnameaadhar.split(",")[1];
    str = replaceAll(str, find, olhnameInaadharcard2);

    find = "[[olhnameInaadharcard3]]";
    let olhnameInaadharcard3 = olhnameaadhar.split(",")[2];
    str = replaceAll(str, find, olhnameInaadharcard3);

    find = "[[olhaddressaddhar]]";
    let olhaddaadhar = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhaddaadhar += `${customerYWD.addressSameInAadharcard};`;
    }
    str = replaceAll(str, find, olhaddaadhar);

    find = "[[olhaddressaddhar1]]";
    let olhaddressaddhar1 = olhaddaadhar.split(",")[0];
    str = replaceAll(str, find, olhaddressaddhar1);

    find = "[[olhaddressaddhar2]]";
    let olhaddressaddhar2 = olhaddaadhar.split(",")[1];
    str = replaceAll(str, find, olhaddressaddhar2);

    find = "[[olhaddressaddhar3]]";
    let olhaddressaddhar3 = olhaddaadhar.split(",")[2];
    str = replaceAll(str, find, olhaddressaddhar3);

    find = "[[olhage]]";
    let olhage = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhage += `${customerYWD.age},`;
    }
    str = replaceAll(str, find, olhage);

    find = "[[olhage1]]";
    let olhage1 = olhage.split(",")[0];
    str = replaceAll(str, find, olhage1);

    find = "[[olhage2]]";
    let olhage2 = olhage.split(",")[1];
    str = replaceAll(str, find, olhage2);

    find = "[[olhage3]]";
    let olhage3 = olhage.split(",")[2];
    str = replaceAll(str, find, olhage3);

    find = "[[olhdaughterson]]";
    let olhdaughterson = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhdaughterson += `${
        customerYWD.daughter ? customerYWD.daughter : customerYWD.son
      },`;
    }
    str = replaceAll(str, find, olhdaughterson);

    find = "[[olhdaughterson1]]";
    let olhdaughterson1 = olhdaughterson.split(",")[0];
    str = replaceAll(str, find, olhdaughterson1);

    find = "[[olhdaughterson2]]";
    let olhdaughterson2 = olhdaughterson.split(",")[1];
    str = replaceAll(str, find, olhdaughterson2);

    find = "[[olhdaughterson3]]";
    let olhdaughterson3 = olhdaughterson.split(",")[2];
    str = replaceAll(str, find, olhdaughterson3);

    //error
    // try SDT

    find = "[[distinctiveNumber]]";
    let bd = "";
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      bd += `${customerYWD.distinctiveNumber},`;
    }
    str = replaceAll(str, find, bd);

    find = "[[shareCertificateNumber]]";
    let bs = "";
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      bs += `${customerYWD.shareCertificateNumber},`;
    }
    str = replaceAll(str, find, bs);

    find = "[[totalShareQuantity]]";
    let bt = "";
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      bt += `${customerYWD.totalShareQuantity},`;
    }
    str = replaceAll(str, find, bt);
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
    str = replaceAll(str, find, datan);

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
    str = replaceAll(str, find, dataf);

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
        <td style="text-align:center" >${
          customerYWD.shareCertificateNumber
        }</td>
        <td style="text-align:center" >${
          customerYWD.distinctiveNumber?.split("-")[0]
        }</td>
        <td style="text-align:center" >${
          customerYWD.distinctiveNumber?.split("-")[1]
            ? customerYWD.distinctiveNumber?.split("-")[1]
            : customerYWD.distinctiveNumber?.split("-")[0]
        }</td>
      </tr>`;
    }
    const df = hf + bf + ff;
    str = replaceAll(str, find, df);

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
        <td style="text-align:center" >${
          customerYWD.shareCertificateNumber
        }</td>
        <td style="text-align:center" >${customerYWD.distinctiveNumber}</td>
        <td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
        <td style="text-align:center" >${
          customer.deathHolderName1
        } (deceased) jointly ${
        customer.deathHolderName2
          ? customer.deathHolderName2 + "(deceased)"
          : ""
      }</td>
      </tr>`;
    }
    const dof = hof + bof + fof;
    str = replaceAll(str, find, dof);

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
        <td style="text-align:center" >${
          customerYWD.distinctiveNumber?.split("-")[0]
        }</td>
        <td style="text-align:center" >${
          customerYWD.distinctiveNumber?.split("-")[1]
            ? customerYWD.distinctiveNumber?.split("-")[1]
            : customerYWD.distinctiveNumber?.split("-")[0]
        }</td>
      </tr>`;
    }
    const dff = hdf + bdf + fdf;
    str = replaceAll(str, find, dff);

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
    str = replaceAll(str, find, daaf);

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
      <td style="text-align:center" >${
        customerYWD.distinctiveNumber?.split("-")[0]
      }</td>
      <td style="text-align:center" >${
        customerYWD.distinctiveNumber?.split("-")[1]
          ? customerYWD.distinctiveNumber?.split("-")[1]
          : customerYWD.distinctiveNumber?.split("-")[0]
      }</td>
      <td style="text-align:center" >${customerYWD.totalShareQuantity} of Rs.${
        customer.faceValueAsOnToday
      }/-</td>
         
      </tr>`;
    }
    const ddata = heedf + beedf + feedf;
    str = replaceAll(str, find, ddata);

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
    str = replaceAll(str, find, dataa);

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
      <td style="text-align:center" >${
        customerYWD.distinctiveNumber?.split("-")[0]
      }</td>
      <td style="text-align:center" >${
        customerYWD.distinctiveNumber?.split("-")[1]
          ? customerYWD.distinctiveNumber?.split("-")[1]
          : customerYWD.distinctiveNumber?.split("-")[0]
      }</td>
      <td style="text-align:center" >${customerYWD.totalShareQuantity}</td>
      </tr>`;
    }
    const dataData = headdata + bodydata + footerdata;
    str = replaceAll(str, find, dataData);

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
          <td style="text-align:center" >${
            customerYWD.shareCertificateNumber
          }</td>
          <td style="text-align:center" >${
            customerYWD.distinctiveNumber?.split("-")[0]
          }</td>
          <td style="text-align:center" >${
            customerYWD.distinctiveNumber?.split("-")[1]
              ? customerYWD.distinctiveNumber?.split("-")[1]
              : customerYWD.distinctiveNumber?.split("-")[0]
          }</td>
          <td style="text-align:center" >${
            customerYWD.totalShareQuantity
          } of Rs.${customer.faceValueAsOnToday}/-</td>
          </tr>`;
    }
    const d1data = hdft + bdft + fdft;
    str = replaceAll(str, find, d1data);

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
    str = replaceAll(str, find, datacdn);

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
    str = replaceAll(str, find, dname);

    //tables ywdATable:-
    find = "[[ywdATable]]";
    const header = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
    <thead>
      <tr>
        <th scope="col">Year</th>
        <th scope="col">Warrant No.</th>
        <th scope="col">DD/MICR No.</th>
        <th scope="col">Amount</th>
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
    str = replaceAll(str, find, data);

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
    str = replaceAll(str, find, dataSDT);

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
    str = replaceAll(str, find, dataOtherLegalHears);

    //basic details
    find = "[[companyName]]";
    replace = customer.companyName;
    str = replaceAll(str, find, replace);

    find = "[[companyAddress]]";
    replace = customer.companyAddress;
    str = replaceAll(str, find, replace);

    find = "[[date]]";
    const date = new Date(customer.date!);
    replace = moment(date).format("DD-MM-YYYY");
    str = replaceAll(str, find, replace);

    find = "[[companyNumber]]";
    replace = customer.companyNumber;
    str = replaceAll(str, find, replace);

    find = "[[emailId]]";
    replace = customer.emailId;
    str = replaceAll(str, find, replace);

    find = "[[registerTransferAgentName]]";
    replace = customer.registerTransferAgentName;
    str = replaceAll(str, find, replace);

    find = "[[registerTransferAgentAdress]]";
    replace = customer.registerTransferAgentAdress;
    str = replaceAll(str, find, replace);

    find = "[[registerTransferAgentContactNumber]]";
    replace = customer.registerTransferAgentContactNumber;
    str = replaceAll(str, find, replace);

    find = "[[registerTransferAgentEmail]]";
    replace = customer.registerTransferAgentEmail;
    str = replaceAll(str, find, replace);

    find = "[[ledgerFolio]]";
    replace = customer.ledgerFolio;
    str = replaceAll(str, find, replace);

    if (customer.bonusDate) {
      find = "[[bonusDate]]";
      replace = moment(customer.bonusDate).format("DD MMM YYYY");
      str = replaceAll(str, find, replace);
      //
      find = "[[bonusSplit]]";
      replace = "bonus";
      str = replaceAll(str, find, replace);
    } else if (customer.splitDate) {
      find = "[[splitDate]]";
      replace = moment(customer.splitDate).format("DD MMM YYYY");
      str = replaceAll(str, find, replace);
      //
      find = "[[bonusSplit]]";
      replace = "split";
      str = replaceAll(str, find, replace);
    }

    find = "[[notaryDate]]";
    replace = moment(customer.notaryDate).format("DD MMM YYYY");
    str = replaceAll(str, find, replace);

    find = "[[totalShares]]";
    replace = customer.totalShares;
    str = replaceAll(str, find, replace);

    find = "[[faceValueAsOnToday]]";
    replace = customer.faceValueAsOnToday;
    str = replaceAll(str, find, replace);

    find = "[[holdShareQuantitySelf]]";
    replace = customer.holdShareQuantitySelf;
    str = replaceAll(str, find, replace);

    find = "[[companyHoldUndeliveredShareQuantity]]";
    replace = customer.companyHoldUndeliveredShareQuantity;
    str = replaceAll(str, find, replace);

    find = "[[holdShareQuantitySelfFaceValue]]";
    replace = customer.holdShareQuantitySelfFaceValue;
    str = replaceAll(str, find, replace);

    find = "[[oldCompanyName]]";
    replace = customer.oldCompanyName;
    str = replaceAll(str, find, replace);

    find = "[[oldQuantityholdShare]]";
    replace = customer.oldQuantityholdShare;
    str = replaceAll(str, find, replace);

    //2.	First Holder

    find = "[[fhnameInPancardExactSpelling]]";
    replace = customer.fhnameInPancardExactSpelling;
    str = replaceAll(str, find, replace);

    find = "[[fhrateInPercentage]]";
    replace = customer.fhrateInPercentage;
    str = replaceAll(str, find, replace);

    find = "[[fhbusiness]]";
    replace = customer.fhbusiness;
    str = replaceAll(str, find, replace);

    find = "[[fhpinCode]]";
    replace = customer.fhpinCode;
    str = replaceAll(str, find, replace);

    find = "[[fhnameAsPerShareCertificate]]";
    replace = customer.fhnameAsPerShareCertificate;
    str = replaceAll(str, find, replace);

    find = "[[fhfatherOrHusbandName]]";
    replace = customer.fhfatherOrHusbandName;
    str = replaceAll(str, find, replace);

    find = "[[fhcontactNumber]]";
    replace = customer.fhcontactNumber;
    str = replaceAll(str, find, replace);

    find = "[[fhemail]]";
    replace = customer.fhemail;
    str = replaceAll(str, find, replace);

    find = "[[fhpancardNumber]]";
    replace = customer.fhpancardNumber;
    str = replaceAll(str, find, replace);

    find = "[[fhcity]]";
    replace = customer.fhcity;
    str = replaceAll(str, find, replace);

    find = "[[fhaddressSameInAadharcard]]";
    replace = customer.fhaddressSameInAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[fholdAddressCompanyRegister]]";
    replace = customer.fholdAddressCompanyRegister;
    str = replaceAll(str, find, replace);

    find = "[[fhgender]]";
    replace = customer.fhgender;
    str = replaceAll(str, find, replace);

    find = "[[fhstate]]";
    replace = customer.fhstate;
    str = replaceAll(str, find, replace);

    find = "[[fhage]]";
    replace = customer.fhage;
    str = replaceAll(str, find, replace);

    find = "[[fhaadharCardNumber]]";
    replace = customer.fhaadharCardNumber;
    str = replaceAll(str, find, replace);

    find = "[[fhnameInAadharcardExactSpeling]]";
    replace = customer.fhnameInAadharcardExactSpeling;
    str = replaceAll(str, find, replace);

    find = "[[fhRelationship]]";
    replace = customer.fhRelationship;
    str = replaceAll(str, find, replace);

    //3.	joint  Holder

    find = "[[jhnameInPancardExactSpelling]]";
    replace = customer.jhnameInPancardExactSpelling;
    str = replaceAll(str, find, replace);

    find = "[[jhnameAsPerShareCertificate]]";
    replace = customer.jhnameAsPerShareCertificate;
    str = replaceAll(str, find, replace);

    find = "[[jhfatherOrHusbandName]]";
    replace = customer.jhfatherOrHusbandName;
    str = replaceAll(str, find, replace);

    find = "[[jhcontactNumber]]";
    replace = customer.jhcontactNumber;
    str = replaceAll(str, find, replace);

    find = "[[jhemail]]";
    replace = customer.jhemail;
    str = replaceAll(str, find, replace);

    find = "[[jhpancardNumber]]";
    replace = customer.jhpancardNumber;
    str = replaceAll(str, find, replace);

    find = "[[jhcity]]";
    replace = customer.jhcity;
    str = replaceAll(str, find, replace);

    find = "[[jhaddressSameInAadharcard]]";
    replace = customer.jhaddressSameInAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[jholdAddressCompanyRegister]]";
    replace = customer.jholdAddressCompanyRegister;
    str = replaceAll(str, find, replace);

    find = "[[jhgender]]";
    replace = customer.jhgender;
    str = replaceAll(str, find, replace);

    find = "[[jhstate]]";
    replace = customer.jhstate;
    str = replaceAll(str, find, replace);

    find = "[[jhage]]";
    replace = customer.jhage;
    str = replaceAll(str, find, replace);

    find = "[[jhaadharCardNumber]]";
    replace = customer.jhaadharcardNumber;
    str = replaceAll(str, find, replace);

    find = "[[jhnameInAadharcardExactSpeling]]";
    replace = customer.jhnameInAadharcardExactSpeling;
    str = replaceAll(str, find, replace);

    find = "[[jhRelationship]]";
    replace = customer.jhRelationship;
    str = replaceAll(str, find, replace);

    //4.	first holder Bank Details Holder

    find = "[[fhbankName]]";
    replace = customer.fhbankName;
    str = replaceAll(str, find, replace);

    find = "[[fhbankAddress]]";
    replace = customer.fhbankAddress;
    str = replaceAll(str, find, replace);

    find = "[[fhholderAddressInBank]]";
    replace = customer.fhholderAddressInBank;
    str = replaceAll(str, find, replace);

    find = "[[fhaccountTypeSavingorCurrent]]";
    replace = customer.fhaccountTypeSavingorCurrent;
    str = replaceAll(str, find, replace);

    find = "[[fhaccountNumber]]";
    replace = customer.fhaccountNumber;
    str = replaceAll(str, find, replace);

    find = "[[fhbankTelephoneNumber]]";
    replace = customer.fhbankTelephoneNumber;
    str = replaceAll(str, find, replace);

    find = "[[fhbankIfscCode]]";
    replace = customer.fhbankIfscCode;
    str = replaceAll(str, find, replace);

    find = "[[fhbankEmail]]";
    replace = customer.fhbankEmail;
    str = replaceAll(str, find, replace);

    find = "[[fhnineDigitMICRNumber]]";
    replace = customer.fhnineDigitMICRNumber;
    str = replaceAll(str, find, replace);

    find = "[[fhnameAsPerBankAccount]]";
    replace = customer.fhnameAsPerBankAccount;
    str = replaceAll(str, find, replace);

    //5.	joint holder Bank Details Holder

    find = "[[jhbankName]]";
    replace = customer.jhbankName;
    str = replaceAll(str, find, replace);

    find = "[[jhbankAddress]]";
    replace = customer.jhbankAddress;
    str = replaceAll(str, find, replace);

    find = "[[jhholderAddressInBank]]";
    replace = customer.jhholderAddressInBank;
    str = replaceAll(str, find, replace);

    find = "[[jhaccountTypeSavingorCurrent]]";
    replace = customer.jhaccountTypeSavingorCurrent;
    str = replaceAll(str, find, replace);

    find = "[[jhaccountNumber]]";
    replace = customer.jhaccountNumber;
    str = replaceAll(str, find, replace);

    find = "[[jhbankTelephoneNumber]]";
    replace = customer.jhbankTelephoneNumber;
    str = replaceAll(str, find, replace);

    find = "[[jhbankIfscCode]]";
    replace = customer.jhbankIfscCode;
    str = replaceAll(str, find, replace);

    find = "[[jhbankEmail]]";
    replace = customer.jhbankEmail;
    str = replaceAll(str, find, replace);

    find = "[[jhnineDigitMICRNumber]]";
    replace = customer.jhnineDigitMICRNumber;
    str = replaceAll(str, find, replace);

    find = "[[jhnameAsPerBankAccount]]";
    replace = customer.jhnameAsPerBankAccount;
    str = replaceAll(str, find, replace);

    // 6.	Demat Details

    find = "[[dpName]]";
    replace = customer.dpName;
    str = replaceAll(str, find, replace);

    find = "[[dematNumber]]";
    // let replace1 = customer.dematNumber;
    replace = customer.dematNumber;
    str = replaceAll(str, find, replace);

    find = "[[dpId]]";
    // it'll take first 8 digit from dematNumber
    // replace = replace1?.slice(0, 8)
    replace = customer.dpId;
    str = replaceAll(str, find, replace);

    find = "[[clientId]]";
    // it'll take last 8 digit from dematNumber
    // replace = replace1?.slice(8, 16)
    replace = customer.clientId;
    str = replaceAll(str, find, replace);

    find = "[[cdslOrNsdl]]";
    replace = customer.cdslOrNsdl;
    str = replaceAll(str, find, replace);

    find = "[[nameAsPerDematAccount]]";
    replace = customer.nameAsPerDematAccount;
    str = replaceAll(str, find, replace);

    find = "[[nomineeName]]";
    replace = customer.nomineeName;
    str = replaceAll(str, find, replace);

    find = "[[nomineeFatherOrHusbandName]]";
    replace = customer.nomineeFatherOrHusbandName;
    str = replaceAll(str, find, replace);

    find = "[[nomineeAddress]]";
    replace = customer.nomineeAddress;
    str = replaceAll(str, find, replace);

    find = "[[nomineeHolderRelationShip]]";
    replace = customer.nomineeHolderRelationShip;
    str = replaceAll(str, find, replace);

    find = "[[nomineeBirthdate]]";
    replace = moment(customer.nomineeBirthdate).format("DD-MM-YYYY");
    str = replaceAll(str, find, replace);

    // 7.	Witness 1

    find = "[[w1NameInPancardExactSpelling]]";
    replace = customer.w1NameInPancardExactSpelling;
    str = replaceAll(str, find, replace);

    find = "[[w1addressSameInAadharcard]]";
    replace = customer.w1addressSameInAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[w1nameInAadharcardExactSpelling]]";
    replace = customer.w1nameInAadharcardExactSpelling;
    str = replaceAll(str, find, replace);

    // 8.	Witness 2

    find = "[[w2NameInPancardExactSpelling]]";
    replace = customer.w2nameInPancardExactSpelling;
    str = replaceAll(str, find, replace);

    find = "[[w2addressSameInAadharcard]]";
    replace = customer.w2addressSameInAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[w2nameInAadharcardExactSpelling]]";
    replace = customer.w2nameInAadharcardExactSpelling;
    str = replaceAll(str, find, replace);

    // 9.	Surety-1

    find = "[[s1nameInPancardExactSpelling]]";
    replace = customer.w2nameInAadharcardExactSpelling;
    str = replaceAll(str, find, replace);

    find = "[[s1nameInAadharcard]]";
    replace = customer.s1nameInAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[s1addressAadharcard]]";
    replace = customer.s1addressAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[s1age]]";
    replace = customer.s1age;
    str = replaceAll(str, find, replace);

    find = "[[s1income]]";
    replace = customer.s1income;
    str = replaceAll(str, find, replace);

    find = "[[s1email]]";
    replace = customer.s1email;
    str = replaceAll(str, find, replace);

    find = "[[s1mobileNumber]]";
    replace = customer.s1mobileNumber;
    str = replaceAll(str, find, replace);

    find = "[[s1itReturnShowAddress]]";
    replace = customer.s1itReturnShowAddress;
    str = replaceAll(str, find, replace);

    // 10.	Surety-2

    find = "[[s2nameInPancardExactSpelling]]";
    replace = customer.w2nameInAadharcardExactSpelling;
    str = replaceAll(str, find, replace);

    find = "[[s2nameInAadharcard]]";
    replace = customer.s2nameInAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[s2addressAadharcard]]";
    replace = customer.s2addressAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[s2age]]";
    replace = customer.s2age;
    str = replaceAll(str, find, replace);

    find = "[[s2income]]";
    replace = customer.s2income;
    str = replaceAll(str, find, replace);

    find = "[[s2email]]";
    replace = customer.s2email;
    str = replaceAll(str, find, replace);

    find = "[[s2mobileNumber]]";
    replace = customer.s2mobileNumber;
    str = replaceAll(str, find, replace);

    find = "[[s2itReturnShowAddress]]";
    replace = customer.s2itReturnShowAddress;
    str = replaceAll(str, find, replace);

    // 11. RTA Letter

    find = "[[policeStationName]]";
    replace = customer.policeStationName;
    str = replaceAll(str, find, replace);

    //  12 .	Name Change Upon Marriage/Gazette

    find = "[[oldName]]";
    replace = customer.oldName;
    str = replaceAll(str, find, replace);

    find = "[[newName]]";
    replace = customer.newname;
    str = replaceAll(str, find, replace);

    // 13.	Succession

    find = "[[deathHolderName1]]";
    replace = customer.deathHolderName1;
    str = replaceAll(str, find, replace);

    find = "[[deathHolderName2]]";
    replace = customer.deathHolderName2;
    str = replaceAll(str, find, replace);

    find = "[[deathHolderFirstCity]]";
    replace = customer.deathHolderFirstCity;
    str = replaceAll(str, find, replace);

    find = "[[deathHolderSecondCity]]";
    replace = customer.deathHolderSecondCity;
    str = replaceAll(str, find, replace);

    find = "[[deathOfAddress]]";
    replace = customer.deathOfAddress;
    str = replaceAll(str, find, replace);

    find = "[[certificateDeathHolderName1]]";
    replace = customer.certificateDeathHolderName1;
    str = replaceAll(str, find, replace);

    find = "[[certificateDeathHolderName2]]";
    replace = customer.certificateDeathHolderName2;
    str = replaceAll(str, find, replace);

    find = "[[legalNamePancard]]";
    replace = customer.legalNamePancard;
    str = replaceAll(str, find, replace);

    find = "[[successionCertificateNumberYear]]";
    replace = customer.successionCertificateNumberYear;
    str = replaceAll(str, find, replace);

    find = "[[successionCertificateCourtOrderDateAndYear]]";
    replace = customer.successionCertificateCourtOrderDateAndYear;
    str = replaceAll(str, find, replace);

    find = "[[deceasedHolderAsPerShareCertificate]]";
    replace = customer.deceasedHolderAsPerShareCertificate;
    str = replaceAll(str, find, replace);

    find = "[[deceasedHolderAsPerMunicipalityCertificate]]";
    replace = customer.deceasedHolderAsPerMunicipalityCertificate;
    str = replaceAll(str, find, replace);

    // 14.	Legal Heir Applicant

    find = "[[nameInPancardExectSpelling]]";
    replace = customer.nameInPancardExectSpelling;
    str = replaceAll(str, find, replace);

    find = "[[nameAsPerShareCertificate]]";
    replace = customer.nameAsPerShareCertificate;
    str = replaceAll(str, find, replace);

    find = "[[fatherOrHusbandName]]";
    replace = customer.fatherOrHusbandName;
    str = replaceAll(str, find, replace);

    find = "[[contactNumber]]";
    replace = customer.contactNumber;
    str = replaceAll(str, find, replace);

    find = "[[email]]";
    replace = customer.email;
    str = replaceAll(str, find, replace);

    find = "[[pancardNumber]]";
    replace = customer.pancardNumber;
    str = replaceAll(str, find, replace);

    find = "[[city]]";
    replace = customer.city;
    str = replaceAll(str, find, replace);

    find = "[[deathOfHolderFirstHolder]]";
    replace = moment(customer.deathOfHolderFirstHolder).format("DD-MM-YYYY");
    str = replaceAll(str, find, replace);

    find = "[[deathOfHolderSecondHolder]]";
    replace = moment(customer.deathOfHolderSecondHolder).format("DD-MM-YYYY");
    str = replaceAll(str, find, replace);

    find = "[[addressSameInAadharcard]]";
    replace = customer.addressSameInAadharcard;
    str = replaceAll(str, find, replace);

    find = "[[oldAddressCompanyRegister]]";
    replace = customer.oldAddressCompanyRegister;
    str = replaceAll(str, find, replace);

    find = "[[gender]]";
    replace = customer.gender;
    str = replaceAll(str, find, replace);

    find = "[[state]]";
    replace = customer.gender;
    str = replaceAll(str, find, replace);

    find = "[[age]]";
    replace = customer.age;
    str = replaceAll(str, find, replace);

    find = "[[aadharcardNumber]]";
    replace = customer.aadharcardNumber;
    str = replaceAll(str, find, replace);

    find = "[[nameInAdharcardExactSpeling]]";
    replace = customer.nameInAdharcardExactSpeling;
    str = replaceAll(str, find, replace);

    // 15.	LHA Bank Details Holder

    find = "[[lhabankName]]";
    replace = customer.lhabankName;
    str = replaceAll(str, find, replace);

    find = "[[lhabankAddress]]";
    replace = customer.lhabankAddress;
    str = replaceAll(str, find, replace);

    find = "[[lhaholderAddressInBank]]";
    replace = customer.lhaholderAddressInBank;
    str = replaceAll(str, find, replace);

    find = "[[lhaaccountTypeSavingorCurrent]]";
    replace = customer.lhaaccountTypeSavingorCurrent;
    str = replaceAll(str, find, replace);

    find = "[[lhaaccountNumber]]";
    replace = customer.lhaaccountNumber;
    str = replaceAll(str, find, replace);

    find = "[[lhabankTelephoneNumber]]";
    replace = customer.lhabankTelephoneNumber;
    str = replaceAll(str, find, replace);

    find = "[[lhabankIfscCode]]";
    replace = customer.lhabankIfscCode;
    str = replaceAll(str, find, replace);

    find = "[[lhanineDigitMICRNumber]]";
    replace = customer.lhanineDigitMICRNumber;
    str = replaceAll(str, find, replace);

    find = "[[lhanameAsPerBankAccount]]";
    replace = customer.lhanameAsPerBankAccount;
    str = replaceAll(str, find, replace);

    // 16.	LHA Demat Details

    find = "[[lhadpName]]";
    replace = customer.lhadpName;
    str = replaceAll(str, find, replace);

    find = "[[lhadematNumber]]";
    replace = customer.lhadematNumber;
    str = replaceAll(str, find, replace);

    find = "[[lhacdslOrNsdl]]";
    replace = customer.lhacdslOrNsdl;
    str = replaceAll(str, find, replace);

    find = "[[lhanameAsPerDematAccount]]";
    replace = customer.lhanameAsPerDematAccount;
    str = replaceAll(str, find, replace);

    // 17.	OTHER LEGAL HEAR (multiple)

    //  18.	IEPF

    find = "[[iepfDividendAmount]]";
    replace = customer.iepfDividendAmount;
    str = replaceAll(str, find, replace);

    find = "[[iepfDividendYear]]";
    replace = customer.iepfDividendYear;
    str = replaceAll(str, find, replace);

    find = "[[referenceLetterNo]]";
    replace = customer.referenceLetterNo;
    str = replaceAll(str, find, replace);

    find = "[[referenceLetterdate]]";
    replace = moment(customer.referenceLetterdate).format("DD-MM-YYYY");
    str = replaceAll(str, find, replace);

    find = "[[currentYear]]";
    replace = new Date().getFullYear();
    str = replaceAll(str, find, replace);

    //photo
    find = "[[affixPhoto]]";
    let htmlAffixPhoto = `<table border="1" cellpadding="1" cellspacing="1" style="height:100px; width:100px"> 	<tbody> 		<tr> 			<td style="text-align:center"><br /> 			Affix Photo<br /> 			&nbsp;</td> 		</tr> 	</tbody> </table>`;
    str = replaceAll(str, find, htmlAffixPhoto);

    find = "[[photo]]";
    let htmlPhoto = `<table border="1" cellpadding="1" cellspacing="1" style="height:100px; width:100px"> 	<tbody> 		<tr> 			<td style="text-align:center"><br /> 			Photo<br /> 			&nbsp;</td> 		</tr> 	</tbody> </table>  `;
    str = replaceAll(str, find, htmlPhoto);

    return str;
  }

  async createCustomerTemplate(
    userId: number,
    customerTemplateDataa: CreateCustomerTemplateInput[]
  ): Promise<CustomerTemplateWithCustomerTemplate> {
    const response: any = [];
    for (let i = 0; i < customerTemplateDataa.length; i++) {
      const customerTemplateData = customerTemplateDataa[i];

      const getCustomer = await this._customerRepository.getCustomer(
        customerTemplateData.customerId,
        userId
      );

      const getCustomerTemplates =
        await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(
          customerTemplateData.customerId,
          customerTemplateData.templateType,
          customerTemplateData.customerTemplateMasterId
        );
      if (customerTemplateData.isCustomMainContentTemplate) {
        if (customerTemplateData.id) {
          const d =
            await this._customerTemplateRepository.updateCustomerTemplate(
              customerTemplateData.id,
              {
                id: customerTemplateData.id,
                customerId: customerTemplateData.customerId,
                customerTemplateMasterId:
                  customerTemplateData.customerTemplateMasterId,
                isCustomMainContentTemplate:
                  customerTemplateData.isCustomMainContentTemplate,
                order: customerTemplateData.order,
                templateId: null,
                templateType: customerTemplateData.templateType,
                templateData: customerTemplateData.templateData,
                templateTitle: customerTemplateData.templateTitle,
              }
            );
          response.push(d);
        } else {
          const d =
            await this._customerTemplateRepository.createCustomerTemplate({
              id: customerTemplateData.id,
              customerId: customerTemplateData.customerId,
              customerTemplateMasterId:
                customerTemplateData.customerTemplateMasterId,
              isCustomMainContentTemplate:
                customerTemplateData.isCustomMainContentTemplate,
              order: getCustomerTemplates.length + 1,
              templateId: null,
              templateType: customerTemplateData.templateType,
              templateData: customerTemplateData.templateData,
              templateTitle: customerTemplateData.templateTitle,
            });
          response.push(d);
        }
      } else {
        const getTemplate = await this._templateRepository.getTemplateById(
          customerTemplateData.templateId!,
          userId
        );

        if (!getCustomer || !getTemplate) {
          throw new BadRequest("Please select valid customer or template.");
        }

        const replacedCustomerTemplateData = await this.replaceTemplateData(
          getCustomer,
          getTemplate
        );

        if (customerTemplateData.id) {
          const d =
            await this._customerTemplateRepository.updateCustomerTemplate(
              customerTemplateData.id,
              {
                id: customerTemplateData.id,
                customerId: customerTemplateData.customerId,
                customerTemplateMasterId:
                  customerTemplateData.customerTemplateMasterId,
                isCustomMainContentTemplate:
                  customerTemplateData.isCustomMainContentTemplate,
                order: customerTemplateData.order,
                templateId: customerTemplateData.templateId,
                templateType: customerTemplateData.templateType,
                templateData: replacedCustomerTemplateData,
                templateTitle: getTemplate.title,
              }
            );
          response.push(d);
        } else {
          const d =
            await this._customerTemplateRepository.createCustomerTemplate({
              ...customerTemplateData,
              order:
                customerTemplateData.templateType === "MAIN_CONTENT"
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
  async createWordFileCustomerTemplate(
    customerTemplateMasterId: number,
    customerId: number
  ): Promise<any> {
    try {
      const types = [
        "COMMON_CONTENT",
        "REFE_LINE",
        "SUBJECT",
        "MAIN_CONTENT",
        "SUMMARY",
        "AGREEMENT",
        "SUMMARY1",
      ];

      const getTemplateData: CustomerTemplate[] =
        await this._customerTemplateRepository.createWordFileCustomerTemplate(
          customerTemplateMasterId
        );

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
          d.templateData = d.templateData?.replace(
            "<p>",
            `<p style="margin-left:40px">${count}. `
          )!;
          body += d.templateData;
        }
      });
      body +=
        "<pre><span style='font-size:16px'><span style='font-family:Tahoma,Geneva,sans-serif'>Dear Sir / Madam,</span></span></pre><div style='margin-left:40px; text-align:justify;'>";
      //main content
      const MCData = getTemplateData.filter((d) => {
        return d.templateType === "MAIN_CONTENT";
      });
      let check = MCData.sort((a, b) => (a.order! > b.order! ? 1 : -1));
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
        if (d.templateType === "SUMMARY1") {
          scount = scount + 1;
          // body += scount + ". " + d.templateTitle;
          body += `<p style='margin-left:40px;'>${scount}. ${d.templateTitle}</p>`;
        }
      });
      body += "<br />";

      //summary
      const getCustomer = await this._customerRepository.getCustomer(
        customerId,
        1
      );
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
      // body += `<p style="page-break-before: always;">&nbsp;</p>`;

      let agreementData = getTemplateData.map((d) => {
        if (d.templateType === "AGREEMENT") {
          body += d.templateData;
        }
      });
      console.log("body", body);
      const converted = await htmlDocx.asBlob(body).arrayBuffer();
      let fileName:
        | string
        | null = `Forwarding-Letter_${customerTemplateMasterId}.docx`;
      let url: string | null = `${env.API_BASEURL}/doc/${fileName}`;
      let originalName: string | null = fileName;
      let status: string | null = "PENDING";

      const getCustomerTemplateMaster =
        await this._customerTemplateRepository.getCustomerTemplateMasterById(
          customerTemplateMasterId
        );

      if (getCustomerTemplateMaster === null) {
        throw new NotFound("Customer Template Not found.");
      }

      if (getCustomerTemplateMaster.url) {
        fileName = getCustomerTemplateMaster.storeDocName;
        url = `${env.API_BASEURL}/doc/${fileName}`;
        originalName = fileName;
        status = getCustomerTemplateMaster.status;
      }
      await this._customerTemplateRepository.updateCustomerTemplateMaster(
        getCustomerTemplateMaster.id,
        getCustomerTemplateMaster.userId,
        getCustomerTemplateMaster.customerId,
        getCustomerTemplateMaster.name,
        originalName,
        fileName,
        url,
        status
      );

      // const folderPath = join(__dirname, "/document");
      // await fs.mkdirSync(folderPath, { recursive: true });
      const docxFilePath = join("./src/public/", fileName!);
      console.log("docxFilePath", docxFilePath);
      const saveFile = await writeFileSync(
        docxFilePath,
        Buffer.from(converted)
      );
      return { filePath: docxFilePath, fileName };
    } catch (error) {
      console.log("error:-" + error);
      throw error;
    }
  }

  async getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string,
    userId: number,
    customerTemplateMasterId: number
  ): Promise<UpdateCustomerTemplate[]> {
    const getCustomerTemplates =
      await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(
        customerId,
        templateType,
        customerTemplateMasterId
      );
    const response: UpdateCustomerTemplate[] = [];

    for (let i = 0; i < getCustomerTemplates.length; i++) {
      const customerTemplateent = getCustomerTemplates[i];

      if (customerTemplateent.isCustomMainContentTemplate) {
        const updateCustomerTemplate =
          await this._customerTemplateRepository.updateCustomerTemplate(
            customerTemplateent.id,
            {
              id: customerTemplateent.id,
              customerId: customerTemplateent.customerId,
              customerTemplateMasterId:
                customerTemplateent.customerTemplateMasterId,
              isCustomMainContentTemplate:
                customerTemplateent.isCustomMainContentTemplate,
              order: customerTemplateent.order,
              templateId: customerTemplateent.templateId,
              templateType: customerTemplateent.templateType,
              templateData: customerTemplateent.templateData,
              templateTitle: customerTemplateent.templateTitle,
            }
          );

        response.push(updateCustomerTemplate);
      } else {
        const replacedCustomerTemplateData = await this.replaceTemplateData(
          customerTemplateent.Customer,
          customerTemplateent.Template!
        );

        const updateCustomerTemplate =
          await this._customerTemplateRepository.updateCustomerTemplate(
            customerTemplateent.id,
            {
              id: customerTemplateent.id,
              customerId: customerTemplateent.customerId,
              customerTemplateMasterId:
                customerTemplateent.customerTemplateMasterId,
              isCustomMainContentTemplate:
                customerTemplateent.isCustomMainContentTemplate,
              order: customerTemplateent.order,
              templateId: customerTemplateent.templateId,
              templateType: customerTemplateent.templateType,
              templateData: replacedCustomerTemplateData,
              templateTitle: customerTemplateent.templateTitle,
            }
          );

        response.push(updateCustomerTemplate);
      }
    }

    if (
      getCustomerTemplates.length === 0 &&
      (templateType === "COMMON_CONTENT" ||
        templateType === "REFE_LINE" ||
        templateType === "AGREEMENT")
    ) {
      const getCustomer = await this._customerRepository.getCustomer(
        customerId,
        userId
      );

      const getTemplate = await this._templateRepository.getTemplatesByType(
        templateType,
        userId
      );

      if (!getCustomer || !getTemplate) {
        throw new BadRequest("Please select valid customer or template.");
      }

      const replacedCustomerTemplateData = await this.replaceTemplateData(
        getCustomer,
        getTemplate[0]
      );

      const data =
        await this._customerTemplateRepository.createCustomerTemplate({
          id: null,
          customerId,
          customerTemplateMasterId,
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

  async getCustomerTemplateStatus(
    customerId: number,
    templateType: string,
    userId: number,
    customerTemplateMasterId: number
  ): Promise<{ isAvailable: boolean }> {
    const getCustomerTemplates =
      await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(
        customerId,
        templateType,
        customerTemplateMasterId
      );

    return { isAvailable: getCustomerTemplates.length > 0 };
  }

  async deleteCustomerTemplateById(id: number): Promise<any> {
    return await this._customerTemplateRepository.deleteCustomerTemplateById(
      id
    );
  }

  async getFiltterTemplate(
    customerId: number,
    templateType: string,
    userId: number,
    customerTemplateMasterId: number
  ): Promise<Template[]> {
    const all = await this._templateRepository.getTemplatesByType(
      templateType,
      userId
    );
    const selected =
      await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(
        customerId,
        templateType,
        customerTemplateMasterId
      );

    return await all.filter(
      ({ id: id1 }) => !selected.some(({ templateId: id2 }) => id2 === id1)
    );
  }

  async getCustomerTemplateById(id: number): Promise<UpdateCustomerTemplate> {
    const getData =
      await this._customerTemplateRepository.getCustomerTemplateById(id);
    if (!getData) {
      throw new NotFound("Customer Template Not Found");
    }

    return getData;
  }

  async createCustomerTemplateMaster(
    userId: number,
    customerId: number,
    name: string,
    originalName: string | null,
    storeDocName: string | null,
    url: string | null,
    status: string | null
  ): Promise<CustomerTemplateMaster> {
    console.log("status", status);
    const count = await this._customerTemplateRepository.getLetterCount(
      status === "COMPANY REPLY",
      customerId
    );
    console.log("count", count);
    const letterNo =
      status === "COMPANY REPLY"
        ? `Company Letter - ${count + 1}`
        : `Letter - ${count + 1}`;
    return await this._customerTemplateRepository.createCustomerTemplateMaster(
      userId,
      customerId,
      name,
      originalName,
      storeDocName,
      url,
      status,
      letterNo
    );
  }

  async getCustomerTemplateMasters(
    customerId: number
  ): Promise<CustomerTemplateMaster[]> {
    return await this._customerTemplateRepository.getCustomerTemplateMasters(
      customerId
    );
  }

  async deleteCustomerTemplateMasterById(
    id: number
  ): Promise<CustomerTemplateMaster> {
    const deletData =
      await this._customerTemplateRepository.deleteCustomerTemplateMasterById(
        id
      );

    if (deletData.storeDocName) {
      await unlinkSync(join("./src/public", deletData.storeDocName));
    }

    return deletData;
  }
}
