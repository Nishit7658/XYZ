# VeriTuition Architecture

## System Overview

VeriTuition separates the experience into four layers:

1. Frontend dashboard for students and auditors
2. Wallet integration for signing and sending transactions
3. Smart contracts for tuition payment and receipt logging
4. Privacy layer for encrypted amounts and controlled verification

## Architecture Diagram

```mermaid
flowchart LR
  Student[Student] --> UI[Next.js Frontend]
  Auditor[College Auditor] --> UI
  UI --> Wallet[RainbowKit / wagmi / viem]
  UI --> Chain[Avalanche Fuji]
  Chain --> Token[VeriToken]
  Chain --> Tuition[TuitionManager]
  Tuition --> Receipt[Confidential Event Log]
```

## API Flow

```mermaid
sequenceDiagram
  participant Browser
  participant API as Frontend Logic
  participant Chain as Avalanche Fuji

  Browser->>API: Connect wallet
  Browser->>API: Request mint or pay action
  API->>Chain: Send transaction
  Chain-->>API: Return transaction hash
  API-->>Browser: Show receipt and status
```

## Smart Contract Flow

```mermaid
sequenceDiagram
  participant Student
  participant Contract as TuitionManager
  participant Auditor

  Student->>Contract: payTuition(amount, encryptedPayload)
  Contract-->>Student: payment event emitted
  Auditor->>Contract: read auditor key / event data
  Auditor-->>Student: verify payment internally
```

## Privacy Design

The MVP uses an encrypted payload approach so the important tuition details are not shown in the public interface. A stronger version can move to eERC for encrypted value handling and a Private L1 for private execution.

## Deployment Targets

- Local frontend: http://localhost:3000
- Avalanche Fuji testnet for contract deployment
- GitHub repository for hackathon submission
