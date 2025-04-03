"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface Song {
  title: string
  url: string
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffleMode, setIsShuffleMode] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const songs: Song[] = [
    { title: "ʟᴏᴠᴇ ɴᴡᴀɴᴛɪᴛɪ", url: "https://files.catbox.moe/3f9770.mp3" },
    { title: "ʙᴇғᴏʀᴇ ʏᴏᴜ ɢᴏ", url: "https://files.catbox.moe/04xfzr.mp3" },
    { title: "ʙᴀᴅ ʟɪᴀʀ", url: "https://files.catbox.moe/q67gjd.mp3" },
    { title: "ʟᴏᴠᴇ ɪs ɢᴏɴᴇ", url: "https://files.catbox.moe/m87jbo.mp3" },
    { title: "ᴛɪᴇ ᴍᴇ ᴅᴏᴡɴ sʟᴏᴡʟʏ", url: "https://files.catbox.moe/3ndv3r.mp3" },
    { title: "ɴᴀɴ ᴋᴏ ᴘᴀʜᴀᴍ", url: "https://files.catbox.moe/yzc9o4.mp3" },
    { title: "ᴅᴊ ᴀᴍʙᴀᴛᴜᴋᴀᴍ", url: "https://files.catbox.moe/cbgl90.mp3" },
    { title: "ᴅᴇᴀᴛʜ ʙᴇᴛ", url: "https://files.catbox.moe/q3t8vc.mp3" },
    { title: "ᴀʜᴅᴀʟ ᴀʜʙᴇᴋ", url: "https://files.catbox.moe/059gti.mp3" },
    { title: "ɴᴏᴛ ʏᴏᴜ", url: "https://files.catbox.moe/528353.mp3" },
    { title: "ᴋᴜʀᴇʟᴀᴋᴀɴ ᴇɴɢᴋᴀᴜ ᴘᴇʀɢɪ", url: "https://files.catbox.moe/uzz08l.mp3" },
    { title: "ᴅᴊ sɪᴜʟ", url: "https://files.catbox.moe/k5wc5t.mp3" },
    { title: "ᴘᴀʟᴇ-ᴘᴀʟᴇ × ᴡᴀɴᴀ", url: "https://files.catbox.moe/0dysvm.mp3" },
    { title: "ᴘᴇʟᴜᴋ ᴇʀᴀᴛ", url: "https://files.catbox.moe/0dysvm.mp3" },
    { title: "ᴛᴇʀʙᴀɴɢ ʙᴇʀsᴀᴍᴀᴋᴜ", url: "https://files.catbox.moe/1g6dut.mp3" },
    { title: "ᴀᴜʀᴀʜ ʙᴇʀᴋᴀsɪʜ", url: "https://files.catbox.moe/78vzur.mp3" },
    { title: "ᴅᴇᴀᴛʜ ʙᴇᴛ", url: "https://files.catbox.moe/q3t8vc.mp3" },
    { title: "ᴘᴀsᴛʟɪᴠᴇs", url: "https://files.catbox.moe/t3fqam.mp3" },
    { title: "ʀᴜɴᴀᴡᴀʏ", url: "https://files.catbox.moe/48jji0.mp3" },
    { title: "ᴘʟᴀʏ ( alan walker )", url: "https://files.catbox.moe/k79gu6.mp3" },
    { title: "ʟɪʟʏ", url: "https://files.catbox.moe/4092ev.mp3" },
    { title: "ᴏɴᴇ-ᴅᴀʏ", url: "https://files.catbox.moe/tuts5z.mp3" },
    { title: "ᴘʟᴀʏ ᴅᴀᴛᴇ", url: "https://files.catbox.moe/0mh88j.mp3" },
    { title: "ᴋᴏᴘɪ ᴅᴀɴɢᴅᴜᴛ", url: "https://files.catbox.moe/rpv4x6.mp3" },
    { title: "ᴏɴ ᴍʏ ᴡᴀʏ", url: "https://files.catbox.moe/tozq1e.mp3" },
    { title: "ᴛᴇᴍᴏʟᴀ", url: "https://files.catbox.moe/p0yr8g.mp3" },
    { title: "ᴋᴜᴛɪᴍᴀɴɢ ᴀᴅɪᴋᴋᴜ sᴀʏᴀɴɢ", url: "https://files.catbox.moe/x4o4mj.mp3" },
    { title: "ᴅᴀᴍᴏɴ ᴠᴀᴄᴀᴛɪᴏɴ", url: "https://files.catbox.moe/c5edok.mp3" },
    { title: "sᴀ ᴅᴛᴏᴘ ᴍᴀʙᴏᴋ", url: "https://files.catbox.moe/unp0vc.mp3" },
    { title: "ʙᴀʜᴀɴᴀ ᴘᴜɪ", url: "https://files.catbox.moe/kwvxpb.mp3" },
    { title: "ᴠᴀsᴛᴇ ʀᴇᴍɪx", url: "https://files.catbox.moe/7rzjlb.mp3" },
    { title: "ᴠᴀsᴛᴇ", url: "https://files.catbox.moe/8639rc.mp3" },
    { title: "ᴄʟᴏᴜᴅ ʙʀᴇᴀᴅ", url: "https://files.catbox.moe/67zsg6.mp3" },
    { title: "ʙʟᴜᴇ", url: "https://files.catbox.moe/rxcc1h.mp3" },
    { title: "ᴛᴀʀᴜʜ", url: "https://files.catbox.moe/g5utr1.mp3" },
    { title: "ᴀɴᴀᴋ ʟᴀʏᴀɴɢᴀɴ", url: "https://files.catbox.moe/vo3va6.mp3" },
    { title: "ᴊɪᴡᴀ ʏᴀɴɢ ʙᴇʀsᴇᴅɪʜ", url: "https://files.catbox.moe/4fj2xi.mp3" },
    { title: "ᴋᴜɴᴀɴᴛᴀ ғᴜʟʟ ʙᴀss", url: "https://files.catbox.moe/kjimrd.mp3" },
    { title: "ᴋᴜ ɴᴀɴᴛᴀ", url: "https://files.catbox.moe/hku86r.mp3" },
    { title: "ʏᴀʟɪʟɪ", url: "https://files.catbox.moe/x9y2jc.mp3" },
  ]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      nextSong()
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", handleEnded)

    // Set initial volume and playback rate
    audio.volume = volume
    audio.playbackRate = playbackRate

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentSongIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const getRandomIndex = (currentIndex: number, max: number) => {
    let newIndex = Math.floor(Math.random() * max)
    // Make sure we don't get the same song
    if (newIndex === currentIndex) {
      newIndex = (newIndex + 1) % max
    }
    return newIndex
  }

  const nextSong = () => {
    let newIndex
    if (isShuffleMode) {
      newIndex = getRandomIndex(currentSongIndex, songs.length)
    } else {
      newIndex = (currentSongIndex + 1) % songs.length
    }

    setCurrentSongIndex(newIndex)
    setIsPlaying(true)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
      }
    }, 100)
  }

  const prevSong = () => {
    let newIndex
    if (isShuffleMode) {
      newIndex = getRandomIndex(currentSongIndex, songs.length)
    } else {
      newIndex = (currentSongIndex - 1 + songs.length) % songs.length
    }

    setCurrentSongIndex(newIndex)
    setIsPlaying(true)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
      }
    }, 100)
  }

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
      } else {
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  const toggleShuffle = () => {
    setIsShuffleMode(!isShuffleMode)
  }

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate)
    if (audioRef.current) {
      audioRef.current.playbackRate = rate
    }
  }

  const selectSong = (index: number) => {
    setCurrentSongIndex(index)
    setIsPlaying(true)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
      }
    }, 100)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center mb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {songs[currentSongIndex].title}
          </h2>
          <p className="text-gray-400 text-center">Unknown Artist</p>
        </div>

        <audio ref={audioRef} src={songs[currentSongIndex].url} preload="metadata" />

        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-400 w-12">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="flex-1"
          />
          <span className="text-sm text-gray-400 w-12">{formatTime(duration)}</span>
        </div>

        {/* Main controls with larger centered play button */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-center items-center gap-8 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSong}
              className="text-gray-300 hover:text-white hover:bg-gray-700 h-14 w-14 rounded-full"
            >
              <SkipBack className="h-7 w-7" />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={togglePlay}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-20 w-20 rounded-full shadow-lg shadow-purple-900/30"
            >
              {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 ml-1" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSong}
              className="text-gray-300 hover:text-white hover:bg-gray-700 h-14 w-14 rounded-full"
            >
              <SkipForward className="h-7 w-7" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleShuffle}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 ${isShuffleMode ? "text-purple-500" : ""}`}
              title="Shuffle"
            >
              <Shuffle className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div className="flex gap-1">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handlePlaybackRateChange(rate)}
                    className={`px-2 py-1 text-xs rounded ${
                      playbackRate === rate ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Volume controls moved to separate section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 mt-4 shadow-lg border border-gray-700">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>

          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-48"
          />
          <span className="text-xs text-gray-400 w-8">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Playlist
        </h3>
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700">
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {songs.map((song, index) => (
              <div
                key={index}
                onClick={() => selectSong(index)}
                className={`flex items-center p-3 cursor-pointer transition-colors ${
                  index === currentSongIndex
                    ? "bg-purple-900/50 border-l-4 border-purple-500"
                    : "hover:bg-gray-700/50 border-l-4 border-transparent"
                }`}
              >
                <div className="ml-2">
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-gray-400">Unknown Artist</p>
                </div>
                {index === currentSongIndex && isPlaying && (
                  <div className="ml-auto mr-2">
                    <div className="flex gap-1 items-center">
                      <span className="w-1 h-3 bg-purple-500 animate-pulse-slow"></span>
                      <span className="w-1 h-5 bg-purple-500 animate-pulse-medium"></span>
                      <span className="w-1 h-4 bg-purple-500 animate-pulse-fast"></span>
                      <span className="w-1 h-6 bg-purple-500 animate-pulse-medium"></span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

