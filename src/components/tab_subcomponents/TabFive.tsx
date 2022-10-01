import React from 'react'
import CommunityCard from "./CommunityCard"

const TabFive = () => {
  const exploreList = [
    { title: "ConocoPhilips (Depository)", logo: "partners_logo/ConocoPhillips.png", description: "ConocoPhillips is an American multinational corporation engaged in hydrocarbon exploration and production which is dependent to safeguard Spade Enterprise Ltd’s natural gas reserves by storing them within their LNG facilities."},
    { title: "Goldman Sachs Group (Depository)", logo: "partners_logo/Goldman.png", description: "Goldman Sachs Group, Inc is a multinational investment banking and financial services company that is partnered with Spade Enterprise Ltd to assure the protection of our real estate assets, with access at any time under the instructions of an authorized Spade Enterprise Ltd director to liquidate and to be sold to Goldman Sachs Group Inc or their associates."},
    { title: "Gemini Custody (Streamline participant, custodian)", logo: "partners_logo/Gemini.png", description: "Gemini Trust Company, LLC is a New York trust company regulated by the New York State Department of Financial Services (NYDFS). "},
    { title: "SOC 2 Type I & Type II", logo: "partners_logo/SOC.png", description: "The SOC 2 compliance framework gauges the levels of security and protection of customer data."},
    { title: "Deutsche Bank (License issuer, custodian, streamline participant)", logo: "partners_logo/Deutsche.png", description: "Deutsche Bank AG is a German multinational investment bank and financial services company that has developed a contractual partnership with Spade Enterprise Ltd to store all our cash reserves and supply provisional lending licensing agreements to create authorized secured lending positions with our clients within Europe."},
    { title: "Amazon Web Servers", logo: "partners_logo/Amazon.png", description: "AWS provides even the most security-sensitive organizations with reliable cloud infrastructure."},
  ]
  return (
    <div className='grid md:grid-cols-3 grid-col-1 gap-4'>
      {exploreList.map ((item, i) => (
        <CommunityCard key = {i} card={item} />
      ))}
    </div>
  )
}
export default TabFive