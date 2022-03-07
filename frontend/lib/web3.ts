import Web3 from "web3";
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    ethereum: any;
    Module: any;
  }
}

window.ethereum = window.ethereum || {};

export const metamaskWeb3 = new Web3(window.ethereum);

export async function requestAccounts() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export function web3Injected(): boolean {
  if (window.ethereum.send) {
    return true;
  } else {
    return false;
  }
}
