import MobileNavigation from "@/components/MobileNavigation"
import Navbar from "@/components/Navbar"
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const layout = async ({children} : {children: React.ReactNode})  => {
const currentUser = await getCurrentUser();
if(!currentUser) return redirect("/sign-in");
    return (
    <div>
        <section className="flex h-full flex-1 flex-col" style={{ background: "linear-gradient(135deg, #1E293B, #334155)" }}>
            <Navbar></Navbar>
            <MobileNavigation></MobileNavigation>
        </section>
      
      <div className="main-content" >{children}</div>
    </div>
    
  )
}

export default layout
