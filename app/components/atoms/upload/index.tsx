"use client";
import React from "react";
interface Uploads {
  uploadFile: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  isMultiple: boolean;
}

const Upload = ({ uploadFile, isMultiple}: Uploads) => {
  return (
    <div className="border border-black-200 aspect-square h-20 relative flex justify-center items-center p-2 bg-white">
      <h1 className="capitalize text-sm">+ upload</h1>
      <input
        multiple={isMultiple}
        type="file"
        className="opacity-0 aspect-square h-20 absolute"
        onChange={(ev) => uploadFile(ev)}
      />
    </div>
  );
};

export default Upload;
