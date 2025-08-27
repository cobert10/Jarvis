import Image from "next/image";
import Link from "next/link";
import React from "react"

interface CompanionCardProps{
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => {
  return (
    <article className="companion-card text-[#F8FAFC]" style={{ background: "linear-gradient(135deg, #1E293B, #334155)" }} >
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image src="/icons/bookmark.svg" alt="bookmark" width={10} height={10}></Image>
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image src="/icons/clock.svg" alt="duration" width={14} height={14}></Image>
        <p>{duration} mins</p>
      </div>
      <Link href={`/companions/${id}`} key={id} className="w-full">
        <button className="btn-primary w-full justify-center"> Lunch Lesson</button>
      </Link>
    </article>
  )
}

export default CompanionCard
