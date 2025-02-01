"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Groq from "groq-sdk"
import { Loader2, Send, Trash2 } from "lucide-react"

// Use an environment variable for API Key security
const groq = new Groq({
  apiKey: process.env.PLASMO_PUBLIC_GROQ_API_KEY || "",
  dangerouslyAllowBrowser: true,
})

interface Message {
  role: "user" | "ai"
  content: string
}

const ChatCMP: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages")
    return savedMessages ? JSON.parse(savedMessages) : []
  })
  const [input, setInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus()
    }
  }, [loading, messages])

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages))
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages: Message[] = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const completion = await groq.chat.completions.create({
        messages: newMessages.map((msg) => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        })),
        model: "deepseek-r1-distill-llama-70b",
      })

      const aiResponse: string = completion.choices[0].message.content || ""
      setMessages([...newMessages, { role: "ai", content: aiResponse }])
    } catch (error) {
      console.error("Error fetching response:", error)
    }
    setLoading(false)
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem("chatMessages")
  }

  return (
    <div className="w-full h-full fixed top-0 left-0 z-50 font-sans bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] transition-colors duration-200 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-[#FFA116] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-[#263238] dark:text-[#e6e6e6]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
          className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-700 text-[#263238] dark:text-[#e6e6e6] focus:outline-none focus:ring-2 focus:ring-[#FFA116]"
          placeholder="Type your message..."
          disabled={loading}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-[#FFA116] text-white p-2 rounded-lg hover:bg-[#FF8C00] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
        </button>
        <button
          onClick={clearChat}
          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition-colors duration-200"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default ChatCMP

