import CompanionCard from "@/components/CompanionCard"
import SearchInput from "@/components/SearchInput"
import SubjectFilter from "@/components/SubjectFilter"

import { getAllCompanions } from "@/lib/actions/companion.actions"




const page = async ({ searchParams}: SearchParams) => {
    const filters = await searchParams
    const subject = filters.subject? filters.subject : '';
    const topic = filters.topic? filters.topic: '';
    const companions = await getAllCompanions({subject, topic})
    
    return (
        <>
            <section className="flex justify-between w-full max-sm:flex-col">
                <h1>Companion Library</h1>
                <div className="flex flex-row gap-8">
                    <SearchInput />
                    <SubjectFilter/>
                </div>
            </section>
            <section className="companions-grid">
                        {companions.data?.map((companion)=>(
                            <CompanionCard key={companion.id} {...companion}/>
                        ))}
            </section>
       </>
    )
}

export default page
