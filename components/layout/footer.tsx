"use client";

import { FaAngleDown } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="h-24 w-full flex bg-[#3C4D53] text-white py-8 justify-between px-16">
            <div><p>@2024 Eventori</p></div>
            <div className="w-full">
                <div className="flex justify-center">
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    {/* <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p> */}
                </div>
                <div className="flex justify-center">
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    {/* <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p>
                    <p className="mx-4 text-sm cursor-pointer">About</p> */}
                </div>
            </div>
            {/* <div><p className="flex items-center">Language <span><FaAngleDown /></span></p></div> */}
        </div>
    )
};

export default Footer;
