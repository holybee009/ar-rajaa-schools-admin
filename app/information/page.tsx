"use client"
import React,{useState} from "react";
import PagesLayout from "../components/layout/layout";
import SubNavbar from "../components/miniComponents/subNavbar";
import AddAbout from "../components/addSection/addAbout";
import AddAcknowledgement from "../components/addSection/addAcknowledgement";
import AddVision from "../components/addSection/addVision";
import withAuth from "../hoc/withAuth";


const InformationPage = () => {
  const [actSwitch, setActSwitch] = useState({ first: true, second: false , third: false});

  const handleSwitch = (val: string) => {
    if(val === "first"){setActSwitch({ first: true, second: false, third:false})} else if (val === "second"){
      setActSwitch({ first: false, second: true, third: false })
    } else {setActSwitch({ first: false, second: false, third: true })};
  };

  // const editNewsInfo = (val:string) => {
  //   setActSwitch({ first: false, second: true });
  //   setEditId(val)
  // }

  return (
    <>
      <PagesLayout>
        <SubNavbar
          first={actSwitch.first}
          second={actSwitch.second}
          third={actSwitch.third}
          firstWord="about"
          secondWord="acknowledgement"
          thirdWord="vision"
          title="information"
          handleSwitch={handleSwitch}
          thirdPresent={true}
        />
    <div className="flex-grow py-2 px-4 sm:py-3 sm:px-6 md:py-5 md:px-10 bg-[#F8F8F8] border-box w-full sm:rounded-xl">
          {actSwitch.first === true &&
            <AddAbout />}
          {actSwitch.second === true &&
            <AddAcknowledgement/>} 
          {actSwitch.third === true && <AddVision/>}
        </div>
      </PagesLayout>
    </>
  );
};

export default withAuth(InformationPage);
