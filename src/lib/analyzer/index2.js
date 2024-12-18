var m = Object.defineProperty;
var y = (d, t, e) => t in d ? m(d, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : d[t] = e;
var l = (d, t, e) => y(d, typeof t != "symbol" ? t + "" : t, e);
import { getBundledDatabase as f, getBundledSettings as h, getBundledSystems as p } from "./index5.js";
import { normalizer as b } from "./index4.js";
import { findSystemById as w, findIngredient as S } from "./index3.js";
class E {
  constructor(t) {
    l(this, "database");
    l(this, "system");
    l(this, "settings");
    this.database = (t == null ? void 0 : t.database) ?? f();
    const e = p(), n = w(e, "curly_default");
    if (!n)
      throw new Error("Could not find curly_default system");
    this.system = (t == null ? void 0 : t.system) ?? n, this.settings = (t == null ? void 0 : t.settings) ?? h();
  }
  /**
   * Gets the current database being used by the analyzer
   */
  getDatabase() {
    return this.database;
  }
  /**
   * Updates the database being used by the analyzer
   */
  setDatabase(t) {
    this.database = t;
  }
  /**
   * Gets the current system
   */
  getSystem() {
    return this.system;
  }
  /**
   * Updates the current system
   */
  setSystem(t) {
    this.system = t;
  }
  /**
   * Creates an empty analysis result
   */
  createEmptyResult(t) {
    return {
      input: t,
      status: "error",
      reasons: [],
      ingredients: []
    };
  }
  /**
   * Analyzes a single ingredient against the current system's settings
   */
  analyzeIngredient(t, e) {
    const n = {
      name: t,
      normalized: e,
      status: "ok",
      reasons: []
    }, a = S(this.database, e);
    if (a != null && a.ingredient)
      n.ingredient = {
        id: a.ingredient.id,
        name: a.ingredient.name,
        description: a.ingredient.description
      };
    else
      return n.status = "caution", n.reasons.push({
        setting: "unknown_ingredient",
        reason: "Ingredient not found in database"
      }), n;
    for (const i of this.system.settings) {
      const s = this.settings[i];
      if (!s) continue;
      let r = !1, g = !1;
      if (s.categories && (r = a.ingredient.categories.some((o) => {
        var u;
        return (u = s.categories) == null ? void 0 : u.includes(o);
      })), s.groups && (r = r || a.ingredient.categories.some((o) => {
        var c;
        const u = this.database.categories[o];
        return u && ((c = s.groups) == null ? void 0 : c.includes(u.group));
      }), r && s.allowedCategories && (g = a.ingredient.categories.some(
        (o) => {
          var u;
          return (u = s.allowedCategories) == null ? void 0 : u.includes(o);
        }
      ))), s.ingredients && (r = r || s.ingredients.includes(a.ingredient.id)), r) {
        const o = g ? s.allowedStatus : s.defaultStatus;
        n.reasons.push({
          setting: s.id,
          reason: s.description
        }), o === "warning" ? n.status = "warning" : o === "caution" && n.status === "ok" && (n.status = "caution");
      }
    }
    return n;
  }
  /**
   * Analyzes an ingredient list and returns the results
   */
  analyze(t) {
    if (!t || typeof t != "string")
      return this.createEmptyResult("");
    const e = this.createEmptyResult(t), n = b(t);
    if (!n.isValid)
      return e;
    e.ingredients = n.ingredients.map((i) => this.analyzeIngredient(i, i)), e.status = "ok";
    const a = /* @__PURE__ */ new Map();
    for (const i of e.ingredients) {
      i.status === "warning" ? e.status = "warning" : i.status === "caution" && e.status === "ok" && (e.status = "caution");
      for (const s of i.reasons) {
        const r = `${s.setting}:${s.reason}`;
        a.has(r) || a.set(r, s);
      }
    }
    return e.reasons = Array.from(a.values()), e;
  }
}
export {
  E as Analyzer
};
//# sourceMappingURL=index2.js.map
