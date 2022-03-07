import { expect } from "chai";
import { ethers } from "hardhat";

describe("Capped presale", function () {
  it("Should be able to make a purchase", async function () {
    const [deployer, signer2, signer3] = await ethers.getSigners();
    const CappedPresale = await ethers.getContractFactory("CappedPresale");
    const cappedPresale = await CappedPresale.deploy(
      ethers.utils.parseEther("100000")
    );
    await cappedPresale.deployed();

    expect(await cappedPresale.getCapLeft()).to.equal(
      ethers.utils.parseEther("100000")
    );

    expect(ethers.utils.formatEther(await deployer.getBalance())).to.equal(
      "9999.99796815625"
    );

    const overrides = { value: ethers.utils.parseEther("1000") };
    await cappedPresale.connect(signer2).buy(overrides);

    expect(await cappedPresale.getCapLeft()).to.equal(
      ethers.utils.parseEther("99000")
    );

    expect(ethers.utils.formatEther(await deployer.getBalance())).to.equal(
      "10999.99796815625"
    );

    await signer3.sendTransaction({
      to: cappedPresale.address,
      value: ethers.utils.parseEther("100"),
    });
    expect(ethers.utils.formatEther(await deployer.getBalance())).to.equal(
      "11099.99796815625"
    );

    expect(await cappedPresale.getCapLeft()).to.equal(
      ethers.utils.parseEther("98900")
    );
    const buyers = await cappedPresale.getBuyers();
    expect(buyers[0]._address).to.equal(signer2.address);
    expect(buyers[0].amount).to.equal(ethers.utils.parseEther("1000"));
    expect(buyers[1]._address).to.equal(signer3.address);
    expect(buyers[1].amount).to.equal(ethers.utils.parseEther("100"));

    expect(await cappedPresale.getPurchase(signer2.address)).to.equal(
      ethers.utils.parseEther("1000")
    );
    let errorOccured = false;
    try {
      await signer3.sendTransaction({
        to: cappedPresale.address,
        value: ethers.utils.parseEther("10000000"),
      });
    } catch (err) {
      errorOccured = true;
    }
    expect(errorOccured).equal(true);
  });
});
