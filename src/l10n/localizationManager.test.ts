import { LocalizationManager } from "./localizationManager";

beforeAll(() => {
    LocalizationManager.setUp({
        "Sample.ID": { en: "Sample English Text", fr: "Sample French Text" }
    });
});

test("simple localization of text", () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("bloom-page");

    const div = document.createElement("div");
    div.setAttribute("data-i18n", "Sample.ID");
    div.innerText = "Sample English Text";

    wrapper.appendChild(div);

    LocalizationManager.localizePages(wrapper, ["xyz", "fr", "en"]);
    expect(div.innerText).toEqual("Sample French Text");
    expect(div.getAttribute("lang")).toEqual("fr");
});
