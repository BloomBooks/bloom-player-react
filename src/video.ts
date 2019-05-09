// class Video contains functionality to get videos to play properly in bloom-player

export class Video {
    private paused: boolean = false;
    private currentPage: HTMLElement;

    public static pageHasVideo(page: HTMLDivElement): boolean {
        return !!(page.getElementsByTagName("video").length);
    }

    private static getVideoElements(page: HTMLDivElement) {
        const videoElements = page.getElementsByTagName("video");
        const resultElements: HTMLVideoElement[] = [];
        for (let i = 0; i < videoElements.length; i++) {
            resultElements.push(videoElements[i]);
        }
        return resultElements;
    }

    // Work we prefer to do before the page is visible. This makes sure that when the video
    // is loaded it will begin to play automatically.
    public HandlePageBeforeVisible(page: HTMLElement) {
        this.currentPage = page;
        this.paused = false;
        const videoElements = Video.getVideoElements(page as HTMLDivElement);
        console.log("Video.HandlePageBeforeVisible found " + videoElements.length);
        videoElements.forEach(vidElement => {
            if (vidElement.hasAttribute("controls")) {
                vidElement.removeAttribute("controls");
            }
            if (!vidElement.hasAttribute("autoplay")) {
                vidElement.setAttribute("autoplay", "true");
            }
            if (!vidElement.hasAttribute("muted")) {
                vidElement.setAttribute("muted", "true");
            }
            if (!vidElement.hasAttribute("playsinline")) {
                vidElement.setAttribute("playsinline", "true");
            }
        });
    }

    private getSelectedVideo(): HTMLVideoElement | undefined {
        const selectedVideos = this.currentPage.getElementsByClassName("bloom-videoContainer bloom-selected");
        if (selectedVideos.length === 0) {
            return undefined;
        }
        // There should only be one...
        const container = selectedVideos[0];
        const videoElements = container.getElementsByTagName("video");
        return (videoElements.length === 0) ? undefined : videoElements[0];
    }

    // Assuming 'autoplay' attribute is working correctly, this should only be needed to "unpause" paused video.
    public play() {
        if (!this.paused) {
            return; // no change.
        }
        const videoElement = this.getSelectedVideo();
        if (!videoElement) {
            return; // no change
        }
        videoElement.play();
        this.paused = false;
    }

    public pause() {
        if (this.paused) {
            return;
        }
        const videoElement = this.getSelectedVideo();
        if (!videoElement) {
            return; // no change
        }
        videoElement.pause();
        this.paused = true;
    }
}
