import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import * as Web3 from "@solana/web3.js"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

export const SendSolForm: FC = () => {
    const [sendBalance, setSendBalance] = useState<number>()
    const [reciverPublicKey, setReciverPublicKey] = useState('')
    const {connection} = useConnection()
    const {publicKey, sendTransaction} = useWallet()
    // console.log(publicKey)
    const sendSol = (event) => {
        event.preventDefault()
        console.log(sendBalance, reciverPublicKey)
        if(sendBalance > 2){
           return window.alert('Request the SOL token less than 2.')
        }
        const connection = new Web3.Connection(publicKey.toBase58()) 
        console.log(connection)
        // console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
    }

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required  onChange={e => setSendBalance(Number(e.target.value))}/>
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required onChange={e => setReciverPublicKey(e.target.value)} />
                <button type="submit" className={styles.formButton}>Send</button>
            </form>
        </div>
    )
}