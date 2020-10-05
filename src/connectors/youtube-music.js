'use strict';

const playButtonSelector = '.ytmusic-player-bar.play-pause-button #icon > svg > g > path';
const trackArtSelector = '.ytmusic-player-bar.image';
const channelNameSelector = 'ytmusic-player-queue-item[selected] .byline';
const trackSelector = 'ytmusic-player-queue-item[selected] .song-title';
const adSelector = '.ytmusic-player-bar.advertisement';

const playingPath = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z';

Connector.playerSelector = 'ytmusic-player-bar';

Connector.getTrackArt = () => {
	const trackArtUrl = Util.extractImageUrlFromSelectors(trackArtSelector);
	if (trackArtUrl) {
		return trackArtUrl.substring(0, trackArtUrl.lastIndexOf('='));
	}
	return null;
};

Connector.albumSelector = [
	'.ytmusic-player-bar .yt-formatted-string.style-scope.yt-simple-endpoint[href*="browse/MPREb_"]',
	'.ytmusic-player-bar .yt-formatted-string.style-scope.yt-simple-endpoint[href*="browse/FEmusic_library_privately_owned_release_detailb_"]',
];

function videoHasAlbum() {
	return !!Connector.getAlbum();
}

Connector.getArtistTrack = () => {
	let artist; let track;
	if (videoHasAlbum()) {
		artist = Util.getTextFromSelectors(channelNameSelector);
		track = Util.getTextFromSelectors(trackSelector);
	} else {
		({ artist, track } = Util.processYtVideoTitle(Util.getTextFromSelectors(trackSelector)));
		if (!artist) {
			artist = Util.getTextFromSelectors(channelNameSelector);
		}
	}
	return { artist, track };
};

Connector.timeInfoSelector = '.ytmusic-player-bar.time-info';

Connector.isPlaying = () => {
	return Util.getAttrFromSelectors(playButtonSelector, 'd') === playingPath;
};

Connector.isScrobblingAllowed = () => !Util.isElementVisible(adSelector);

function filterYoutubeIfNonAlbum(text) {
	return videoHasAlbum() ? text : MetadataFilter.youtube(text);
}

const conditionalYoutubeFilter = new MetadataFilter({ track: filterYoutubeIfNonAlbum });

Connector.applyFilter(conditionalYoutubeFilter);
