import wallet from "./wallet/wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // 1. Load image
        const imagePath = '/home/ritikbhatt020/wba-turbin3-cohort-q3/ts/assets/generug.png';  // specify your image path
        const imageBuffer = await readFile(imagePath);

        // 2. Convert image to generic file
        const generic = createGenericFile(imageBuffer, "rug", {
            contentType: "image/png"
        });

        // 3. Upload image
        const [myUri] = await umi.uploader.upload([generic]);
        console.log("Your image URI: ", myUri);
    } catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// success -> Your image URI:  https://arweave.net/mvrjlFa_rmOTCgI32xCWYK3VuZt9RbMFW9o4bYbW5D0
// Done in 7.88s.
