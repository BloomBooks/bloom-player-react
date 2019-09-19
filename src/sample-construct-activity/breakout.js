"use strict";

export function activityRequirements() {
    return {
        dragging: true,
        clicking: false,
        typing: false
    };
}

export default class BreakoutActivity {
    // When a page that has this activity becomes the selected one, the bloom-player calls this.
    // We need to connect any listeners, start animation, etc. Here,
    // we are using a javascript class to make sure that we get a fresh start,
    // which is important because the user could be either
    // coming back to this page, or going to another instance of this activity
    // in a subsequent page.
    // eslint-disable-next-line no-unused-vars
    constructor(pageElement) {}
}