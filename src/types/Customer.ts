export declare type CreateCustomerRepoInput = {
  //   id: number;
  userId: number;
  date: Date | null;
  companyName: string | null;
  companyAddress: string | null;
  companyNumber: string | null;
  emailId: string;
  registerTransferAgentName: string | null;
  registerTransferAgentAdress: string | null;
  registerTransferAgentContactNumber: string | null;
  registerTransferAgentEmail: string | null;

  bonusDate: Date | null;
  splitDate: Date | null;
  notaryDate: Date | null;

  ledgerFolio: string | null;
  tableSDT: string | null;
  totalShares: string | null;
  // shareCertificateNumber: string | null;
  // distinctiveNumber: string | null;
  // totalShareQuantity: string | null;
  faceValueAsOnToday: string | null;
  holdShareQuantitySelf: string | null;
  companyHoldUndeliveredShareQuantity: string | null;
  holdShareQuantitySelfFaceValue: string | null;
  oldCompanyName: string | null;
  oldQuantityholdShare: string | null;
  ywdATabelData: string | null;
  fhnameInPancardExactSpelling: string | null;
  fhrateInPercentage: string | null;
  fhnameAsPerShareCertificate: string | null;
  fhfatherOrHusbandName: string | null;
  fhcontactNumber: string | null;
  fhemail: string | null;
  fhpancardNumber: string | null;
  fhcity: string | null;
  fhaddressSameInAadharcard: string | null;
  fholdAddressCompanyRegister: string | null;
  fhpinCode: string | null;
  fhbusiness: string | null;
  fhgender: string | null;
  fhstate: string | null;
  fhage: string | null;
  fhaadharCardNumber: string | null;
  fhnameInAadharcardExactSpeling: string | null;
  jhnameInPancardExactSpelling: string | null;
  jhnameAsPerShareCertificate: string | null;
  jhfatherOrHusbandName: string | null;
  jhcontactNumber: string | null;
  jhemail: string | null;
  jhpancardNumber: string | null;
  jhcity: string | null;
  jhaddressSameInAadharcard: string | null;
  jholdAddressCompanyRegister: string | null;
  jhgender: string | null;
  jhstate: string | null;
  jhage: string | null;
  jhaadharcardNumber: string | null;
  jhnameInAadharcardExactSpeling: string | null;
  fhbankName: string | null;
  fhbankAddress: string | null;
  fhholderAddressInBank: string | null;
  fhaccountTypeSavingorCurrent: string | null;
  fhaccountNumber: string | null;
  fhbankTelephoneNumber: string | null;
  fhbankIfscCode: string | null;
  fhbankEmail: string | null;
  fhnineDigitMICRNumber: string | null;
  fhnameAsPerBankAccount: string | null;
  jhbankName: string | null;
  jhbankAddress: string | null;
  jhholderAddressInBank: string | null;
  jhaccountTypeSavingorCurrent: string | null;
  jhaccountNumber: string | null;
  jhbankTelephoneNumber: string | null;
  jhbankIfscCode: string | null;
  jhbankEmail: string | null;
  jhnineDigitMICRNumber: string | null;
  jhnameAsPerBankAccount: string | null;
  dpName: string | null;
  dematNumber: string | null;
  cdslOrNsdl: string | null;
  nameAsPerDematAccount: string | null;
  nomineeName: string | null;
  nomineeFatherOrHusbandName: string | null;
  nomineeAddress: string | null;
  nomineeHolderRelationShip: string | null;
  nomineeBirthdate: Date | null;
  w1NameInPancardExactSpelling: string | null;
  w1addressSameInAadharcard: string | null;
  w1nameInAadharcardExactSpelling: string | null;
  w2nameInPancardExactSpelling: string | null;
  w2addressSameInAadharcard: string | null;
  w2nameInAadharcardExactSpelling: string | null;
  s1nameInPancardExactSpelling: string | null;
  s1nameInAadharcard: string | null;
  s1addressAadharcard: string | null;
  s1age: string | null;
  s1income: string | null;
  s1email: string | null;
  s1mobileNumber: string | null;
  s1itReturnShowAddress: string | null;
  s2nameInPancardExactSpelling: string | null;
  s2nameInAadharcard: string | null;
  s2addressAadharcard: string | null;
  s2age: string | null;
  s2income: string | null;
  s2email: string | null;
  s2mobileNumber: string | null;
  s2itReturnShowAddress: string | null;
  policeStationName: string | null;
  oldName: string | null;
  newname: string | null;
  deathHolderName1: string | null;
  deathHolderName2: string | null;
  deathOfAddress: string | null;
  certificateDeathHolderName1: string | null;
  certificateDeathHolderName2: string | null;
  legalNamePancard: string | null;
  successionCertificateNumberYear: string | null;
  successionCertificateCourtOrderDateAndYear: string | null;
  nameInPancardExectSpelling: string | null;
  nameAsPerShareCertificate: string | null;
  fatherOrHusbandName: string | null;
  contactNumber: string | null;
  email: string | null;
  pancardNumber: string | null;
  city: string | null;
  deathOfHolderFirstHolder: string | null;
  deathOfHolderSecondHolder: string | null;

  deathHolderFirstCity: string | null;
  deathHolderSecondCity: string | null;

  addressSameInAadharcard: string | null;
  oldAddressCompanyRegister: string | null;
  gender: string | null;
  state: string | null;
  age: string | null;
  aadharcardNumber: string | null;
  nameInAdharcardExactSpeling: string | null;
  lhabankName: string | null;
  lhabankAddress: string | null;
  lhaholderAddressInBank: string | null;
  lhaaccountTypeSavingorCurrent: string | null;
  lhaaccountNumber: string | null;
  lhabankTelephoneNumber: string | null;
  lhabankIfscCode: string | null;
  lhanineDigitMICRNumber: string | null;
  lhanameAsPerBankAccount: string | null;
  lhadpName: string | null;
  lhadematNumber: string | null;
  lhacdslOrNsdl: string | null;
  lhanameAsPerDematAccount: string | null;
  iepfDividendAmount: string | null;
  iepfDividendYear: string | null;
  referenceLetterNo: string | null;
  referenceLetterdate: string | null;
  otherLegalHears: string | null;
  //   createdAt: Date;
  //   updatedAt: Date | null;
};

export declare type CreateCustomerServiceInput = {
  //   id: number;
  userId: number;
  date: Date | null;
  companyName: string | null;
  companyAddress: string | null;
  companyNumber: string | null;
  emailId: string;
  registerTransferAgentName: string | null;
  registerTransferAgentAdress: string | null;
  registerTransferAgentContactNumber: string | null;
  registerTransferAgentEmail: string | null;

  bonusDate: Date | null;
  splitDate: Date | null;
  notaryDate: Date | null;

  ledgerFolio: string | null;
  tableSDT: {
    shareCertificateNumber: string | null;
    distinctiveNumber: string | null;
    totalShareQuantity: string | null;
  }[];
  faceValueAsOnToday: string | null;
  holdShareQuantitySelf: string | null;
  companyHoldUndeliveredShareQuantity: string | null;
  holdShareQuantitySelfFaceValue: string | null;
  oldCompanyName: string | null;
  oldQuantityholdShare: string | null;
  ywdATabelData: {
    year: string | null;
    warrantNo: string | null;
    ddMicrNo: string | null;
    amount: string | null;
  }[];
  fhnameInPancardExactSpelling: string | null;
  fhrateInPercentage: string | null;
  fhnameAsPerShareCertificate: string | null;
  fhfatherOrHusbandName: string | null;
  fhcontactNumber: string | null;
  fhemail: string | null;
  fhpancardNumber: string | null;
  fhcity: string | null;
  fhaddressSameInAadharcard: string | null;
  fholdAddressCompanyRegister: string | null;
  fhpinCode: string | null;
  fhbusiness: string | null;
  fhgender: string | null;
  fhstate: string | null;
  fhage: string | null;
  fhaadharCardNumber: string | null;
  fhnameInAadharcardExactSpeling: string | null;
  jhnameInPancardExactSpelling: string | null;
  jhnameAsPerShareCertificate: string | null;
  jhfatherOrHusbandName: string | null;
  jhcontactNumber: string | null;
  jhemail: string | null;
  jhpancardNumber: string | null;
  jhcity: string | null;
  jhaddressSameInAadharcard: string | null;
  jholdAddressCompanyRegister: string | null;
  jhgender: string | null;
  jhstate: string | null;
  jhage: string | null;
  jhaadharcardNumber: string | null;
  jhnameInAadharcardExactSpeling: string | null;
  fhbankName: string | null;
  fhbankAddress: string | null;
  fhholderAddressInBank: string | null;
  fhaccountTypeSavingorCurrent: string | null;
  fhaccountNumber: string | null;
  fhbankTelephoneNumber: string | null;
  fhbankIfscCode: string | null;
  fhbankEmail: string | null;
  fhnineDigitMICRNumber: string | null;
  fhnameAsPerBankAccount: string | null;
  jhbankName: string | null;
  jhbankAddress: string | null;
  jhholderAddressInBank: string | null;
  jhaccountTypeSavingorCurrent: string | null;
  jhaccountNumber: string | null;
  jhbankTelephoneNumber: string | null;
  jhbankIfscCode: string | null;
  jhbankEmail: string | null;
  jhnineDigitMICRNumber: string | null;
  jhnameAsPerBankAccount: string | null;
  dpName: string | null;
  dematNumber: string | null;
  cdslOrNsdl: string | null;
  nameAsPerDematAccount: string | null;
  nomineeName: string | null;
  nomineeFatherOrHusbandName: string | null;
  nomineeAddress: string | null;
  nomineeHolderRelationShip: string | null;
  nomineeBirthdate: Date | null;
  w1NameInPancardExactSpelling: string | null;
  w1addressSameInAadharcard: string | null;
  w1nameInAadharcardExactSpelling: string | null;
  w2nameInPancardExactSpelling: string | null;
  w2addressSameInAadharcard: string | null;
  w2nameInAadharcardExactSpelling: string | null;
  s1nameInPancardExactSpelling: string | null;
  s1nameInAadharcard: string | null;
  s1addressAadharcard: string | null;
  s1age: string | null;
  s1income: string | null;
  s1email: string | null;
  s1mobileNumber: string | null;
  s1itReturnShowAddress: string | null;
  s2nameInPancardExactSpelling: string | null;
  s2nameInAadharcard: string | null;
  s2addressAadharcard: string | null;
  s2age: string | null;
  s2income: string | null;
  s2email: string | null;
  s2mobileNumber: string | null;
  s2itReturnShowAddress: string | null;
  policeStationName: string | null;
  oldName: string | null;
  newname: string | null;
  deathHolderName1: string | null;
  deathHolderName2: string | null;
  deathOfAddress: string | null;
  certificateDeathHolderName1: string | null;
  certificateDeathHolderName2: string | null;
  legalNamePancard: string | null;
  successionCertificateNumberYear: string | null;
  successionCertificateCourtOrderDateAndYear: string | null;
  nameInPancardExectSpelling: string | null;
  nameAsPerShareCertificate: string | null;
  fatherOrHusbandName: string | null;
  contactNumber: string | null;
  email: string | null;
  pancardNumber: string | null;
  city: string | null;
  deathOfHolderFirstHolder: string | null;
  deathOfHolderSecondHolder: string | null;

  deathHolderFirstCity: string | null;
  deathHolderSecondCity: string | null;

  addressSameInAadharcard: string | null;
  oldAddressCompanyRegister: string | null;
  gender: string | null;
  state: string | null;
  age: string | null;
  aadharcardNumber: string | null;
  nameInAdharcardExactSpeling: string | null;
  lhabankName: string | null;
  lhabankAddress: string | null;
  lhaholderAddressInBank: string | null;
  lhaaccountTypeSavingorCurrent: string | null;
  lhaaccountNumber: string | null;
  lhabankTelephoneNumber: string | null;
  lhabankIfscCode: string | null;
  lhanineDigitMICRNumber: string | null;
  lhanameAsPerBankAccount: string | null;
  lhadpName: string | null;
  lhadematNumber: string | null;
  lhacdslOrNsdl: string | null;
  lhanameAsPerDematAccount: string | null;
  iepfDividendAmount: string | null;
  iepfDividendYear: string | null;
  referenceLetterNo: string | null;
  referenceLetterdate: string | null;
  otherLegalHears: {
    nameInPancardExactSpelling: string | null;
    addressSameInAadharcard: string | null;
    nameInAadharcardExactSpelling: string | null;
    age: string | null;
    daughter: string | null;
    son: string | null;
  }[];
  //   createdAt: Date;
  //   updatedAt: Date | null;
};

export declare type CustomerData = {
  id: number;
  userId: number;
  date: Date | null;
  companyName: string | null;
  companyAddress: string | null;
  companyNumber: string | null;
  emailId: string;
  registerTransferAgentName: string | null;
  registerTransferAgentAdress: string | null;
  registerTransferAgentContactNumber: string | null;
  registerTransferAgentEmail: string | null;

  bonusDate: Date | null;
  splitDate: Date | null;
  notaryDate: Date | null;

  ledgerFolio: string | null;
  tableSDT: {
    shareCertificateNumber: string | null;
    distinctiveNumber: string | null;
    totalShareQuantity: string | null;
  }[];
  faceValueAsOnToday: string | null;
  holdShareQuantitySelf: string | null;
  companyHoldUndeliveredShareQuantity: string | null;
  holdShareQuantitySelfFaceValue: string | null;
  oldCompanyName: string | null;
  oldQuantityholdShare: string | null;
  ywdATabelData: {
    year: string | null;
    warrantNo: string | null;
    ddMicrNo: string | null;
    amount: string | null;
  }[];
  fhnameInPancardExactSpelling: string | null;
  fhrateInPercentage: string | null;
  fhnameAsPerShareCertificate: string | null;
  fhfatherOrHusbandName: string | null;
  fhcontactNumber: string | null;
  fhemail: string | null;
  fhpancardNumber: string | null;
  fhcity: string | null;
  fhaddressSameInAadharcard: string | null;
  fholdAddressCompanyRegister: string | null;
  fhpinCode: string | null;
  fhbusiness: string | null;
  fhgender: string | null;
  fhstate: string | null;
  fhage: string | null;
  fhaadharCardNumber: string | null;
  fhnameInAadharcardExactSpeling: string | null;
  jhnameInPancardExactSpelling: string | null;
  jhnameAsPerShareCertificate: string | null;
  jhfatherOrHusbandName: string | null;
  jhcontactNumber: string | null;
  jhemail: string | null;
  jhpancardNumber: string | null;
  jhcity: string | null;
  jhaddressSameInAadharcard: string | null;
  jholdAddressCompanyRegister: string | null;
  jhgender: string | null;
  jhstate: string | null;
  jhage: string | null;
  jhaadharcardNumber: string | null;
  jhnameInAadharcardExactSpeling: string | null;
  fhbankName: string | null;
  fhbankAddress: string | null;
  fhholderAddressInBank: string | null;
  fhaccountTypeSavingorCurrent: string | null;
  fhaccountNumber: string | null;
  fhbankTelephoneNumber: string | null;
  fhbankIfscCode: string | null;
  fhbankEmail: string | null;
  fhnineDigitMICRNumber: string | null;
  fhnameAsPerBankAccount: string | null;
  jhbankName: string | null;
  jhbankAddress: string | null;
  jhholderAddressInBank: string | null;
  jhaccountTypeSavingorCurrent: string | null;
  jhaccountNumber: string | null;
  jhbankTelephoneNumber: string | null;
  jhbankIfscCode: string | null;
  jhbankEmail: string | null;
  jhnineDigitMICRNumber: string | null;
  jhnameAsPerBankAccount: string | null;
  dpName: string | null;
  dematNumber: string | null;
  cdslOrNsdl: string | null;
  nameAsPerDematAccount: string | null;
  nomineeName: string | null;
  nomineeFatherOrHusbandName: string | null;
  nomineeAddress: string | null;
  nomineeHolderRelationShip: string | null;
  nomineeBirthdate: Date | null;
  w1NameInPancardExactSpelling: string | null;
  w1addressSameInAadharcard: string | null;
  w1nameInAadharcardExactSpelling: string | null;
  w2nameInPancardExactSpelling: string | null;
  w2addressSameInAadharcard: string | null;
  w2nameInAadharcardExactSpelling: string | null;
  s1nameInPancardExactSpelling: string | null;
  s1nameInAadharcard: string | null;
  s1addressAadharcard: string | null;
  s1age: string | null;
  s1income: string | null;
  s1email: string | null;
  s1mobileNumber: string | null;
  s1itReturnShowAddress: string | null;
  s2nameInPancardExactSpelling: string | null;
  s2nameInAadharcard: string | null;
  s2addressAadharcard: string | null;
  s2age: string | null;
  s2income: string | null;
  s2email: string | null;
  s2mobileNumber: string | null;
  s2itReturnShowAddress: string | null;
  policeStationName: string | null;
  oldName: string | null;
  newname: string | null;
  deathHolderName1: string | null;
  deathHolderName2: string | null;
  deathOfAddress: string | null;
  certificateDeathHolderName1: string | null;
  certificateDeathHolderName2: string | null;
  legalNamePancard: string | null;
  successionCertificateNumberYear: string | null;
  successionCertificateCourtOrderDateAndYear: string | null;
  nameInPancardExectSpelling: string | null;
  nameAsPerShareCertificate: string | null;
  fatherOrHusbandName: string | null;
  contactNumber: string | null;
  email: string | null;
  pancardNumber: string | null;
  city: string | null;
  deathOfHolderFirstHolder: string | null;
  deathOfHolderSecondHolder: string | null;

  deathHolderFirstCity: string | null;
  deathHolderSecondCity: string | null;

  addressSameInAadharcard: string | null;
  oldAddressCompanyRegister: string | null;
  gender: string | null;
  state: string | null;
  age: string | null;
  aadharcardNumber: string | null;
  nameInAdharcardExactSpeling: string | null;
  lhabankName: string | null;
  lhabankAddress: string | null;
  lhaholderAddressInBank: string | null;
  lhaaccountTypeSavingorCurrent: string | null;
  lhaaccountNumber: string | null;
  lhabankTelephoneNumber: string | null;
  lhabankIfscCode: string | null;
  lhanineDigitMICRNumber: string | null;
  lhanameAsPerBankAccount: string | null;
  lhadpName: string | null;
  lhadematNumber: string | null;
  lhacdslOrNsdl: string | null;
  lhanameAsPerDematAccount: string | null;
  iepfDividendAmount: string | null;
  iepfDividendYear: string | null;
  referenceLetterNo: string | null;
  referenceLetterdate: string | null;
  otherLegalHears: {
    nameInPancardExactSpelling: string | null;
    addressSameInAadharcard: string | null;
    nameInAadharcardExactSpelling: string | null;
    age: string | null;
    daughter: string | null;
    son: string | null;
  }[];
  createdAt: Date;
  updatedAt: Date | null;
};
