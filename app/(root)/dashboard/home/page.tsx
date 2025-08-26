import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/CTA"
import { recentSessions } from "@/constants"
import React from "react"

const home = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-14 flex flex-col gap-4 pt-10 max-sm:px-2">
      <h1 className="">Popular Companions</h1>
      <section className="home-section ">
        <CompanionCard
          id="123"
          name="Jepoy the master of Algorithm"
          topic="Sorting algorithms and problem solving"
          subject="Computer Science"
          duration={60}
          color="#FF99C8"
          />
        <CompanionCard
          id="234"
          name="Tessa the Time Traveler "
          topic="Ancient civilizations (e.g., Egypt, Greece, Rome)"
          subject="History"
          duration={30}
          color="#FCF6BD"
        />
        <CompanionCard
          id="345"
          name="Vicky the Word Whisperer"
          topic="Vocabulary building & etymology"
          subject="English"
          duration={45}
          color="#A9DEF9"
        />
      </section>
      <section className="home-section">
        <CompanionsList
          title="Recent completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />

        <CTA />
      </section>
      
    </div>
  )
}

export default home
