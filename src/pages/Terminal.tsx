import axios from "axios";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { API_URL } from "../config";
import { newLine } from "../utils/terminalHelper";

const TerminalPage = () => {
  const terminalEl = useRef(null);
  let term: Terminal;

  let user = null;
  let currentLine: string = "";
  let commandHistory: string[] = [];
  let currentHistoryPosition = commandHistory.length;
  let processFlow: string | null = null;
  let escalateliqAssetSelection: string = "";
  let escalateliqTypeSelection: string = "";
  let escalateliqPartialSelection: string = "";
  let liquidateDigitalAssetTypeSelection: string = "";
  let liquidateDigitalAssetPartialSelection: string = "";
  let liquidateCommodityTypeSelection: string = "";
  let liquidateCommodityPartialSelection: string = "";
  let liquidateRealEstateTypeSelection: string = "";
  let liquidateRealEstatePartialSelection: string = "";
  let liquidateStockTypeSelection: string = "";
  let liquidateStockPartialSelection: string = "";
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");

  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  }

  useEffect(() => {
    if (terminalEl.current) {
      term = new Terminal({
        fontSize: 14,
        cursorBlink: true,
        cursorStyle: "block",
        theme: {
          background: "#2A2D3C",
          foreground: "white",
        },
        convertEol: true,
        // rendererType: "dom",
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalEl.current);
      term.write("Type 'help' for all available commands");
      fitAddon.fit();

      term.onKey((key: { key: string; domEvent: KeyboardEvent }) => {
        const char = key.domEvent.key;
        if (char === "Enter") {
          handleCommand();
        } else if (char === "Backspace") {
          if (currentLine.length) {
            currentLine = currentLine.slice(0, currentLine.length - 1);
            term.write("\b \b");
          }
        } else if (char === "ArrowUp") {
          if (commandHistory.length > 0) {
            currentHistoryPosition = Math.max(0, currentHistoryPosition - 1);
            deleteCurrentInput();
            currentLine = commandHistory[currentHistoryPosition];
            term.write(currentLine);
          }
        } else if (char === "ArrowDown") {
          if (commandHistory.length > 0) {
            currentHistoryPosition = Math.min(
              commandHistory.length,
              currentHistoryPosition + 1
            );

            deleteCurrentInput();
            if (currentHistoryPosition === commandHistory.length) {
              currentLine = "";
              term.write(currentLine);
            } else {
              currentLine = commandHistory[currentHistoryPosition];
              term.write(currentLine);
            }
          }
        } else {
          currentLine += char;
          term.write(char);
        }
      });

      prompt();
      term.focus();
    }
  }, []);

  const prompt = () => {
    const shellprompt = "oracle> ";
    term.write("\r\n" + shellprompt);
  };

  const pushToCommandHistory = () => {
    if (
      commandHistory.length > 0 &&
      commandHistory[commandHistory.length - 1] === currentLine
    ) {
      return;
    }
    commandHistory.push(currentLine);
    currentHistoryPosition = commandHistory.length;
  };

  const deleteCurrentInput = () => {
    let i = 0;
    while (i < currentLine.length) {
      term.write("\b \b");
      i++;
    }
  };

  const handleCommand = async () => {
    currentLine = currentLine.trim();
    if (processFlow) {
      switch (processFlow) {
        case "escalateliq":
          switch (currentLine) {
            case "real estate":
            case "stock":
            case "stocks":
            case "digital":
            case "commodity":
              term.write(
                newLine(
                  `Are you initiating "partial" or "full" liquidation of your ${currentLine} assets? (partial/full): `
                )
              );
              escalateliqAssetSelection = currentLine;
              processFlow = "escalateliq type";
              currentLine = "";
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "escalateliq type":
          switch (currentLine) {
            case "full":
              term.write(
                newLine(
                  `Confirm that you are initiating the full liquidation of all your assets (y/n): `
                )
              );
              escalateliqTypeSelection = currentLine;
              processFlow = "escalateliq confirm";
              currentLine = "";
              break;

            case "partial":
              term.write(
                newLine(
                  `Percent (%) of your assets you are allocating to be liquidated: `
                )
              );
              escalateliqTypeSelection = currentLine;
              processFlow = "escalateliq partial";
              currentLine = "";
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "escalateliq partial":
          if (currentLine) {
            term.write(
              newLine(
                `Confirm that you are initiating the partial liquidation of all your assets (y/n): `
              )
            );
            escalateliqPartialSelection = currentLine;
            processFlow = "escalateliq confirm";
            currentLine = "";
          } else {
            term.write(newLine("Cancelled"));
            term.write(newLine(""));
            prompt();
            currentLine = "";
            processFlow = null;
          }
          break;

        case "escalateliq confirm":
          switch (currentLine) {
            case "y":
              term.write(newLine(""));
              term.write(
                newLine(
                  `You have successfully submitted your request to our Proprietary Assets division to resort to our network contract to\ninitiate asset conversion to cash which takes the contract within our private network. `
                )
              );
              term.write(newLine(""));
              term.write(
                newLine(
                  `This approximately takes 2 minutes of assets depending on the network queue turning downwards at a fast rate. If network\ncongestions occur, it may take longer.`
                )
              );
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "drawup confirm":
          switch (currentLine) {
            case "y":
              term.write(newLine(""));
              term.write(
                newLine(
                  `You have successfully submitted your request to our Proprietary Assets division to resort to our network contract to\ninitiate asset conversion to cash which takes the contract within our private network. `
                )
              );
              term.write(newLine(""));
              term.write(
                newLine(
                  `This approximately takes 2 minutes of assets depending on the network queue turning downwards at a fast rate. If network\ncongestions occur, it may take longer.`
                )
              );
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "repay interest confirm":
          switch (currentLine) {
            case "y":
              term.write(newLine(""));
              term.write(
                newLine(
                  `You have successfully submitted your request to our Proprietary Assets division to resort to our network contract to\ninitiate asset conversion to cash which takes the contract within our private network. `
                )
              );
              term.write(newLine(""));
              term.write(
                newLine(
                  `This approximately takes 2 minutes of assets depending on the network queue turning downwards at a fast rate. If network\ncongestions occur, it may take longer.`
                )
              );
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "liquidate digital assets":
          switch (currentLine) {
            case "full":
              term.write(
                newLine(
                  `Confirm that you are initiating the full liquidation of all your digital assets (y/n): `
                )
              );
              liquidateDigitalAssetTypeSelection = currentLine;
              processFlow = "liquidate digital assets confirm";
              currentLine = "";
              break;

            case "partial":
              term.write(
                newLine(
                  `Percent (%) of your digital assets you are allocating to be liquidated : `
                )
              );
              liquidateDigitalAssetTypeSelection = currentLine;
              processFlow = "liquidate digital assets partial";
              currentLine = "";
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "liquidate digital assets partial":
          if (currentLine) {
            term.write(
              newLine(
                `Confirm that you are initiating the partial liquidation of all your digital assets (y/n): `
              )
            );
            liquidateDigitalAssetPartialSelection = currentLine;
            processFlow = "liquidate digital assets confirm";
            currentLine = "";
          } else {
            term.write(newLine("Cancelled"));
            term.write(newLine(""));
            prompt();
            currentLine = "";
            processFlow = null;
          }
          break;

        case "liquidate digital assets confirm":
          switch (currentLine) {
            case "y":
              term.write(newLine(""));
              term.write(
                newLine(
                  `You have successfully submitted your request to our Proprietary Assets division to resort to our network contract to\ninitiate asset conversion to cash which takes the contract within our private network. `
                )
              );
              term.write(newLine(""));
              term.write(
                newLine(
                  `This approximately takes 2 minutes of assets depending on the network queue turning downwards at a fast rate. If network\ncongestions occur, it may take longer.`
                )
              );
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "liquidate commodity":
          switch (currentLine) {
            case "full":
              term.write(
                newLine(
                  `Confirm that you are initiating the full liquidation of all your commodities assets (y/n): `
                )
              );
              liquidateCommodityTypeSelection = currentLine;
              processFlow = "liquidate commodity confirm";
              currentLine = "";
              break;

            case "partial":
              term.write(
                newLine(
                  `Percent (%) of your commodities assets you are allocating to be liquidated : `
                )
              );
              liquidateCommodityTypeSelection = currentLine;
              processFlow = "liquidate commodity partial";
              currentLine = "";
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "liquidate commodity partial":
          if (currentLine) {
            term.write(
              newLine(
                `Confirm that you are initiating the partial liquidation of all your commodities assets (y/n): `
              )
            );
            liquidateCommodityPartialSelection = currentLine;
            processFlow = "liquidate commodity confirm";
            currentLine = "";
          } else {
            term.write(newLine("Cancelled"));
            term.write(newLine(""));
            prompt();
            currentLine = "";
            processFlow = null;
          }
          break;

        case "liquidate commodity confirm":
          switch (currentLine) {
            case "y":
              term.write(newLine(""));
              term.write(
                newLine(
                  `You have successfully submitted your request to our Proprietary Assets division to resort to our network contract to\ninitiate asset conversion to cash which takes the contract within our private network. `
                )
              );
              term.write(newLine(""));
              term.write(
                newLine(
                  `This approximately takes 2 minutes of assets depending on the network queue turning downwards at a fast rate. If network\ncongestions occur, it may take longer.`
                )
              );
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "liquidate real estate":
          switch (currentLine) {
            case "full":
              term.write(
                newLine(
                  `Confirm that you are initiating the full liquidation of all your real estate assets (y/n): `
                )
              );
              liquidateRealEstateTypeSelection = currentLine;
              processFlow = "liquidate real estate confirm";
              currentLine = "";
              break;

            case "partial":
              term.write(
                newLine(
                  `Percent (%) of your real estate assets you are allocating to be liquidated : `
                )
              );
              liquidateRealEstateTypeSelection = currentLine;
              processFlow = "liquidate real estate partial";
              currentLine = "";
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "liquidate real estate partial":
          if (currentLine) {
            term.write(
              newLine(
                `Confirm that you are initiating the partial liquidation of all your real estate assets (y/n): `
              )
            );
            liquidateRealEstatePartialSelection = currentLine;
            processFlow = "liquidate real estate confirm";
            currentLine = "";
          } else {
            term.write(newLine("Cancelled"));
            term.write(newLine(""));
            prompt();
            currentLine = "";
            processFlow = null;
          }
          break;

        case "liquidate real estate confirm":
          switch (currentLine) {
            case "y":
              term.write(newLine(""));
              term.write(
                newLine(
                  `You have successfully submitted your request to our Proprietary Assets division to resort to our network contract to\ninitiate asset conversion to cash which takes the contract within our private network. `
                )
              );
              term.write(newLine(""));
              term.write(
                newLine(
                  `This approximately takes 2 minutes of assets depending on the network queue turning downwards at a fast rate. If network\ncongestions occur, it may take longer.`
                )
              );
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "liquidate stock":
          switch (currentLine) {
            case "full":
              term.write(
                newLine(
                  `Confirm that you are initiating the full liquidation of all your stock assets (y/n): `
                )
              );
              liquidateStockTypeSelection = currentLine;
              processFlow = "liquidate stock confirm";
              currentLine = "";
              break;

            case "partial":
              term.write(
                newLine(
                  `Percent (%) of your stock assets you are allocating to be liquidated : `
                )
              );
              liquidateStockTypeSelection = currentLine;
              processFlow = "liquidate stock partial";
              currentLine = "";
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;

        case "liquidate stock partial":
          if (currentLine) {
            term.write(
              newLine(
                `Confirm that you are initiating the partial liquidation of all your stock assets (y/n): `
              )
            );
            liquidateStockPartialSelection = currentLine;
            processFlow = "liquidate stock confirm";
            currentLine = "";
          } else {
            term.write(newLine("Cancelled"));
            term.write(newLine(""));
            prompt();
            currentLine = "";
            processFlow = null;
          }
          break;

        case "liquidate stock confirm":
          switch (currentLine) {
            case "y":
              term.write(newLine(""));
              term.write(
                newLine(
                  `You have successfully submitted your request to our Proprietary Assets division to resort to our network contract to\ninitiate asset conversion to cash which takes the contract within our private network. `
                )
              );
              term.write(newLine(""));
              term.write(
                newLine(
                  `This approximately takes 2 minutes of assets depending on the network queue turning downwards at a fast rate. If network\ncongestions occur, it may take longer.`
                )
              );
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;

            default:
              term.write(newLine("Cancelled"));
              term.write(newLine(""));
              prompt();
              currentLine = "";
              processFlow = null;
              break;
          }
          break;
      }
      return;
    }
    pushToCommandHistory();
    switch (currentLine) {
      case "":
        prompt();
        currentLine = "";
        break;

      case "clear":
      case "cls":
        prompt();
        currentLine = "";
        term.clear();
        break;

      case "help":
        term.write(newLine(""));
        term.write(newLine("COMMANDS"));
        [
          "view assets",
          "credit line health",
          "borrow info",
          "ltv",
          "drawup",
          "sudo escalateliq",
          "repay interest",
          "liquidate digital assets",
          "liquidate commodity",
          "liquidate real estate",
          "liquidate stocks",
        ].forEach((v) => {
          term.write(newLine(`  ${v}`));
        });
        term.write(newLine(""));
        prompt();
        currentLine = "";
        break;

      case "view assets":
        term.write(newLine(""));
        (await fetchCommandOutput("view assets")).forEach((v) => {
          term.write(newLine(v));
        });
        term.write(newLine(""));
        prompt();
        currentLine = "";
        break;

      case "credit line health":
        term.write(newLine(""));
        ['Status: "GOOD"'].forEach((v) => {
          term.write(newLine(v));
        });
        term.write(newLine(""));
        prompt();
        currentLine = "";
        break;

      case "borrow info":
        term.write(newLine(""));
        (await fetchCommandOutput("borrow info")).forEach((v) => {
          term.write(newLine(v));
        });
        term.write(newLine(""));
        prompt();
        currentLine = "";
        break;

      case "ltv":
        term.write(newLine(""));
        (await fetchCommandOutput("ltv")).forEach((v) => {
          term.write(newLine(v));
        });
        term.write(newLine(""));
        prompt();
        currentLine = "";
        break;

      case "drawup":
        term.write(newLine(""));
        term.write(
          newLine(
            "Confirm that you are initiating the full liquidation of all of your assets (y/n): "
          )
        );
        currentLine = "";
        processFlow = "drawup confirm";
        break;

      case "sudo escalateliq":
        term.write(newLine(""));
        term.write(
          newLine(
            "Which asset are you liquidating? (real estate/stocks/digital/commodity): "
          )
        );
        currentLine = "";
        processFlow = "escalateliq";
        break;

      case "repay interest":
        term.write(newLine(""));
        term.write(
          newLine(
            "Approve transfer to “Repay Interest” from your Spade Oracle cash balance (y/n): "
          )
        );
        currentLine = "";
        processFlow = "repay interest confirm";
        break;

      case "liquidate digital assets":
        term.write(newLine(""));
        term.write(
          newLine(
            "Are you initiating “partial” or “full” liquidation of your digital assets? (partial/full): "
          )
        );
        currentLine = "";
        processFlow = "liquidate digital assets";
        break;

      case "liquidate commodity":
        term.write(newLine(""));
        term.write(
          newLine(
            "Are you initiating “partial” or “full” liquidation of your commodities assets? (partial/full): "
          )
        );
        currentLine = "";
        processFlow = "liquidate commodity";
        break;

      case "liquidate real estate":
        term.write(newLine(""));
        term.write(
          newLine(
            "Are you initiating “partial” or “full” liquidation of your real estate assets? (partial/full): "
          )
        );
        currentLine = "";
        processFlow = "liquidate real estate";
        break;

      case "liquidate stocks":
      case "liquidate stock":
        term.write(newLine(""));
        term.write(
          newLine(
            "Are you initiating “partial” or “full” liquidation of your stock assets? (partial/full): "
          )
        );
        currentLine = "";
        processFlow = "liquidate stock";
        break;

      default:
        term.write(`\r\n${currentLine}: command not found`);
        prompt();
        currentLine = "";
        break;
    }
  };

  const fetchCommandOutput = async (name: string): Promise<string[]> => {
    try {
      const { data } = await axios.post(API_URL + "/command", { name });
      if (data.status) {
        return data.command.output;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  if (!isLoggedIn || !user) {
    location.href = "/";
  }

  return (
    <div className="bg-white px-4 md:p-12 xl:px-60">
      <h1 className="text-left text-[#2A2D3C] text-2xl lg:text-4xl font-bold">
        Terminal
      </h1>
      <div className="shadow-md mt-10 terminal_font">
        <p className="bg-[#20232F] terminal_top_bar p-2 text-white text-center text-sm">
          {user.name.toLowerCase().split(" ").join("")}@spadeoracle: ~
        </p>
        <div ref={terminalEl} style={{ height: 500 }}></div>
      </div>
    </div>
  );
};

export default TerminalPage;
