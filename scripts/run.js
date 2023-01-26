// The Hardhat Runtime Environment, or HRE for short, is an object containing all the functionality that Hardhat exposes when running a task, test or script. In reality, Hardhat is the HRE.
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // This will compile our contract and generate the necessary files we need to work with our contract under the artifacts directory.
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // Hardhat will create a local Ethereum network for us, but just for this contract.
  // Then, after the script completes it'll destroy that local network.
  // So, every time you run the contract, it'll be a fresh blockchain, like refreshing your local server.
  const waveContract = await waveContractFactory.deploy();

  // Wait until our contract is deployed to our local blockchain! Our constructor runs when we actually deploy.
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  await waveContract.getTotalWaves();

  const firstWaveTxn = await waveContract.wave(); //("This is wave #1");
  await firstWaveTxn.wait(); // Wait for the transaction to be mined

  await waveContract.getTotalWaves();

  const secondWaveTxn = await waveContract.connect(randomPerson).wave(); //("This is wave #2");
  await secondWaveTxn.wait(); // Wait for the transaction to be mined

  await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // Exit the process with success
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit the process with failure
  }
};

runMain();
