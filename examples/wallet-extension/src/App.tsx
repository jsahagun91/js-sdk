import styled from "@emotion/styled";
import {
  CurrencyAmount,
  SingleNodeDashboardQuery,
  TransactionDetailsFragment,
} from "@lightspark/js-sdk/generated/graphql";
import React from "react";
import "./App.css";
import AccountStorage from "./background/AccountStorage";
import { Maybe } from "./common/types";
import CurrencyAmountRaw from "./components/CurrencyAmountRaw";
import LeftArrow from "./components/LeftArrow";
import TransactionRow from "./components/TransactionRow";
import { getLightsparkClient } from "./lightsparkClientProvider";

enum Screen {
  Balance,
  Transactions,
}

function App() {
  const [walletDashboard, setWalletDashboard] =
    React.useState<SingleNodeDashboardQuery>();
  const [screen, setScreen] = React.useState<Screen>(Screen.Balance);

  React.useEffect(() => {
    chrome.storage.local
      .get(["walletDashboard"])
      .then(async (cachedBalance) => {
        if (cachedBalance) {
          setWalletDashboard(cachedBalance.walletDashboard);
        }
        const client = await getLightsparkClient(new AccountStorage());
        await client
          .getWalletDashboard()
          .then((dashboard) => {
            setWalletDashboard(dashboard);
            chrome.storage.local.set({ walletDashboard: dashboard });
          });
      });
  }, []);

  const body =
    screen === Screen.Balance ? (
      <BalanceScreen 
        balance={walletDashboard?.current_account?.blockchain_balance?.available_balance}
      />
    ) : (
      <TransactionsScreen transactions={walletDashboard?.current_account?.recent_transactions.edges.map((it) => it.entity) || []}/>
    );
  return (
    <div className="app-wrapper">
      {Header(screen, setScreen)}
      <div className="content-wrapper">{body}</div>
    </div>
  );
}

function Header(screen: Screen, setScreen: (screen: Screen) => void) {
  if (screen === Screen.Balance) {
    return (
      <div className="header">
        <img
          src="lightspark_full.png"
          className="app-logo"
          alt="Lightspark logo"
        />
        <button onClick={() => setScreen(Screen.Transactions)}>☰</button>
      </div>
    );
  }
  return (
    <div className="header">
      <button onClick={() => setScreen(Screen.Balance)}><LeftArrow /></button>
      <HeaderBackText>Transactions</HeaderBackText>
      <div style={{flex: "1"}}></div>
      <button>☰</button>
    </div>
  );
}

function BalanceScreen(props: {balance: Maybe<CurrencyAmount>}) {
  const screenContent = !props.balance ? (
    <div className="loading-text">Loading wallet...</div>
  ) : (
    <>
    <BalanceLabel>Balance</BalanceLabel>
    <div className="balance">
      <CurrencyAmountRaw
        shortNumber
        shortUnit
        value={props.balance?.value}
        unit={props.balance?.unit}
        symbol
      ></CurrencyAmountRaw>
    </div>
    <InstructionsText>Click the play button on the video to stream bitcoin in real-time.</InstructionsText>
    </>
  );
  return (
  <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    padding: "0 24px",
    height: "100%"
  }}>
    {screenContent}
  </div>
  );
}

function TransactionsScreen(props: {transactions: TransactionDetailsFragment[]}) {
  return (
    <div style={{width: "100%"}}>
      {props.transactions.map((transaction) => (
        <TransactionRow transaction={transaction} />
      ))}
    </div>
  );
}

const BalanceLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #999999;
  margin-bottom: 4px;
`;

const InstructionsText = styled.p`
  font-size: 10px;
  font-weight: 500;
  color: #999999;
  margin-bottom: 24px;
`;

const HeaderBackText = styled.span`
  font-size: 12px;
  color: white;
  font-weight: 700;
`;


export default App;
