"use client"

import { useState } from "react"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const videoTestimonials = [
  {
    id: "dQw4w9WgXcQ",
    title: "Sarah & Mike's Dream Home Journey",
    client: "Sarah & Mike Johnson",
    property: "4BR Colonial in Westfield",
    thumbnail: "/placeholder.svg?height=300&width=400",
    description: "From first-time buyers to homeowners in just 30 days",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Investment Success Story",
    client: "David Chen",
    property: "Luxury Condo Downtown",
    thumbnail: "/placeholder.svg?height=300&width=400",
    description: "How we helped secure a prime investment property",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Family Home Upgrade",
    client: "The Martinez Family",
    property: "5BR Executive Home",
    thumbnail: "/placeholder.svg?height=300&width=400",
    description: "Growing family finds their forever home",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Downsizing Made Easy",
    client: "Robert & Linda Smith",
    property: "2BR Garden Condo",
    thumbnail: "/placeholder.svg?height=300&width=400",
    description: "Seamless transition to retirement living",
  },
]

export function VideoTestimonials() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoTestimonials.length)
    setIsPlaying(false)
  }

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length)
    setIsPlaying(false)
  }

  const playVideo = () => {
    setIsPlaying(true)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Video{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear directly from our clients about their real estate journey and experience working with PrimeRealty
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Video Player */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
            <div className="aspect-video relative">
              {!isPlaying ? (
                <div className="relative w-full h-full">
                  <img
                    src={videoTestimonials[currentVideo].thumbnail || "/placeholder.svg"}
                    alt={videoTestimonials[currentVideo].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button
                      onClick={playVideo}
                      className="bg-white/90 hover:bg-white text-primary hover:text-primary-600 rounded-full p-6 shadow-2xl hover:scale-110 transition-all"
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold mb-1">{videoTestimonials[currentVideo].title}</h3>
                    <p className="text-white/90 text-sm">{videoTestimonials[currentVideo].description}</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${videoTestimonials[currentVideo].id}?autoplay=1`}
                  title={videoTestimonials[currentVideo].title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Video Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                onClick={prevVideo}
                variant="ghost"
                size="icon"
                className="bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                onClick={nextVideo}
                variant="ghost"
                size="icon"
                className="bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{videoTestimonials[currentVideo].client}</h3>
                <p className="text-primary font-semibold mb-1">{videoTestimonials[currentVideo].property}</p>
                <p className="text-gray-600">{videoTestimonials[currentVideo].description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">
                  Video {currentVideo + 1} of {videoTestimonials.length}
                </div>
              </div>
            </div>
          </div>

          {/* Video Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videoTestimonials.map((video, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentVideo(index)
                  setIsPlaying(false)
                }}
                className={`relative rounded-xl overflow-hidden transition-all hover:scale-105 ${
                  index === currentVideo ? "ring-4 ring-primary shadow-lg" : "hover:shadow-md"
                }`}
              >
                <div className="aspect-video">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs font-medium truncate">{video.client}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
