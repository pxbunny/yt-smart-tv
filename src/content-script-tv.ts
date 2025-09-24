import requests from 'requests';

document.addEventListener(
    'keydown',
    event => {
        if (event.key === 'Escape' || event.key === 'Backspace')
            chrome.runtime.sendMessage(requests.CLOSE_SMART_TV);
    },
    true
);
