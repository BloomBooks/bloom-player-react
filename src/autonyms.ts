// tslint:disable-next-line: no-submodule-imports
import autonymData from "raw-loader!./iso639-autonyms.tsv";

// This class handles retrieving data from the 'iso639-autonyms.tsv' file.
export class AutonymHandler {
    private static singleton: AutonymHandler;
    private autonymArray: object;
    private twoLetterTothreeLetterIndex: object;

    public static getAutonymHandler(): AutonymHandler {
        if (!AutonymHandler.singleton) {
            AutonymHandler.singleton = new AutonymHandler();
            AutonymHandler.singleton.init();
        }
        return this.singleton;
    }

    private constructor() {
        this.autonymArray = {};
        this.twoLetterTothreeLetterIndex = {};
    }

    private init() {
        //console.log("Starting AutonymHandler load...");
        const rows: string[] = autonymData.split("\n");
        let index = 1; // first row is header info.
        while (index < rows.length) {
            const currentRow = rows[index];
            if (!currentRow) {
                break;
            }
            const parts = currentRow.split("\t");
            const row = { autonym: parts[3], english: parts[2] };
            this.autonymArray[parts[0]] = row;
            if (parts[1] && parts[1] !== "") {
                this.twoLetterTothreeLetterIndex[parts[1]] = parts[0];
            }
            index++;
        }
        //console.log("Loaded AutonymHandler...");
    }

    // Returns an object containing two strings: autonym and English name
    public getAutonymDataFor(
        code: string
    ): { autonym: string; english: string } {
        const failure = { autonym: "", english: "" };
        //console.log("Processing code to get autonym data...");
        let internalCode = this.processCode(code);
        if (internalCode === "") {
            return failure;
        }
        // 2-letter ISO code
        if (internalCode.length === 2) {
            // Find 3-letter code
            internalCode = this.twoLetterTothreeLetterIndex[internalCode];
        }
        // 3-letter ISO code
        return this.autonymArray[internalCode]
            ? this.autonymArray[internalCode]
            : failure;
    }

    private processCode(code: string): string {
        if (code.length === 2) {
            return code;
        }
        const splitCode = code.split("-")[0]; // in case of some complicated Regional, Script, Variant stuff
        if (splitCode.length < 4) {
            return splitCode;
        }
        return ""; // failed to get a decent iso639 code
    }
}

export default AutonymHandler;
