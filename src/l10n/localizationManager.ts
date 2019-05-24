class LocalizationManagerClass {
    private isInitialized: boolean = false;
    private l10nDictionary: Map<string, string>;
    private elementsToLocalizeWhenInitialized: HTMLElement[] = [];

    public getText(id: string): string | undefined {
        return this.l10nDictionary.get(id);
    }

    public setDictionary(l10nData: any) {
        this.l10nDictionary = new Map(Object.entries(l10nData));

        this.isInitialized = true;

        if (this.elementsToLocalizeWhenInitialized.length) {
            this.elementsToLocalizeWhenInitialized.forEach(element => {
                this.localize(element);
            });
        }
        this.elementsToLocalizeWhenInitialized = [];
    }

    public localize(element: HTMLElement): void {
        if (!this.isInitialized) {
            this.elementsToLocalizeWhenInitialized.push(element);
            return;
        }

        const elementsToTranslate = element.querySelectorAll("[data-i18n]");
        if (elementsToTranslate) {
            elementsToTranslate.forEach(elementToTranslate => {
                this.setElementText(elementToTranslate as HTMLElement);
            });
        }
    }

    private setElementText(element: HTMLElement): void {
        const key = element.dataset["i18n"];
        if (!key) {
            return;
        }

        const text = this.getText(key);
        if (text) {
            element.innerHTML = text;
        }
    }
}

// This is the one instance of this class.
export const LocalizationManager = new LocalizationManagerClass();
