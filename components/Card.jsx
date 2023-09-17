"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import COPYICON from'@/assets/icons/copy.svg';
import TICKICON from'@/assets/icons/tick.svg';
import { usePathname, useRouter } from "next/navigation";

const Card = ({prompt, onTagClick, onDelete, onEdit}) => {
  const router =useRouter();
  const pathname =usePathname();
  const {data: session} =useSession();
  const [copied, setCopied] =useState(null);
  const handleCopy =() =>{
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() =>setCopied(null), 10000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center cursor-pointer gap-3">
          <Image src={prompt.creator.image} alt={prompt.creator.username} height={37} width={37} className="rounded-full object-contain"/>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{prompt.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{prompt.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied ===prompt.prompt ?TICKICON :COPYICON} alt="icon" width={12} height={12}/>
        </div>
      </div>
      <p className="text-sm my-4 font-satoshi text-gray-700">{prompt.prompt}</p>
      <h3 className="font-inter text-sm blue_gradient w-max cursor-pointer" onClick={() =>onTagClick && onTagClick(prompt.tag)}>#{prompt.tag}</h3>
      {(session?.user.id ===prompt.creator._id && pathname ==='/profile') &&(
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={onEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={onDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default Card;