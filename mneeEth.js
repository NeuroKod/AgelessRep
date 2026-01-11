const ethers = require('ethers');
require('dotenv').config();

const valid = require('./handcash/existUser');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.SERVER_PRIVATE_KEY, provider);

const mnee = new ethers.Contract(
    "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF",
    [
      "function transfer(address to, uint256 amount) returns (bool)",
      "function decimals() view returns (uint8)",
      "function balanceOf(address owner) view returns (uint256)"
    ],
    wallet
  );

const rewardPlayer = async (req, res) => {
  console.log("Rewarding player...");
  const key = req.body.key;
  const val = await valid(key);
  if (val == false)
    return res.status(401).json({ message: "Failed to fetch items order" });

  const playerAddress = req.body.EthAddress;
  const amount = req.body.amount;

  console.log("account: ", key);
  console.log("address: ", playerAddress);
  console.log("amount: ", amount);

  const decimals = await mnee.decimals();
  const value = ethers.parseUnits(amount.toString(), decimals);

  const balance = await mnee.balanceOf(wallet.address);
  console.log(
    "Server balance:",
    ethers.formatUnits(balance, decimals),
    "MNEE"
  );

  if (balance < value) {
    console.log("❌ Server wallet has insufficient MNEE");
  }
  else {
    const tx = await mnee.transfer(playerAddress, value);
    await tx.wait();
  
    console.log("✅ Reward sent:", tx.hash);
  }
}

module.exports = {
  rewardPlayer
};
