"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageSquare, ThumbsUp, Heart, Phone } from "lucide-react"

interface Comment {
  id: number
  name: string
  phone: string
  message: string
  date: string
  likes: number
  loves: number
}

export default function CommentSection() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const developerPhone = "62895323195263"

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem("danz-dev-comments")
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments))
      } catch (e) {
        console.error("Error parsing comments:", e)
        setComments([])
      }
    }
  }, [])

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("danz-dev-comments", JSON.stringify(comments))
  }, [comments])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim() || !phone.trim()) return

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString(),
      likes: 0,
      loves: 0,
    }

    setComments([newComment, ...comments])

    // Open WhatsApp with the formatted message
    const formattedMessage = `${phone.trim()}\n${name.trim()}\n${message.trim()}`
    const whatsappUrl = `https://wa.me/${developerPhone}?text=${encodeURIComponent(formattedMessage)}`
    window.open(whatsappUrl, "_blank")

    setMessage("")
  }

  const handleLike = (id: number) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment)))
  }

  const handleLove = (id: number) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, loves: comment.loves + 1 } : comment)))
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        <span>Developer Consultation</span>
      </h3>

      <div className="mb-4 p-3 bg-purple-900/30 rounded-md border border-purple-500/30">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-purple-400">Note:</span> Your comment will be sent directly to the
          developer's WhatsApp. Please provide your phone number so the developer can respond to you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-gray-700 border-gray-600 focus-visible:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Your Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number (e.g., 628123456789)"
              className="bg-gray-700 border-gray-600 focus-visible:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message to Danz-dev..."
              className="bg-gray-700 border-gray-600 focus-visible:ring-purple-500 min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" className="bg-green-600 hover:bg-green-700 ml-auto flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Send to WhatsApp</span>
          </Button>
        </div>
      </form>

      <div className="space-y-2">
        <h4 className="font-medium text-lg">Recent Comments ({comments.length})</h4>

        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No comments yet. Be the first to leave a message!</p>
        ) : (
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-purple-500 pl-4 py-3 mb-4 bg-gray-800/50 rounded-r-md">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-medium">{comment.name}</h5>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-300 mb-3">{comment.message}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-xs">{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => handleLove(comment.id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{comment.loves}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

