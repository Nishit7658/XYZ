# VeriTuition

**Privacy-preserving college fee payments built on Avalanche for the Team1 India SpeedRun Hackathon.**

## The Problem
Currently, paying for education with crypto exposes a student's wallet balance, transaction history, and fee amounts to the entire world via public block explorers. This lack of financial privacy is a major barrier to adoption. 

## The Solution
**VeriTuition** solves this by allowing students to pay tuition using encrypted tokens. Financial status, wallet balances, and transaction amounts are completely hidden from the public. Colleges hold an "Auditor" key to verify payments for accounting and compliance, ensuring privacy without sacrificing accountability.

## Architecture (Theme: Privacy on Avalanche)
VeriTuition uses **eERC (Encrypted ERC20)** concepts on the **Avalanche Fuji Testnet**.
1. **Student** encrypts their payload (Student ID, Amount) using the College's Public Key.
2. **Smart Contract** executes the logic without exposing the real parameters publicly (mocked via standard EVM for this MVP).
3. **Auditor Admin** decrypts the payload locally using their Private Key to verify the payment.

## Tech Stack
* **Blockchain:** Avalanche Fuji Testnet
* **Smart Contracts:** Solidity, Hardhat
* **Frontend:** Next.js (React), TailwindCSS, shadcn-like UI components, Lucide Icons
* **Web3 Integration:** viem, wagmi, RainbowKit

---

## 🛠️ How to Build and Run the Project Locally

Follow these instructions to set up the repository on your local machine. The project is split into two parts: the **Smart Contracts** and the **Frontend Web App**.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- Git
- A Web3 Wallet (like [MetaMask](https://metamask.io/))
- Avalanche Fuji Testnet added to your wallet (Chain ID: 43113)

### 1. Clone the Repository
```bash
git clone https://github.com/Nishit7658/XYZ.git
cd XYZ/verituition
```

### 2. Frontend Setup
The frontend is a Next.js application built with TailwindCSS and RainbowKit for wallet connection.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open your browser and navigate to `http://localhost:3000`. You should see the sleek, dark-mode VeriTuition dashboard!

### 3. Smart Contract Setup (Hardhat)
If you want to compile and deploy the smart contracts yourself to the Avalanche Fuji Testnet, follow these steps:

```bash
# Open a new terminal window and navigate to the contracts directory
cd XYZ/verituition/contracts

# Install dependencies
npm install

# Compile the smart contracts
npx hardhat compile
```

#### Deploying the Contracts
To deploy the contracts to the Fuji Testnet, you need to set up your private key. 
1. Create a `.env` file inside the `contracts` folder:
   ```bash
   touch .env
   ```
2. Add your wallet private key (make sure it has test AVAX from the [Fuji Faucet](https://core.app/tools/testnet-faucet/?subnet=c&token=c)):
   ```env
   PRIVATE_KEY="your-wallet-private-key-here"
   ```
3. Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy.js --network fuji
   ```
4. Note down the deployed contract addresses printed in the terminal. You will need these to integrate with the frontend in a production environment.

---

## 💻 How to Use the DApp

### The Student Portal (Sender)
1. **Connect Wallet:** Click "Connect Wallet" in the top right corner and connect your MetaMask.
2. **Mint Test Funds:** Click the "Mint 5.0 AVAX" button to simulate funding your encrypted account.
3. **Pay Tuition:** Enter an amount (e.g., `2.5`) in the Tuition Amount input box.
4. **Submit:** Click "Encrypt & Send Payment". You will see the UI go through the stages of encrypting the payload, generating a Zero-Knowledge proof, and confirming the transaction.
5. **Receipt:** A ZK-Proof Hash receipt is generated, proving your payment was successful without revealing the amount to the public.

### The College Auditor Dashboard (Receiver)
1. Switch to the **2. College Auditor** tab.
2. **Privacy Login:** Enter the Auditor's Private Key to unlock the dashboard. (Hint: Use `fuji2026`).
3. **View Transactions:** Notice the difference between the "Public View" (which only sees a ciphertext hash) and the "Decrypted View". 
4. **Decrypt:** Click "Decrypt Payload" on any incoming transaction to simulate applying the Auditor's private key to reveal the true payment amount (e.g., `2.5 AVAX`) and Student ID.

## License
MIT License