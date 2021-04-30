const { spawn } = require('child_process');

function playVideo(link) {
  spawn('iina', [link]);
}

module.exports = playVideo;
