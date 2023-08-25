"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAll = void 0;
const replaceAll = (str, find, replace) => {
    if (str) {
        find = find || "";
        find = find.replace(/[@#$%^&*()+=\-[\]\\';,./{}|":<>~_]/g, "\\$&");
        const check = str.replace(new RegExp(find, "g"), replace);
        return check;
    }
    return "";
};
exports.replaceAll = replaceAll;
//# sourceMappingURL=helper.js.map