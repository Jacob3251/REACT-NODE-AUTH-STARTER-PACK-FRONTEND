import CommentBox from "../CommentBox/CommentBox";
import { VideoData } from "../../../pages/Landing"; 


function VideoBox({ vidData }: { vidData: VideoData }) { 
  // Correct the prop typing: { vidData: VideoData }

  return (
    <div className="w-full mb-5 pb-2 shadow-md bg-zinc-100 rounded-md overflow-hidden">
      <div className="w-full flex flex-col justify-center items-center bg-zinc-50 rounded-md ">
        <video
          className=" w-auto" 
          autoPlay
          muted
          controls
        >
          <source src={vidData.videoUrl} type="video/mp4" />
        </video>

        <div className="w-full">
          <CommentBox vidData={vidData}></CommentBox>
        </div>
      </div>
    </div>
  );
}

export default VideoBox;