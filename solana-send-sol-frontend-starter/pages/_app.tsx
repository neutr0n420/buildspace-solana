import React, { useMemo } from 'react'
import '../styles/globals.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
require('@solana/wallet-adapter-react-ui/styles.css')

function MyApp({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network] )

  const wallet = useMemo(
    () =>[
      new PhantomWalletAdapter(),
    ],[network]
  )
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallet} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
   )
}

export default MyApp
