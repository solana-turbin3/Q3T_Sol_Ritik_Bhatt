import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args,
    Collection,
    Creator,
    Uses
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("5Bueyt5zFxygKMuESUiKmhE3k3yhDFQeHvdSWWjNREUp")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer
        }

        let data: DataV2Args = {
            name: "Happy Token",
            symbol: "HPT",
            uri: "https://bafybeidpf3uzi2i7zn4pgczcimbgeubmrn3fw3kltl6ndhoxqddasvepce.ipfs.w3s.link/metadata.json",
            sellerFeeBasisPoints: 0,
            creators: null as Creator[] | null,
            collection: null as Collection | null,
            uses: null as Uses | null,
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            isMutable: true,
            collectionDetails: null,
            data: data
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
        // 52oHb1bHTq7LxgWDHKd4aQVioF8CaWJ5gYMXsKAyD9BtVCb95ECxdaDhukpsWMqH6JcLa4z3BSYmnyVcBTadaza6
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();