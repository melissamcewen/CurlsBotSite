function g(e) {
  return e.synonyms ? [e.name, ...e.synonyms] : [e.name];
}
function w(e, r) {
  const n = r.toLowerCase();
  console.log("Searching for:", n), console.log("Partitioning database based on search term");
  const { database: i, defaultIngredient: o } = f(e, n);
  for (const t of Object.values(
    i.ingredients
  ))
    if (g(t).map(
      (s) => s.toLowerCase()
    ).includes(n))
      return console.log("Found exact match:", t.name), {
        uuid: crypto.randomUUID(),
        input: r,
        normalized: n,
        ingredient: t
      };
  for (const t of Object.values(
    i.ingredients
  )) {
    const c = g(t).map(
      (s) => s.toLowerCase()
    );
    for (const s of c) {
      if (s.includes("unknown")) continue;
      const l = s.split(" ");
      if (console.log("term:", s, "words:", l), l.length > 1) {
        const u = s.replace(/\s+/g, " ").trim();
        if (n.replace(/\s+/g, " ").trim().includes(u))
          return console.log("Found multi-word match:", t.id, "term:", s), {
            uuid: crypto.randomUUID(),
            input: r,
            normalized: n,
            ingredient: t
          };
      } else if (n.includes(s))
        return console.log("Found single-word match:", t.id, "term:", s), {
          uuid: crypto.randomUUID(),
          input: r,
          normalized: n,
          ingredient: t
        };
    }
  }
  return o ? (console.log("Using default ingredient:", o), {
    uuid: crypto.randomUUID(),
    input: r,
    normalized: n,
    ingredient: h(e, o)
  }) : {
    uuid: crypto.randomUUID(),
    input: r,
    normalized: n,
    ingredient: void 0
  };
}
function f(e, r) {
  const n = r.toLowerCase(), i = y(
    e.groups,
    n
  ), o = I(
    e.categories,
    n
  );
  return o ? {
    database: p(e, o.categoryId),
    defaultIngredient: o.defaultIngredient
  } : i ? {
    database: m(e, i.groupId),
    defaultIngredient: i.defaultIngredient
  } : {
    database: e,
    defaultIngredient: void 0
  };
}
function m(e, r) {
  const n = Object.entries(e.categories).filter(([o, t]) => t.group === r).reduce(
    (o, [t, c]) => ({
      ...o,
      [t]: c
    }),
    {}
  ), i = Object.entries(e.ingredients).filter(
    ([o, t]) => {
      var c;
      return (c = t.categories) == null ? void 0 : c.some(
        (s) => Object.keys(n).includes(s)
      );
    }
  ).reduce(
    (o, [t, c]) => ({
      ...o,
      [t]: c
    }),
    {}
  );
  return {
    ...e,
    categories: n,
    ingredients: i
  };
}
function p(e, r) {
  const n = Object.entries(e.ingredients).filter(([i, o]) => {
    var t;
    return (t = o.categories) == null ? void 0 : t.includes(r);
  }).reduce(
    (i, [o, t]) => ({
      ...i,
      [o]: t
    }),
    {}
  );
  return {
    categories: {
      [r]: e.categories[r]
    },
    ingredients: n,
    groups: {}
  };
}
function I(e, r) {
  const n = r.toLowerCase(), i = Object.entries(e).find(([c, s]) => {
    var u, a;
    return ((u = s.exclusions) == null ? void 0 : u.some(
      (d) => n.includes(d.toLowerCase())
    )) ? !1 : (a = s.inclusions) == null ? void 0 : a.some(
      (d) => n.includes(d.toLowerCase())
    );
  });
  if (!i) return;
  const [o, t] = i;
  return {
    categoryId: o,
    defaultIngredient: t.defaultIngredient
  };
}
function y(e, r) {
  const n = r.toLowerCase(), i = Object.entries(e).find(([c, s]) => {
    var u, a;
    return ((u = s.exclusions) == null ? void 0 : u.some(
      (d) => n.includes(d.toLowerCase())
    )) ? !1 : (a = s.inclusions) == null ? void 0 : a.some(
      (d) => n.includes(d.toLowerCase())
    );
  });
  if (!i) return;
  const [o, t] = i;
  return {
    groupId: o,
    defaultIngredient: t.defaultIngredient
  };
}
function h(e, r) {
  return e.ingredients[r];
}
function C(e, r) {
  const n = /* @__PURE__ */ new Set();
  return r.forEach((i) => {
    const o = e.categories[i];
    o && n.add(o.group);
  }), Array.from(n);
}
function S(e, r) {
  return e.find((n) => n.id === r);
}
export {
  p as filterDatabaseByCategory,
  m as filterDatabaseByGroup,
  I as findCategoryByInclusion,
  y as findGroupByInclusion,
  w as findIngredient,
  S as findSystemById,
  C as getCategoryGroups,
  h as getIngredientById,
  g as getIngredientTerms,
  f as partitionSearchSpace
};
//# sourceMappingURL=index3.js.map
