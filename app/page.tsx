"use client"

import type React from "react"

import { Coffee, Mail, Twitter, Moon, Sun, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const projects = [
  { 
    //title: "pixelbooth",  
    //color: "bg-green-600 text-white", //
    //icon: "",//
    link: "https://pixelbooth.me/",
    description: "create your own digital photobooth",
    image: "/images/pixelbooth.png"
  },
  { 
   // title: "Make Me an ID",// 
    //subtitle: "generate a cool ID", //
    //color: "bg-red-500 text-white", //
    //icon: ""//,
    link: "https://makemeanid.vercel.app/",
    description: "generates a cool ID card" ,
    image: "/images/makemeanid.png"
  },
  { 
    //title: "Faceclash", //
    //color: "bg-red-500 text-white", //
    //icon: "",//
    link: "https://faceclash.iblogger.org/",
    description: "mark zuckerberg's facemash reimagined" ,
    image: "/images/faceclash.png"
  },
  { 
    title: "Domaify", //
    subtitle: "Under Construction",//
    color: "bg-grey-500 text-white",
    //icon: "",//
    link: "",
    description: "Generate a cool domain name" ,
    //image: "/images/domaify.jpg"
  },

]

export default function Component() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [email, setEmail] = useState("")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      alert("Thanks for subscribing!")
      setEmail("")
      setIsPopupOpen(false)
    } catch (error) {
      console.error("Subscription error:", error)
      alert(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    }
  }

  const handleProjectClick = (project: typeof projects[0]) => {
    if (project.link) {
      window.open(project.link, '_blank')
    } else {
      setSelectedProject(project)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Add Schema.org markup for Person */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Keshav", // Replace with your full name
                "url": "https://keshav.social/", // Replace with your website URL
                "sameAs": [
                  "https://x.com/keshavonit", // Replace with your Twitter URL
                  "https://www.linkedin.com/in/yourprofile", // Replace with your LinkedIn URL
                  // Add other social media or professional profiles here
                ],
                "jobTitle": "Web Developer", // Replace with your job title
                "worksFor": {
                  "@type": "Organization",
                  "name": "Your Company Name" // Replace with your company name or remove if not applicable
                },
                 "description": "A showcase of my web projects and experiments."
              }
            `}
          </script>
          <div className="flex items-center justify-end mb-4 gap-3">
            <button
              onClick={() => setIsPopupOpen(true)}
              className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full transition-colors ${
                isDarkMode ? "text-white hover:bg-gray-800" : "text-black hover:bg-gray-100"
              }`}
            >
              <div className={`w-4 h-4 rounded ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
              Get new posts
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? "text-white hover:bg-gray-800" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>keshav's network</h1>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>My Projects and Experiments</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(project)}
              className={`p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 min-h-[150px] relative overflow-hidden group border-2 border-black dark:border-white`}
            >
              {project.image && (
                <div className="absolute inset-0 w-full h-full rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 group-hover:bg-gradient-to-b from-transparent to-black/50 transition-opacity" />
                </div>
              )}
              {!project.image && project.color && (
                <div className={`${project.color} absolute inset-0 rounded-lg`} />
              )}
              <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center z-10">
                <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
                {project.subtitle && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold transform rotate-12">
                    {project.subtitle}
                  </div>
                )}
                {project.description && (
                  <p className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Hi I'm Keshav. This is where I showcase my web projects and experiments. Let's connect:
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsPopupOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm ${
                isDarkMode
                  ? "border-gray-600 hover:bg-gray-800 text-gray-300"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Mail className="w-4 h-4" />
              Newsletter
            </button>
            <Link
              href="https://x.com/keshavonit"
              target="_blank"
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm ${
                isDarkMode
                  ? "border-gray-600 hover:bg-gray-800 text-gray-300"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </Link>
            <Link
              href="https://www.paypal.com/paypalme/nerdkeshav"
              target="_blank"
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm ${
                isDarkMode
                  ? "border-gray-600 hover:bg-gray-800 text-gray-300"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Coffee className="w-4 h-4" />
              Buy me a coffee
            </Link>
          </div>

          <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>Contact: hi@keshav.social</p>
        </div>
      </div>

      {/* Email Subscription Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`relative max-w-md w-full rounded-lg p-6 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-white"}`}>
            <button
              onClick={() => setIsPopupOpen(false)}
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                isDarkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className={`text-xl font-semibold mb-6 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Stay Updated with My Projects!
            </h2>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors ${
                  isDarkMode
                    ? "bg-[#0a0a0a] border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
