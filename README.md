# SRT Getter

I just did this because I've always wanted to learn how Chrome Extensions work and how to write them.

One weekend I wondered how I can rip off the subtitles from streaming sites, and I figured some of them do request it asynchronously (e.g., Kissasian). So I wrote this chrome extension to do the following:
* Watch for any HTTP requests for .srt files.
* Record details (e.g., url) for those requests - if at least one request was made, then the extension will be enabled
* Clicking on the extension let's you download the tracked srt's via their urls

Nothing too fancy but I had fun writing and learning.
