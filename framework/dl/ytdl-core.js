const ytdl = require('youtubedl-core');
const yts = require('youtube-yts');
const readline = require('readline');
const ffmpeg = require('fluent-ffmpeg')
const NodeID3 = require('node-id3')
const fs = require('fs');
const { fetchBuffer } = require("./Function")
const { randomBytes } = require('crypto')
const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/

class YT {
    constructor() { }

    /**
     * Checks if it is yt link
     * @param {string|URL} url youtube url
     * @returns Returns true if the given YouTube URL.
     */
    static isYTUrl = (url) => {
        return ytIdRegex.test(url)
    }

    /**
     * VideoID from url
     * @param {string|URL} url to get videoID
     * @returns 
     */
    static getVideoID = (url) => {
        if (!this.isYTUrl(url)) throw new Error('is not YouTube URL')
        return ytIdRegex.exec(url)[1]
    }

    /**
     * @typedef {Object} IMetadata
     * @property {string} Title track title
     * @property {string} Artist track Artist
     * @property {string} Image track thumbnail url
     * @property {string} Album track album
     * @property {string} Year track release date
     */

    /**
     * Write Track Tag Metadata
     * @param {string} filePath 
     * @param {IMetadata} Metadata 
     */
    static WriteTags = async (filePath, Metadata) => {
        NodeID3.write(
            {
                title: Metadata.Title,
                artist: Metadata.Artist,
                originalArtist: Metadata.Artist,
                image: {
                    mime: 'jpeg',
                    type: {
                        id: 3,
                        name: 'front cover',
                    },
                    imageBuffer: (await fetchBuffer(Metadata.Image)).buffer,
                    description: `Cover of ${Metadata.Title}`,
                },
                album: Metadata.Album,
                year: Metadata.Year || ''
            },
            filePath
        );
    }

    /**
     * 
     * @param {string} query 
     * @returns 
     */
    static search = async (query, options = {}) => {
        const search = await yts.search({ query, hl: 'id', gl: 'ID', ...options })
        return search.videos
    }

    /**
     * @typedef {Object} TrackSearchResult
     * @property {boolean} isYtMusic is from YT Music search?
     * @property {string} title music title
     * @property {string} artist music artist
     * @property {string} id YouTube ID
     * @property {string} url YouTube URL
     * @property {string} album music album
     * @property {Object} duration music duration {seconds, label}
     * @property {string} image Cover Art
     */
 

    /**
     * @typedef {Object} MusicResult
     * @property {TrackSearchResult} meta music meta
     * @property {string} path file path
     */

    /**
     * Download music with full tag metadata
     * @param {string|TrackSearchResult[]} query title of track want to download
     * @returns {Promise<MusicResult>} filepath of the result
     */
    static downloadMusic = async (query) => {
        try {
            const getTrack = Array.isArray(query) ? query : await this.searchTrack(query);
            const search = getTrack[0]//await this.searchTrack(query)
            const videoInfo = await ytdl.getInfo('https://www.youtube.com/watch?v=' + search.id, { lang: 'id' });
            let stream = ytdl(search.id, { filter: 'audioonly', quality: 140 });
            let songPath = `./dustbin/${randomBytes(3).toString('hex')}.mp3`
            stream.on('error', (err) => console.log(err))

            const file = await new Promise((resolve) => {
                ffmpeg(stream)
                    .audioFrequency(44100)
                    .audioChannels(2)
                    .audioBitrate(128)
                    .audioCodec('libmp3lame')
                    .audioQuality(5)
                    .toFormat('mp3')
                    .save(songPath)
                    .on('end', () => resolve(songPath))
            });
            await this.WriteTags(file, { Title: search.title, Artist: search.artist, Image: search.image, Album: search.album, Year: videoInfo.videoDetails.publishDate.split('-')[0] });
            return {
                meta: search,
                path: file,
                size: fs.statSync(songPath).size
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     * get downloadable video urls
     * @param {string|URL} query videoID or YouTube URL
     * @param {string} quality 
     * @returns
     */
    static mp4 = async (query, quality = 134) => {
        try {
            if (!query) throw new Error('Video ID or YouTube Url is required')
            const videoId = this.isYTUrl(query) ? this.getVideoID(query) : query
            const videoInfo = await ytdl.getInfo('https://www.youtube.com/watch?v=' + videoId, { lang: 'id' });
            const format = ytdl.chooseFormat(videoInfo.formats, { format: quality, filter: 'videoandaudio' })
            return {
                title: videoInfo.videoDetails.title,
                thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0],
                date: videoInfo.videoDetails.publishDate,
                duration: videoInfo.videoDetails.lengthSeconds,
                channel: videoInfo.videoDetails.ownerChannelName,
                quality: format.qualityLabel,
                contentLength: format.contentLength,
                description:videoInfo.videoDetails.description,
                videoUrl: format.url
            }
        } catch (error) {
            throw error
        }
    }

    /**
     * Download YouTube to mp3
     * @param {string|URL} url YouTube link want to download to mp3
     * @param {IMetadata} metadata track metadata
     * @param {boolean} autoWriteTags if set true, it will auto write tags meta following the YouTube info
     * @returns 
     */
    static mp3 = async (url, metadata = {}, autoWriteTags = false) => {
        try {
            if (!url) throw new Error('Video ID or YouTube Url is required')
            url = this.isYTUrl(url) ? 'https://www.youtube.com/watch?v=' + this.getVideoID(url) : url
            const { videoDetails } = await ytdl.getInfo(url, { lang: 'id' });
            let stream = ytdl(url, { filter: 'audioonly', quality: 140 });
            let songPath = `./${randomBytes(3).toString('hex')}.mp3`

            let starttime;
            stream.once('response', () => {
                starttime = Date.now();
            });
            /*
            stream.on('progress', (chunkLength, downloaded, total) => {
                const percent = downloaded / total;
                const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
                const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
                process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
                process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
                process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
                readline.moveCursor(process.stdout, 0, -1);
                //let txt = `${bgColor(color('[FFMPEG]]', 'black'), '#38ef7d')} ${color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE')} ${gradient.summer('[Converting..]')} ${gradient.cristal(p.targetSize)} kb`
            });*/
            stream.on('end', () => process.stdout.write('\n\n'));
            stream.on('error', (err) => console.log(err))

            const file = await new Promise((resolve) => {
                ffmpeg(stream)
                    .audioFrequency(44100)
                    .audioChannels(2)
                    .audioBitrate(128)
                    .audioCodec('libmp3lame')
                    .audioQuality(5)
                    .toFormat('mp3')
                    .save(songPath)
                    .on('end', () => {
                        resolve(songPath)
                    })
            });
            if (Object.keys(metadata).length !== 0) {
                await this.WriteTags(file, metadata)
            }
            if (autoWriteTags) {
                await this.WriteTags(file, { Title: videoDetails.title, Album: videoDetails.author.name, Year: videoDetails.publishDate.split('-')[0], Image: videoDetails.thumbnails.slice(-1)[0].url })
            }
            return {
                meta: {
                    title: videoDetails.title,
                    channel: videoDetails.author.name,
                    seconds: videoDetails.lengthSeconds,
                    description:videoDetails.description,
                    image: videoDetails.thumbnails.slice(-1)[0].url
                },
                path: file,
                size: fs.statSync(songPath).size
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = YT;