"use client";
import react from "react";
import Image from "next/image";
import Edit from "../../atoms/icons/edit.svg"
import Delete from "../../atoms/icons/delete.svg"

interface Props {
    src: string;
    title: string;
    content: string;
    onEditClick: () => void;
    onDeleteClick: () => void;
}
const NewsBlock = ({src, title,content, onEditClick, onDeleteClick}: Props) =>{
    return (
       <div className="flex h-14 mb-3 gap:5 sm:gap-10 shadow shadow-lg p-2 justify-between rounded-xl w-full bg-white">
        <div className="flex gap-2 w-full">
            <Image src={src} alt="photo" width={40} height={50} className="rounded-full object-cover" />
            <div className="flex flex-col overflow-hidden max-w-36 sm:max-w-40 md:max-w-xs lg:max-w-md 2xl:max-w-lg">
                <h1 className="capitalize p-0.2 font-bold text-sm sm:text-auto truncate">{title}</h1>
                <h2 className="sm:text-sm text-xs p-0.2 truncate">{content}</h2>
            </div>
        </div>
        <div className="flex gap-2  w-full justify-end">
            <div className="flex rounded-xl border border-black-500 w-max items-center cursor-pointer py-0.2 px-1 md:py-0.5 md:px-2 gap-0.5" onClick={onEditClick}>
                <Image src={Edit} alt="photo" width={16} height={16}/>
                <p className="uppercase text-xs md:text-sm   w-max">edit</p>
            </div>
            <div className="flex rounded-xl border border-black-500 w-max items-center cursor-pointer py-0.2 px-1 md:py-0.5 md:px-2 gap-0.5" onClick={onDeleteClick}>
                <Image src={Delete} alt="photo" width={16} height={16}/>
                <p className="uppercase text-xs md:text-sm w-max">delete</p>
            </div>
        </div>
       </div>
    )
}

export default NewsBlock;