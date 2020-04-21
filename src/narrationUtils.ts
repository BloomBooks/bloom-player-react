// We need to sort these by the tabindex of the containing bloom-translationGroup element.
// We need a stable sort, which array.sort() does not provide: elements in the same
// bloom-translationGroup, or where the translationGroup does not have a tabindex,
// should remain in their current order.
// This function was extracted from the narration.ts file for testing:
// I was not able to import the narration file into the test suite because
// MutationObserver is not emulated in the test environment.
export function sortAudioElements(input: HTMLElement[]): HTMLElement[] {
    const keyedItems = input.map((item, index) => {
        return { tabindex: getTgTabIndex(item), index, item };
    });
    keyedItems.sort((x, y) => {
        // If either is not in a translation group with a tabindex,
        // order is determined by their original index.
        // Likewise if the tabindexes are the same.
        if (!x.tabindex || !y.tabindex || x.tabindex === y.tabindex) {
            return x.index - y.index;
        }
        // Otherwise, determined by the numerical order of tab indexes.
        return parseInt(x.tabindex, 10) - parseInt(y.tabindex, 10);
    });
    return keyedItems.map(x => x.item);
}

function getTgTabIndex(input: HTMLElement): string | null {
    let tg: HTMLElement | null = input;
    while (tg && !tg.classList.contains("bloom-translationGroup")) {
        tg = tg.parentElement;
    }
    if (!tg) {
        return null;
    }
    return tg.getAttribute("tabindex");
}
