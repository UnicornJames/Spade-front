import React from 'react'
import CommunityCard from "./CommunityCard"

const TabFive = () => {
  const exploreList = [
    { title: "Ledger", logo: "logos/ledger.svg", description: "Easily earn interest & invest; securely store & send. No seed phrase. No gas."},
    { title: "Coinbase Wallet", logo: "logos/coinbase.svg", description: "Earn interest and borrow assets on one of the most popular crypto exchanges."},
    { title: "Argent", logo: "logos/argent.svg", description: "A no-loss lottery utilizing the interest earned in Compound as the prize."},
    { title: "Frame", logo: "logos/frame.svg", description: "Leading crypto exchange, with DeFi staking powered by Compound."},
    { title: "Trust Wallet", logo: "logos/trustwallet.svg", description: "Interact with Compound through a native integration in the Crypto.com DeFi wallet."},
    { title: "Gnosis", logo: "logos/gnosis.svg", description: "Fully-featured crypto wallet mobile app, integrating Compound."},
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