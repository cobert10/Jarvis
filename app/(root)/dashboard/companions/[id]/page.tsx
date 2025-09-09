import { getCompanion } from "@/lib/actions/companion.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps{
  params: Promise<{ id:string }>;
}

//params /url/{id} -> id

const CompanionSession =  async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await getCurrentUser();

  console.log(companion)

  if(!user) redirect('/sign-in')
  
  if (!companion) redirect ('/companions')

  return (
    <main>
      <article className="flex rounded-border justify-between p-6" style={{ background: "linear-gradient(135deg, #1E293B, #334155)"}}>
        <div className="flex items-center gap-2">
          <div className="size-[72px] flex justify-center items-center" style={{ backgroundColor: getSubjectColor(companion.subject)}}>
            <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35}></Image>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2"><p className="font-bold text-2xl">{companion.name}</p></div>
            
            <div className="flex items-center gap-2"><p className="font-bold text-2xl">{companion.topic}</p></div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default CompanionSession
