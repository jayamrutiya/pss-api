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
import fs, { readFileSync, unlinkSync, writeFileSync } from "fs";
import path, { join } from "path";
import { NotFound } from "../errors/NotFound";
import htmlToDocx from "html-to-docx";
import htmlDocx from "html-docx-js";
import env from "../config/env";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import DocxMerger from "docx-merger";
// var DocxMerger = require("docx-merger");

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
    // find = "[[olhnameInPancardExactSpelling]]";
    // let olhnamepan = "";
    // for (let index = 0; index < customer.otherLegalHears.length; index++) {
    //   const customerYWD = customer.otherLegalHears[index];
    //   olhnamepan += `${customerYWD.nameInPancardExactSpelling},`;
    // }
    // str = replaceAll(str, find, olhnamepan);

    // find = "[[olhnameInPancard1]]";
    // let olhnamepan1 = olhnamepan.split(",")[0];
    // str = replaceAll(str, find, olhnamepan1);

    // find = "[[olhnameInPancard2]]";
    // let olhnamepan2 = olhnamepan.split(",")[1];
    // str = replaceAll(str, find, olhnamepan2);

    // find = "[[olhnameInPancard3]]";
    // let olhnamepan3 = olhnamepan.split(",")[2];
    // str = replaceAll(str, find, olhnamepan3);

    // find = "[[olhnameInaadharcard]]";
    // let olhnameaadhar = "";
    // for (let index = 0; index < customer.otherLegalHears.length; index++) {
    //   const customerYWD = customer.otherLegalHears[index];
    //   olhnameaadhar += `${customerYWD.nameInAadharcardExactSpelling};`;
    // }
    // str = replaceAll(str, find, olhnameaadhar);

    // find = "[[olhnameInaadharcard1]]";
    // let olhnameInaadharcard1 = olhnameaadhar.split(";")[0];
    // str = replaceAll(str, find, olhnameInaadharcard1);

    // find = "[[olhnameInaadharcard2]]";
    // let olhnameInaadharcard2 = olhnameaadhar.split(";")[1];
    // str = replaceAll(str, find, olhnameInaadharcard2);

    // find = "[[olhnameInaadharcard3]]";
    // let olhnameInaadharcard3 = olhnameaadhar.split(";")[2];
    // str = replaceAll(str, find, olhnameInaadharcard3);

    // find = "[[olhaddressaddhar]]";
    // let olhaddaadhar = "";
    // for (let index = 0; index < customer.otherLegalHears.length; index++) {
    //   const customerYWD = customer.otherLegalHears[index];
    //   olhaddaadhar += `${customerYWD.addressSameInAadharcard};`;
    // }
    // str = replaceAll(str, find, olhaddaadhar);

    // find = "[[olhaddressaddhar1]]";
    // let olhaddressaddhar1 = olhaddaadhar.split(";")[0];
    // str = replaceAll(str, find, olhaddressaddhar1);

    // find = "[[olhaddressaddhar2]]";
    // let olhaddressaddhar2 = olhaddaadhar.split(";")[1];
    // str = replaceAll(str, find, olhaddressaddhar2);

    // find = "[[olhaddressaddhar3]]";
    // let olhaddressaddhar3 = olhaddaadhar.split(";")[2];
    // str = replaceAll(str, find, olhaddressaddhar3);

    // find = "[[olhage]]";
    // let olhage = "";
    // for (let index = 0; index < customer.otherLegalHears.length; index++) {
    //   const customerYWD = customer.otherLegalHears[index];
    //   olhage += `${customerYWD.age},`;
    // }
    // str = replaceAll(str, find, olhage);

    // find = "[[olhage1]]";
    // let olhage1 = olhage.split(",")[0];
    // str = replaceAll(str, find, olhage1);

    // find = "[[olhage2]]";
    // let olhage2 = olhage.split(",")[1];
    // str = replaceAll(str, find, olhage2);

    // find = "[[olhage3]]";
    // let olhage3 = olhage.split(",")[2];
    // str = replaceAll(str, find, olhage3);

    // find = "[[olhdaughterson]]";
    // let olhdaughterson = "";
    // for (let index = 0; index < customer.otherLegalHears.length; index++) {
    //   const customerYWD = customer.otherLegalHears[index];
    //   olhdaughterson += `${customerYWD.daughter ? customerYWD.daughter : customerYWD.son
    //     },`;
    // }
    // str = replaceAll(str, find, olhdaughterson);

    // find = "[[olhdaughterson1]]";
    // let olhdaughterson1 = olhdaughterson.split(",")[0];
    // str = replaceAll(str, find, olhdaughterson1);

    // find = "[[olhdaughterson2]]";
    // let olhdaughterson2 = olhdaughterson.split(",")[1];
    // str = replaceAll(str, find, olhdaughterson2);

    // find = "[[olhdaughterson3]]";
    // let olhdaughterson3 = olhdaughterson.split(",")[2];
    // str = replaceAll(str, find, olhdaughterson3);

    //error
    // try SDT

    // find = "[[distinctiveNumber]]";
    // let bd = "";
    // for (let index = 0; index < customer.tableSDT.length; index++) {
    //   const customerYWD = customer.tableSDT[index];
    //   bd += `${customerYWD.distinctiveNumber},`;
    // }
    // str = replaceAll(str, find, bd);

    // find = "[[shareCertificateNumber]]";
    // let bs = "";
    // for (let index = 0; index < customer.tableSDT.length; index++) {
    //   const customerYWD = customer.tableSDT[index];
    //   bs += `${customerYWD.shareCertificateNumber},`;
    // }
    // str = replaceAll(str, find, bs);

    // find = "[[totalShareQuantity]]";
    // let bt = "";
    // for (let index = 0; index < customer.tableSDT.length; index++) {
    //   const customerYWD = customer.tableSDT[index];
    //   bt += `${customerYWD.totalShareQuantity},`;
    // }

    // str = replaceAll(str, find, bt);
    //and error

    //noticeTable
    //   find = "[[noticeTable]]";

    //   const headn = `<style>
    //     div.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }

    //     p.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }
    //   </style>
    //   <table
    //   class="MsoTableGrid"
    //   border="1"
    //   cellspacing="0"
    //   cellpadding="0"
    //   width="624"
    //   style="
    //     width: 467.75pt;
    //     margin-left: -0.25pt;
    //     border-collapse: collapse;
    //     border: none;
    //   "
    // >

    //   <thead>
    //      <tr style="height: 26.95pt">
    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Certificate Number</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Distinctive Number(s)</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="168"
    //         valign="top"
    //         style="
    //           width: 125.75pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Shares held in each Certificate</span
    //           >
    //         </p>
    //       </td>
    //     </tr>
    //   </thead>
    //   <tbody>`;
    //   const footn = `</tbody>
    //   </table>`;
    //   let bodyn = "";
    //   bodyn += "";
    //   for (let index = 0; index < customer.tableSDT.length; index++) {
    //     const customerYWD = customer.tableSDT[index];
    //     bodyn += `<tr>
    // 		<td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio}</span>
    //         </p>
    //       </td>

    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber}</span>
    //         </p>
    //       </td>

    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber}</span>
    //         </p>
    //       </td>

    //       <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       "
    //       >
    //         <p class="MsoNoSpacing">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >${customerYWD.totalShareQuantity} of Rs.${customer.faceValueAsOnToday}/-FV</span
    //           >
    //         </p>
    //       </td>

    // 	</tr>`;
    //   }
    //   const datan = headn + bodyn + footn;
    //   str = replaceAll(str, find, datan);

    //folioCertiDistShareInCerti
    //     find = "[[folioCertiDistShareInCerti]]";
    //     const headf = `<style>
    // div.MsoNoSpacing {
    //   mso-style-link: "No Spacing Char";
    //   margin: 0in;
    //   font-size: 11pt;
    //   font-family: "Calibri", sans-serif;
    // }

    // p.MsoNoSpacing {
    //   mso-style-link: "No Spacing Char";
    //   margin: 0in;
    //   font-size: 11pt;
    //   font-family: "Calibri", sans-serif;
    // }
    // </style>
    // <table
    // class="MsoTableGrid"
    // border="1"
    // cellspacing="0"
    // cellpadding="0"
    // width="624"
    // style="
    // width: 467.75pt;
    // margin-left: -0.25pt;
    // border-collapse: collapse;
    // border: none;
    // "
    // >

    // <thead>
    // <tr style="height: 26.95pt">
    // <td
    //   width="144"
    //   valign="top"
    //   style="
    //     width: 1.5in;
    //     border: solid windowtext 1pt;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //     height: 26.95pt;
    //   "
    // >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //   </p>
    // </td>
    // <td
    //   width="156"
    //   valign="top"
    //   style="
    //     width: 117pt;
    //     border: solid windowtext 1pt;
    //     border-left: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //     height: 26.95pt;
    //   "
    // >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif"
    //       >Certificate Nos.</span
    //     >
    //   </p>
    // </td>
    // <td
    //   width="156"
    //   valign="top"
    //   style="
    //     width: 117pt;
    //     border: solid windowtext 1pt;
    //     border-left: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //     height: 26.95pt;
    //   "
    // >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif"
    //       >Distinctive Nos.</span
    //     >
    //   </p>
    // </td>
    // <td
    //   width="168"
    //   valign="top"
    //   style="
    //     width: 125.75pt;
    //     border: solid windowtext 1pt;
    //     border-left: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //     height: 26.95pt;
    //   "
    // >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif"
    //       >Shares held in each Certificate</span
    //     >
    //   </p>
    // </td>
    // </tr>
    //     </thead>
    //     <tbody>`;
    //     const footf = `</tbody>
    //     </table>`;
    //     let bodyf = "";
    //     bodyf += "";
    //     for (let index = 0; index < customer.tableSDT.length; index++) {
    //       const customerYWD = customer.tableSDT[index];
    //       bodyf += `<tr>
    //       <td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">
    //             <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio}</span>
    //           </p>
    //         </td>

    //         <td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">
    //             <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber}</span>
    //           </p>
    //         </td>

    //         <td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">
    //             <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber}</span>
    //           </p>
    //         </td>

    //         <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //         >
    //           <p class="MsoNoSpacing">
    //             <span style="font-family: 'Tahoma', sans-serif"
    //               >${customerYWD.totalShareQuantity}</span
    //             >
    //           </p>
    //         </td>

    //     </tr>`;
    //     }
    //     const dataf = headf + bodyf + footf;
    //     str = replaceAll(str, find, dataf);

    //folioShareCertiDist
    //   find = "[[folioShareCertiDist]]";
    //   const hf = `<style>
    //   div.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }

    //   p.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }
    // </style>
    // <table
    // class="MsoTableGrid"
    // border="1"
    // cellspacing="0"
    // cellpadding="0"
    // width="624"
    // style="
    //   width: 467.75pt;
    //   margin-left: -0.25pt;
    //   border-collapse: collapse;
    //   border: none;
    // "
    // >

    // <thead>
    //    <tr style="height: 26.95pt">
    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >
    //          No. of Shares</td>
    //          <td
    //          width="156"
    //          valign="top"
    //          style="
    //            width: 117pt;
    //            border: solid windowtext 1pt;
    //            border-left: none;
    //            padding: 0in 5.4pt 0in 5.4pt;
    //            height: 26.95pt;
    //          "
    //        >
    //          <p class="MsoNoSpacing" align="center" style="text-align: center">
    //            <span style="font-family: 'Tahoma', sans-serif"
    //              >Certificate Numbers</span
    //            >
    //          </p>
    //        </td>
    //        <td
    //        width="156"
    //        valign="top"
    //        style="
    //          width: 117pt;
    //          border: solid windowtext 1pt;
    //          border-left: none;
    //          padding: 0in 5.4pt 0in 5.4pt;
    //          height: 26.95pt;
    //        "
    //      >
    //        <p class="MsoNoSpacing" align="center" style="text-align: center">
    //          <span style="font-family: 'Tahoma', sans-serif"
    //            >Distinctive No. (From)</span
    //          >
    //        </p>
    //      </td>
    //      <td
    //        width="168"
    //        valign="top"
    //        style="
    //          width: 125.75pt;
    //          border: solid windowtext 1pt;
    //          border-left: none;
    //          padding: 0in 5.4pt 0in 5.4pt;
    //          height: 26.95pt;
    //        "
    //      >
    //        <p class="MsoNoSpacing" align="center" style="text-align: center">
    //          <span style="font-family: 'Tahoma', sans-serif"
    //            >Distinctive No. (To)</span
    //          >
    //        </p>
    //      </td>
    //         </tr>
    //       </thead>
    //       <tbody>`;
    //   const ff = `</tbody>
    //     </table>`;
    //   let bf = "";
    //   bf += "";
    //   for (let index = 0; index < customer.tableSDT.length; index++) {
    //     const customerYWD = customer.tableSDT[index];
    //     bf += `<tr>
    //     <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio
    //       }</span>
    //         </p>
    //       </td>

    //       <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       "
    //       >
    //         <p class="MsoNoSpacing">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >${customerYWD.totalShareQuantity}</span
    //           >
    //         </p>
    //       </td>
    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber
    //       }</span>
    //     </p>
    //   </td>

    //   <td
    //   width="144"
    //   valign="top"
    //   style="
    //     width: 1.5in;
    //     border: solid windowtext 1pt;
    //     border-top: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //   "
    //   >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber?.split("-")[0]
    //       }</span>
    //   </p>
    //   </td>
    //   <td
    //   width="144"
    //   valign="top"
    //   style="
    //     width: 1.5in;
    //     border: solid windowtext 1pt;
    //     border-top: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //   "
    //   >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif">
    //       ${customerYWD.distinctiveNumber?.split("-")[1]
    //         ? customerYWD.distinctiveNumber?.split("-")[1]
    //         : customerYWD.distinctiveNumber?.split("-")[0]
    //       }</span>
    //   </p>
    //   </td>

    //   </tr>`;
    //   }
    //   const df = hf + bf + ff;
    //   str = replaceAll(str, find, df);
    //folioShareCertiDistNos
    //   find = "[[folioShareCertiDistNos]]";
    //   const h1f = `<style>
    //   div.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }

    //   p.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }
    // </style>
    // <table
    // class="MsoTableGrid"
    // border="1"
    // cellspacing="0"
    // cellpadding="0"
    // width="624"
    // style="
    //   width: 467.75pt;
    //   margin-left: -0.25pt;
    //   border-collapse: collapse;
    //   border: none;
    // "
    // >

    // <thead>
    //    <tr style="height: 26.95pt">
    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >
    //          No of Shares</td>
    //          <td
    //          width="156"
    //          valign="top"
    //          style="
    //            width: 117pt;
    //            border: solid windowtext 1pt;
    //            border-left: none;
    //            padding: 0in 5.4pt 0in 5.4pt;
    //            height: 26.95pt;
    //          "
    //        >
    //          <p class="MsoNoSpacing" align="center" style="text-align: center">
    //            <span style="font-family: 'Tahoma', sans-serif"
    //              >Certificate No.</span
    //            >
    //          </p>
    //        </td>
    //        <td
    //        width="156"
    //        valign="top"
    //        style="
    //          width: 117pt;
    //          border: solid windowtext 1pt;
    //          border-left: none;
    //          padding: 0in 5.4pt 0in 5.4pt;
    //          height: 26.95pt;
    //        "
    //      >
    //        <p class="MsoNoSpacing" align="center" style="text-align: center">
    //          <span style="font-family: 'Tahoma', sans-serif"
    //            >Distinctive Nos. (from)</span
    //          >
    //        </p>
    //      </td>
    //      <td
    //        width="168"
    //        valign="top"
    //        style="
    //          width: 125.75pt;
    //          border: solid windowtext 1pt;
    //          border-left: none;
    //          padding: 0in 5.4pt 0in 5.4pt;
    //          height: 26.95pt;
    //        "
    //      >
    //        <p class="MsoNoSpacing" align="center" style="text-align: center">
    //          <span style="font-family: 'Tahoma', sans-serif"
    //            >Distinctive Nos. (To)</span
    //          >
    //        </p>
    //      </td>
    //         </tr>
    //       </thead>
    //       <tbody>`;
    //   const f1f = `</tbody>
    //     </table>`;
    //   let b1f = "";
    //   b1f += "";
    //   for (let index = 0; index < customer.tableSDT.length; index++) {
    //     const customerYWD = customer.tableSDT[index];
    //     b1f += `<tr>
    //     <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio
    //       }</span>
    //         </p>
    //       </td>

    //       <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       "
    //       >
    //         <p class="MsoNoSpacing">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >${customerYWD.totalShareQuantity}</span
    //           >
    //         </p>
    //       </td>
    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber
    //       }</span>
    //     </p>
    //   </td>

    //   <td
    //   width="144"
    //   valign="top"
    //   style="
    //     width: 1.5in;
    //     border: solid windowtext 1pt;
    //     border-top: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //   "
    //   >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber?.split("-")[0]
    //       }</span>
    //   </p>
    //   </td>
    //   <td
    //   width="144"
    //   valign="top"
    //   style="
    //     width: 1.5in;
    //     border: solid windowtext 1pt;
    //     border-top: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //   "
    //   >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif">
    //       ${customerYWD.distinctiveNumber?.split("-")[1]
    //         ? customerYWD.distinctiveNumber?.split("-")[1]
    //         : customerYWD.distinctiveNumber?.split("-")[0]
    //       }</span>
    //   </p>
    //   </td>

    //   </tr>`;
    //   }
    //   const d1f = h1f + b1f + f1f;
    //   str = replaceAll(str, find, d1f);

    //folioCertiDistSharesNameShareHolder
    //   find = "[[folioCertiDistSharesNameShareHolder]]";
    //   const hof = `<style>
    //   div.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }

    //   p.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }
    // </style>
    // <table
    // class="MsoTableGrid"
    // border="1"
    // cellspacing="0"
    // cellpadding="0"
    // width="624"
    // style="
    //   width: 467.75pt;
    //   margin-left: -0.25pt;
    //   border-collapse: collapse;
    //   border: none;
    // "
    // >

    // <thead>
    //    <tr style="height: 26.95pt">
    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Certificate No.</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Distinctive Nos.</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //       width="168"
    //       valign="top"
    //       style="
    //         width: 125.75pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >No of Shares</span
    //         >
    //       </p>

    //       <td
    //       width="168"
    //       valign="top"
    //       style="
    //         width: 125.75pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Name of the Shareholder/s</span
    //         >
    //       </p>
    //     </td>

    //   </tr>
    // </thead>
    // <tbody>`;
    //   const fof = `</tbody>
    //     </table>`;
    //   let bof = "";
    //   bof += "";
    //   for (let index = 0; index < customer.tableSDT.length; index++) {
    //     const customerYWD = customer.tableSDT[index];
    //     bof += `<tr>
    //     <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio
    //       }</span>
    //         </p>
    //       </td>

    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber
    //       }</span>
    //         </p>
    //       </td>

    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber
    //       }</span>
    //         </p>
    //       </td>

    //       <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       "
    //       >
    //         <p class="MsoNoSpacing">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >${customerYWD.totalShareQuantity}</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       "
    //       >
    //         <p class="MsoNoSpacing">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >${customer.deathHolderName1} (deceased) jointly ${customer.deathHolderName2
    //         ? customer.deathHolderName2 + "(deceased)"
    //         : ""
    //       }</span
    //           >
    //         </p>
    //       </td>
    //   </tr>`;
    //   }
    //   const dof = hof + bof + fof;
    //   str = replaceAll(str, find, dof);

    //folioSecuCertiNoDisti
    //   find = "[[folioSecuCertiNoDisti]]";
    //   const hdf = `<style>
    //   div.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }

    //   p.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }
    // </style>
    // <table
    // class="MsoTableGrid"
    // border="1"
    // cellspacing="0"
    // cellpadding="0"
    // width="624"
    // style="
    //   width: 467.75pt;
    //   margin-left: -0.25pt;
    //   border-collapse: collapse;
    //   border: none;
    // "
    // >

    // <thead>
    //    <tr style="height: 26.95pt"><td></td>
    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">FOLIO NO.</span>
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >No. of securities</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Security Certificate No.</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //       width="168"
    //       valign="top"
    //       style="
    //         width: 125.75pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //        colspan=2
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Distinctive Nos.<br /> From-To</span
    //         >
    //       </p>
    //     </td>

    //   </tr>
    // </thead>
    // <tbody>`;
    //   const fdf = `</tbody>
    //     </table>`;
    //   let bdf = "";
    //   bdf += "";
    //   for (let index = 0; index < customer.tableSDT.length; index++) {
    //     const customerYWD = customer.tableSDT[index];
    //     bdf += `<tr>
    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">${index + 1})</span>
    //     </p>
    //   </td>
    //   <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio
    //       }</span>
    //       </p>
    //     </td>

    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       "
    //     ><p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style-*+="font-family: 'Tahoma', sans-serif">${customerYWD.totalShareQuantity
    //       }</span>
    //   </p>
    // </td>

    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     ">
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber
    //       }</span>
    //     </p>
    //     </td>

    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //     ><p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber?.split("-")[0]
    //       }</span>
    //     </p>
    //     </td>

    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //     >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">
    //         ${customerYWD.distinctiveNumber?.split("-")[1]
    //         ? customerYWD.distinctiveNumber?.split("-")[1]
    //         : customerYWD.distinctiveNumber?.split("-")[0]
    //       }</span>
    //     </p>
    //     </td>

    //   </tr>`;
    //   }
    //   const dff = hdf + bdf + fdf;
    //   str = replaceAll(str, find, dff);

    //nameComCertiDistFolioSerHeld
    //   find = "[[nameComCertiDistFolioSerHeld]]";
    //   const hedf = `<style>
    //   div.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }

    //   p.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }
    // </style>
    // <table
    // class="MsoTableGrid"
    // border="1"
    // cellspacing="0"
    // cellpadding="0"
    // width="624"
    // style="
    //   width: 467.75pt;
    //   margin-left: -0.25pt;
    //   border-collapse: collapse;
    //   border: none;
    // "
    // >

    // <thead>
    //    <tr style="height: 26.95pt">
    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.55in;
    //         border: solid windowtext 1pt;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">Name of the Company</span>
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width:70pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Certificate No.</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 70pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Distinctive No.</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //       width="168"
    //       valign="top"
    //       style="
    //         width: 50.75pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "

    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Folio No.</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //     width="168"
    //     valign="top"
    //     style="
    //       width: 125.75pt;
    //       border: solid windowtext 1pt;
    //       border-left: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //       height: 26.95pt;
    //     "

    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif"
    //         >
    //       No. and Face value of securities held
    //       </span>
    //     </p>
    //   </td>

    //   </tr>
    // </thead>
    // <tbody>`;
    //   const fedf = `</tbody>
    //     </table>`;
    //   let bedf = "";
    //   bedf += "";
    //   for (let index = 0; index < customer.tableSDT.length; index++) {
    //     const customerYWD = customer.tableSDT[index];
    //     bedf += `<tr>
    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">${customer.companyName}</span>
    //     </p>
    //   </td>
    //   <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber}</span>
    //       </p>
    //     </td>

    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //     >
    //       <p class="MsoNoSpacing">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >${customerYWD.distinctiveNumber}</span>
    //       </p>
    //     </td>
    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">${customerYWD.ledgerFolio}</span>
    //       </p>
    //     </td>
    //     <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //     ><p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">${customerYWD.totalShareQuantity} OF F.V
    //         RS.${customer.faceValueAsOnToday}/-</span>
    //     </p>
    //     </td>
    //   </tr>`;
    //   }
    //   const daaf = hedf + bedf + fedf;
    //   str = replaceAll(str, find, daaf);

    //folioCertiDistFDistTNoShare
    //     find = "[[folioCertiDistFDistTNoShare]]";
    //     const heedf = `<style>
    //     div.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }

    //     p.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }
    //   </style>
    //   <table
    //   class="MsoTableGrid"
    //   border="1"
    //   cellspacing="0"
    //   cellpadding="0"
    //   width="624"
    //   style="
    //     width: 467.75pt;
    //     margin-left: -0.25pt;
    //     border-collapse: collapse;
    //     border: none;
    //   "
    // >

    //   <thead>
    //      <tr style="height: 26.95pt">
    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Certificate No.</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Distinctive No. From</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="168"
    //         valign="top"
    //         style="
    //           width: 125.75pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "

    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Distinctive No. To</span
    //           >
    //         </p>
    //       </td>

    //       <td
    //       width="168"
    //       valign="top"
    //       style="
    //         width: 125.75pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "

    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >No. of shares held</span
    //         >
    //       </p>
    //     </td>

    //     </tr>
    //   </thead>
    //   <tbody>`;
    //     const feedf = `</tbody>
    //       </table>`;
    //     let beedf = "";
    //     beedf += "";
    //     for (let index = 0; index < customer.tableSDT.length; index++) {
    //       const customerYWD = customer.tableSDT[index];
    //       beedf += `<tr>

    // 			<td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">
    //             <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio
    //         }</span>
    //           </p>
    //         </td>

    //         <td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">
    //             <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber
    //         }</span>
    //           </p>
    //         </td>

    //         <td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">

    // <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber?.split("-")[0]
    //         }</span>
    //           </p>
    //         </td>

    //         <td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">

    // <span style="font-family: 'Tahoma', sans-serif">
    //   ${customerYWD.distinctiveNumber?.split("-")[1]
    //           ? customerYWD.distinctiveNumber?.split("-")[1]
    //           : customerYWD.distinctiveNumber?.split("-")[0]
    //         }</span>
    //           </p>
    //         </td>
    //         <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">

    // <span style="font-family: 'Tahoma', sans-serif">
    //   ${customerYWD.totalShareQuantity} of Rs.${customer.faceValueAsOnToday}/-
    // </span>
    //         </p>
    //       </td>

    // 		</tr>`;
    //     }
    //     const ddata = heedf + beedf + feedf;
    //     str = replaceAll(str, find, ddata);

    //nameComFolioNoSecperClaim
    //   find = "[[nameComFolioNoSecperClaim]]";
    //   const hdata = `<style>
    //   div.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }

    //   p.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }
    // </style>
    // <table
    // class="MsoTableGrid"
    // border="1"
    // cellspacing="0"
    // cellpadding="0"
    // width="624"
    // style="
    //   width: 467.75pt;
    //   margin-left: -0.25pt;
    //   border-collapse: collapse;
    //   border: none;
    // "
    // >

    // <thead>
    //    <tr style="height: 26.95pt">
    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">Name of the Company</span>
    //       </p>
    //     </td>
    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >No. of Securities</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >% of Claim</span
    //         >
    //       </p>
    //     </td>
    //   </tr>
    // </thead>
    // <tbody>`;
    //   const fdata = `</tbody>
    //     </table>`;
    //   let bdata = "";
    //   bdata += "";
    //   for (let index = 0; index < customer.tableSDT.length; index++) {
    //     const customerYWD = customer.tableSDT[index];
    //     bdata += `
    //     <tr>

    //       <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         border-top: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //       ">
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">${customer.companyName}</span>
    //       </p>
    //     </td>
    //             <td
    //               width="144"
    //               valign="top"
    //               style="
    //                 width: 1.5in;
    //                 border: solid windowtext 1pt;
    //                 border-top: none;
    //                 padding: 0in 5.4pt 0in 5.4pt;
    //               ">
    //               <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                 <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio}</span>
    //               </p>
    //             </td>

    //             <td
    //               width="144"
    //               valign="top"
    //               style="
    //                 width: 1.5in;
    //                 border: solid windowtext 1pt;
    //                 border-top: none;
    //                 padding: 0in 5.4pt 0in 5.4pt;">
    //               <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                 <span style="font-family: 'Tahoma', sans-serif">${customerData.totalShares} of Rs.${customer.faceValueAsOnToday}/-</span>
    //               </p>
    //             </td>

    //             <td
    //               width="144"
    //               valign="top"
    //               style="
    //                 width: 1.5in;
    //                 border: solid windowtext 1pt;
    //                 border-top: none;
    //                 padding: 0in 5.4pt 0in 5.4pt;
    //               "
    //             >
    //               <p class="MsoNoSpacing" align="center" style="text-align: center">
    //               <span style="font-family: 'Tahoma', sans-serif">100 %</span>
    //               </p>
    //             </td>

    //         </tr>`;
    //   }
    //   const dataa = hdata + bdata + fdata;
    //   str = replaceAll(str, find, dataa);

    //nameComFolioCertDistNEDistShares
    //     find = "[[nameComFolioCertDistNEDistShares]]";
    //     const headdata = `<style>
    //     div.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }

    //     p.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }
    //   </style>
    //   <table
    //   class="MsoTableGrid"
    //   border="1"
    //   cellspacing="0"
    //   cellpadding="0"
    //   width="624"
    //   style="
    //     width: 467.75pt;
    //     margin-left: -0.25pt;
    //     border-collapse: collapse;
    //     border: none;
    //   "
    // >

    //   <thead>
    //      <tr style="height: 26.95pt">
    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Cert. No.</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Start Dist. No.</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="168"
    //         valign="top"
    //         style="
    //           width: 125.75pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "

    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >End Dist. No.</span
    //           >
    //         </p>
    //       </td>

    //       <td
    //       width="168"
    //       valign="top"
    //       style="
    //         width: 125.75pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "

    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Shares</span
    //         >
    //       </p>
    //     </td>

    //     </tr>
    //   </thead>
    //   <tbody>`;
    //     const footerdata = `</tbody>
    //       </table>`;
    //     let bodydata = "";
    //     bodydata += "";
    //     for (let index = 0; index < customer.tableSDT.length; index++) {
    //       const customerYWD = customer.tableSDT[index];
    //       bodydata += `<tr>
    //       <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                   <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio
    //         }</span>
    //                 </p>
    //               </td>

    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                   <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber
    //         } of Rs.${customer.faceValueAsOnToday}/-</span>
    //                 </p>
    //               </td>

    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">

    //       <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber?.split("-")[0]
    //         }</span>
    //                 </p>
    //               </td>

    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">

    //       <span style="font-family: 'Tahoma', sans-serif">
    //         ${customerYWD.distinctiveNumber?.split("-")[1]
    //           ? customerYWD.distinctiveNumber?.split("-")[1]
    //           : customerYWD.distinctiveNumber?.split("-")[0]
    //         }
    //       </span>
    //                 </p>
    //               </td>
    //               <td
    //               width="144"
    //               valign="top"
    //               style="
    //                 width: 1.5in;
    //                 border: solid windowtext 1pt;
    //                 border-top: none;
    //                 padding: 0in 5.4pt 0in 5.4pt;
    //               "
    //             >
    //               <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                 <span style="font-family: 'Tahoma', sans-serif">${customerYWD.totalShareQuantity
    //         }</span>
    //               </p>
    //             </td>

    //           </tr>`;
    //     }
    //     const dataData = headdata + bodydata + footerdata;
    //     str = replaceAll(str, find, dataData);

    //folioShareCertiDistFT
    //     find = "[[folioShareCertiDistFT]]";
    //     const hdft = `<style>
    //     div.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }

    //     p.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }
    //   </style>
    //   <table
    //   class="MsoTableGrid"
    //   border="1"
    //   cellspacing="0"
    //   cellpadding="0"
    //   width="624"
    //   style="
    //     width: 467.75pt;
    //     margin-left: -0.25pt;
    //     border-collapse: collapse;
    //     border: none;
    //   "
    // >

    //   <thead>
    //      <tr style="height: 26.95pt">
    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">Folio No.</span>
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Certificate. No.</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Distinctive No. From</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="168"
    //         valign="top"
    //         style="
    //           width: 125.75pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "

    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Distinctive No. To</span
    //           >
    //         </p>
    //       </td>

    //       <td
    //       width="168"
    //       valign="top"
    //       style="
    //         width: 125.75pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "

    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >No. of shares held</span
    //         >
    //       </p>
    //     </td>

    //     </tr>
    //   </thead>
    //   <tbody>`;
    //     const fdft = `</tbody>
    //           </table>`;
    //     let bdft = "";
    //     bdft += "";
    //     for (let index = 0; index < customer.tableSDT.length; index++) {
    //       const customerYWD = customer.tableSDT[index];
    //       bdft += `<tr>
    //       <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                   <span style="font-family: 'Tahoma', sans-serif">${customer.ledgerFolio
    //         }</span>
    //                 </p>
    //               </td>

    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                   <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber
    //         } of Rs.${customer.faceValueAsOnToday}/-</span>
    //                 </p>
    //               </td>

    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">

    //       <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber?.split("-")[0]
    //         }</span>
    //                 </p>
    //               </td>

    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">

    //       <span style="font-family: 'Tahoma', sans-serif">
    //         ${customerYWD.distinctiveNumber?.split("-")[1]
    //           ? customerYWD.distinctiveNumber?.split("-")[1]
    //           : customerYWD.distinctiveNumber?.split("-")[0]
    //         }
    //       </span>
    //                 </p>
    //               </td>
    //               <td
    //               width="144"
    //               valign="top"
    //               style="
    //                 width: 1.5in;
    //                 border: solid windowtext 1pt;
    //                 border-top: none;
    //                 padding: 0in 5.4pt 0in 5.4pt;
    //               "
    //             >
    //               <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                 <span style="font-family: 'Tahoma', sans-serif">${customerYWD.totalShareQuantity
    //         } of Rs.${customer.faceValueAsOnToday}/-</span>
    //               </p>
    //             </td>

    //           </tr>`;
    //     }
    //     const d1data = hdft + bdft + fdft;
    //     str = replaceAll(str, find, d1data);

    // certiDistNoSecurity
    //     find = "[[certiDistNoSecurity]]";
    //     const h1 = `<style>
    //     div.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }

    //     p.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }
    //   </style>
    //   <table
    //   class="MsoTableGrid"
    //   border="1"
    //   cellspacing="0"
    //   cellpadding="0"
    //   width="624"
    //   style="
    //     width: 467.75pt;
    //     margin-left: -0.25pt;
    //     border-collapse: collapse;
    //     border: none;
    //   "
    // >

    //   <thead>
    //      <tr style="height: 26.95pt">
    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">CERTIFICATE NO.</span>
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >DISTINCTIVE NOS.</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >NO. OF SECURITIES</span
    //           >
    //         </p>
    //       </td>
    //     </tr>
    //   </thead>
    //   <tbody>`;
    //     const f1 = `</tbody>
    //  </table>`;
    //     let b1 = "";
    //     for (let index = 0; index < customer.tableSDT.length; index++) {
    //       const customerYWD = customer.tableSDT[index];
    //       b1 += `
    //       <tr>
    //       <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                   <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber}</span>
    //                 </p>
    //               </td>

    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                   <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber}</span>
    //                 </p>
    //               </td>

    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">

    //       <span style="font-family: 'Tahoma', sans-serif">${customerYWD.totalShareQuantity}</span>
    //                 </p>
    //               </td>
    //     </tr>
    //     `;
    //     }
    //     const datacdn = h1 + b1 + f1;
    //     str = replaceAll(str, find, datacdn);

    //tables nameFolioShareFVCertiDistNo:-
    //     find = "[[nameFolioShareFVCertiDistNo]]";
    //     const hname = `<style>
    //     div.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }

    //     p.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }
    //   </style>
    //   <table
    //   class="MsoTableGrid"
    //   border="1"
    //   cellspacing="0"
    //   cellpadding="0"
    //   width="624"
    //   style="
    //     width: 467.75pt;
    //     margin-left: -0.25pt;
    //     border-collapse: collapse;
    //     border: none;
    //   "
    // >

    //   <thead>
    //      <tr style="height: 26.95pt">
    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">NAME</span>
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >FOLIO NUMBER</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >SHARES</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >FV</span
    //         >
    //       </p>
    //     </td>       <td
    //     width="156"
    //     valign="top"
    //     style="
    //       width: 117pt;
    //       border: solid windowtext 1pt;
    //       border-left: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //       height: 26.95pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif"
    //         >CERTIFICATE NO</span
    //       >
    //     </p>
    //   </td>       <td
    //   width="156"
    //   valign="top"
    //   style="
    //     width: 117pt;
    //     border: solid windowtext 1pt;
    //     border-left: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //     height: 26.95pt;
    //   "
    // >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif"
    //       >DISTINCTIVE NO</span
    //     >
    //   </p>
    // </td>
    //     </tr>
    //   </thead>
    //   <tbody>`;
    //     const fname = `</tbody>
    //     </table>`;
    //     let bname = "";
    //     for (let index = 0; index < customer.tableSDT.length; index++) {
    //       const customerYWD = customer.tableSDT[index];
    //       bname += `<tr>
    //       <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                   <span style="font-family: 'Tahoma', sans-serif">
    //                     ${customer.deathHolderName1} (Deceased) Jointly ${customer.deathHolderName2}
    //                   </span>
    //                 </p>
    //               </td>
    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">

    //       <span style="font-family: 'Tahoma', sans-serif">
    //         ${customer.ledgerFolio}
    //       </span>
    //                 </p>
    //               </td>
    //               <td
    //                 width="144"
    //                 valign="top"
    //                 style="
    //                   width: 1.5in;
    //                   border: solid windowtext 1pt;
    //                   border-top: none;
    //                   padding: 0in 5.4pt 0in 5.4pt;
    //                 "
    //               >
    //                 <p class="MsoNoSpacing" align="center" style="text-align: center">

    //       <span style="font-family: 'Tahoma', sans-serif">${customerYWD.totalShareQuantity}</span>
    //                 </p>
    //               </td>

    //             <td
    //             width="144"
    //             valign="top"
    //             style="
    //               width: 1.5in;
    //               border: solid windowtext 1pt;
    //               border-top: none;
    //               padding: 0in 5.4pt 0in 5.4pt;
    //             "
    //           >
    //             <p class="MsoNoSpacing" align="center" style="text-align: center">
    //               <span style="font-family: 'Tahoma', sans-serif">${customer.faceValueAsOnToday}</span>
    //             </p>
    //           </td>

    //           <td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">
    //             <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber}</span>
    //           </p>
    //         </td>

    //             <td
    //             width="144"
    //             valign="top"
    //             style="
    //               width: 1.5in;
    //               border: solid windowtext 1pt;
    //               border-top: none;
    //               padding: 0in 5.4pt 0in 5.4pt;
    //             "
    //           >
    //             <p class="MsoNoSpacing" align="center" style="text-align: center">
    //               <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber}</span>
    //             </p>
    //           </td>
    //           </tr>`;
    //     }
    //     const dname = hname + bname + fname;
    //     str = replaceAll(str, find, dname);

    //tables ywdATable:-
    //     find = "[[ywdATable]]";
    //     const header = `<style>
    //     div.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }

    //     p.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }
    //   </style>
    //   <table
    //   class="MsoTableGrid"
    //   border="1"
    //   cellspacing="0"
    //   cellpadding="0"
    //   width="624"
    //   style="
    //     width: 467.75pt;
    //     margin-left: -0.25pt;
    //     border-collapse: collapse;
    //     border: none;
    //   "
    // >

    //   <thead>
    //      <tr style="height: 26.95pt">
    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">Year</span>
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Warrant No.</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >DD/MICR No.</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Amount</span
    //         >
    //       </p>
    //     </td>
    //     </tr>
    //   </thead>
    //   <tbody>`;
    //     const footer = `</tbody>
    //     </table>`;
    //     let body = "";
    //     for (let index = 0; index < customer.ywdATabelData.length; index++) {
    //       const customerYWD = customer.ywdATabelData[index];
    //       body += `
    //       <tr>
    //   <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">
    //         ${customerYWD.year}
    //       </span>
    //     </p>
    //   </td>
    //   <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">
    //         ${customerYWD.warrantNo}
    //       </span>
    //     </p>
    //   </td>
    //   <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">
    //         ${customerYWD.ddMicrNo}
    //       </span>
    //     </p>
    //   </td>

    //   <td
    //     width="144"
    //     valign="top"
    //     style="
    //       width: 1.5in;
    //       border: solid windowtext 1pt;
    //       border-top: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif">
    //         ${customerYWD.amount}
    //       </span>
    //     </p>
    //   </td>

    // </tr>

    //     `;
    //     }
    //     const data = header + body + footer;
    //     str = replaceAll(str, find, data);

    //tables tableSDT:-
    //   find = "[[tableSDT]]";
    //   const h = `<style>
    //   div.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }

    //   p.MsoNoSpacing {
    //     mso-style-link: "No Spacing Char";
    //     margin: 0in;
    //     font-size: 11pt;
    //     font-family: "Calibri", sans-serif;
    //   }
    // </style>
    // <table
    // class="MsoTableGrid"
    // border="1"
    // cellspacing="0"
    // cellpadding="0"
    // width="624"
    // style="
    //   width: 467.75pt;
    //   margin-left: -0.25pt;
    //   border-collapse: collapse;
    //   border: none;
    // "
    // >

    // <thead>
    //    <tr style="height: 26.95pt">
    //     <td
    //       width="144"
    //       valign="top"
    //       style="
    //         width: 1.5in;
    //         border: solid windowtext 1pt;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif">Share Certificate Number</span>
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Distinctive Number</span
    //         >
    //       </p>
    //     </td>
    //     <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Total Share Quantity</span
    //         >
    //       </p>
    //     </td>
    //   </tr>
    // </thead>
    // <tbody>`;
    //   const f = `</tbody>
    //   </table>`;
    //   let b = "";
    //   for (let index = 0; index < customer.tableSDT.length; index++) {
    //     const customerYWD = customer.tableSDT[index];
    //     b += `<tr>
    //     <td
    //               width="144"
    //               valign="top"
    //               style="
    //                 width: 1.5in;
    //                 border: solid windowtext 1pt;
    //                 border-top: none;
    //                 padding: 0in 5.4pt 0in 5.4pt;
    //               "
    //             >
    //               <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                 <span style="font-family: 'Tahoma', sans-serif">${customerYWD.shareCertificateNumber}</span>
    //               </p>
    //             </td>

    //             <td
    //               width="144"
    //               valign="top"
    //               style="
    //                 width: 1.5in;
    //                 border: solid windowtext 1pt;
    //                 border-top: none;
    //                 padding: 0in 5.4pt 0in 5.4pt;
    //               "
    //             >
    //               <p class="MsoNoSpacing" align="center" style="text-align: center">
    //                 <span style="font-family: 'Tahoma', sans-serif">${customerYWD.distinctiveNumber}</span>
    //               </p>
    //             </td>

    //             <td
    //               width="144"
    //               valign="top"
    //               style="
    //                 width: 1.5in;
    //                 border: solid windowtext 1pt;
    //                 border-top: none;
    //                 padding: 0in 5.4pt 0in 5.4pt;
    //               "
    //             >
    //               <p class="MsoNoSpacing" align="center" style="text-align: center">

    //     <span style="font-family: 'Tahoma', sans-serif">${customerYWD.totalShareQuantity}</span>
    //               </p>
    //             </td>
    //   </tr>`;
    //   }
    //   const dataSDT = h + b + f;
    //   str = replaceAll(str, find, dataSDT);

    //table otherLegalHears :-
    //     find = "[[otherLegalHears]]";
    //     const head = `<style>
    //     div.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }

    //     p.MsoNoSpacing {
    //       mso-style-link: "No Spacing Char";
    //       margin: 0in;
    //       font-size: 11pt;
    //       font-family: "Calibri", sans-serif;
    //     }
    //   </style>
    //   <table
    //   class="MsoTableGrid"
    //   border="1"
    //   cellspacing="0"
    //   cellpadding="0"
    //   width="624"
    //   style="
    //     width: 467.75pt;
    //     margin-left: -0.25pt;
    //     border-collapse: collapse;
    //     border: none;
    //   "
    //   >

    //   <thead>
    //      <tr style="height: 26.95pt">
    //       <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif">
    //             Name In Pancard Exact Spelling</span>
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Address Same In AadharCard</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //         width="156"
    //         valign="top"
    //         style="
    //           width: 117pt;
    //           border: solid windowtext 1pt;
    //           border-left: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //           height: 26.95pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">
    //           <span style="font-family: 'Tahoma', sans-serif"
    //             >Name In Aadhar Card Exect Spelling</span
    //           >
    //         </p>
    //       </td>
    //       <td
    //       width="156"
    //       valign="top"
    //       style="
    //         width: 117pt;
    //         border: solid windowtext 1pt;
    //         border-left: none;
    //         padding: 0in 5.4pt 0in 5.4pt;
    //         height: 26.95pt;
    //       "
    //     >
    //       <p class="MsoNoSpacing" align="center" style="text-align: center">
    //         <span style="font-family: 'Tahoma', sans-serif"
    //           >Age</span
    //         >
    //       </p>
    //     </td>  <td
    //     width="156"
    //     valign="top"
    //     style="
    //       width: 117pt;
    //       border: solid windowtext 1pt;
    //       border-left: none;
    //       padding: 0in 5.4pt 0in 5.4pt;
    //       height: 26.95pt;
    //     "
    //   >
    //     <p class="MsoNoSpacing" align="center" style="text-align: center">
    //       <span style="font-family: 'Tahoma', sans-serif"
    //         >Daughter</span
    //       >
    //     </p>
    //   </td>  <td
    //   width="156"
    //   valign="top"
    //   style="
    //     width: 117pt;
    //     border: solid windowtext 1pt;
    //     border-left: none;
    //     padding: 0in 5.4pt 0in 5.4pt;
    //     height: 26.95pt;
    //   "
    //   >
    //   <p class="MsoNoSpacing" align="center" style="text-align: center">
    //     <span style="font-family: 'Tahoma', sans-serif"
    //       >Son</span
    //     >
    //   </p>
    //   </td>
    //     </tr>
    //   </thead>
    //   <tbody>`;
    //     const foot = `</tbody>
    //     </table>`;
    //     let bod = "";
    //     for (let index = 0; index < customer.otherLegalHears.length; index++) {
    //       const customerYWD = customer.otherLegalHears[index];
    //       bod += `
    //       <tr>
    //   <td
    //             width="144"
    //             valign="top"
    //             style="
    //               width: 1.5in;
    //               border: solid windowtext 1pt;
    //               border-top: none;
    //               padding: 0in 5.4pt 0in 5.4pt;
    //             "
    //           >
    //             <p class="MsoNoSpacing" align="center" style="text-align: center">
    //               <span style="font-family: 'Tahoma', sans-serif">${customerYWD.nameInPancardExactSpelling}</span>
    //             </p>
    //           </td>

    //           <td
    //             width="144"
    //             valign="top"
    //             style="
    //               width: 1.5in;
    //               border: solid windowtext 1pt;
    //               border-top: none;
    //               padding: 0in 5.4pt 0in 5.4pt;
    //             "
    //           >
    //             <p class="MsoNoSpacing" align="center" style="text-align: center">
    //               <span style="font-family: 'Tahoma', sans-serif">${customerYWD.addressSameInAadharcard}</span>
    //             </p>
    //           </td>

    //           <td
    //             width="144"
    //             valign="top"
    //             style="
    //               width: 1.5in;
    //               border: solid windowtext 1pt;
    //               border-top: none;
    //               padding: 0in 5.4pt 0in 5.4pt;
    //             "
    //           >
    //             <p class="MsoNoSpacing" align="center" style="text-align: center">

    //   <span style="font-family: 'Tahoma', sans-serif">${customerYWD.nameInAadharcardExactSpelling}</span>
    //             </p>
    //           </td>

    //           <td
    //             width="144"
    //             valign="top"
    //             style="
    //               width: 1.5in;
    //               border: solid windowtext 1pt;
    //               border-top: none;
    //               padding: 0in 5.4pt 0in 5.4pt;
    //             "
    //           >
    //             <p class="MsoNoSpacing" align="center" style="text-align: center">

    //   <span style="font-family: 'Tahoma', sans-serif">${customerYWD.age}</span>
    //             </p>
    //           </td> <td
    //           width="144"
    //           valign="top"
    //           style="
    //             width: 1.5in;
    //             border: solid windowtext 1pt;
    //             border-top: none;
    //             padding: 0in 5.4pt 0in 5.4pt;
    //           "
    //         >
    //           <p class="MsoNoSpacing" align="center" style="text-align: center">

    // <span style="font-family: 'Tahoma', sans-serif">${customerYWD.daughter}</span>
    //           </p>
    //         </td> <td
    //         width="144"
    //         valign="top"
    //         style="
    //           width: 1.5in;
    //           border: solid windowtext 1pt;
    //           border-top: none;
    //           padding: 0in 5.4pt 0in 5.4pt;
    //         "
    //       >
    //         <p class="MsoNoSpacing" align="center" style="text-align: center">

    // <span style="font-family: 'Tahoma', sans-serif">${customerYWD.son}</span>
    //         </p>
    //       </td>

    // </tr>
    //     `;
    //     }
    //     const dataOtherLegalHears = head + bod + foot;
    //     str = replaceAll(str, find, dataOtherLegalHears);

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

    //MICRECSCode
    let fhnineDigitMICRNumberSplit = customer.fhnineDigitMICRNumber!.split("");
    find = "[[MICRECSCode]]";
    const mhf = `
<style>
  <!--
   /* Font Definitions */
   @font-face
    {font-family:Mangal;
    panose-1:2 4 5 3 5 2 3 3 2 2;}
  @font-face
    {font-family:"Cambria Math";
    panose-1:2 4 5 3 5 4 6 3 2 4;}
  @font-face
    {font-family:Calibri;
    panose-1:2 15 5 2 2 2 4 3 2 4;}
  @font-face
    {font-family:Tahoma;
    panose-1:2 11 6 4 3 5 4 4 2 4;}
  @font-face
    {font-family:"Lucida Sans Unicode";
    panose-1:2 11 6 2 3 5 4 2 2 4;}
   /* Style Definitions */
   p.MsoNormal, li.MsoNormal, div.MsoNormal
    {margin:0in;
    font-size:12.0pt;
    font-family:"Times New Roman",serif;}
  a:link, span.MsoHyperlink
    {color:#0563C1;
    text-decoration:underline;}
  p.MsoNoSpacing, li.MsoNoSpacing, div.MsoNoSpacing
    {margin:0in;
    font-size:11.0pt;
    font-family:"Calibri",sans-serif;}
   /* Page Definitions */
   @page WordSection1
    {size:8.5in 11.0in;
    margin:1.0in 58.5pt 1.0in 1.25in;}
  div.WordSection1
    {page:WordSection1;}
   /* List Definitions */
   ol
    {margin-bottom:0in;}
  ul
    {margin-bottom:0in;}
  -->
  </style>
<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0
 style='margin-left:.9pt;border-collapse:collapse;border:none'>
 <tr>
 `;
    const mff = `</tr>
  </table>`;
    let mbf = "";
    mbf += "";
    for (let index = 0; index < fhnineDigitMICRNumberSplit.length; index++) {
      const customerYWD = fhnineDigitMICRNumberSplit[index];

      mbf += `
 
<td width=69 valign=top style='width:52.05pt;border:solid windowtext 1.0pt;
padding:0in 5.4pt 0in 5.4pt'>
<p class=MsoNormal style='margin-top:3.0pt;margin-right:0in;margin-bottom:
3.0pt;margin-left:0in;text-align:justify'><b><span style='font-size:10.0pt;
font-family:"Arial",sans-serif'>${customerYWD}</span></b></p>
</td>
`;
    }
    const mdf = mhf + mbf + mff;
    str = replaceAll(str, find, mdf);

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

        // const replacedCustomerTemplateData = await this.replaceTemplateData(
        //   getCustomer,
        //   getTemplate
        // );

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
                templateData: customerTemplateData.templateData,
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
              templateData: getTemplate.details,
            });
          response.push(d);
        }
      }
    }

    return response;
  }
  async createWordFileCustomerTemplate(
    customerTemplateMasterId: number,
    customerId: number,
    userId: number
  ): Promise<any> {
    try {
      // const types = [
      //   "COMMON_CONTENT",
      //   "REFE_LINE",
      //   "SUBJECT",
      //   "MAIN_CONTENT",
      //   "SUMMARY",
      //   "AGREEMENT",
      //   "SUMMARY1",
      // ];

      // const getTemplateData: CustomerTemplate[] =
      //   await this._customerTemplateRepository.createWordFileCustomerTemplate(
      //     customerTemplateMasterId
      //   );

      // let body = "";

      // let CCData = getTemplateData.map(async (d) => {
      //   if (d.templateType === "COMMON_CONTENT") {
      //     body += d.templateData;
      //   }
      // });

      // // body += "<br />";

      // let RLData = getTemplateData.map(async (d) => {
      //   if (d.templateType === "REFE_LINE") {
      //     body += d.templateData;
      //   }
      // });
      // body += `
      // <p><strong>Subject</strong>:</p>`;
      // // subject
      // let count = 0;
      // let SData = getTemplateData.map(async (d) => {
      //   if (d.templateType === "SUBJECT") {
      //     count = count + 1;
      //     d.templateData = d.templateData?.replace(
      //       "<p>",
      //       `<p style="margin-left:40px">${count}. `
      //     )!;
      //     body += d.templateData;
      //   }
      // });
      // body +=
      //   "<pre><span style='font-size:16px'><span style='font-family:Tahoma,Geneva,sans-serif'>Dear Sir / Madam,</span></span></pre><div style='margin-left:40px; text-align:justify;'>";
      // //main content
      // const MCData = getTemplateData.filter((d) => {
      //   return d.templateType === "MAIN_CONTENT";
      // });
      // let check = MCData.sort((a, b) => (a.order! > b.order! ? 1 : -1));
      // check.map((d) => {
      //   // d.templateData = d.templateData?.replace("<p>", `<p style="margin-bottom: 0;">`)!;
      //   body += d.templateData;
      //   // body += "<br />";
      // });
      // body += "</div>";
      // body +=
      //   "<p>I am enclosing the following documents towards proof of my identification and address.</p><br />";
      // // body += "<div style='page-break-after:always'></div>";

      // //summary
      // let scount = 0;
      // // body += "<div style='margin-left:40px;'>"
      // let SUTitleData = getTemplateData.map((d) => {
      //   if (d.templateType === "SUMMARY1") {
      //     scount = scount + 1;
      //     // body += scount + ". " + d.templateTitle;
      //     body += `<p style='margin-left:40px;'>${scount}. ${d.templateTitle}</p>`;
      //   }
      // });
      // body += "<br />";

      // //summary
      // const getCustomer = await this._customerRepository.getCustomer(
      //   customerId,
      //   1
      // );
      // body +=
      //   "<p>Yours faithfully,</p><p>_______________________</p><p>" +
      //   getCustomer?.fhnameInPancardExactSpelling +
      //   "</p>";
      // // body += `<p style="page-break-before: always;">&nbsp;</p>`;
      // let count1 = 0;
      // let SUData = getTemplateData.map((d) => {
      //   if (d.templateType === "SUMMARY") {
      //     count1 += 1;
      //     body += `<p style="page-break-before: always;">&nbsp;</p>`;
      //     body += d.templateData;
      //   }
      // });

      // let agreementData = getTemplateData.map((d) => {
      //   if (d.templateType === "AGREEMENT") {
      //     body += d.templateData;
      //   }
      // });
      // console.log("body", body);
      // const converted = await htmlDocx.asBlob(body).arrayBuffer();
      // let fileName:
      //   | string
      //   | null = `Forwarding-Letter_${customerTemplateMasterId}.docx`;
      // let url: string | null = `${env.API_BASEURL}/doc/${fileName}`;
      // let originalName: string | null = fileName;
      // let status: string | null = "PENDING";

      // const getCustomerTemplateMaster =
      //   await this._customerTemplateRepository.getCustomerTemplateMasterById(
      //     customerTemplateMasterId
      //   );

      // if (getCustomerTemplateMaster === null) {
      //   throw new NotFound("Customer Template Not found.");
      // }

      // if (getCustomerTemplateMaster.url) {
      //   fileName = getCustomerTemplateMaster.storeDocName;
      //   url = `${env.API_BASEURL}/doc/${fileName}`;
      //   originalName = fileName;
      //   status = getCustomerTemplateMaster.status;
      // }
      // await this._customerTemplateRepository.updateCustomerTemplateMaster(
      //   getCustomerTemplateMaster.id,
      //   getCustomerTemplateMaster.userId,
      //   getCustomerTemplateMaster.customerId,
      //   getCustomerTemplateMaster.name,
      //   originalName,
      //   fileName,
      //   url,
      //   status
      // );

      // // const folderPath = join(__dirname, "/document");
      // // await fs.mkdirSync(folderPath, { recursive: true });
      // const docxFilePath = join("./src/public/", fileName!);
      // console.log("docxFilePath", docxFilePath);
      // const saveFile = await writeFileSync(
      //   docxFilePath,
      //   Buffer.from(converted)
      // );

      let finalFileName:
        | string
        | null = `Forwarding-Letter_${customerTemplateMasterId}.docx`;
      let url: string | null = `${env.API_BASEURL}/doc/${finalFileName}`;
      let originalName: string | null = finalFileName;
      let status: string | null = "PENDING";
      const commonMainSummary1: any = [];
      const finalAllFiles: any = [];

      const getTemplateDataa: CustomerTemplate[] =
        await this._customerTemplateRepository.createWordFileCustomerTemplate(
          customerTemplateMasterId
        );
      // console.log("getTemplateDataa", getTemplateDataa);

      const getCustomer = await this._customerRepository.getCustomer(
        customerId,
        userId
      );

      let isReffLineAvailable = false;

      const mainContents: any = [];
      const summaries: any = [];
      const subjects: any = [];
      const summary1: any = [];

      for (let i = 0; i < getTemplateDataa.length; i++) {
        const template = getTemplateDataa[i];
        if (template.templateType === "MAIN_CONTENT") {
          mainContents.push(template);
        } else if (template.templateType === "SUMMARY") {
          summaries.push(template);
        } else if (template.templateType === "REFE_LINE") {
          isReffLineAvailable = true;
        } else if (template.templateType === "SUBJECT") {
          subjects.push({
            title: `${subjects.length + 1}. ${template.templateTitle}`,
          });
        } else if (template.templateType === "SUMMARY1") {
          summary1.push({
            title: `${summary1.length + 1}. ${template.templateTitle}`,
          });
        }
      }

      // COMMON CONTENT
      const createDynamicWordFile = await this.createDynamicWord(
        getCustomer,
        "COMMON_CONTENT.docx",
        customerTemplateMasterId,
        "COMMON_CONTENT",
        isReffLineAvailable,
        subjects
      );
      commonMainSummary1.push(createDynamicWordFile);
      // const commonContentFileStream = createDynamicWordFile;

      // main content
      const mainContentFiles: any = [];
      for (let j = 0; j < mainContents.length; j++) {
        const mainContent = mainContents[j];
        const createDynamicWordFile = await this.createDynamicWord(
          getCustomer,
          mainContent.Template.storeDocName,
          mainContent.customerTemplateMasterId,
          mainContent.templateType
        );

        mainContentFiles.push(createDynamicWordFile);
      }
      if (mainContentFiles.length > 0) {
        const mainContentFile = `${Date.now()}_${customerTemplateMasterId}_MAIN_CONTENT_merge.docx`;
        const docx = new DocxMerger({ pageBreak: false }, mainContentFiles);
        await docx.save("nodebuffer", async function (data) {
          // fs.writeFile("output.zip", data, function(err){/*...*/});
          await writeFileSync(join(__dirname, mainContentFile), data);
          console.log("merged MAIN_CONTENT");
        });
        const fileRead = await readFileSync(join(__dirname, mainContentFile));
        // finalAllFiles.push(fileRead);
        commonMainSummary1.push(fileRead);
        await unlinkSync(join(__dirname, mainContentFile));
      }

      // summary1
      const createDynamicWordFileSummary1 = await this.createDynamicWord(
        getCustomer,
        "SUMMARY_1.docx",
        customerTemplateMasterId,
        "SUMMARY1",
        isReffLineAvailable,
        subjects,
        summary1
      );
      commonMainSummary1.push(createDynamicWordFileSummary1);

      // merge COMMON CONTENT + main content + summary1
      if (commonMainSummary1.length > 0) {
        const CMS1File = `${Date.now()}_${customerTemplateMasterId}_CMS1_merge.docx`;
        const CMS1docx = new DocxMerger(
          { pageBreak: false },
          commonMainSummary1
        );
        await CMS1docx.save("nodebuffer", async function (data) {
          // fs.writeFile("output.zip", data, function(err){/*...*/});
          await writeFileSync(join(__dirname, CMS1File), data);
          console.log("merged COMMON CONTENT + main content + summary1");
        });
        const fileRead = await readFileSync(join(__dirname, CMS1File));
        finalAllFiles.push(fileRead);
        await unlinkSync(join(__dirname, CMS1File));
      }

      // summary
      const summaryFiles: any = [];
      for (let j = 0; j < summaries.length; j++) {
        const summary = summaries[j];
        const createDynamicWordFile = await this.createDynamicWord(
          getCustomer,
          summary.Template.storeDocName,
          summary.customerTemplateMasterId,
          summary.templateType
        );

        summaryFiles.push(createDynamicWordFile);
      }
      if (summaryFiles.length > 0) {
        const summaryFile = `${Date.now()}_${customerTemplateMasterId}_SUMMARY_merge.docx`;
        const summarydocx = new DocxMerger({ pageBreak: true }, summaryFiles);
        await summarydocx.save("nodebuffer", async function (data) {
          // fs.writeFile("output.zip", data, function(err){/*...*/});
          await writeFileSync(join(__dirname, summaryFile), data);
          console.log("merged SUMMARY");
        });
        const fileRead = await readFileSync(join(__dirname, summaryFile));
        finalAllFiles.push(fileRead);
        await unlinkSync(join(__dirname, summaryFile));
      }
      console.log("end");

      // db updates
      const getCustomerTemplateMaster =
        await this._customerTemplateRepository.getCustomerTemplateMasterById(
          customerTemplateMasterId
        );
      if (getCustomerTemplateMaster === null) {
        throw new NotFound("Customer Template Not found.");
      }
      if (getCustomerTemplateMaster.url) {
        finalFileName = getCustomerTemplateMaster.storeDocName;
        url = `${env.API_BASEURL}/doc/${finalFileName}`;
        originalName = finalFileName;
        status = getCustomerTemplateMaster.status;
      }
      await this._customerTemplateRepository.updateCustomerTemplateMaster(
        getCustomerTemplateMaster.id,
        getCustomerTemplateMaster.userId,
        getCustomerTemplateMaster.customerId,
        getCustomerTemplateMaster.name,
        originalName,
        finalFileName,
        url,
        status
      );

      // all file merge
      // TODO: merge COMMON CONTENT + main content + SUMMARY_1 + SUMMARY (final file)
      const docxFilePath = join("./src/public/", finalFileName!);
      const summarydocx = new DocxMerger({ pageBreak: true }, finalAllFiles);
      await summarydocx.save("nodebuffer", async function (data) {
        // fs.writeFile("output.zip", data, function(err){/*...*/});
        await writeFileSync(docxFilePath, data);
        console.log("merged All Files");
      });

      return { filePath: docxFilePath, fileName: finalFileName };
    } catch (error) {
      console.log("error:-" + error);
      throw error;
    }
  }

  async createDynamicWord(
    customerData,
    docName,
    customerTemplateMasterId,
    templateType,
    hasReffLine = false,
    subjects = [],
    summary1 = []
  ) {
    const content = await readFileSync(
      join("./src/public/Template", docName),
      "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: false,
      linebreaks: true,
    });

    const customer = {
      ...customerData,
      tableSDT: JSON.parse(customerData.tableSDT!),
      ywdATabelData: JSON.parse(customerData.ywdATabelData!),
      otherLegalHears: JSON.parse(customerData.otherLegalHears!),
    };

    //noticeTable
    let noticeTable: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log("noticeTable data customerYWD:- ", customerYWD);
      noticeTable.push({
        folioNo: customer.ledgerFolio,
        cNo: customerYWD.shareCertificateNumber,
        dNo: customerYWD.distinctiveNumber,
        shieCertificate:
          customerYWD.totalShareQuantity +
          " of Rs." +
          customer.faceValueAsOnToday +
          "/-FV",
      });
    }
    //folioCertiDistShareInCerti/fCDSIC
    let fCDSIC: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log(
        "folioCertiDistShareInCerti data customerYWD:- ",
        customerYWD
      );
      fCDSIC.push({
        folioNo: customer.ledgerFolio,
        certificateNo: customerYWD.shareCertificateNumber,
        distinctiveNo: customerYWD.distinctiveNumber,
        Shares: customerYWD.totalShareQuantity,
      });
    }
    //folioShareCertiDist//fSCD
    let fSCD: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log("folioShareCertiDist data customerYWD:- ", customerYWD);
      fSCD.push({
        folioNumber: customer.ledgerFolio,
        no_ofShares: customerYWD.totalShareQuantity,
        certificateNumbers: customerYWD.shareCertificateNumber,
        distinctiveNo_f: customerYWD.distinctiveNumber?.split("-")[0],
        distinctiveNo_t: customerYWD.distinctiveNumber?.split("-")[1]
          ? customerYWD.distinctiveNumber?.split("-")[1]
          : customerYWD.distinctiveNumber?.split("-")[0],
      });
    }

    // folioCertiDistSharesNameShareHolder/fCDSNSH
    let fCDSNSH: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log(
        "folioCertiDistSharesNameShareHolder data customerYWD:- ",
        customerYWD
      );
      fCDSNSH.push({
        folioNo: customer.ledgerFolio,
        certificateNo: customerYWD.shareCertificateNumber,
        distinctiveNos: customerYWD.distinctiveNumber,
        noofShares: customerYWD.totalShareQuantity,
        shareholder:
          customer.deathHolderName1 +
          " (deceased) jointly" +
          customer.deathHolderName2
            ? customer.deathHolderName2 + "(deceased)"
            : "",
      });
    }
    //ywdATable
    let ywdATable: any = [];
    for (let index = 0; index < customer.ywdATabelData.length; index++) {
      const customerYWD = customer.ywdATabelData[index];
      console.log("ywdATable data customerYWD:- ", customerYWD);
      ywdATable.push({
        year: customerYWD.year,
        wNo: customerYWD.warrantNo,
        ddMNo: customerYWD.ddMicrNo,
        amount: customerYWD.amount,
      });
    }
    //folioSecuCertiNoDisti/fSCND
    let fSCND: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log("folioSecuCertiNoDisti data customerYWD:- ", customerYWD);
      fSCND.push({
        no: index + 1 + ")",
        FOLIONO: customer.ledgerFolio,
        noofsecurities: customerYWD.totalShareQuantity,
        securityCertificateNo: customerYWD.shareCertificateNumber,
        distinctiveNosFrom: customerYWD.distinctiveNumber?.split("-")[0],
        distinctiveNosTo: customerYWD.distinctiveNumber?.split("-")[1]
          ? customerYWD.distinctiveNumber?.split("-")[1]
          : customerYWD.distinctiveNumber?.split("-")[0],
      });
    }
    //nameComCertiDistFolioSerHeld/nCCDFSH
    let nCCDFSH: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log(
        "nameComCertiDistFolioSerHeld data customerYWD:- ",
        customerYWD
      );
      nCCDFSH.push({
        company: customer.companyName,
        cNo: customerYWD.shareCertificateNumber,
        dNo: customerYWD.distinctiveNumber,
        fNo: customerYWD.ledgerFolio,
        nofsh:
          customerYWD.totalShareQuantity +
          " OF F.V RS." +
          customer.faceValueAsOnToday +
          "/-",
      });
    }
    // folioCertiDistFDistTNoShare/fCDFDNS
    let fCDFDNS: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log(
        "folioCertiDistFDistTNoShare data customerYWD:- ",
        customerYWD
      );
      fCDFDNS.push({
        fNo: customer.ledgerFolio,
        cNo: customerYWD.shareCertificateNumber,
        dNF: customerYWD.distinctiveNumber?.split("-")[0],
        dNT: customerYWD.distinctiveNumber?.split("-")[1]
          ? customerYWD.distinctiveNumber?.split("-")[1]
          : customerYWD.distinctiveNumber?.split("-")[0],
        nSH:
          customerYWD.totalShareQuantity +
          " of Rs." +
          customer.faceValueAsOnToday +
          "/-",
      });
    }

    // folioShareCertiDistNos/fSCDN
    let fSCDN: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log("folioShareCertiDistNos data customerYWD:- ", customerYWD);
      fSCDN.push({
        folioNumber: customer.ledgerFolio,
        noofShares: customerYWD.totalShareQuantity,
        certificateNo: customerYWD.shareCertificateNumber,
        distinctiveNos_f: customerYWD.distinctiveNumber?.split("-")[0],
        distinctiveNos_t: customerYWD.distinctiveNumber?.split("-")[1]
          ? customerYWD.distinctiveNumber?.split("-")[1]
          : customerYWD.distinctiveNumber?.split("-")[0],
      });
    }
    // nameComFolioNoSecperClaim/nCFNSPC
    let nCFNSPC: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log("nameComFolioNoSecperClaim data customerYWD:- ", customerYWD);
      nCFNSPC.push({
        nameC: customer.companyName,
        fNo: customer.ledgerFolio,
        noS:
          customer.totalShares + " of Rs." + customer.faceValueAsOnToday + "/-",
        per: "100 %",
      });
    }
    //nameComFolioCertDistNEDistShares//nCFCDNEDS
    let nCFCDNEDS: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log(
        "nameComFolioCertDistNEDistShares data customerYWD:- ",
        customerYWD
      );
      nCFCDNEDS.push({
        folioNo: customer.ledgerFolio,
        certNo:
          customerYWD.shareCertificateNumber +
          " of Rs." +
          customer.faceValueAsOnToday +
          "/-",
        startDistNo: customerYWD.distinctiveNumber?.split("-")[0],
        endDistNo: customerYWD.distinctiveNumber?.split("-")[1]
          ? customerYWD.distinctiveNumber?.split("-")[1]
          : customerYWD.distinctiveNumber?.split("-")[0],
        Shares: customerYWD.totalShareQuantity,
      });
    }
    // certiDistNoSecurity
    let certiDistNoSecurity: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log("certiDistNoSecurity data customerYWD:- ", customerYWD);
      certiDistNoSecurity.push({
        certiNo: customerYWD.shareCertificateNumber,
        dNos: customerYWD.distinctiveNumber,
        noS: customerYWD.totalShareQuantity,
      });
    }

    // folioShareCertiDistFT/fSCDFT
    let fSCDFT: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log("folioShareCertiDistFT data customerYWD:- ", customerYWD);
      fSCDFT.push({
        fOLIONO: customer.ledgerFolio,
        SHARES: customerYWD.totalShareQuantity,
        cNo:
          customerYWD.shareCertificateNumber +
          " of Rs." +
          customer.faceValueAsOnToday +
          "/-",
        dNof: customerYWD.distinctiveNumber?.split("-")[0],
        dNot: customerYWD.distinctiveNumber?.split("-")[1]
          ? customerYWD.distinctiveNumber?.split("-")[1]
          : customerYWD.distinctiveNumber?.split("-")[0],
      });
    }

    // nameFolioShareFVCertiDistNo/nfSFCDN
    let nfSFCDN: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log(
        "nameFolioShareFVCertiDistNo data customerYWD:- ",
        customerYWD
      );
      nfSFCDN.push({
        name:
          customer.deathHolderName1 +
          "  (Deceased) Jointly" +
          customer.deathHolderName2,
        fNo: customer.ledgerFolio,
        shares: customerYWD.totalShareQuantity,
        fv: customer.faceValueAsOnToday,
        cNo: customerYWD.shareCertificateNumber,
        dNo: customerYWD.distinctiveNumber,
      });
    }

    //table otherLegalHears :-
    let olhnamepan = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhnamepan += `${customerYWD.nameInPancardExactSpelling},`;
    }

    let olhnameaadhar = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhnameaadhar += `${customerYWD.nameInAadharcardExactSpelling};`;
    }

    let olhaddaadhar = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhaddaadhar += `${customerYWD.addressSameInAadharcard};`;
    }

    let olhage = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhage += `${customerYWD.age},`;
    }

    let olhdaughterson = "";
    for (let index = 0; index < customer.otherLegalHears.length; index++) {
      const customerYWD = customer.otherLegalHears[index];
      olhdaughterson += `${
        customerYWD.daughter ? customerYWD.daughter : customerYWD.son
      },`;
    }

    //table sdt
    let tableSDT: any = [];
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      console.log("sdt data customerYWD:- ", customerYWD);
      tableSDT.push({
        shareCertificateNumber: customerYWD.shareCertificateNumber,
        distinctiveNumber: customerYWD.distinctiveNumber,
        totalShareQuantity: customerYWD.totalShareQuantity,
      });
    }

    //SDT
    let dN = "";
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      dN += `${customerYWD.distinctiveNumber},`;
    }

    let sCN = "";
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      sCN += `${customerYWD.shareCertificateNumber},`;
    }

    let tSQ = "";
    for (let index = 0; index < customer.tableSDT.length; index++) {
      const customerYWD = customer.tableSDT[index];
      tSQ += `${customerYWD.totalShareQuantity},`;
    }
    const date = new Date(customer.date!);
    console.log("date:- " + date);

    let bonusSplitDate = "";
    let bonusSplit = "";
    if (customer.bonusDate) {
      bonusSplitDate = moment(customer.bonusDate).format("DD MMM YYYY");
      bonusSplit = "bonus";
    } else if (customer.splitDate) {
      bonusSplitDate = moment(customer.splitDate).format("DD MMM YYYY");
      bonusSplit = "split";
    }

    let fhnineDigitMICRNumberSplit = customer.fhnineDigitMICRNumber!.split("");
    let micr = "";
    for (let index = 0; index < fhnineDigitMICRNumberSplit.length; index++) {
      const customerYWD = fhnineDigitMICRNumberSplit[index];
      micr += micr; // customerYWD
    }

    await doc.render({
      //fields
      date: moment(date).format("DD-MM-YYYY"),
      companyName: customer.companyName||"Company Name",
      companyAddress: customer.companyAddress||"companyAddress",
      companyNumber: customer.companyNumber||"Company Number",
      emailId: customer.emailId||"Email Id",
      registerTransferAgentName: customer.registerTransferAgentName||"Register Transfer Agent Name (RTA)",
      registerTransferAgentAdress: customer.registerTransferAgentAdress||"RTA Address",
      registerTransferAgentContactNumber:
        customer.registerTransferAgentContactNumber||"RTA Contact Number",
      registerTransferAgentEmail: customer.registerTransferAgentEmail||"RTA Email Id",
      ledgerFolio: customer.ledgerFolio||"Ledger Folio",
      bonusDate: customer.bonusDate ? bonusSplitDate : "Bonus  Date",
      splitDate: customer.splitDate ? bonusSplitDate : "Bonus  Date",
      bonusSplit: bonusSplit,
      notaryDate: moment(customer.notaryDate).format("DD MMM YYYY")||"Notary Date",
      totalShares: customer.totalShares||"Total Shares",
      faceValueAsOnToday: customer.faceValueAsOnToday||"Face Value as On Today",
      holdShareQuantitySelf: customer.holdShareQuantitySelf||"Hold Share Quantity Self",
      companyHoldUndeliveredShareQuantity:
        customer.companyHoldUndeliveredShareQuantity||"Company Hold Undelivered Share Quantity",
      holdShareQuantitySelfFaceValue: customer.holdShareQuantitySelfFaceValue||"Hold Share Quantity Self Face Value",
      oldCompanyName: customer.oldCompanyName||"Old Company Name",
      oldQuantityholdShare: customer.oldQuantityholdShare||"Old Quantity Hold Share",
      
      fhnameInPancardExactSpelling: customer.fhnameInPancardExactSpelling||"First Holder Name in Pan Card (Exact Spelling)",
      fhrateInPercentage: customer.fhrateInPercentage||"First Holder Percentage %",
      fhbusiness: customer.fhbusiness||"First Holder Business",
      fhpinCode: customer.fhpinCode||"First Holder Pincode",
      fhnameAsPerShareCertificate: customer.fhnameAsPerShareCertificate||"First Holder Name as per share certificate",
      fhfatherOrHusbandName: customer.fhfatherOrHusbandName||"First Holder Father/Husband Name",
      fhcontactNumber: customer.fhcontactNumber||"First Holder Contact Number",
      fhemail: customer.fhemail||"First Holder Email",
      fhpancardNumber: customer.fhpancardNumber||"First Holder Pancard Number",
      fhcity: customer.fhcity||"First Holder City",
      fhaddressSameInAadharcard: customer.fhaddressSameInAadharcard||"First Holder Address Same in Aadhar Card",
      fholdAddressCompanyRegister: customer.fholdAddressCompanyRegister||"First Holder Old Address Company Register",
      fhgender: customer.fhgender||"First Holder Gender",
      fhstate: customer.fhstate||"First Holder State",
      fhage: customer.fhage||"First Holder Age",
      fhaadharCardNumber: customer.fhaadharCardNumber||"First Holder Aadhar Card Number",
      fhnameInAadharcardExactSpeling: customer.fhnameInAadharcardExactSpeling||"First Holder Name In Aadhar Card Exact Speling",
      fhRelationship: customer.fhRelationship||"First Holder Relationship",
      //jh
      jhnameInPancardExactSpelling: customer.jhnameInPancardExactSpelling||"Joint Holder Name in Pan Card (Exact Spelling)",
      jhnameAsPerShareCertificate: customer.jhnameAsPerShareCertificate||"Joint Holder Name as per share certificate",
      jhfatherOrHusbandName: customer.jhfatherOrHusbandName||"Joint Holder Father/Husband Name",
      jhcontactNumber: customer.jhcontactNumber||"Joint Holder Contact Number",
      jhemail: customer.jhemail||"Joint Holder Email",
      jhpancardNumber: customer.jhpancardNumber||"Joint Holder Pancard Number",
      jhcity: customer.jhcity||"Joint Holder City",
      jhaddressSameInAadharcard: customer.jhaddressSameInAadharcard||"Joint Holder Address Same in Aadhar Card",
      jholdAddressCompanyRegister: customer.jholdAddressCompanyRegister||"Joint Holder Old Address Company Register",
      jhgender: customer.jhgender||"Joint Holder Gender",
      jhstate: customer.jhstate||"Joint Holder State",
      jhage: customer.jhage||"Joint Holder Age",
      jhaadharCardNumber: customer.jhaadharCardNumber||"Joint Holder AadharCard Number",
      jhnameInAadharcardExactSpeling: customer.jhnameInAadharcardExactSpeling||"Joint Holder Name In Aadhar Card Exact Speling",
      jhRelationship: customer.jhRelationship||"Joint Holder Relationship",
      //fh
      fhbankName: customer.fhbankName||"First Holder Bank Name",
      fhbankAddress: customer.fhbankAddress||"First Holder Bank Address",
      fhholderAddressInBank: customer.fhholderAddressInBank||"First Holder Address In Bank",
      fhaccountTypeSavingorCurrent: customer.fhaccountTypeSavingorCurrent||"First Holder Account Type Saving/Current",
      fhaccountNumber: customer.fhaccountNumber||"First Holder Bank Account Number",
      fhbankTelephoneNumber: customer.fhbankTelephoneNumber||"First Holder Bank Telephone Number",
      fhbankIfscCode: customer.fhbankIfscCode||"First Holder Bank Ifsc Code",
      fhbankEmail: customer.fhbankEmail||"First Holder Bank Email",
      fhnineDigitMICRNumber: customer.fhnineDigitMICRNumber||"First Holder NineDigitMICRNumber",
      fhnameAsPerBankAccount: customer.fhnameAsPerBankAccount||"First Holder Name As Per Bank Account",
      //jh
      jhbankName: customer.jhbankName||"Joint Holder Bank Name",
      jhbankAddress: customer.jhbankAddress||"Joint Holder Bank Address",
      jhholderAddressInBank: customer.jhholderAddressInBank||"Joint Holder Address In Bank",
      jhaccountTypeSavingorCurrent: customer.jhaccountTypeSavingorCurrent||"Joint Holder Account Type Saving/Current",
      jhaccountNumber: customer.jhaccountNumber||"Joint Holder Bank Account Number",
      jhbankTelephoneNumber: customer.jhbankTelephoneNumber||"Joint Holder Bank Telephone Number",
      jhbankIfscCode: customer.jhbankIfscCode||"Joint Holder Bank Ifsc Code",
      jhbankEmail: customer.jhbankEmail||"Joint Holder Bank Email",
      jhnineDigitMICRNumber: customer.jhnineDigitMICRNumber||"Joint Holder NineDigitMICRNumber",
      jhnameAsPerBankAccount: customer.jhnameAsPerBankAccount||"Joint Holder Name As Per Bank Account",
      // Demat
      dpName: customer.dpName||"First Holder DP Name",
      dematNumber: customer.dematNumber||"First Holder Demat Number",
      dpId: customer.dpId||"First Holder dpId (first 8 number of Demat Number)",
      clientId: customer.clientId||"First Holder clientId (first 8 number of Demat Number)",
      cdslOrNsdl: customer.cdslOrNsdl||"First Holder Cdsl Or Nsdl",
      nameAsPerDematAccount: customer.nameAsPerDematAccount||"First Holder Name As Per Demat Account",
      nomineeName: customer.nomineeName||"First Holder Nominee Name",
      nomineeFatherOrHusbandName: customer.nomineeFatherOrHusbandName||"First Holder Nominee Father Or Husband Name",
      nomineeAddress: customer.nomineeAddress||"First Holder Nominee Address",
      nomineeHolderRelationShip: customer.nomineeHolderRelationShip||"First Holder Nominee Holder Relations Ship",
      nomineeBirthdate: moment(customer.nomineeBirthdate).format("DD-MM-YYYY")||"First Holder Nominee Birthdate",
      // Witness
      w1NameInPancardExactSpelling: customer.w1NameInPancardExactSpelling||"Witness 1 Name In Pancard Exact Spelling",
      w1addressSameInAadharcard: customer.w1addressSameInAadharcard||"Witness 1 Address Same in Aadhar Card",
      w1nameInAadharcardExactSpelling: customer.w1nameInAadharcardExactSpelling||"Witness 1 Name In Aadhar Card Exact Spelling",
      // Witness
      w2NameInPancardExactSpelling: customer.w2nameInPancardExactSpelling||"Witness 2 Name In Pancard Exact Spelling",
      w2addressSameInAadharcard: customer.w2addressSameInAadharcard||"Witness 2 Address Same in Aadhar Card",
      w2nameInAadharcardExactSpelling: customer.w2nameInAadharcardExactSpelling||"Witness 2 Name In Aadhar Card Exact Spelling",

      // Surety 1
      s1nameInPancardExactSpelling: customer.s1nameInPancardExactSpelling||"Surety 1 Name In Pancard",
      s1nameInAadharcard: customer.s1nameInAadharcard||"Surety 1 Name In Aadharcard",
      s1addressAadharcard: customer.s1addressAadharcard||"Surety 1 Address Aadhar Card",
      s1age: customer.s1age||"Surety 1 Age",
      s1income: customer.s1income||"Surety 1 Income",
      s1email: customer.s1email||"Surety 1 Email",
      s1mobileNumber: customer.s1mobileNumber||"Surety 1 Mobile Number",
      s1itReturnShowAddress: customer.s1itReturnShowAddress||"Surety 1 It Return Show Address",
      
      // Surety 2
      s2nameInPancardExactSpelling: customer.s2nameInPancardExactSpelling||"Surety 2 Name In Pancard",
      s2nameInAadharcard: customer.s2nameInAadharcard||"Surety 2 Name In Aadharcard",
      s2addressAadharcard: customer.s2addressAadharcard||"Surety 2 Address Aadhar Card",
      s2age: customer.s2age||"Surety 2 Age",
      s2income: customer.s2income||"Surety 2 Income",
      s2email: customer.s2email||"Surety 2 Email",
      s2mobileNumber: customer.s2mobileNumber||"Surety 2 Mobile Number",
      s2itReturnShowAddress: customer.s2itReturnShowAddress||"Surety 2 It Return Show Address",
      // RTA Letter
      policeStationName: customer.policeStationName||"PoliceStationName",
      // Marriage/Gazette
      oldName: customer.oldName||"OldName",
      newName: customer.newname||"NewName",
      // Succession
      deathHolderName1: customer.deathHolderName1||"DeathHolderName1",
      deathHolderName2: customer.deathHolderName2||"DeathHolderName2",
      deathHolderFirstCity: customer.deathHolderFirstCity||"Death Holder First City",
      deathHolderSecondCity: customer.deathHolderSecondCity||"Death Holder Second City",
      deathOfAddress: customer.deathOfAddress||"Death Of Address",
      certificateDeathHolderName1: customer.certificateDeathHolderName1||"Certificate Death Holder Name 1",
      certificateDeathHolderName2: customer.certificateDeathHolderName2||"Certificate Death Holder Name 2",
      legalNamePancard: customer.legalNamePancard||"Legal Name Pancard",
      successionCertificateNumberYear: customer.successionCertificateNumberYear||"Succession Certificate Number Year",
      successionCertificateCourtOrderDateAndYear:
        customer.successionCertificateCourtOrderDateAndYear||"Succession Certificate Court Order Date And Year",
      deceasedHolderAsPerShareCertificate:
        customer.deceasedHolderAsPerShareCertificate||"Deceased Holder As Per Share Certificate",
      deceasedHolderAsPerMunicipalityCertificate:
        customer.deceasedHolderAsPerMunicipalityCertificate||"Deceased Holder As Per Municipality Certificate",

      //LHA
      nameInPancardExectSpelling: customer.nameInPancardExectSpelling||"LHA Name In Pancard Exect Spelling",
      nameAsPerShareCertificate: customer.nameAsPerShareCertificate||"LHA Name As Per Share Certificate",
      fatherOrHusbandName: customer.fatherOrHusbandName||"LHA Father Or Husband Name",
      contactNumber: customer.contactNumber||"LHA Contact Number",
      email: customer.email||"LHA Email",
      pancardNumber: customer.pancardNumber||"LHA Pancard Number",
      city: customer.city||"LHA City",
      deathOfHolderFirstHolder: moment(
        customer.deathOfHolderFirstHolder
      ).format("DD-MM-YYYY")||"LHA Death Of Holder First Holder",
      deathOfHolderSecondHolder: moment(
        customer.deathOfHolderSecondHolder
      ).format("DD-MM-YYYY")||"LHA Death Of Holder Second Holder",
      addressSameInAadharcard: customer.addressSameInAadharcard||"LHA Address Same In Aadharcard",
      oldAddressCompanyRegister: customer.oldAddressCompanyRegister||"LHA Old Address Company Register",
      gender: customer.gender||"LHA Gender",
      state: customer.state||"LHA State",
      age: customer.age||"LHA Age",
      aadharcardNumber: customer.aadharcardNumber||"LHA Aadharcard Number",
      nameInAdharcardExactSpeling: customer.nameInAdharcardExactSpeling||"LHA Name In Adharcard Exact Speling",
      // lha bank
      lhabankName: customer.lhabankName||"LHA bankName",
      lhabankAddress: customer.lhabankAddress||"LHA bankAddress",
      lhaholderAddressInBank: customer.lhaholderAddressInBank||"LHA holderAddressInBank",
      lhaaccountTypeSavingorCurrent: customer.lhaaccountTypeSavingorCurrent||"LHA accountTypeSavingorCurrent",
      lhaaccountNumber: customer.lhaaccountNumber||"LHA Account Number",
      lhabankTelephoneNumber: customer.lhabankTelephoneNumber||"LHA BankTelephoneNumber",
      lhabankIfscCode: customer.lhabankIfscCode||"LHA bankIfscCode",
      lhanineDigitMICRNumber: customer.lhanineDigitMICRNumber||"LHA nineDigitMICRNumber",
      lhadeathOfHolderFirstHolder: moment(
        customer.deathOfHolderFirstHolder
      ).format("DD-MM-YYYY")||"LHA deathOfHolderFirstHolder",
      lhadeathOfHolderSecondHolder: moment(
        customer.deathOfHolderSecondHolder
      ).format("DD-MM-YYYY")||"LHA deathOfHolderSecondHolder",
      lhanameAsPerBankAccount: customer.lhanameAsPerBankAccount||"LHA nameAsPerBankAccount",
      // LHA Demat
      lhadpName: customer.lhadpName||"LHA dpName",
      lhadematNumber: customer.lhadematNumber||"LHA dematNumber",
      lhacdslOrNsdl: customer.lhacdslOrNsdl||"LHA cdslOrNsdl",
      lhanameAsPerDematAccount: customer.lhanameAsPerDematAccount||"LHA nameAsPerDematAccount",

      // IEPF
      iepfDividendAmount: customer.iepfDividendAmount||"IEPF DividendAmount",
      iepfDividendYear: customer.iepfDividendYear||"IEPF DividendYear",
      referenceLetterNo: customer.referenceLetterNo||"Reference Letter No",
      referenceLetterdate: moment(customer.referenceLetterdate).format(
        "DD-MM-YYYY"
      )||"Reference Letter Date",

      MICRECSCode: micr||"MICRECSCode",
      currentYear: new Date().getFullYear()||"currentYear",
      lhadeathHolderFirstCity: customer.deathHolderFirstCity||"LHA Death Holder First City",
      lhadeathHolderSecondCity: customer.deathHolderSecondCity||"LHA Death Holder Second City",

      //olh
      olhnameInPancard1: olhnamepan.split(",")[0]||"OLH 1 nameInPancard",
      olhnameInPancard2: olhnamepan.split(",")[1]||"OLH 2 nameInPancard",
      olhnameInPancard3: olhnamepan.split(",")[2]||"OLH 3 nameInPancard",

      olhnameInaadharcard1: olhnameaadhar.split(";")[0]||"OLH 1 nameInaadharcard",
      olhnameInaadharcard2: olhnameaadhar.split(";")[1]||"OLH 2 nameInaadharcard",
      olhnameInaadharcard3: olhnameaadhar.split(";")[2]||"OLH 3 nameInaadharcard",

      olhaddressaddhar1: olhaddaadhar.split(";")[0]||"OLH 1 addressaddhar",
      olhaddressaddhar2: olhaddaadhar.split(";")[1]||"OLH 2 addressaddhar",
      olhaddressaddhar3: olhaddaadhar.split(";")[2]||"OLH 3 addressaddhar",

      olhage1: olhage.split(",")[0]||"OLH 1 age",
      olhage2: olhage.split(",")[1]||"OLH 2 age",
      olhage3: olhage.split(",")[2]||"OLH 3 age",

      olhdaughterson1: olhdaughterson.split(",")[0]||"OLH 1 daughterson",
      olhdaughterson2: olhdaughterson.split(",")[1]||"OLH 2 daughterson",
      olhdaughterson3: olhdaughterson.split(",")[2]||"OLH 3 daughterson",

      //SDT
      distinctiveNumber: dN||"\n\n\n",
      shareCertificateNumber: sCN||"\n\n\n",
      totalShareQuantity: tSQ||"\n\n\n",
      // first_name: "John",
      // last_name: "Doe",
      // phone: "0652455478",
      // description: "New Website",
      hasReff: hasReffLine||"\n\n\n",
      subjects: subjects||"\n\n\n",
      summary1: summary1||"\n\n\n",
      name: "Jay"||"\n\n\n",
      tableSDT: tableSDT||"\n\n\n",
      noticeTable: noticeTable||"\n\n\n",
      fCDSIC: fCDSIC||"\n\n\n",
      fSCD: fSCD||"\n\n\n",
      fCDSNSH: fCDSNSH||"\n\n\n",
      ywdATable: ywdATable||"\n\n\n",
      fSCND: fSCND||"\n\n\n",
      nCCDFSH: nCCDFSH||"\n\n\n",
      fCDFDNS: fCDFDNS||"\n\n\n",
      nCFNSPC: nCFNSPC||"\n\n\n",
      nCFCDNEDS: nCFCDNEDS||"\n\n\n",
      certiDistNoSecurity: certiDistNoSecurity||"\n\n\n",
      fSCDFT: fSCDFT||"\n\n\n",
      nfSFCDN: nfSFCDN||"\n\n\n",
    });
    const buf = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });
    const fileName = `${Date.now()}_${customerTemplateMasterId}_${templateType}.docx`;
    await writeFileSync(path.resolve(__dirname, fileName), buf);
    const readFileData = await readFileSync(
      path.resolve(__dirname, fileName),
      "binary"
    );
    await unlinkSync(path.resolve(__dirname, fileName));
    return readFileData;
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
        // const replacedCustomerTemplateData = await this.replaceTemplateData(
        //   customerTemplateent.Customer,
        //   customerTemplateent.Template!
        // );

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

      // const replacedCustomerTemplateData = await this.replaceTemplateData(
      //   getCustomer,
      //   getTemplate[0]
      // );

      const data =
        await this._customerTemplateRepository.createCustomerTemplate({
          id: null,
          customerId,
          customerTemplateMasterId,
          isCustomMainContentTemplate: false,
          order: null,
          templateId: getTemplate[0].id,
          templateType: getTemplate[0].type,
          templateData: getTemplate[0].details,
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
    const response: any = [];
    for (let i = 0; i < all.length; i++) {
      const allData = all[i];

      const selectedTemplate = selected.find(
        (o) => o.templateId === allData.id
      );

      if (selectedTemplate) {
        const { Customer, Template, ...restData } = selectedTemplate;
        response.push({
          ...restData,
          isSelected: true,
        });
      } else {
        response.push({
          customerId,
          id: null,
          order: null,
          templateId: allData.id,
          customerTemplateMasterId,
          templateTitle: allData.title,
          templateType: allData.type,
          templateData: allData.details,
          isSelected: false,
          createdAt: allData.createdAt,
          updatedAt: allData.updatedAt,
          isCustomMainContentTemplate: false,
        });
      }
    }

    // const selectedSet = new Set(selected.map((item) => item.templateId));

    // const newData = all.map((item) => ({
    //   ...item,
    //   customerId,
    //   customerTemplateMasterId,
    //   templateTitle: item.title,
    //   templateType: item.type,
    //   templateData: item.details,
    //   isSelected: selectedSet.has(item.id), // Assuming 'id' is the key to match
    // }));

    return response;
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
