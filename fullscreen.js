// Shared fullscreen toggling and button injection for all pages
(function () {
    // Inline SVG icon that matches the "four-corner" fullscreen glyph.
    const ICON_SVG = `
        <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M9 3H6a1 1 0 0 0-1 1v3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M15 3h3a1 1 0 0 1 1 1v3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M9 21H6a1 1 0 0 1-1-1v-3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M15 21h3a1 1 0 0 0 1-1v-3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
    `;

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit fullscreen: ${err.message}`);
            });
        }
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

        // Delegate clicks to any element with .fullscreen-btn
        document.body.addEventListener('click', (e) => {
            if (e.target.closest && e.target.closest('.fullscreen-btn')) {
                toggleFullscreen();
            }
        });
    });

    // Expose for inline handlers if any page still uses onclick="toggleFullscreen()"
    window.toggleFullscreen = toggleFullscreen;
})();
