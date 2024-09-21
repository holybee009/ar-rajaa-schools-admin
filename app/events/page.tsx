"use client";
import { useState } from "react";
import React from "react";
import PagesLayout from "../components/layout/layout";
import SubNavbar from "../components/miniComponents/subNavbar";
import AddEvents from "../components/addSection/addEvents";
import EventData from "../components/updateData/eventData";
import withAuth from "../hoc/withAuth";

interface ActiveState {
  news: boolean;
  events: boolean;
  recent: boolean;
  information: boolean;
  community: boolean;
  calendar: boolean;
}

const Page = () => {
  const [active, setActive] = useState<ActiveState>({
    news: true,
    events: false,
    recent: false,
    information: false,
    community: false,
    calendar: false,
  });
  const [actSwitch, setActSwitch] = useState({ first: true, second: false });
  const [editEventId, setEditEventId] = useState<string>('')
  const [reloadEvent,setReloadEvent] = useState<boolean>(false)
  const handleSwitch = (val: string) => {
    val === "first"
      ? setActSwitch({ first: true, second: false })
      : setActSwitch({ first: false, second: true });
  };

  const editEventInfo = (val:string) => {
    setActSwitch({ first: false, second: true });
    setEditEventId(val)
  }

  const handleActive = (key: keyof ActiveState) => {
    setActive((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, curr) => {
        acc[curr as keyof ActiveState] = curr === key;
        return acc;
      }, {} as ActiveState);
      return newState;
    });
  };

  return (
    <PagesLayout>
      <SubNavbar
        first={actSwitch.first}
        second={actSwitch.second}
        firstWord="all"
        secondWord="new"
        title="events"
        handleSwitch={handleSwitch}
      />
      <div className="flex-grow py-2 px-4 sm:py-3 sm:px-6 md:py-5 md:px-10 bg-[#F8F8F8] border-box w-full sm:rounded-xl">
        {actSwitch.second === true ? (
          <AddEvents editEventId={editEventId} updateUI={() => setReloadEvent(!reloadEvent)}/>
        ) : (
          <EventData onData={editEventInfo} reloadEvent={reloadEvent}/>
        )}
      </div>
    </PagesLayout>
  );
};

export default withAuth(Page);
