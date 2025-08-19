
import Image from "next/image"
import Link from "next/link"
const Navbar = () => {
  return (
   <nav className="hidden sm:flex items-center justify-between p-4">
    <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
            <Image 
                src="/images/logo.png" 
                alt="logo"
                width={46}
                height={46}
            />
        </div>
    </Link>
    <div className="flex items-center gap-8">
        <p>Home</p>
        <p>Companion</p>
        <p>My Progress</p>
    </div>
   </nav>
  )
}

export default Navbar
