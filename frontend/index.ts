import {
  getCIDfromPath,
  ipfsCat,
  IPFSCONFIG,
  parseContract,
  Status,
  // eslint-disable-next-line node/no-missing-import
} from "@ricardianfabric/verify-signed-contract/src/index";
// eslint-disable-next-line node/no-missing-import
import { onBuyClicked, renderError } from "./lib/actions/onBuyClicked";
(async function init() {
  const CIDOptions = getCIDfromPath();

  if (CIDOptions.status === Status.failure) {
    renderError(CIDOptions.error);
    return;
  }

  const ipfsDataOptions = await ipfsCat(CIDOptions.data, IPFSCONFIG);
  if (ipfsDataOptions.status === Status.failure) {
    // log your error, or display on UI
    renderError(ipfsDataOptions.error);
    return;
  }

  const contractOptions = await parseContract(ipfsDataOptions.data);

  if (contractOptions.status === Status.failure) {
    renderError(contractOptions.error);
    return;
  }

  // console.log(contractOptions.data.smartcontract);
  const buyButton = document.getElementById("Buy-tokens");
  buyButton.onclick = onBuyClicked;
})();
