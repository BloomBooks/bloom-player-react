export class LocalizationUtils {
    public static getPreferredBookLanguages(body: HTMLBodyElement): string[] {
        const result = new Array<string>();
        // English is always the final fallback
        result.push("en");

        if (!body) {
            return result;
        }

        // Vernacular/Language 1
        const dataDiv = body.querySelector("#bloomDataDiv") as HTMLElement;
        if (!dataDiv) {
            return result;
        }
        const language1: string = (dataDiv.querySelector(
            "div[data-book='contentLanguage1']"
        ) as HTMLElement)!.innerHTML!.trim();
        if (language1) {
            result.splice(0, 0, language1);
        } else {
            return result;
        }

        // Language 2 + 3
        // We could look for contentLanguage2/contentLanguage3 in the datadiv, but that only works for multilingual books.
        // If it isn't a multilingual book, I can only think of one way to get it:
        // find a random element with the appropriate class and look at its lang attribute.
        this.AddLanguageOfElement(result, body, ".bloom-contentNational1");
        this.AddLanguageOfElement(result, body, ".bloom-contentNational2");

        return result;
    }

    private static AddLanguageOfElement(
        languageArray: string[],
        ancestor: HTMLElement,
        querySelector: string
    ) {
        const lang2Element = ancestor.querySelector(
            querySelector
        ) as HTMLElement;
        if (lang2Element && lang2Element.lang) {
            languageArray.splice(
                languageArray.length - 1,
                0,
                lang2Element.lang
            );
        }
    }
}
