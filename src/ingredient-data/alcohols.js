const badContains = [
  "alcohol 40-b", 
  "alcohol 40b", 
  "alcohol denat", 
  "alcohol-40b", 
  "denatured alcohol", 
  "ethyl alcohol", 
  "isopropanol", 
  "isopropyl alcohol", 
  "propyl alcohol", 
  "sd alcohol", 
  "sd alcohol 40",
  "sugarcane derived alcohol"
  ]

const badExact = [
  "alcohol", 
  "alcohol 1", 
  "alcohol1", 
  "ethanol", 
  "isopropanol", 
  "propanol"
]

const fullList = badContains.concat(badExact).sort();

const good = [
  "behenyl alcohol",
  "cetearyl alcohol",
  "ceteryl alcohol",
  "cetyl alcohol",
  "isocetyl alcohol",
  "isostearyl alcohol",
  "lauryl alcohol",
  "myristyl alcohol",
  "stearyl alcohol",
  "c30-50 alcohols",
  "lanolin alcohol",
  "benzyl alcohol",
  "stearyl alcohol",
  "aminomethyl propanol",
  "oleyl alcohol",
  "brassica alcohol",
  "benzyl alcohol",
  "arachidyl alcohol",
  "phenethyl alcohol",
  "undecyl alcohol",
  "amyl cinnamyl alcohol",
  "amylcinnamyl alcohol",
  "amino-2-methyl-1-propanol",
  "aminomethyl propanol",
  "amino methyl propanol",
  "c14-22 alcohol",
  "c20-c22 alcohol",
  "phenylpropanol",
  "acetyl alcohol",
  "steareth alcohol",
  "phenyl ethyl alcohol",
  "phenylethyl alcohol",
  "acetylated lanolin alcohol",
  "cinnamyl alcohol",
  "phenethyl alcohol",
  "cinnamic alcohol",
  "behenyl alcohol",
  "pantothenyl alcohol",
  "coconut alcohol",
  "butylene alcohol",
  //misspellings
  "steoryl alcohol"
]

// Possibly bad or caution
const partials = [
  "alcohol"
]


const notAlcohol = [
  "triisopropanolamine"
]

module.exports = {
   badExact,
   badContains,
   fullList,
   good,
   partials,
   notAlcohol
}