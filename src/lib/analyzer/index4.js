function o(e) {
  return e.trim().length > 0 && e.length <= 150;
}
function d(e) {
  return /(?:https?:\/\/|www\.|\/{2})/i.test(e) ? !1 : e.trim().length > 0;
}
function g(e) {
  return e.toLowerCase().replace(/[()]/g, " ").replace(/[^a-z0-9\s\-]/g, "").replace(/\s+/g, " ").trim();
}
function c(e) {
  const n = /\(([^()]*?)\)/g;
  let r = e, t = !0;
  for (; t; )
    t = !1, r = r.replace(n, (l, i) => {
      const s = i.trim();
      return s.includes(",") ? (t = !0, `, ${s.split(",").map((a) => a.trim()).join(", ")}`) : s === "" ? "(  )" : `(${i})`;
    });
  return r = r.replace(/,\s*,/g, ","), r = r.replace(/,(\s*\))/g, "$1"), r;
}
function u(e) {
  return e.split(/(?:[,\n\r|&]|\s+and\s+)/).map((n) => n.trim()).filter(Boolean);
}
function m(e) {
  if (!d(e))
    return { ingredients: [], isValid: !1 };
  const n = c(e);
  return { ingredients: u(n).filter(o).map((i) => g(i)), isValid: !0 };
}
export {
  o as isValidIngredient,
  d as isValidIngredientList,
  g as normalizeIngredient,
  m as normalizer,
  c as processCommaParentheses,
  u as splitBySeparators
};
//# sourceMappingURL=index4.js.map
