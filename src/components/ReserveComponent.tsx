import React from "react"

const ReserveComponent = () => {
    return (
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {reserve.map((value: any, index: number) => (
            <div key={value._id} className="rounded shadow-md bg-white">
              <p className="text-lg font-semibold my-4 mx-6 text-left">
                {value.title}
                {index == 0 && (
                  <>
                    {value.is_verified ? (
                      <Tippy
                        interactive
                        content={
                          <>
                            <p>This figure was last updated at</p>
                            <p>{stats.last_recorded}</p>
                          </>
                        }
                      >
                        <img
                          src="verified.png"
                          className="h-4 w-4 relative -top-[1px] inline cursor-pointer ml-2"
                        />
                      </Tippy>
                    ) : (
                      <Tippy
                        interactive
                        content={
                          <>
                            <p>This figure was last updated at</p>
                            <p>{stats.stablecoin_last_recorded}</p>
                          </>
                        }
                      >
                        <img
                          src="unverified.png"
                          className="h-[1.1rem] w-[1.1rem] relative -top-[1px] inline cursor-pointer ml-2"
                        />
                      </Tippy>
                    )}
                  </>
                )}
                <Tippy interactive content={value.tooltip}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 inline relative cursor-pointer -top-[1px]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Tippy>
              </p>
              <hr />
              <p className="text-xl font-semibold mt-4 mx-6">
                {currency(value.total)}
                <span
                  className={`text-base font-medium ml-2 ${
                    value.change < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {value.change}%
                </span>
              </p>
              {value.multi_level_assets
                ? value.assets.map((asset: any, index: number) => (
                    <div key={index} className="my-4 mx-6">
                      <p className="text-md font-bold mt-4 mb-2">
                        {asset.title}
                      </p>

                      {asset.items.map((item: any, itemIndex: number) => (
                        <div key={itemIndex} className="my-4">
                          {percentageTemplate(value.total, value.color, item)}
                        </div>
                      ))}
                    </div>
                  ))
                : value.assets.map((asset: any, index: number) => (
                    <div key={index} className="my-4 mx-6">
                      {percentageTemplate(value.total, value.color, asset)}
                    </div>
                  ))}
              <br />
              <hr />
              <div className="my-4 mx-6 text-center">
                <p className={`text-gray-400 text-xs font-semibold mb-2`}>
                  {value.bottom_label}
                  <Tippy interactive content={value.bottom_tooltip}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 inline relative cursor-pointer -top-[1px]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Tippy>
                </p>
                <p className={`text-lg font-medium`}>{value.bottom_value}</p>
              </div>
            </div>
          ))}
      </div>
    )
}

export default ReserveComponent