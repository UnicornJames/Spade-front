import React from 'react'
import CommunityCard from "./CommunityCard"

const TabTwo = () => {
  const exploreList = [
    { title: "Citi (Custodian)", logo: "partners_logo/Citibank.png", description: "Easily earn interest & invest; securely store & send. No seed phrase. No gas."},
    { title: "Blackstone Real Estate (Depository)", logo: "partners_logo/Blackstone.png", description: "Earn interest and borrow assets on one of the most popular crypto exchanges."},
    { title: "JPMorgan Chase & Co (Custodian, license issuer, streamline participant)", logo: "partners_logo/JPMorgan.png", description: "A no-loss lottery utilizing the interest earned in Compound as the prize."},
    { title: "Deutsche Bank (License issuer, custodian, streamline participant)", logo: "partners_logo/Deutsche.png", description: "Leading crypto exchange, with DeFi staking powered by Compound."},
    { title: "Amazon Web Servers", logo: "partners_logo/Amazon.png", description: "Interact with Compound through a native integration in the Crypto.com DeFi wallet."},
    { title: "Cloudflare", logo: "partners_logo/Cloudflare.png", description: "Fully-featured crypto wallet mobile app, integrating Compound."},
    { title: "Gemini Custody (Streamline participant, custodian)", logo: "partners_logo/Gemini.png", description: "A seamless interface to Compound alongside other DeFi applications."},
    { title: "SOC 2 Type I & Type II", logo: "partners_logo/SOC.png", description: "Secure, Manage, and Exchange on desktop, mobile and hardware wallets."},
    { title: "BitGo (Custodian)", logo: "partners_logo/BitGo.png", description: "Earn a protected, fixed return, or a volatile high yield with risk tranching."},
  ]
  return (
    <div className='grid md:grid-cols-3 grid-col-1 gap-4'>
      {exploreList.map ((item, i) => (
        <CommunityCard key = {i} card={item} />
      ))}
    </div>
  )
}
export default TabTwo
