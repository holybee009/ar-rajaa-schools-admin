"use client";
import { useState } from "react";
import PagesLayout from "./components/layout/layout";
import SubNavbar from "./components/miniComponents/subNavbar";
import AddNews from "./components/addSection/addNews";
import NewsData from "./components/updateData/newsData";
import withAuth from "./hoc/withAuth";


function Home() {
  const [actSwitch, setActSwitch] = useState({ first: true, second: false });
  const [editId, setEditId] = useState<string>('')
  const [reloadNews, setReloadNews] = useState<boolean>(false)

  const handleSwitch = (val: string) => {
    val === "first"
      ? setActSwitch({ first: true, second: false })
      : setActSwitch({ first: false, second: true });
  };

  const editNewsInfo = (val:string) => {
    setActSwitch({ first: false, second: true });
    setEditId(val)
  }

  return (
    <>
      <PagesLayout>
        <SubNavbar
          first={actSwitch.first}
          second={actSwitch.second}
          firstWord="all"
          secondWord="new"
          title="News"
          handleSwitch={handleSwitch}
        />
       <div className="flex-grow py-2 px-4 sm:py-3 sm:px-6 md:py-5 md:px-10 bg-[#F8F8F8] border-box w-full sm:rounded-xl">
          {actSwitch.second === true ? (
            <AddNews editId={editId} updateUI={() => setReloadNews(!reloadNews)}/>
          ) : (
            <NewsData onData={editNewsInfo} reloadNews={reloadNews}/>
          )}
        </div>
      </PagesLayout>
    </>
  );
}
export default withAuth(Home)