import usePlayIntersection from "../../hooks/usePlayerInteraction";
import "./homestyle.css";
const Home = ({}) => {
  const [observe, containerRef] = usePlayIntersection();

  return (
    <div className="container" ref={containerRef}>
      {videos.map((vid) => (
        <video ref={observe} muted key={vid} loop controls>
          <source src={vid} />
        </video>
      ))}
      <div className="filler" />
    </div>
  );
};

const videos = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
];
export default Home;
