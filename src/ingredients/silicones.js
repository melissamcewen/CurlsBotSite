const parser = require('./parser');

const unknown = [
  "cone",
  "dimethicon"
];


const bad = [
  "dimethicone",
  "bisaminopropyl dimethicone",
  "cetearyl methicone",
  "cetyl dimethicone",
  "cyclopentasiloxane",
  "stearoxy dimethicone",
  "stearyl dimethicone",
  "trimethylsilylamodimethicone",
  "amodimethicone",
  "dimethiconol",
  "behenoxy dimethicone",
  "phenyl trimethicone",
  "aminopropyl triethoxysilane",
  "silicone",
  "bis-aminopropyl dimethicone",
  "polysilicone-22",
  "trimethylsiloxyamodimethicone",
  "silica dimethicone silylate",
  "cetrimonium dimethicone peg-8 olivate."
];

/// todo refactor to detect quart and peg silicone better
const good =  [
  "peg-dimethicone",
  "peg-8 distearmonium chloride pg-dimethicone",
  "dimethicone copolyol",
  "dimethicone-pg diethylmonium chloride",
  "pg-dimethicone", 
  "glycidoxy dimethicone crosspolymer", 
  "dimethicone hydroxypropyl trimonium chloride", 
  "hydroxyethyl acetomonium pg-dimethicone", 
  "stearalkonium dimethicone peg-8 phthalate", 
  "steardimonium hydroxypropyl panthenyl peg-7 dimethicone phosphate chloride",
  "silicone quaternium-1", 
  "silicone quaternium-2", 
  "silicone quaternium-2 panthenol succinate", 
  "silicone quaternium-3", 
  "silicone quaternium-4", 
  "silicone quaternium-5", 
  "silicone quaternium-6", 
  "silicone quaternium-7", 
  "silicone quaternium-8", 
  "silicone quaternium-9", 
  "silicone quaternium-10", 
  "silicone quaternium-11", 
  "silicone quaternium-12", 
  "silicone quaternium-15", 
  "silicone quaternium-16", 
  "silicone quaternium-16",
  "silicone quaternium 2", 
  "silicone quaternium 2 panthenol succinate", 
  "silicone quaternium 3", 
  "silicone quaternium 4", 
  "silicone quaternium 5", 
  "silicone quaternium 6", 
  "silicone quaternium 7", 
  "silicone quaternium 8", 
  "silicone quaternium 9", 
  "silicone quaternium 10", 
  "silicone quaternium 11", 
  "silicone quaternium 12", 
  "silicone quaternium 15", 
  "silicone quaternium 16", 
  "silicone quaternium 16",
  "silicone quaternium-18", 
  "silicone quaternium-19", 
  "silicone quaternium-20", 
  "silicone quaternium-21",
  "silicone quaternium 18", 
  "silicone quaternium 19", 
  "silicone quaternium 20", 
  "silicone quaternium 21",
  "peg-8 dimethicone",
  "peg-12 dimethicone",
  "peg-14 dimethicone",
  "peg-20 dimethicone",
  "peg-15 dimethicone",
  "dimethicone peg-8 meadowfoamate"
];

function silicones(list) {
  return parser(list, unknown, good, bad);
}

module.exports = silicones;
