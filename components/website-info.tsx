export default function WebsiteInfo() {
  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-6">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          About This Website
        </h2>
        <p className="text-gray-300 mb-4">
          Welcome to Danz-dev Music Player! This platform is designed to provide a seamless music listening experience
          with a modern interface. Our player features a collection of carefully selected tracks that you can enjoy
          anytime, anywhere.
        </p>
        <p className="text-gray-300">
          The player includes features like playback speed control, shuffle mode, and volume adjustment to enhance your
          listening experience. You can also contact the developer directly through the comment section below.
        </p>
      </div>

      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Rules & Guidelines
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Please respect other users and the developer when leaving comments</li>
          <li>This player is for personal use only and not for commercial purposes</li>
          <li>The music provided is for streaming only and should not be downloaded</li>
          <li>Please report any issues or bugs to help improve the platform</li>
          <li>Suggestions for new features or songs are always welcome</li>
        </ul>
      </div>

      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
          Prohibited Actions
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Distributing or sharing the music files from this platform</li>
          <li>Using this platform for any illegal activities</li>
          <li>Attempting to hack, modify, or reverse engineer the player</li>
          <li>Posting offensive, harmful, or inappropriate comments</li>
          <li>Creating multiple accounts to spam the comment section</li>
        </ul>
      </div>

      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500">
          Additional Information
        </h2>
        <p className="text-gray-300 mb-4">
          This music player is developed and maintained by Danz-dev. All songs are provided for entertainment purposes
          only. The developer does not claim ownership of any of the songs featured on this platform.
        </p>
        <p className="text-gray-300">
          For any inquiries, collaboration opportunities, or to request song additions, please use the comment section
          below to get in touch with the developer directly through WhatsApp.
        </p>
        <div className="mt-4 p-3 bg-blue-900/30 rounded-md border border-blue-500/30">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-blue-400">Note:</span> This player is regularly updated with new
            features and songs. Check back often to see what's new!
          </p>
        </div>
      </div>
    </div>
  )
}

