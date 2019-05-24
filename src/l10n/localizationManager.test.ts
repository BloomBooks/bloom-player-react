import { LocalizationManager } from "./localizationManager";

test("simple localization of text", () => {
    LocalizationManager.setUp();

    const wrapper = document.createElement("div");

    const div = document.createElement("div");
    div.setAttribute("data-i18n", "Sample.ID");
    div.innerHTML = "Sample English Text";

    wrapper.appendChild(div);

    LocalizationManager.localize(wrapper, ["xyz", "fr", "en"]);
    expect(div.innerHTML).toEqual("Sample French Text");
});
