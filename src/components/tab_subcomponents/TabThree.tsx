import React from 'react'
import CommunityCard from "./CommunityCard"

const TabThree = () => {
  const exploreList = [
    { title: "Curve", logo: "logos/curve.svg", description: "The original open-source, full-featured dashboard to access the protocol."},
    { title: "Convex", logo: "logos/convex.svg", description: "Supply, borrow, and migrate MakerDAO CDPs into Compound."},
    { title: "Pooltogether", logo: "logos/pooltogether.svg", description: "Gas-free delegation and voting for COMP token-holders."},
    { title: "StakeDAO", logo: "logos/stakeDao.svg", description: "An alternative Compound dashboard with automated portfolio management."},
    { title: "Balancer", logo: "logos/balancer.svg", description: "Save, borrow, and monitor Compound & Ethereum positions."},
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