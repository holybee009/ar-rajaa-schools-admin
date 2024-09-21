"use client";
import React from "react";
import { useState } from "react";
import SubNavbar from "../components/miniComponents/subNavbar";
import PagesLayout from "../components/layout/layout";
import AddRecent from "../components/addSection/addRecent";
import ActivitiesData from "../components/updateData/activitiesData";
import withAuth from "../hoc/withAuth";

const RecentPage = () => {
  const [actSwitch, setActSwitch] = useState({ first: true, second: false });
  const [editRecentId, setEditRecentId] = useState<string>('')
  const [reloadNews, setReloadNews] = useState<boolean>(false)

  const handleSwitch = (val: string) => {
    val === "first"
      ? setActSwitch({ first: true, second: false })
      : setActSwitch({ first: false, second: true });
  };

  const editRecentInfo = (val:string) => {
    setActSwitch({ first: false, second: true });
    setEditRecentId(val)
  }
  

  return (
    <PagesLayout>
      <SubNavbar
        first={actSwitch.first}
        second={actSwitch.second}
        firstWord="all activities"
        secondWord="new"
        title="recent activities"
        handleSwitch={handleSwitch}
      />
        <div className="flex-grow py-2 px-4 sm:py-3 sm:px-6 md:py-5 md:px-10 bg-[#F8F8F8] border-box w-full sm:rounded-xl">
          {actSwitch.second === true ? (
            <AddRecent editRecentId={editRecentId} updateUI={() => setReloadNews(!reloadNews)}/>
          ) : (
            <ActivitiesData onData={editRecentInfo} reloadNews={reloadNews}/>
          )}
        </div>
    </PagesLayout>
  );
};

export default withAuth(RecentPage);
