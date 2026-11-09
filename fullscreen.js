// Shared fullscreen toggling and button injection for all pages
(function () {
    const FULLSCREEN_INTENT_KEY = 'fullscreenIntent';
    let explicitExitInProgress = false;

    // Inline SVG icon that matches the "four-corner" fullscreen glyph.
    const ICON_SVG = `
        <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M9 3H6a1 1 0 0 0-1 1v3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M15 3h3a1 1 0 0 1 1 1v3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M9 21H6a1 1 0 0 1-1-1v-3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M15 21h3a1 1 0 0 0 1-1v-3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
    `;

    function isFullscreenIntentEnabled() {
        return localStorage.getItem(FULLSCREEN_INTENT_KEY) === 'true';
    }

    function setFullscreenIntent(enabled) {
        localStorage.setItem(FULLSCREEN_INTENT_KEY, enabled ? 'true' : 'false');
    }

    function enterFullscreen() {
        if (document.fullscreenElement) {
            return Promise.resolve();
        }

        return document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    }

    function exitFullscreen() {
        if (!document.fullscreenElement) {
            return Promise.resolve();
        }

        return document.exitFullscreen().catch(err => {
            console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
    }

    function toggleFullscreen() {
        if (isFullscreenIntentEnabled()) {
            setFullscreenIntent(false);
            explicitExitInProgress = true;
            exitFullscreen();
            return;
        }

        setFullscreenIntent(true);
        enterFullscreen();
    }

    function resumeFullscreenIfNeeded() {
        if (!isFullscreenIntentEnabled() || document.fullscreenElement) {
            return;
        }

        enterFullscreen();
    }

    function scheduleResumeFullscreen() {
        setTimeout(resumeFullscreenIfNeeded, 0);
    }

    function bindFullscreenResumeHandlers() {
        const activationEvents = ['click', 'keydown', 'touchstart', 'pointerdown'];

        activationEvents.forEach(eventName => {
            window.addEventListener(eventName, resumeFullscreenIfNeeded, { passive: true });
        });

        window.addEventListener('pageshow', scheduleResumeFullscreen);
        window.addEventListener('focus', scheduleResumeFullscreen);

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                scheduleResumeFullscreen();
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                explicitExitInProgress = false;
                return;
            }

            if (explicitExitInProgress) {
                explicitExitInProgress = false;
                return;
            }

            scheduleResumeFullscreen();
        });
    }

    function setButtonIcon(btn) {
        if (!btn) return;
        btn.setAttribute('aria-label', 'Toggle Fullscreen');
        // Replace inner content with the inline SVG so it's consistent across pages
        btn.innerHTML = ICON_SVG;
    }

    function createButtonIfMissing() {
        if (!document.querySelector('.fullscreen-btn')) {
            const btn = document.createElement('button');
            btn.className = 'fullscreen-btn';
            btn.title = 'Toggle Fullscreen';
            setButtonIcon(btn);
            document.body.appendChild(btn);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Ensure any existing button uses the new SVG icon
        document.querySelectorAll('.fullscreen-btn').forEach(setButtonIcon);

        createButtonIfMissing();
        bindFullscreenResumeHandlers();
        resumeFullscreenIfNeeded();

        // Delegate clicks to any element with .fullscreen-btn
        document.body.addEventListener('click', (e) => {
            if (e.target.closest && e.target.closest('.fullscreen-btn')) {
                toggleFullscreen();
            }
        });
    });

})();
