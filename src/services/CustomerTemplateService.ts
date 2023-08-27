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
import { Customer, CustomerTemplate, Template } from "@prisma/client";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ITemplateRepository } from "../interfaces/ITemplateRepository";
import { BadRequest } from "../errors/BadRequest";
import { replaceAll } from "../config/helper";
import moment from "moment";
import fs, { writeFileSync } from "fs";
import { join } from "path";
import { NotFound } from "../errors/NotFound";
import htmlToDocx from "html-to-docx";

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
			<td>${customerYWD.year}</td>
			<td>${customerYWD.warrantNo}</td>
			<td>${customerYWD.ddMicrNo}</td>
			<td>${customerYWD.amount}</td>
		</tr>`;
    }
    const data = header + body + footer;
    str = replaceAll(str, find, data);

    //tables tableSDT:-
    find = "[[tableSDT]]";
    const h = `<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px" summary="Summary">
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
			<td>${customerYWD.shareCertificateNumber}</td>
			<td>${customerYWD.distinctiveNumber}</td>
			<td>${customerYWD.totalShareQuantity}</td>
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
      b += `<tr>
			<td>${customerYWD.nameInPancardExactSpelling}</td>
			<td>${customerYWD.addressSameInAadharcard}</td>
			<td>${customerYWD.nameInAadharcardExactSpelling}</td>
      <td>${customerYWD.age}</td>
			<td>${customerYWD.daughter}</td>
			<td>${customerYWD.son}</td>
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
    replace = customer.deathOfHolderFirstHolder;
    str = replaceAll(str, find, replace);

    find = "[[deathOfHolderSecondHolder]]";
    replace = customer.deathOfHolderSecondHolder;
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
    replace = customer.referenceLetterdate;
    str = replaceAll(str, find, replace);

    find = "[[currentYear]]";
    replace = new Date().getFullYear();
    str = replaceAll(str, find, replace);

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
          customerTemplateData.templateType
        );
      if (customerTemplateData.isCustomMainContentTemplate) {
        if (customerTemplateData.id) {
          const d =
            await this._customerTemplateRepository.updateCustomerTemplate(
              customerTemplateData.id,
              {
                id: customerTemplateData.id,
                customerId: customerTemplateData.customerId,
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
  async createWordFileCustomerTemplate(customerId: number): Promise<any> {
    try {
      const types = [
        "COMMON_CONTENT",
        "REFE_LINE",
        "SUBJECT",
        "MAIN_CONTENT",
        "SUMMARY",
        "AGREEMENT",
      ];

      const getTemplateData: CustomerTemplate[] =
        await this._customerTemplateRepository.createWordFileCustomerTemplate(
          customerId
        );

      let body = "";

      let CCData = getTemplateData.map(async (d) => {
        if (d.templateType === "COMMON_CONTENT") {
          body += d.templateData;
        }
      });

      body += "<br />";

      let RLData = getTemplateData.map(async (d) => {
        if (d.templateType === "REFE_LINE") {
          body += d.templateData;
        }
      });

      body += "<br />";

      let SData = getTemplateData.map(async (d) => {
        if (d.templateType === "SUBJECT") {
          body += d.templateData;
        }
      });

      body += "<div style='page-break-after:always'></div>";

      const MCData = getTemplateData.filter((d) => {
        return d.templateType === "MAIN_CONTENT";
      });
      let check = MCData.sort((a, b) => (a.order! > b.order! ? 1 : -1));
      check.map((d) => {
        body += d.templateData;
        body += "<br />";
      });

      body += "<div style='page-break-after:always'></div>";

      let SUData = getTemplateData.map((d) => {
        if (d.templateType === "SUMMARY") {
          body += d.templateData;
        }
      });

      body += "<div style='page-break-after:always'></div>";

      let agreementData = getTemplateData.map((d) => {
        if (d.templateType === "AGREEMENT") {
          body += d.templateData;
        }
      });

      const converted = await htmlToDocx(body);
      const fileName = `Forwarding-Letter_${customerId}.docx`;
      const folderPath = join(__dirname, "/document");
      await fs.mkdirSync(folderPath, { recursive: true });
      const docxFilePath = join(folderPath, fileName);
      const saveFile = await writeFileSync(docxFilePath, converted);
      return { filePath: docxFilePath, fileName };
    } catch (error) {
      console.log("error:-" + error);
      throw error;
    }
  }

  async getCustomerTemplateByTypeAndCustomerId(
    customerId: number,
    templateType: string,
    userId: number
  ): Promise<UpdateCustomerTemplate[]> {
    const getCustomerTemplates =
      await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(
        customerId,
        templateType
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
    userId: number
  ): Promise<{ isAvailable: boolean }> {
    const getCustomerTemplates =
      await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(
        customerId,
        templateType
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
    userId: number
  ): Promise<Template[]> {
    const all = await this._templateRepository.getTemplatesByType(
      templateType,
      userId
    );
    const selected =
      await this._customerTemplateRepository.getCustomerTemplateByTypeAndCustomerId(
        customerId,
        templateType
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
}
