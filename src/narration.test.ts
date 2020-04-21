import { sortAudioElements } from "./narrationUtils";

// This is a somewhat subtle test. It actually passes if the SUT just returns its input.
// But it will catch things like sorting all the translation groups with no tabindex
// first or last, since there's one before and after the one that has a tabindex.
test("sortAudioElements preserves order", () => {
    const input = document.createElement("div");
    const tg1 = createDiv({
        id: "tg1",
        classAttr: "bloom-translationGroup",
        parent: input
    });
    const be1A = createDiv({
        id: "be1A",
        classAttr: "bloom-editable audio-sentence",
        content: "<p>The first block</p>",
        tabindex: "3",
        parent: tg1
    });

    const tg2 = createDiv({
        id: "tg2",
        classAttr: "bloom-translationGroup",
        tabindex: "2",
        parent: input
    });
    const be2A = createDiv({
        id: "be2A",
        classAttr: "bloom-editable",
        tabindex: "1",
        parent: tg2
    });
    const p2A1 = createPara({ id: "p2A1", classAttr: "", parent: be2A });
    const s2A1A = createSpan({
        id: "s2A1A",
        classAttr: "audio-sentence",
        content: "The first sentence in the second group",
        parent: p2A1
    });
    const s2A1B = createSpan({
        id: "s2A1B",
        classAttr: "audio-sentence",
        content: "The second sentence in the second group",
        parent: p2A1
    });

    const tg3 = createDiv({
        id: "tg1",
        classAttr: "bloom-translationGroup",
        content: "",
        parent: input
    });
    const be3A = createDiv({
        id: "be1A",
        classAttr: "bloom-editable audio-sentence",
        content: "<p>The third block</p>",
        tabindex: "0",
        parent: tg3
    });

    const toSort = [be1A, s2A1A, s2A1B, be3A];
    const output = sortAudioElements(toSort);
    expect(output[0]).toEqual(be1A);
    expect(output[1]).toEqual(s2A1A);
    expect(output[2]).toEqual(s2A1B);
    expect(output[3]).toEqual(be3A);
});

test("sortAudioElements re-orders sentences and blocks", () => {
    const input = document.createElement("div");
    const tg1 = createDiv({
        id: "tg1",
        classAttr: "bloom-translationGroup",
        tabindex: "1001",
        parent: input
    });
    const be1A = createDiv({
        id: "be1A",
        classAttr: "bloom-editable audio-sentence",
        content: "<p>The first block (read fifth)</p>",
        tabindex: "1000",
        parent: tg1
    });

    const tg2 = createDiv({
        id: "tg2",
        classAttr: "bloom-translationGroup",
        tabindex: "101",
        parent: input
    });
    const be2A = createDiv({
        id: "be2A",
        classAttr: "bloom-editable audio-sentence",
        tabindex: "23",
        parent: tg2
    });
    const p2A1 = createPara({ id: "p2A1", classAttr: "", parent: be2A });
    const s2A1A = createSpan({
        id: "s2A1A",
        classAttr: "audio-sentence",
        content: "The first sentence in the second group (read ",
        parent: p2A1
    });
    const s2A1B = createSpan({
        id: "s2A1B",
        classAttr: "audio-sentence",
        content: "The second sentence in the second group",
        parent: p2A1
    });

    const tg3 = createDiv({
        id: "tg1",
        classAttr: "bloom-translationGroup",
        tabindex: "11",
        parent: input
    });
    const be3A = createDiv({
        id: "be1A",
        classAttr: "bloom-editable audio-sentence",
        tabindex: "0",
        parent: tg3
    });
    const p3A1 = createPara({
        id: "p3A1",
        classAttr: "",
        tabindex: "",
        parent: be3A
    });
    const s3A1A = createSpan({
        id: "s3A1A",
        classAttr: "audio-sentence",
        content: "The first sentence in the third group (read first)",
        parent: p3A1
    });
    const s3A1B = createSpan({
        id: "s3A1B",
        classAttr: "audio-sentence",
        content: "The second sentence in the thrid group (read second)",
        parent: p3A1
    });
    const toSort = [be1A, s2A1A, s2A1B, s3A1A, s3A1B];
    const output = sortAudioElements(toSort);
    expect(output[0]).toEqual(s3A1A);
    expect(output[1]).toEqual(s3A1B);
    expect(output[2]).toEqual(s2A1A);
    expect(output[3]).toEqual(s2A1B);
    expect(output[4]).toEqual(be1A);
});

test("sortAudioElements re-orders blocks", () => {
    const input = document.createElement("div");
    const tg1 = createDiv({
        id: "tg1",
        classAttr: "bloom-translationGroup",
        tabindex: "1000",
        parent: input
    });
    const be1A = createDiv({
        id: "be1A",
        classAttr: "bloom-editable audio-sentence",
        content: "<p>The first block (read third)</p>",
        tabindex: "3",
        parent: tg1
    });

    const tg2 = createDiv({
        id: "tg2",
        classAttr: "bloom-translationGroup",
        tabindex: "101",
        parent: input
    });
    const be2A = createDiv({
        id: "be2A",
        classAttr: "bloom-editable audio-sentence",
        content: "<p>The second block (read second)</p>",
        tabindex: "8000",
        parent: tg2
    });

    const tg3 = createDiv({
        id: "tg1",
        classAttr: "bloom-translationGroup",
        tabindex: "11",
        parent: input
    });
    const be3A = createDiv({
        id: "be1A",
        classAttr: "bloom-editable audio-sentence",
        content: "<p>The third block (read first)</p>",
        tabindex: "0",
        parent: tg3
    });

    const toSort = [be1A, be2A, be3A];
    const output = sortAudioElements(toSort);
    expect(output[0]).toEqual(be3A);
    expect(output[1]).toEqual(be2A);
    expect(output[2]).toEqual(be1A);
});

function createDiv({
    id,
    classAttr,
    content,
    tabindex,
    parent
}: {
    id: string;
    classAttr: string;
    content?: string;
    tabindex?: string;
    parent?: HTMLElement;
}): HTMLElement {
    return createElement({
        tag: "div",
        id,
        classAttr,
        content,
        tabindex,
        parent
    });
}

function createSpan(params: {
    id: string;
    classAttr: string;
    content?: string;
    tabindex?: string;
    parent?: HTMLElement;
}): HTMLElement {
    return createElement({
        tag: "span",
        ...params
    });
}

function createPara(params: {
    id: string;
    classAttr: string;
    content?: string;
    tabindex?: string;
    parent?: HTMLElement;
}): HTMLElement {
    return createElement({
        tag: "p",
        ...params
    });
}

function createElement({
    tag,
    id,
    classAttr,
    content,
    tabindex,
    parent
}: {
    tag: string;
    id: string;
    classAttr: string;
    content?: string;
    tabindex?: string;
    parent?: HTMLElement;
}): HTMLElement {
    const result = document.createElement(tag);
    result.setAttribute("id", id);
    result.setAttribute("class", classAttr);
    if (tabindex) {
        result.setAttribute("tabindex", tabindex);
    }
    if (content) {
        result.innerHTML = content;
    }
    if (parent) {
        parent.appendChild(result);
    }
    return result;
}
