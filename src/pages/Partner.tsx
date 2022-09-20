import Tippy from "@tippyjs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { socket } from "../socket";
import { currencyAbbr } from "../utils/currency";
import { PartnerCard } from "../components/PartnerCard";

const Partner = () => {
  const [assets, setAssets] = useState<any[]>([]);

  const [reserve, setReserve] = useState<any>(null);

  useEffect(() => {
    loadAssets();

    socket.on("reserve", (data) => {
      setReserve(data);
    });

    socket.emit("reserve");

    return () => {
      socket.off("reserve");
    };
  }, []);

  const loadAssets = async () => {
    const { data } = await axios.get(API_URL + "/assets");
    const finalData: any[] = [];
    data.forEach((v: any) => {
      finalData.push(v);
      v.sub_assets.forEach((z: any, i: number) => {
        finalData.push({ ...z, _id: `${v._id}-${i}`, child: true });
      });
    });
    setAssets(finalData);
  };

  if (!assets.length || !reserve) {
    return <></>;
  }

  const exploreList = [
    { title: "ExxonMobil (Depository)", logo: "partners_logo/ExxonMobil.png", descriptopn: "ExxonMobil Corporation is an American multinational oil and gas corporation that is the key administrator and shareholder of the Spade Enterprise Ltd WTI Crude Oil and Brent Crude Oil depository. ExxonMobil Corporation is organized and exists under the laws of the State of New Jersey, restated and integrated into its Certificate of Incorporation."},
    { title: "ConocoPhilips (Depository)", logo: "partners_logo/ConocoPhillips.png", descriptopn: "ConocoPhillips is an American multinational corporation engaged in hydrocarbon exploration and production which is dependent to safeguard Spade Enterprise Ltd’s natural gas reserves by storing them within their LNG facilities. ConocoPhillips is a trusted public body that conducts independent exploration and production (E&P)."},
    { title: "Goldman Sachs Group (Depository)", logo: "partners_logo/Goldman.png", descriptopn: "Goldman Sachs Group, Inc is a multinational investment banking and financial services company that is partnered with Spade Enterprise Ltd to assure the protection of our real estate assets, with access at any time under the instructions of an authorized Spade Enterprise Ltd director to liquidate and to be sold to Goldman Sachs Group Inc or their associates. Goldman Sachs is sanctioned and regulated by the Board of Governors of the Federal Reserve System (Federal Reserve Board), the FDIC, and the New York State Department of Financial Services."},
    { title: "Citi (Custodian)", logo: "partners_logo/Citibank.png", descriptopn: "Citigroup Inc. is an American multinational investment bank and financial services corporation that is that regulated by the Office of the Comptroller of the Currency (OCC) and Federal Reserve Bank of New York (FRBNY). Citigroup Inc. is a trusted member of Spade's safeguarding division to protect Spade Enterprise Ltd’s United States Dollar deposits. In California, CLA does business as Citigroup Life Insurance Agency, LLC the license number is 0G56746"},
    { title: "Blackstone Real Estate (Depository)", logo: "partners_logo/Blackstone.png", descriptopn: "Blackstone Real Estate Group (Blackstone Inc) is an American alternative investment management company that retain the property holdings of Spade Enterprise Ltd real estate assets, with access at any time under the instructions of an authorized Spade Enterprise Ltd director to manage, or liquidate to be sold to Blackstone Inc or their associates. Blackstone strictly conducts business activities through SEC-registered investment advisers. Blackstone Securities Partners L.P. is a broker-dealer registered with the SEC and a member of FINRA."},
    { title: "JPMorgan Chase & Co (Custodian, license issuer, streamline participant)", logo: "partners_logo/JPMorgan.png", descriptopn: "JPMorgan Chase & Co. is an investment banking company that are the official provisional licensers of Spade Enterprise Ltd’s, providing licenses through their private banking network. They are headquartered in New York, New York, United States and are regulated by the New York State Department of Financial Services (NYDFS). JPMorgan Chase & Co. has formed a strategic partnership with Spade Enterprise Ltd with the commitment to provide provisional lending licenses. JPMorgan Chase & Co. is a global leader in financial services, aiding the world's most significant corporations, governments, and institutions in more than 100 countries. JPMorgan Chase & Co. has been voted the “World’s Best Private Bank” and is trusted by Spade Enterprise Ltd to provide us with adequate provisional lending licenses allowing us to conduct our operations to premium standards."},
    { title: "Deutsche Bank (License issuer, custodian, streamline participant)", logo: "partners_logo/Deutsche.png", descriptopn: "Deutsche Bank AG is a German multinational investment bank and financial services company that has developed a contractual partnership with Spade Enterprise Ltd to store all our cash reserves and supply provisional lending licensing agreements to create authorized secured lending positions with our clients within Europe. Deutsche Bank AG is administered and regulated by The European Banking Authority (EBA) and the Federal Financial Supervisory Authority (BaFin)."},
    { title: "Amazon Web Servers", logo: "partners_logo/Amazon.png", descriptopn: "AWS provides even the most security-sensitive organizations with reliable cloud infrastructure. ISO 27001 and SOC 2 are just a couple of examples from the list of assurance programs with which AWS complies."},
    { title: "Cloudflare", logo: "partners_logo/Cloudflare.png", descriptopn: "Cloudflare is a trusted security partner providing protection from critical vulnerabilities and threats, safeguarding network infrastructure against layer 3 and layer 4 DDoS attacks, and securing our team’s devices, networks, and internal applications."},
    { title: "Gemini Custody (Streamline participant, custodian)", logo: "partners_logo/Gemini.png", descriptopn: "Gemini Trust Company, LLC is a New York trust company regulated by the New York State Department of Financial Services (NYDFS). Gemini Custody protect the Spade Enterprise Ltd the client GUSD (Gemini USD) holdings and is responsible for the streamlining conversion from USD to GUSD when instructed by Spade Enterprise Ltd, Spade will only commit to this instruction if we borrowers prefer the credit-line use of a stablecoin, or to comply with the User Agreement. Gemini is subject to anti-money laundering, capital reserve, consumer protection, and cybersecurity requirements, as well as banking compliance standards set forth by the NYDFS and New York Banking Law."},
    { title: "SOC 2 Type I & Type II", logo: "partners_logo/SOC.png", descriptopn: "The SOC 2 compliance framework gauges the levels of security and protection of customer data. Type I evaluates an organization’s internal controls related to financial reporting, and Type II measures its preparedness to handle and protect customer information and data."},
    { title: "BitGo (Custodian)", logo: "partners_logo/BitGo.png", descriptopn: "BitGo Trust Company is regarded as the globe’s most protective and conforming custody for digital assets. BitGo Trust Company has been appointed to be the primary depository for Spade Enterprise Ltd’s digital currency reserve. BitGo Trust Company is regulated by the South Dakota Division of Banking. Do these now please"},
  ]

  return (
    <div className="bg-split-white-black p-20 lg:px-36 lg:py-20">
      <h1 className="text-left text-white text-2xl lg:text-4xl font-bold">Partners</h1>
      <div className="rounded-md shadow-md bg-white p-1 mt-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 p-5">
            {/* <div className="box border p-4 md:p-6 transition ease-in-out delay-150 hover:-translate-y-2 duration-300">
                <div className="bg-cover">
                    //<img className="w-4/6 mb-5" src="/assets/ExxonMobil.2d6a0ec9.png"></img>
                </div>
                <h4 className="mb-5 text-stone-700">ExxonMobil (Depository)</h4>
                <p className="text-gray-400">
                    ExxonMobil Corporation is an American multinational oil and gas corporation that is the key administrator and shareholder of the Spade Enterprise Ltd WTI Crude Oil and Brent Crude Oil depository. ExxonMobil Corporation is organized and exists under the laws of the State of New Jersey, restated and integrated into its Certificate of Incorporation.
                </p>
            </div>*/}
        
            {exploreList.map((item, i) => (
                <PartnerCard key={i} card={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Partner;
