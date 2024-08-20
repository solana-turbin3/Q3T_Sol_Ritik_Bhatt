use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;

pub use state::*;
pub use instructions::*;

declare_id!("HmyXtDct4kgn5JaTBMeRYaidivyjkpkJH4Bt8CkBQgks");

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn initialize(ctx: Context<Make>, seed: u64, receive: u64, deposit: u64) -> Result<()> {
        ctx.accounts.init_escrow(seed, receive, &ctx.bumps)?;
        ctx.accounts.deposit(deposit)?;

        Ok(())
    }

    pub fn complete_escrow(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.deposit()?;
        ctx.accounts.withdraw_and_close_vault()?;

        Ok(())
    }
}
