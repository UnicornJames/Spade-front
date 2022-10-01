import React from 'react'
import CommunityCard from "./CommunityCard"

const TabThree = () => {
  const exploreList = [
    { title: "Gemini Custody (Streamline participant, custodian)", logo: "partners_logo/Gemini.png", description: "The original open-source, full-featured dashboard to access the protocol."},
    { title: "SOC 2 Type I & Type II", logo: "partners_logo/SOC.png", description: "Supply, borrow, and migrate MakerDAO CDPs into Compound."},
    { title: "BitGo (Custodian)", logo: "partners_logo/BitGo.png", description: "Gas-free delegation and voting for COMP token-holders."},
    { title: "Citi (Custodian)", logo: "partners_logo/Citibank.png", description: "An alternative Compound dashboard with automated portfolio management."},
    { title: "Blackstone Real Estate (Depository)", logo: "partners_logo/Blackstone.png", description: "Save, borrow, and monitor Compound & Ethereum positions."},
    { title: "JPMorgan Chase & Co (Custodian, license issuer, streamline participant)", logo: "partners_logo/JPMorgan.png", description: "Easily integrate Compound with a RESTful API."},
    { title: "JPMorgan Chase & Co (Custodian, license issuer, streamline participant)", logo: "partners_logo/JPMorgan.png", description: "A fast & cost-effective way to build, scale and monetize investment strategies."},
    { title: "Deutsche Bank (License issuer, custodian, streamline participant)", logo: "partners_logo/Deutsche.png", description: "Import your Compound position for improved liquidation economics."},
    { title: "Amazon Web Servers", logo: "partners_logo/Amazon.png", description: "Buy, sell, trade and earn in-app, or pay with Eidoo Card worldwide."},
  ]
  return (
    <div className='grid md:grid-cols-3 grid-col-1 gap-4'>
      {exploreList.map ((item, i) => (
        <CommunityCard key = {i} card={item} />
      ))}
    </div>
  )
}
export default TabThree