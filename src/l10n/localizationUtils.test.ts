import { LocalizationUtils } from "./localizationUtils";

test("getPreferredBookLanguages", () => {
    const body = document.createElement("body");

    body.innerHTML = `
    <div id="bloomDataDiv">
        <div data-book="contentLanguage1" lang="*">
            aaa
        </div>
    </div>
    <div class="bloom-page">
        <div class="marginBox">
            <div class="bloom-translationGroup bookTitle" data-default-languages="V,N1">
                <label class="bubble">Book title in {lang}</label>
                <div class="bloom-editable bloom-nodefaultstylerule Title-On-Cover-style bloom-padForOverflow bloom-contentNational2" lang="ccc" contenteditable="true" data-book="bookTitle"></div>
                <div class="bloom-editable bloom-nodefaultstylerule Title-On-Cover-style bloom-padForOverflow bloom-content1 bloom-visibility-code-on" lang="aaa" contenteditable="true" data-book="bookTitle"></div>
                <div class="bloom-editable bloom-nodefaultstylerule Title-On-Cover-style bloom-padForOverflow bloom-content2 bloom-contentNational1 bloom-visibility-code-on" lang="bbb" contenteditable="true" data-book="bookTitle">
                    <p>The Moon and the Cap</p>
                </div>
            </div>
        </div>
    </div>`;

    const preferredLanguages = LocalizationUtils.getPreferredBookLanguages(
        body
    );

    expect(preferredLanguages.length).toEqual(4);
    expect(preferredLanguages[0]).toEqual("aaa");
    expect(preferredLanguages[1]).toEqual("bbb");
    expect(preferredLanguages[2]).toEqual("ccc");
    expect(preferredLanguages[3]).toEqual("en"); // English is always the final fallback
});
