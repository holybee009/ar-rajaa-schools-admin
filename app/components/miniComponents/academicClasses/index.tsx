import React, {useEffect} from 'react';
import Button from '../../atoms/button';

interface Props {
    classesData: string[]
    studentsProfile: (_:string) => void
    handleBack: () => void
}

const AcademicClasses = ({classesData,studentsProfile, handleBack}:Props) => {
    const uniqueArray = Array.from(new Set(classesData));

  return (
    <>
    <h1 className='text-center capitalize text-xl font-semibold'>all classes</h1>
    <div className="mt-3 w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 cursor-pointer">
        {uniqueArray.length === 0 ? <h1>no classes yet</h1> :  
        uniqueArray.map((classes)=><div className="border border-black rounded-xl h-20 w-25 text-center flex items-center justify-center grow-1 capitalize" key={classes} onClick={() => studentsProfile(classes)}>{classes}</div>)}
    </div>
    <Button href="#" text="back" onClick={() => handleBack()} className="absolute right-3 bottom-3 w-full inset-x-0"/>
    </>
  );
};

export default AcademicClasses;
