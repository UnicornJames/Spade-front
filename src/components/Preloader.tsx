import { useEffect } from "react";

const Preloader = () => {
  useEffect(() => {
    setTimeout(() => {
      (document.getElementById("preloader") as HTMLElement).style.opacity = "0";
      setTimeout(() => {
        (document.getElementById("preloader") as HTMLElement).style.display =
          "none";
      }, 500);
    }, 1500);
  }, []);

  return (
    <div
      className="bg-[#292D3B] w-[100vw] h-[100vh] z-[9999] fixed flex justify-center items-center"
      id="preloader"
      style={{ transition: "all 0.5s ease-out" }}
    >
      <img src="/spade.png" className="w-52 animate-bounce" />
    </div>
  );
};

export default Preloader;
