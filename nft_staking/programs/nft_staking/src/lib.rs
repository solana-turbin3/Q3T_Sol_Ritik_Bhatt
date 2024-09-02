use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;

pub use instructions::*;

declare_id!("VAzNjZyA4Td3mcnkvooVfwarDFkhKPdmFBxQaMb9KRW");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn initialize_config(
        ctx: Context<InitializeConfig>,
        points_per_stake: u8,
        max_stake: u8,
        freeze_period: u32,
    ) -> Result<()> {
        ctx.accounts
            .initialize_config(points_per_stake, max_stake, freeze_period, &ctx.bumps)
    }
}

