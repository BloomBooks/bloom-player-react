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
        // If it isn't a multilingual book, we can find a random element with the appropriate class and look at its lang attribute.
        //
        // There is another potential way to get these values currently: from settingsCollectionStyles.css.
        // Two possibilities exist.
        // 1. Iterate document.styleSheets.
        //       PRO: Structured way to walk through the data.
        //       CON: Very difficult (impossible?) to determine when the relevant stylesheet has been loaded.
        //       CON: By the time we get this, it has lost its relationship to settingsCollectionStyles.css,
        //            so we are basically parsing all rules hoping/guessing we are making sense of them correctly.
        // 2. http get the file from the book directory.
        //       PRO: Just looking at that one specific file.
        //       CON: Asyncronous!
        //       CON: Would rely on regex to parse file.
        //
        // After evaluating all these options, I settled on this method (hacky as it is).
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
