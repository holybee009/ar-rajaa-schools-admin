"use client"
import Image from "next/image";
import {useState} from "react"
import Edit from "../../atoms/icons/whiteEdit.svg"
import Delete from "../../atoms/icons/whiteDelete.svg"
import Cancel from "../../atoms/icons/whiteCancel.svg"

interface Props {
    src: string;
    title: string;
    onEditClick: () => void;
    onDeleteClick: ()=> void;
}

const StudentBlock = ({src, title, onEditClick, onDeleteClick} : Props)  =>{
    const [showAction, setShowAction] = useState<boolean>(false)

    const onEditRecentClick = () =>{
        setShowAction(false)
        onEditClick()
    }

    const onDeleteRecentClick = () =>{
        setShowAction(false)
        onDeleteClick()
    }

    return (
        <>
        <div className="relative flex flex-col items-center justify-center p-0">  
          <div className="relative w-full h-24"> 
            <Image
                src={src}
                alt="Description"
                layout="fill"
                objectFit="cover"  // Use Tailwind's utility class for object-fit
                className="absolute inset-0 rounded-xl"
                onClick={()=> setShowAction(true)}
            />
          </div>
            <p className="text-center text-sm leading-3 justify-self-end mt-2 capitalize">{title}</p>
            {showAction && <div className="absolute top-0 bg-black bg-opacity-50 rounded-xl p-2 h-24 w-full flex flex-col justify-between">
            <Image src={Cancel} alt="cancel" width={16} height={16} className="right-1 text-white -mt-1 cursor-pointer" onClick={() => setShowAction(false)}/>
            <div className="flex rounded-xl border border-black-500 items-center cursor-pointer py-0.5 px-2 gap-0.5 text-[#fff] mb-2" onClick={onEditRecentClick}>
                <Image src={Edit} alt="photo" width={16} height={16} className="text-white"/>
                <p className="uppercase text-sm">edit</p>
            </div>
            <div className="flex rounded-xl border border-g items-center cursor-pointer py-0.5 px-2 gap-0.5 text-[#fff]" onClick={onDeleteRecentClick}>
                <Image src={Delete} alt="photo" width={16} height={16} className="text-red-500 fill-white stroke-[#fff]"/>
                <p className="uppercase text-sm">delete</p>
            </div>
                </div>
            }
        </div>
        </>
    )
}

export default StudentBlock;