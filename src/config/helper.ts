export const replaceAll = async (str, find, replace) => {
  if (str) {
    find = find || "";
    find = find.replace(/[@#$%^&*()+=\-[\]\\';,./{}|":<>~_]/g, "\\$&");
    return str.replace(new RegExp(find, "g"), replace);
  }
  return "";
};
