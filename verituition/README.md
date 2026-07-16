# VeriTuition 🎓🔒

**Privacy-preserving college fee payments built on Avalanche for the Team1 India SpeedRun Hackathon.**

## 🌟 The Problem
Currently, paying for education with crypto exposes a student's wallet balance, transaction history, and fee amounts to the entire world via public block explorers. This lack of financial privacy is a major barrier to adoption. 

## 🚀 The Solution
**VeriTuition** solves this by allowing students to pay tuition using encrypted tokens. Financial status, wallet balances, and transaction amounts are completely hidden from the public. Colleges hold an "Auditor" key to verify payments for accounting and compliance, ensuring privacy without sacrificing accountability.

## 🏗️ Architecture (Theme: Privacy on Avalanche)
VeriTuition uses **eERC (Encrypted ERC20)** concepts on the **Avalanche Fuji Testnet**.
1. **Student** encrypts their payload (Student ID, Amount) using the College's Public Key.
2. **Smart Contract** executes the logic without exposing the real parameters publicly (mocked via standard EVM for this MVP).
3. **Auditor Admin** decrypts the payload locally using their Private Key to verify the payment.

## 💻 Tech Stack
* **Blockchain:** Avalanche Fuji Testnet
* **Smart Contracts:** Solidity, Hardhat
* **Frontend:** Next.js (React), TailwindCSS, shadcn-like UI components, Lucide Icons
* **Web3 Integration:** viem, wagmi, RainbowKit

## 📂 Project Structure
* `/contracts` - Hardhat project with `VeriToken` and `TuitionManager`.
* `/frontend` - Next.js DApp for Student and Admin interfaces.

## 🛠️ Quick Start
1. **Clone the repo:** `git clone https://github.com/your-username/verituition`
2. **Install Frontend dependencies:** `cd frontend && npm install`
3. **Run Frontend:** `npm run dev`
4. **Deploy Contracts:** `cd contracts && npx hardhat run scripts/deploy.js --network fuji`

## 📄 License
MIT License