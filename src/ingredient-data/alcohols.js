const badContains = [
  "denatured alcohol",
  "sd alcohol 40",
  "sd alcohol",
  "propyl alcohol",
  "isopropyl alcohol",
  "alcohol 40-b",
  "alcohol denat",
  "alcohol 40b",
  "ethyl alcohol",
  "isopropanol",
  "alcohol-40b"

]

const badExact = [
  "alcohol",
  "alcohol1",
  "isopropanol",
  "ethanol",
  "propanol",
  "alcohol 1"
] 


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
  "cetyl alcohol2 polysorbate 60",
  "benzyl alcohol",
  "arachidyl alcohol",
  "phenethyl alcohol",
  "undecyl alcohol",
  "amyl cinnamyl alcohol",
  "amylcinnamyl alcohol",
  "amino-2-methyl-1-propanol",
  "aminomethyl propanol",
  "amino methyl propanol",
  "c14-22 alcohols",
  "phenylpropanol",
  "acetyl alcohol",
  "steareth alcohol",
  "phenyl ethyl alcohol",
  "phenylethyl alcohol",
  "acetylated lanolin alcohol",
  "cinnamyl alcohol",
  "phenethyl alcohol"
]

// Possibly bad or caution
const partials = [
  "alcohol"
]





module.exports = {
   badExact,
   badContains,
   good,
   partials
}