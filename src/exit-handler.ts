export const handleExitButton = () => {
    const observer = new MutationObserver(mutations => {
        const nodesAdded = mutations.reduce((acc, m) => acc + m.addedNodes.length, 0);

        if (nodesAdded < 1) return;

        const interval = setInterval(() => {
            const menuElements = document.querySelectorAll('.zylon-provider-2 ytlr-button');
            const exitElement = menuElements[menuElements.length - 1];

            if (!exitElement) return;

            clearInterval(interval);
            chrome.runtime.sendMessage('exit-smart-tv');
        }, 50);
    });

    const interval = setInterval(() => {
        const element = document.querySelector('.zylon-provider-2');

        if (!element) return;

        clearInterval(interval);
        observer.observe(element, { childList: true });
    }, 50);
};
