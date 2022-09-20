// import React from "react";
// import { IgrFinancialChart } from "igniteui-react-charts";
// import { IgrFinancialChartModule } from "igniteui-react-charts";
// import StocksHistory from "./StocksHistory";

// IgrFinancialChartModule.register();

// export default class Chart extends React.Component<any, any> {
//   public data: any[] | undefined;

//   constructor(props: any) {
//     super(props);
//     this.state = { data: [] };
//     this.initData();
//   }

//   public render(): JSX.Element {
//     return (
//       <div className="container sample">
//         <div className="container">
//           <IgrFinancialChart
//             width="100%"
//             height="500px"
//             chartType="Line"
//             dataSource={this.state.data}
//           />
//         </div>
//       </div>
//     );
//   }

//   public initData() {
//     StocksHistory.getMultipleStocks().then((stocks: any[]) => {
//       this.setState({ data: stocks });
//     });
//   }
// }