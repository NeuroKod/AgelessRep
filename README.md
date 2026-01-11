Automatic Game Rewards with MNEE

## What is this?

So here's the idea: imagine you're playing a mobile game, grinding through levels, and when you hit that milestone you've been working toward, money just... appears in your wallet. Not game currency, but real MNEE stablecoins that you can actually use.

That's what we built. A backend service that automatically rewards players with MNEE tokens when they reach certain levels or achievements in games. It's programmable money working behind the scenes to make gaming actually pay off.

## How it works

When a player hits a level milestone, the game calls our reward API. We validate the request, check our server wallet has enough MNEE, and then send the reward directly to the player's Ethereum address. Simple as that.

The whole thing runs on Ethereum using the MNEE contract at `0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`. We're using ethers.js to handle the transfers, so it's all on-chain and transparent.

## Why this matters

Gaming has always been about achievements and progression, but what if those achievements had real value? With MNEE stablecoins, players can earn actual USD-backed rewards that they can use anywhere. It bridges the gap between virtual achievements and real-world value.

For game developers, it's a new way to engage players. Instead of just cosmetic rewards or in-game currency, you can offer something tangible. And because MNEE is a stablecoin, the value doesn't fluctuate wildly like other cryptocurrencies.

## Setup

You'll need Node.js installed. Then:

```bash
npm install ethers dotenv
```

Create a `.env` file with:
```
RPC_URL=your_ethereum_rpc_url
SERVER_PRIVATE_KEY=your_wallet_private_key
```

The server wallet needs to hold MNEE tokens to distribute rewards. Make sure it's funded before players start hitting milestones!

## API Usage

The `rewardPlayer` function expects a POST request with:
- `key`: Authentication key (validated via handcash/existUser)
- `EthAddress`: Player's Ethereum address to receive the reward
- `amount`: Amount of MNEE to send (as a number, decimals handled automatically)

Example:
```javascript
const { rewardPlayer } = require('./mneeEth');

// In your Express route or similar
app.post('/reward', rewardPlayer);
```

## What we're submitting

This is our entry for the MNEE Hackathon, specifically in the **Commerce & Creator Tools** track. We're showing how programmable money can create new economic models in gaming - turning achievements into actual value.

The code is straightforward because we wanted to focus on the concept: automatic, transparent rewards that players can actually use. No complicated smart contracts, just a simple service that connects game achievements to real money.

## License

MIT - feel free to use this however you want. If you build something cool with it, let us know!
