import VideoUploadBtn from "@/components/shared/VideoUploadBtn/VideoUploadBtn";
import Navbar from "@/components/ui/Navbar";
import React from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="bg-slate-50 w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="w-full  max-w-[768px]  bg-white mx-auto h-[95vh] rounded-md flex flex-col">
        {/* navbar position */}
        <Navbar></Navbar>
        <VideoUploadBtn></VideoUploadBtn>
        <div className="relative overflow-y-scroll hidden-scrollbar h-full w-full">
          <div className="w-full h-full px-5 font-roboto">{children}</div>
        </div>
        {/* footer position */}
        <div className=" w-full text-center py-3">
          Copyright @2024 . Developed by Adil
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
