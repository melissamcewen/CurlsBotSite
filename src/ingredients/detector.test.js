const detector = require('./detector');

const data =  {"alcohol": {"bad": [], "good": [], "unknown": []}, "other": {"bad": [], "good": [], "unknown": []}, "silicones": {"bad": ["trisiloxane", "dimethicone"], "good": [], "unknown": ["test"]}, "sulfates": {"bad": [], "good": [], "unknown": []}, "wax": {"bad": [], "good": [], "unknown": []}}
;

test('should show as bad when the results contain bad ingredients', () => {

  expect(detector(data)).toEqual("bad");
});


const data2 =  {"alcohol": {"bad": [], "good": [], "unknown": []}, "other": {"bad": [], "good": [], "unknown": []}, "silicones": {"bad": [], "good": [], "unknown": ["test"]}, "sulfates": {"bad": [], "good": [], "unknown": []}, "wax": {"bad": [], "good": [], "unknown": []}}
;

test('should show as unknown when the results contain unknown but no bad ingredients', () => {

  expect(detector(data2)).toEqual("unknown");
});


const data3 =  {"alcohol": {"bad": [], "good": ["test"], "unknown": []}, "other": {"bad": [], "good": [], "unknown": []}, "silicones": {"bad": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "good": ["test", "test2"], "unknown": []}, "wax": {"bad": [], "good": [], "unknown": []}}
;

test('should show as good when the results have no bad or good ingredients', () => {

  expect(detector(data3)).toEqual("good");
});


const data4 = "";
test('should properly handle empty data', () => {
  expect(detector(data4)).toEqual("");
});



