use anchor_lang::prelude::*;

declare_id!("VAzNjZyA4Td3mcnkvooVfwarDFkhKPdmFBxQaMb9KRW");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
