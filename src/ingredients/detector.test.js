const detector = require('./detector');

const data =   {"alcohol": {"bad": ["test"], "caution": [], "good": [], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}}
;

test('should show as bad when the results contain bad ingredients', () => {

  expect(detector(data)).toEqual("bad");
});


const data2 =  {"alcohol": {"bad": [], "caution": [], "good": [], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": [], "unknown": ["test"]}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}}

test('should show as unknown when the results contain unknown but no bad ingredients', () => {

  expect(detector(data2)).toEqual("unknown");
});


const data3 =   {"alcohol": {"bad": [], "caution": [], "good": [], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}}
;

test('should show as good when the results have no bad or good ingredients', () => {

  expect(detector(data3)).toEqual("good");
});


const data4 = "";
test('should properly handle empty data', () => {
  expect(detector(data4)).toEqual("");
});



