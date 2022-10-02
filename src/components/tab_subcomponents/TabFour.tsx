import React from 'react'
import CommunityCard from "./CommunityCard"

const TabFour = () => {
  const exploreList = [
    {
      title: "Aave",
      logo: "logos/aave.svg",
      description:
        "Earn 4.00% APR on USD balances without any of the complexities of crypto.",
    },
    {
      title: "Zapper",
      logo: "logos/zapper.svg",
      description:
        "Secure custody for COMP & cTokens, and native support for Compound governance.",
    },
    {
      title: "Defi Saver",
      logo: "logos/defiSaver.svg",
      description:
        "Safe crypto custody complete with trading, staking, and Compound governance.",
    },
    {
      title: "Zerion",
      logo: "logos/zerion.svg",
      description: "Safely move assets between exchanges, wallets & Compound.",
    },
    {
      title: "InstaDapp",
      logo: "logos/instaDapp.svg",
      description:
        "Full-service crypto custodian, with support for both cTokens and COMP.",
    },
    {
      title: "DeBank",
      logo: "logos/deBank.svg",
      description:
        "Access Compound directly from the security of your Ledger hardware wallet.",
    },
  ]
  return (
    <div className='grid md:grid-cols-3 grid-col-1 gap-4'>
      {exploreList.map ((item, i) => (
        <CommunityCard key = {i} card={item} />
      ))}
    </div>
  )
}
export default TabFour