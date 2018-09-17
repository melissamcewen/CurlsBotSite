
const silicones = require('./silicones');

const list = "peg-8 distearmonium chloride pg-dimethicone, cetearyl methicone, silicone, cyclomethicone, aminopropyl triethoxysilane, PEG/PPG-18/18 Dimethicone, Dimethicone, PEG-12 Dimethicone, silicone, Lauryl PEG / PPG - 18 / 18 Methicone, , triethoxysilane, coney, mdimethicon, peg-40 hydrogenated castor oil, trimethylsiloxysilicate";



test('should detect and classify silicones', () => {
  var result =  {"bad": ["cetearyl methicone", "silicone", "cyclomethicone", "aminopropyl triethoxysilane", "dimethicone", "silicone", "triethoxysilane", "coney", "mdimethicon", "trimethylsiloxysilicate"], "caution": ["peg-8 distearmonium chloride pg-dimethicone", "pegppg-1818 dimethicone", "peg-12 dimethicone", "lauryl peg  ppg - 18  18 methicone"], "good": [], "unknown": []}
  expect(silicones(list)).toEqual(result);
});
