import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy VeriToken
  const veriToken = await hre.ethers.deployContract("VeriToken");
  await veriToken.waitForDeployment();
  const tokenAddress = await veriToken.getAddress();
  console.log("VeriToken deployed to:", tokenAddress);

  // Deploy TuitionManager
  // Auditor public key placeholder (In reality, generated on the frontend/admin panel)
  const auditorPubKey = "MOCK_AUDITOR_PUBLIC_KEY";
  const tuitionManager = await hre.ethers.deployContract("TuitionManager", [tokenAddress, auditorPubKey]);
  await tuitionManager.waitForDeployment();
  const managerAddress = await tuitionManager.getAddress();
  console.log("TuitionManager deployed to:", managerAddress);

  console.log("Deployment complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
