const requests = {
    OPEN_SMART_TV: 'open-smart-tv',
    OPEN_SMART_TV_WITH_URI: 'open-smart-tv-with-uri',
    SET_SMART_TV_PLAYER_BUTTON: 'set-smart-tv-player-button',
    CLOSE_SMART_TV: 'close-smart-tv'
} as const;

export type Request = (typeof requests)[keyof typeof requests];

export default requests;
