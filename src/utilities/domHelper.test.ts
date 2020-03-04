import { DomHelper } from "./domHelper";

const cases = [
    ["url('abc.jpg')", , "abc.jpg"],
    ['url("abc.jpg")', , "abc.jpg"],
    [" url('abc') ", , "abc"],
    ["url('abc(1).jpg')", , "abc(1).jpg"],
    ["url('abc - (1).jpg')", , "abc - (1).jpg"],
    ["url('abc%20-%20(1).jpg')", , "abc%20-%20(1).jpg"],
    ["inherit", , ""],
    ["", , ""]
];
test.each(cases)(
    "getActualUrlFromCSSPropertyValue",
    (input1, input2, expected) => {
        expect(input1);
        if (!input1) {
            return;
        }

        expect(DomHelper.getActualUrlFromCSSPropertyValue(input1)).toEqual(
            expected
        );
    }
);
