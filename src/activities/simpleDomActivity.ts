// A "DOM activity" is one that interacts with the html of a page

export default class SimpleDomActivity {
    private listeners = new Array<{
        name: string;
        target: Element;
        listener: EventListener;
    }>();

    private pageElement: HTMLElement;
    // When a page that has this activity becomes the selected one, the bloom-player calls this.
    // We need to connect any listeners, start animation, etc. Here,
    // we are using a javascript class to make sure that we get a fresh start,
    // which is important because the user could be either
    // coming back to this page, or going to another instance of this activity
    // in a subsequent page.
    // eslint-disable-next-line no-unused-vars
    constructor(pageElement: HTMLElement) {
        console.log("SimpleDomActivity activity constructed");
        this.pageElement = pageElement;
    }

    public start() {
        console.log("SimpleDomActivity activity start");

        // in the future, Bloom could offer some special style. For this experiment,
        // we're just reusing and existing one.
        const classForButtons = "bloom-borderstyle-black-round";
        this.pageElement
            .querySelectorAll("." + classForButtons)
            .forEach((translationGroup: HTMLElement) => {
                this.removeClass(translationGroup, classForButtons);
                const correct =
                    translationGroup.querySelector(".Correct-style") != null;
                const button = document.createElement("button");
                translationGroup.parentNode!.insertBefore(
                    button,
                    translationGroup
                );
                // review: this clone and the removeChild shouldn't be needed, but they are
                const clone = translationGroup.cloneNode(true);
                button.appendChild(clone);
                translationGroup.parentNode!.removeChild(translationGroup);

                this.addEventListener(
                    "click",
                    button,
                    correct
                        ? SimpleDomActivity.onCorrectClick
                        : SimpleDomActivity.onWrongClick
                );
            });
    }
    public static onCorrectClick(evt: Event) {
        console.log("********* COrrect");
    }
    public static onWrongClick(evt: Event) {
        console.log("********* Wrong");
    }
    private addEventListener(
        name: string,
        target: Element,
        listener: EventListener
    ) {
        this.listeners.push({ name, target, listener });
        target.addEventListener(name, listener);
    }
    // When our page is not the selected one, the bloom-player calls this.
    // We need to disconnect any listeners.
    public stop() {
        this.listeners.forEach(l =>
            l.target.removeEventListener(l.name, l.listener)
        );
    }

    private removeClass(el: HTMLElement, className: string) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(
                new RegExp("\\b" + className + "\\b", "g"),
                ""
            );
        }
    }
}

export function activityRequirements() {
    return {
        dragging: false,
        clicking: true,
        typing: false
    };
}
