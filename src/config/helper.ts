export const replaceAll = (str, find, replace) => {
  if (str) {
    find = find || "";
    find = find.replace(/[@#$%^&*()+=\-[\]\\';,./{}|":<>~_]/g, "\\$&");
    const check = str.replace(new RegExp(find, "g"), replace);
    return check;
  }
  return "";
};
