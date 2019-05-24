import i18nData = require("./i18n.json");

// Handles loading and retrieving of localization data.
//
// i18n.json contains all the translation information.
// Ideally, we will build that file from Crowdin (or git)
// at build time. However, we only have one string currently,
// it is for legacy quizzes, and we're not even sure we will
// add more strings in the future (as we are going to use icons
// whenever possible). So today it is maintained manually
// using approved translations from Crowdin. Last updated 6/10/19.
class LocalizationManagerClass {
    private l10nDictionary: Map<string, Map<string, string>> = new Map();

    private isSetup: boolean = false;

    // Set up the l10n dictionary. If this is not called first, localize will do nothing.
    public setUp() {
        if (this.isSetup) {
            return;
        }
        this.isSetup = true;
        Object.keys(i18nData).forEach(key => {
            const translations = i18nData[key];
            const translationsMap = new Map();
            Object.keys(translations).forEach(language => {
                translationsMap.set(language, translations[language]);
            });
            this.l10nDictionary.set(key, translationsMap);
        });
    }

    // Find all elements which are descendents of the given element and localize them.
    // preferredLanguages is an ordered array such that we use the most preferred language
    // for which a translation exists (on an element by element basis).
    public localize(
        ancestorElement: HTMLElement,
        preferredLanguages: string[]
    ): void {
        const elementsToTranslate = ancestorElement.querySelectorAll(
            "[data-i18n]"
        );
        if (elementsToTranslate) {
            elementsToTranslate.forEach(elementToTranslate => {
                this.setElementText(
                    elementToTranslate as HTMLElement,
                    preferredLanguages
                );
            });
        }
    }

    private setElementText(
        element: HTMLElement,
        preferredLanguages: string[]
    ): void {
        const key = element.dataset["i18n"];
        if (!key) {
            return;
        }

        const text = this.getText(key, preferredLanguages);
        if (text) {
            element.innerHTML = text;
        }
    }

    // Get the translation for the given l10n ID in the most preferred language
    // for which we have a translation.
    public getText(
        id: string,
        preferredLanguages: string[]
    ): string | undefined {
        const translations = this.l10nDictionary.get(id);
        if (translations) {
            const english = translations.get("en");
            if (!english) {
                return undefined;
            }
            for (let i: number = 0; i < preferredLanguages.length; i++) {
                if (preferredLanguages[i] === "en") {
                    return english;
                }
                const possibleTranslation = translations.get(
                    preferredLanguages[i]
                );
                if (possibleTranslation && possibleTranslation !== english) {
                    return possibleTranslation;
                }
            }
            return english;
        }
        return undefined;
    }
}

// This is the one instance of this class.
export const LocalizationManager = new LocalizationManagerClass();
