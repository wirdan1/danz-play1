import MusicPlayer from "../components/music-player"
import CommentSection from "../components/comment-section"
import WebsiteInfo from "../components/website-info"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Music Player
          </h1>
          <p className="text-gray-400">Developed by Danz-dev</p>
        </header>

        <MusicPlayer />

        <WebsiteInfo />

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Contact Developer
          </h2>
          <CommentSection />
        </div>

        <footer className="mt-10 text-center text-gray-500 text-sm py-4">
          <p>© {new Date().getFullYear()} Danz-dev. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

