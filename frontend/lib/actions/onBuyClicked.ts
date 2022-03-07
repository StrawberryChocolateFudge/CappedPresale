import MetaMaskOnboarding from "@metamask/onboarding";
// eslint-disable-next-line node/no-missing-import
import { web3Injected } from "../web3";

export function onBuyClicked() {
  if (!web3Injected()) {
    renderError("Found no injected web3, install metamask");
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
    return -1;
  }
}

export function renderError(msg: string) {
  const errorSlot = document.getElementById("message-slot");
  errorSlot.innerHTML = `<h5 class="error text-align-center">${msg}</h5>`;
}
