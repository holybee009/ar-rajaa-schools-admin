import Navbar from "../miniComponents/navbar";
import Image from "next/image";
import Logo from "../atoms/images/ar-rajaa logo1.png"
import Menu from "../atoms/icons/menu.svg"
import { useState } from "react";


export default function PagesLayout({
  children,// will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [nav, setShowNav] = useState<boolean>(false)
  const showNav = () => {
   setShowNav(true)
  }
  const hideNav = () =>{
    setShowNav(false)
  }
  return (
    <>
      <div className="w-screen h-screen bg-white sm:bg-[#0D3C1D] flex justify-center items-center relative">
        <div className="w-screen h-screen sm:w-5/6 sm:h-5/6 sm:rounded-xl flex flex-col sm:flex-row bg-white border-box">
          <div className="flex sm:hidden justify-between p-5 bg-[#179441]">
            <div className="font-bold w-full uppercase pl-2 flex items-center gap-2">
                <Image src={Logo} alt="logo" width={120} height={120} className="w-6 h-7"/>
                <p className="text-white">ar-rajaa schools</p>
            </div>
            <Image src={Menu} alt="menu" width={24} height={24}  className="text-white" onClick={showNav}/>
            </div>
           <div className="h-full rounded-xl sm:pt-7 shadow flex flex-col gap-5 absolute right-0 sm:static invisible sm:visible">
              <div className="font-extrabold w-full uppercase pl-2 items-center gap-2 hidden sm:flex">
                <Image src={Logo} alt="logo" width={120} height={120} className="w-6 h-7"/>
                <p>ar-rajaa schools</p>
              </div>
            <Navbar classnames={`${nav ? "visible h-full shadow shadow-xl z-30" : ""}`} className="text-end mt-5 mb-3 self-end mr-4" hideNav={hideNav}/>
          </div>
          <div className="w-full relative h-screen sm:h-auto flex flex-col border-box sm:rounded-xl">{children}</div>
        </div>
      </div>
    </>
  );
}