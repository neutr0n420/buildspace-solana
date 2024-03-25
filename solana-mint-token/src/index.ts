import { initializeKeypair } from "./initializeKeypair"
import * as token from "@solana/spl-token"
import * as web3 from "@solana/web3.js"


async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
  const user = await initializeKeypair(connection)
}

async function createNewMint(
  connection: web3.Connection,
  payer: web3.Keypair,
  mintAuthority: web3.PublicKey,
  freezeAuthority: web3.PublicKey,
  decimals: number
): Promise<web3.PublicKey> {
  const tokenMint = await token.createMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    decimals
  )
  console.log(`The token mint account address is ${tokenMint}`)
  console.log(`Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`)
  return tokenMint
}
async function createTokenAddress(
  connection: web3.Connection,
  payer: web3.Keypair,
  mint: web3.PublicKey,
  owner: web3.PublicKey
) {
  const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner
  )
  console.log(
    `Token Address: https://explorer.solana.com/address/${tokenAccount.address}?cluster=devnet`
  )
}

async function mintTokene(
  connection: web3.Connection,
  payer: web3.Keypair,
  mint: web3.PublicKey,
  destination: web3.PublicKey,
  authority: web3.PublicKey,
  amount: number
) {
  const mintInfo = await token.getMint(connection, mint)
}
main()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
