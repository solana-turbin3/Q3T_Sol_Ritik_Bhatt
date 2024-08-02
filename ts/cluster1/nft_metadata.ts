import wallet from "./wallet/wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Image URI
        const imageUri = 'https://arweave.net/mvrjlFa_rmOTCgI32xCWYK3VuZt9RbMFW9o4bYbW5D0';

        // Metadata JSON structure
        const metadata = {
            name: "Ritik Rug NFT",
            symbol: "RRT",
            description: "This is a Rug NFT created by Ritik Bhatt at wba turbin3 cohort Q3",
            image: imageUri,
            attributes: [
                { trait_type: 'Background', value: 'Blue' },
                { trait_type: 'Eyes', value: 'Green' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: imageUri
                    }
                ]
            },
            creators: []
        };

        // Convert metadata to generic file
        const metadataBuffer = Buffer.from(JSON.stringify(metadata));
        const metadataFile = createGenericFile(metadataBuffer, 'metadata.json', {
            contentType: "application/json"
        });

        // Upload metadata
        const [metadataUri] = await umi.uploader.upload([metadataFile]);
        console.log("Your metadata URI: ", metadataUri);
    } catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// success -> Your metadata URI:  https://arweave.net/YZZYkANQlv8bQcpueYOisU5-o5eCmejr6ZcFLlQDCEE