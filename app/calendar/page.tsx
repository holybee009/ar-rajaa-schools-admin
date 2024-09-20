"use client";
import React from "react";
import { useState } from "react";
import SubNavbar from "../components/miniComponents/subNavbar";
import PagesLayout from "../components/layout/layout";
import AddCalender from "../components/addSection/addCalendar";
import CalendarData from "../components/updateData/calendarData";
import withAuth from "../hoc/withAuth";



const page = () => {
  const [actSwitch, setActSwitch] = useState({ first: true, second: false });
  const handleSwitch = (val: string) => {
    val === "first"
      ? setActSwitch({ first: true, second: false })
      : setActSwitch({ first: false, second: true });
  };

  return (
    <PagesLayout>
      <SubNavbar
        first={actSwitch.first}
        second={actSwitch.second}
        firstWord="calenders"
        secondWord="add calendar"
        title="calendar"
        handleSwitch={handleSwitch}
      />
    <div className="flex-grow py-2 px-4 sm:py-3 sm:px-6 md:py-5 md:px-10 bg-[#F8F8F8] border-box w-full sm:rounded-xl">
          {actSwitch.second === false ? (
          <CalendarData/>
          ) : (
          <AddCalender/>
          )}
        </div>
    </PagesLayout>
  );
};

export default withAuth(page);