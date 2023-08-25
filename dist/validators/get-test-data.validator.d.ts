declare const getTestDataValidator: import("express-validator").ValidationChain[] & {
    run: (req: import("express-validator/src/base").Request) => Promise<import("express-validator/src/chain").ResultWithContext[]>;
};
export default getTestDataValidator;
