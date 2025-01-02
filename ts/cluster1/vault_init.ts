import { Connection, PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { Address, AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { getKeypairFromFile } from "@solana-developers/helpers";
import { createAssociatedTokenAccount, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { MultiToken } from "./programs/multi_token";
import { WbaVault, IDL } from "./programs/wba_vault";
import wal from "./keypairs/wba-wallet.json"
import escrKeypair from "./keypairs/escrow-keypair-three.json"
import usrKeypair from "./keypairs/user-keypair.json"
import { BN } from "@coral-xyz/anchor";
// Replace with your program ID and IDL path
const PROGRAM_ID = new PublicKey("FL132voiHixqyuUTfd1Gi13939qZW4bMvG5DndTcreeM");

const IDL2: MultiToken = {
  address: "FL132voiHixqyuUTfd1Gi13939qZW4bMvG5DndTcreeM",
  metadata: {
    name: "multiToken",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor"
  },
  instructions: [
    {
      name: "falseSettlement",
      discriminator: [
        148,
        166,
        122,
        134,
        169,
        177,
        42,
        243
      ],
      accounts: [
        {
          name: "escrowAccount",
          writable: true,
          signer: true
        },
        {
          name: "escrowTokenAccount",
          docs: [
            "Escrow's token account for the specified mint."
          ],
          writable: true
        },
        {
          name: "userTokenAccount",
          docs: [
            "User's token account for the specified mint."
          ],
          writable: true
        },
        {
          name: "userAccount",
          writable: true
        },
        {
          name: "authority",
          signer: true
        },
        {
          name: "mint",
          docs: [
            "Mint of the token being settled."
          ]
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      args: [
        {
          name: "amount",
          type: "u64"
        },
        {
          name: "txnId",
          type: "string"
        },
        {
          name: "isNative",
          type: "bool"
        }
      ]
    },
    {
      name: "initializeEscrow",
      docs: [
        "Initializes the escrow account with zero balances for all tokens and sets the authority and mint addresses."
      ],
      discriminator: [
        243,
        160,
        77,
        153,
        11,
        92,
        48,
        209
      ],
      accounts: [
        {
          name: "escrowAccount",
          writable: true,
          signer: true
        },
        {
          name: "owner",
          writable: true,
          signer: true
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111"
        }
      ],
      args: []
    },
    {
      name: "participate",
      discriminator: [
        71,
        30,
        209,
        149,
        172,
        95,
        73,
        193
      ],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true
        },
        {
          name: "userTokenAccount",
          docs: [
            "User's token account for the specified mint."
          ],
          writable: true
        },
        {
          name: "escrowTokenAccount",
          docs: [
            "Escrow's token account for the specified mint."
          ],
          writable: true
        },
        {
          name: "escrowAccount",
          writable: true
        },
        {
          name: "mint",
          docs: [
            "Mint of the token being used."
          ]
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111"
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      args: [
        {
          name: "amount",
          type: "u64"
        },
        {
          name: "challengeId",
          type: "u64"
        },
        {
          name: "playerId",
          type: {
            option: "u64"
          }
        },
        {
          name: "participationType",
          type: {
            defined: {
              name: "participationType"
            }
          }
        },
        {
          name: "isNative",
          type: "bool"
        },
        {
          name: "providedNonce",
          type: "u64"
        }
      ]
    },
    {
      name: "send",
      docs: [
        "Sends tokens from the escrow account to the admin account."
      ],
      discriminator: [
        102,
        251,
        20,
        187,
        65,
        75,
        12,
        69
      ],
      accounts: [
        {
          name: "escrowAccount",
          writable: true,
          signer: true
        },
        {
          name: "escrowTokenAccount",
          docs: [
            "Escrow's token account for the specified mint."
          ],
          writable: true
        },
        {
          name: "adminTokenAccount",
          docs: [
            "Admin's token account for the specified mint."
          ],
          writable: true
        },
        {
          name: "adminAccount",
          writable: true
        },
        {
          name: "mint",
          docs: [
            "Mint of the token being transferred."
          ]
        },
        {
          name: "authority",
          signer: true
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      args: [
        {
          name: "amount",
          type: "u64"
        },
        {
          name: "isNative",
          type: "bool"
        }
      ]
    },
    {
      name: "settleChallenge",
      discriminator: [
        242,
        58,
        232,
        150,
        127,
        199,
        11,
        204
      ],
      accounts: [
        {
          name: "escrowAccount",
          writable: true,
          signer: true
        },
        {
          name: "escrowTokenAccount",
          docs: [
            "Escrow's token account for the specified mint."
          ],
          writable: true
        },
        {
          name: "mint",
          docs: [
            "Mint of the token being transferred."
          ]
        },
        {
          name: "authority",
          writable: true,
          signer: true
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      args: [
        {
          name: "amounts",
          type: {
            vec: "u64"
          }
        },
        {
          name: "challengeId",
          type: "u64"
        },
        {
          name: "isNative",
          type: "bool"
        }
      ]
    }
  ],
  accounts: [
    {
      name: "escrowAccount",
      discriminator: [
        36,
        69,
        48,
        18,
        128,
        225,
        125,
        135
      ]
    }
  ],
  events: [
    {
      name: "falseSettlementEvent",
      discriminator: [
        166,
        209,
        148,
        22,
        87,
        215,
        144,
        101
      ]
    },
    {
      name: "participateEvent",
      discriminator: [
        42,
        125,
        44,
        79,
        117,
        82,
        38,
        124
      ]
    },
    {
      name: "sendEvent",
      discriminator: [
        140,
        14,
        81,
        77,
        70,
        218,
        3,
        30
      ]
    },
    {
      name: "settleChallengeEvent",
      discriminator: [
        50,
        103,
        56,
        234,
        164,
        98,
        81,
        160
      ]
    }
  ],
  errors: [
    {
      code: 6000,
      name: "unauthorized",
      msg: "The requested operation is not authorized."
    },
    {
      code: 6001,
      name: "insufficientFunds",
      msg: "Insufficient funds to complete the operation."
    },
    {
      code: 6002,
      name: "unsupportedCurrency",
      msg: "The specified currency is not supported."
    },
    {
      code: 6003,
      name: "transferFailed",
      msg: "Failed to perform the transfer."
    },
    {
      code: 6004,
      name: "invalidInput",
      msg: "Invalid input provided."
    },
    {
      code: 6005,
      name: "invalidAmount",
      msg: "Invalid amount provided."
    },
    {
      code: 6006,
      name: "timeError",
      msg: "Failed to get current time."
    },
    {
      code: 6007,
      name: "invalidAdminWallet",
      msg: "Invalid admin wallet public key."
    },
    {
      code: 6008,
      name: "invalidMint",
      msg: "Invalid mint address provided."
    },
    {
      code: 6009,
      name: "underflow",
      msg: "Underflow error: Attempted to subtract more than the balance allows."
    },
    {
      code: 6010,
      name: "overflow",
      msg: "Overflow error: Attempted to add more than the maximum balance."
    },
    {
      code: 6011,
      name: "invalidNonce",
      msg: "Nonce Error: The provided nonce does not match the stored nonce."
    },
    {
      code: 6012,
      name: "tokenNotFound",
      msg: "Token not found in the escrow account."
    }
  ],
  types: [
    {
      name: "escrowAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "pubkey"
          },
          {
            name: "tokens",
            type: {
              vec: "pubkey"
            }
          },
          {
            name: "tokenBalances",
            type: {
              vec: "u64"
            }
          },
          {
            name: "solBalance",
            type: "u64"
          },
          {
            name: "nonce",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "falseSettlementEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "token",
            type: "string"
          },
          {
            name: "amount",
            type: "u64"
          },
          {
            name: "txnId",
            type: "string"
          },
          {
            name: "isNative",
            type: "bool"
          }
        ]
      }
    },
    {
      name: "participateEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "pubkey"
          },
          {
            name: "token",
            type: "string"
          },
          {
            name: "amount",
            type: "u64"
          },
          {
            name: "challengeId",
            type: "u64"
          },
          {
            name: "playerId",
            type: {
              option: "u64"
            }
          },
          {
            name: "participationType",
            type: {
              defined: {
                name: "participationType"
              }
            }
          },
          {
            name: "isNative",
            type: "bool"
          },
          {
            name: "nonce",
            type: "u64"
          }
        ]
      }
    },
    {
      name: "participationType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "sideBet"
          },
          {
            name: "joinChallenge"
          }
        ]
      }
    },
    {
      name: "sendEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "to",
            type: "pubkey"
          },
          {
            name: "token",
            type: "string"
          },
          {
            name: "amount",
            type: "u64"
          },
          {
            name: "isNative",
            type: "bool"
          }
        ]
      }
    },
    {
      name: "settleChallengeEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "token",
            type: "string"
          },
          {
            name: "amounts",
            type: {
              vec: "u64"
            }
          },
          {
            name: "challengeId",
            type: "u64"
          },
          {
            name: "winners",
            type: {
              vec: "pubkey"
            }
          },
          {
            name: "isNative",
            type: "bool"
          }
        ]
      }
    }
  ]
};

const web3Constants = {
  usdcMint: new PublicKey("usdcjuyqxVrSMiXtn6oDbETAwhJLs6Q5ZxZ2qLqXg9i"), //EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
  bonkMint: new PublicKey("bonkMLw9Gyn4F3dqwxaHgcqLQxvchiYLfjDjEVXCEMf"), //DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
  sendMint: new PublicKey("send5CvJLQjEAASQjXfa1thdnDJkeMxXefZB3AMj1iF"), //SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa
};

const initWeb3 = async (): Promise<{
  program: Program<MultiToken>;
  escrowAccount: Keypair;
  userKeypair: Keypair;
  kp: Keypair;
  provider: AnchorProvider;
}> => {
  // const kp = await getKeypairFromFile(
  //   "/home/ritikbhatt020/Q3T_Sol_heyblancos/ts/cluster1/wallet/wba-wallet.json"
  // ); // todo: change this done
  const kp = Keypair.fromSecretKey(new Uint8Array(wal));
  const escrowAccount = Keypair.fromSecretKey(new Uint8Array(escrKeypair));
  const userKeypair = Keypair.fromSecretKey(new Uint8Array(usrKeypair));
  const connection = new Connection(
    "https://api.devnet.solana.com", //todo: change this to mainnet done
    "confirmed"
  );
  const wallet = new Wallet(userKeypair ?? kp);
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  const program = new Program<MultiToken>(IDL2, provider);
  return { program, escrowAccount, userKeypair, kp, provider };
};

const initializeEscrow = async () => {
  // Replace these with the appropriate mint addresses for USDC, BONK, and SEND
  try {
    // Send a transaction to initialize the escrow account
    const { program, escrowAccount, userKeypair, kp, provider } = await initWeb3();
    const tx = await program.methods
      .initializeEscrow()
      .accounts({
        escrowAccount: escrowAccount.publicKey,
        owner: kp.publicKey,
      })
      .signers([kp, escrowAccount])
      .rpc();

    console.log("Escrow initialized with transaction ID:", tx);

    let escrowAccountUpdated = await program.account.escrowAccount.fetch(
      escrowAccount.publicKey
    );
    console.log({ escrowAccountUpdated });
    console.log(
      "Escrow Account Public Key:",
      escrowAccount.publicKey.toBase58()
    );
  } catch (err) {
    console.error("Error initializing escrow:", err);
  }
};

const participateInChallenge = async () => {
  try {
    const { program, kp, userKeypair, escrowAccount, provider } = await initWeb3();

    const connection = new Connection(
      "https://api.devnet.solana.com", //todo: change this to mainnet done
      "confirmed"
    );

    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      userKeypair,
      web3Constants.usdcMint,
      userKeypair.publicKey,
      true
    );

    const escrowTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      userKeypair,
      web3Constants.usdcMint,
      escrowAccount.publicKey,
      true
    );

    console.log("User Token Account:", userTokenAccount.address.toBase58());
    console.log("Escrow Token Account:", escrowTokenAccount.address.toBase58());

    const amount = new BN(1 * 10 ** 6); // 1 SOL
    const challengeId = new BN(1);
    const playerId = new BN(1);

    // @ts-ignore Workaround for enum issue
    const participationType = { joinChallenge: {} };

    const tx = await program.methods
      .participate(
        amount,
        challengeId,
        playerId,
        participationType as any,
        true,
        new BN(2)
      )
      .accounts({
        user: userKeypair.publicKey,
        userTokenAccount: userTokenAccount.address,
        escrowTokenAccount: escrowTokenAccount.address,
        escrowAccount: escrowAccount.publicKey,
        mint: web3Constants.usdcMint,
      })
      .signers([userKeypair])
      .rpc();

    console.log("Participated in challenge with transaction signature:", tx);

    const userTokenAccountBalance =
      await connection.getTokenAccountBalance(userTokenAccount.address);
    const escrowTokenAccountBalance =
      await connection.getTokenAccountBalance(escrowTokenAccount.address);

    console.log("User Token Account Balance:", userTokenAccountBalance.value);
    console.log(
      "Escrow Token Account Balance:",
      escrowTokenAccountBalance.value
    );
  } catch (error) {
    console.error("Error participating in challenge:", error);
  }
};

participateInChallenge();