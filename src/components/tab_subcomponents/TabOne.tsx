import React from 'react'
import CommunityCard from "./CommunityCard"

const TabOne = () => {

  const exploreList = [
    { title: "ExxonMobil (Depository)", logo: "partners_logo/ExxonMobil.png", description: "Earn 4.00% APR on USD balances without any of the complexities of crypto."},
    { title: "ConocoPhilips (Depository)", logo: "partners_logo/ConocoPhillips.png", description: "Secure custody for COMP & cTokens, and native support for Compound governance."},
    { title: "Goldman Sachs Group (Depository)", logo: "partners_logo/Goldman.png", description: "Safe crypto custody complete with trading, staking, and Compound governance."},
    { title: "Citi (Custodian)", logo: "partners_logo/Citibank.png", description: "Safely move assets between exchanges, wallets & Compound."},
    { title: "Blackstone Real Estate (Depository)", logo: "partners_logo/Blackstone.png", description: "Full-service crypto custodian, with support for both cTokens and COMP."},
    { title: "JPMorgan Chase & Co (Custodian, license issuer, streamline participant)", logo: "partners_logo/JPMorgan.png", description: "Access Compound directly from the security of your Ledger hardware wallet."},
  ]
  return (
    <div className='grid md:grid-cols-3 grid-col-1 gap-4'>
      {exploreList.map ((item, i) => (
        <CommunityCard key = {i} card={item} />
      ))}
    </div>
  )
}
export default TabOne
