// Simple client-side database using localStorage

export interface Comment {
  id: number
  name: string
  message: string
  date: string
  likes: number
  loves: number
}

const DB_KEY = "danz-dev-comments"

export const CommentDB = {
  getComments: (): Comment[] => {
    if (typeof window === "undefined") return []

    const data = localStorage.getItem(DB_KEY)
    if (!data) return []

    try {
      return JSON.parse(data)
    } catch (error) {
      console.error("Error parsing comments from localStorage:", error)
      return []
    }
  },

  saveComments: (comments: Comment[]): void => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(DB_KEY, JSON.stringify(comments))
    } catch (error) {
      console.error("Error saving comments to localStorage:", error)
    }
  },

  addComment: (comment: Omit<Comment, "id" | "likes" | "loves" | "date">): Comment => {
    const comments = CommentDB.getComments()

    const newComment: Comment = {
      id: Date.now(),
      ...comment,
      date: new Date().toLocaleDateString(),
      likes: 0,
      loves: 0,
    }

    const updatedComments = [newComment, ...comments]
    CommentDB.saveComments(updatedComments)

    return newComment
  },

  updateComment: (id: number, updates: Partial<Comment>): boolean => {
    const comments = CommentDB.getComments()
    const index = comments.findIndex((comment) => comment.id === id)

    if (index === -1) return false

    comments[index] = { ...comments[index], ...updates }
    CommentDB.saveComments(comments)

    return true
  },

  likeComment: (id: number): boolean => {
    const comments = CommentDB.getComments()
    const index = comments.findIndex((comment) => comment.id === id)

    if (index === -1) return false

    comments[index].likes += 1
    CommentDB.saveComments(comments)

    return true
  },

  loveComment: (id: number): boolean => {
    const comments = CommentDB.getComments()
    const index = comments.findIndex((comment) => comment.id === id)

    if (index === -1) return false

    comments[index].loves += 1
    CommentDB.saveComments(comments)

    return true
  },
}

