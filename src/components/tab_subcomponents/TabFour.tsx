import React from 'react'
import CommunityCard from "./CommunityCard"

const TabFour = () => {
  const exploreList = [
    { title: "Goldman Sachs Group (Depository)", logo: "partners_logo/Goldman.png", description: "Goldman Sachs Group, Inc is a multinational investment banking and financial services company that is partnered with Spade Enterprise Ltd to assure the protection of our real estate assets, with access at any time under the instructions of an authorized Spade Enterprise Ltd director to liquidate and to be sold to Goldman Sachs Group Inc or their associates."},
    { title: "Citi (Custodian)", logo: "partners_logo/Citibank.png", description: "Citigroup Inc. is an American multinational investment bank and financial services corporation that is that regulated by the Office of the Comptroller of the Currency (OCC) and Federal Reserve Bank of New York (FRBNY)."},
    { title: "Blackstone Real Estate (Depository)", logo: "partners_logo/Blackstone.png", description: "Blackstone Real Estate Group (Blackstone Inc) is an American alternative investment management company that retain the property holdings of Spade Enterprise Ltd real estate assets, with access at any time under the instructions of an authorized Spade Enterprise Ltd director to manage, or liquidate to be sold to Blackstone Inc or their associates."},
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