"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    slug: "light-tells-the-truth",
    title: "Light Tells the Truth",
    excerpt: "Why I stopped chasing the perfect golden hour and started listening to whatever light was already in the room.",
    category: "Philosophy",
    date: "March 2025",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80",
    readTime: "5 min",
  },
  {
    slug: "how-to-prepare-for-your-portrait-session",
    title: "How to Prepare for Your Portrait Session",
    excerpt: "Everything I wish clients knew before they walked into the studio — and how to arrive at ease.",
    category: "Guide",
    date: "February 2025",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    readTime: "7 min",
  },
  {
    slug: "editorial-photography-in-lagos",
    title: "Editorial Photography in Lagos",
    excerpt: "The city is loud, beautiful, and unapologetic. Documenting fashion weeks and campaigns across the megacity.",
    category: "Behind the Scenes",
    date: "January 2025",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    readTime: "6 min",
  },
  {
    slug: "the-art-of-stillness",
    title: "The Art of Stillness",
    excerpt: "On patience, presence, and why the best portrait photographers know when not to press the shutter.",
    category: "Philosophy",
    date: "December 2024",
    img: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=600&q=80",
    readTime: "4 min",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Thoughts & Stories</p>
          <h1 className="font-display font-light" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--fg)" }}>
            The Journal
          </h1>
        </div>

        {/* Featured */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 group cursor-pointer">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={featured.img}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div
            className="flex flex-col justify-center p-10 lg:p-14"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
              {featured.category} · {featured.date} · {featured.readTime} read
            </p>
            <h2 className="font-display font-light text-4xl leading-tight mb-5" style={{ color: "var(--fg)" }}>
              {featured.title}
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
              {featured.excerpt}
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="flex items-center gap-3 text-sm tracking-widest uppercase transition-colors duration-300"
              style={{ color: "var(--gold)" }}
            >
              Read Article <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block cursor-pointer">
              <div className="aspect-[3/2] overflow-hidden mb-5">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
                {post.category} · {post.date} · {post.readTime} read
              </p>
              <h3 className="font-display font-light text-xl leading-tight mb-3 transition-colors duration-300 group-hover:text-gold" style={{ color: "var(--fg)" }}>
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
