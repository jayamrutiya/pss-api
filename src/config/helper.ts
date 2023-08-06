export const replaceAll = (str, find, replace) => {
  if (str) {
    console.log('\nfind' + find);
    console.log('\nreplace' + replace);

    find = find || "";
    find = find.replace(/[@#$%^&*()+=\-[\]\\';,./{}|":<>~_]/g, "\\$&");
    const check = str.replace(new RegExp(find, "g"), replace);
    console.log('\ncheck', check);
    return check
  }
  return "";
};
