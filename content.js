const DEFAULT_URLS = {
    YOUTUBE: 'https://www.youtube.com',
    INSTAGRAM: 'https://www.instagram.com'
};

function blockYouTubeShorts() {
    const shortsLink = document.querySelector('a[href="/shorts"]');
    if (shortsLink) {
        shortsLink.parentElement.remove();
    }

    const shortsElements = document.querySelectorAll('ytd-rich-item-renderer, ytd-reel-item-renderer');
    shortsElements.forEach(element => {
        if (element.querySelector('a[href*="/shorts/"]')) {
            element.remove();
        }
    });

    // TODO: Rather then redirecting GIVE SOME STATIC Image that reminds to stop maybe something motivational
    if (window.location.pathname.startsWith('/shorts/')) {
        window.location.href = DEFAULT_URLS.YOUTUBE;
    }
}

function blockInstagramReels() {
    // Remove Reels from the navigation
    const reelsLink = document.querySelector('a[href="/reels/"]');
    if (reelsLink) {
        reelsLink.parentElement.remove();
    }

    // Block Reels from appearing in the feed
    const reelsElements = document.querySelectorAll('article');
    reelsElements.forEach(element => {
        if (element.querySelector('a[href*="/reel/"]')) {
            element.remove();
        }
    });

    // TODO: Rather then redirecting GIVE SOME STATIC Image that reminds to stop maybe something motivational
    if (window.location.pathname.startsWith('/reels/') || window.location.pathname.startsWith('/reel/')) {
        window.location.href = DEFAULT_URLS.INSTAGRAM;
    }
}

function initializeBlocking() {
    if (window.location.hostname.includes('youtube.com')) {
        blockYouTubeShorts();
        // Set up a mutation observer to continuously block new Shorts
        const observer = new MutationObserver(blockYouTubeShorts);
        observer.observe(document.body, { childList: true, subtree: true });
    } else if (window.location.hostname.includes('instagram.com')) {
        blockInstagramReels();
        // Set up a mutation observer to continuously block new Reels
        const observer = new MutationObserver(blockInstagramReels);
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

initializeBlocking(); 