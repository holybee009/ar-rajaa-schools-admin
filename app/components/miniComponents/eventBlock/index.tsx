'use client'
import react, { useState } from "react"
import Image from "next/image"
import Ellipse from "../../atoms/icons/ellipsis-vertical.svg"
import Edit from "../../atoms/icons/edit.svg"
import Delete from "../../atoms/icons/delete.svg"
import Cancel from "../../atoms/icons/cancel.svg"

interface Props {
    event: string;
    venue: string;
    date: string;
    onEditEventClick: () => void;
    onDeleteEventClick: () => void;
}
const EventBlock = ({event,venue,date, onDeleteEventClick,onEditEventClick}:Props) =>{
    const [configure, setconfigure] = useState<boolean>(false)
    const editEventClick = () => {
        onEditEventClick()
        setconfigure(false)
    }
    const deleteEventClick = () => {
        onDeleteEventClick()
        setconfigure(false)
    }
    return (
        <div className='relative border-b-2 border-grey p-3'>
            <div className='flex justify-between w-full pr-2'>
            <div className="w-1/2 text-left uppercase font-bold text-[#EE3A57] text-xs sm:text-sm md:text-base">{event}</div>
            <div className="w-1/2 text-center capitalize text-xs sm:text-sm md:text-base">{venue}</div>
            <div className="w-1/2 text-right text-xs sm:text-sm md:text-base">{date}</div>
            </div>
            <Image src={Ellipse} alt="ellipse" width={30} height={30} className="absolute top-2 -right-3 w-6 h-6 sm:w-16 sm:h-16"  onClick={() => setconfigure(true)} />
           {configure && 
           <div className="absolute top-0 right-2 bg-[#FBE4E7] rounded-xl shadow shadow-sm">
            <div className="flex relative gap-2 p-4 pt-7">
            <Image src={Cancel} alt="cancel" width={16} height={16} className="absolute top-2 right-2" onClick={() => setconfigure(false)}/>
            <div className="flex rounded-xl border border-black items-center cursor-pointer py-0.5 px-2 gap-0.5" onClick={editEventClick}>
                <Image src={Edit} alt="photo" width={16} height={16}/>
                <p className="uppercase text-sm">edit</p>
            </div>
            <div className="flex rounded-xl border border-black items-center cursor-pointer py-0.5 px-2 gap-0.5" onClick={deleteEventClick}>
                <Image src={Delete} alt="photo" width={16} height={16}/>
                <p className="uppercase text-sm">delete</p>
            </div>
        </div>
        </div>
        } 
        </div>
    )
}

export default EventBlock;
