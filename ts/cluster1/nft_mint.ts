import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "./wallet/wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = await createNft(umi, {
        mint,
        name: "Ritik Rug NFT",
        symbol: "RRT",
        uri: "https://arweave.net/YZZYkANQlv8bQcpueYOisU5-o5eCmejr6ZcFLlQDCEE",
        sellerFeeBasisPoints: percentAmount(1)
    });

    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
    console.log("Mint Address: ", mint.publicKey);
})();

// success -> Succesfully Minted! Check out your TX here:
// https://explorer.solana.com/tx/fSrQ3EgP7Xr8E5DWeg6ief7762Ho18PfpGuwjB2eSzVN5iHSM1ddCeeLWm8o1AGEowpvVWT7LRuEmiWD8kbUPNq?cluster=devnet
// Mint Address:  2rggwNkawvNZrUckADYPBfvxUunEGCnck1UhEgfHhGR4
// Done in 20.92s.