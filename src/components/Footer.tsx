import { footerBottomLinks } from "../data/footer";
import Statistics from "./Statistics";
import React from "react";

const Footer = () => {
  return (
    <div className="text-base font-medium">
      {/* <div className="bg-[#292E41] lg:flex justify-center items-center pt-20 pb-20 lg:py-10 px-6 md:pt-[132px] md:pb-[96px] lg:px-12 xl:px-64 text-[#f1f1f3]">
        <Statistics />
      </div> */}
      <div className="bg-[#292E41] lg:flex justify-between items-center pt-20 pb-20 lg:py-10 px-6 md:pt-[132px] md:pb-[96px] lg:px-12 xl:px-64 text-[#f1f1f3]">
          <div className="pb-10 md:pb-0">
            <img className="w-32" src="/spade.png" alt="Spade" />
          </div>
          <div className="hidden md:flex md:flex justify-between">
              <div className="mr-4 md:pb-0 pb-6 "><a className="">Aave Protocol</a></div>
              <div className="mr-4 md:pb-0 pb-6 "><a className="">Governance</a></div>
              <div className="mr-4 md:pb-0 pb-6 "><a className="">Docs</a></div>
              <div className="mr-4 md:pb-0 pb-6 "><a className="">Security</a></div>
              <div className="mr-4 md:pb-0"><a className="">FAQ</a></div>
          </div>
          <div className="md:hidden flex">
            <div className="w-6/12">
              <div className="mr-4 md:pb-0 pb-6 "><a className="">Aave Protocol</a></div>
              <div className="mr-4 md:pb-0"><a className="">Governance</a></div>
            </div>
            <div className="w-6/12">
              <div className="mr-4 md:pb-0 pb-6 "><a className="">Docs</a></div>
              <div className="mr-4 md:pb-0 pb-6 "><a className="">Security</a></div>
              <div className="mr-4 md:pb-0"><a className="">FAQ</a></div>
            </div>
          </div>
      </div>

      <div className="bg-[#383d51] text-[#a5a8b6] lg:flex justify-center pt-10 pb-[60px] lg:pb-[144px] lg:pt-[65px] px-6">
        <div className="lg:flex lg:text-sm w-full justify-between">
          <div className="flex lg:w-5/12 mb-10">
            <a className="mr-[16px] w-10 md:w-8 lg:w-6"><img src="/public/link/twitter.png" className="socialIcon"></img></a>
            <a className="mr-[16px] w-10 md:w-8 lg:w-6"><img src="/public/link/github.png" className="socialIcon"></img></a>
            <a className="mr-[16px] w-10 md:w-8 lg:w-6"><img src="/public/link/discord.png" className="socialIcon"></img></a>
            <a className="mr-[16px] w-10 md:w-8 lg:w-6"><img src="/public/link/telegram.png" className="socialIcon"></img></a>
          </div>
          <div className="hidden lg:flex text-base w-full justify-between">
              <div className="flex flex-col gap-5">
                <div>aTokens</div>
                <div>Bug Bounty</div>
                <div>Flash Loans</div>
                <div>Rate Switching</div>
              </div>
              <div className="flex flex-col gap-5">
                <div>Technical Paper</div>
                <div>Aavenomics</div>
                <div>Careers</div>
              </div>
              <div className="flex flex-col gap-5">
                <div>Branding</div>
                <div>Blog</div>
                <div>Contact</div>
                <div>Terms of Use</div>
              </div>
              <div>Privacy Policy</div>
          </div>
          <div className="flex justify-start lg:text-xs lg:hidden">
            <div className="flex flex-col gap-5 w-1/2">
                <div>aTokens</div>
                <div>Bug Bounty</div>
                <div>Flash Loans</div>
                <div>Rate Switching</div>
                <div>Technical Paper</div>
                <div>Aavenomics</div>
                <div>Careers</div>
            </div>
            <div className="flex flex-col gap-5 w-1/2">
                <div>Branding</div>
                <div>Blog</div>
                <div>Contact</div>
                <div>Terms of Use</div>
                <div>Privacy Policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
