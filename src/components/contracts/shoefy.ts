import {Wallet} from '../wallet';
import {Contract} from 'web3-eth-contract';
// import { ethers } from 'ethers';
import * as web3 from 'web3-utils';

export const ShoeFyAddress = "0x8d9d3a7e26b397d3B3901b3f545A0c3776021Dff";
export const StakingAddress = "0x74f425Db5765050c58f5FFB9879FaE6189178Dac";
export const DonationWalletAddress = "0x50dF6f99c75Aeb6739CB69135ABc6dA77C588f93";

export class Shoefy {
	private readonly _wallet: Wallet;
	private readonly _contract: Contract;
	private readonly _shoeFyContract: Contract;
	private readonly _stakingContract: Contract;

	private _balance: number = 0;
	private _stake: number = 0;
	private _pendingRewards: number = 0;
	private _apr: number = 0;

	constructor(wallet: Wallet) {
		this._wallet = wallet;
		this._stakingContract = wallet.connectToContract(StakingAddress, require('./staking.abi.json'));
		this._shoeFyContract =  wallet.connectToContract(ShoeFyAddress, require('./shoefy.abi.json'));
	}

	get contract(): Contract {
		return this._contract;
	}

	get wallet(): Wallet {
		return this._wallet;
	}
	get balance(): number {
		return this._balance;
	}
	get stakedBalance(): number {
		return this._stake;
	}
	get pendingStakeRewards(): number {
		return this._pendingRewards;
	}
	get apr(): number {
		return this._apr;
	}

	async stake(amount: number): Promise<void> {
		await this.refresh();

		if (this._balance >= amount) {
			await this._shoeFyContract.methods.approve(StakingAddress, web3.toWei(String(amount),'ether')).send({'from': this._wallet.currentAddress});
			await this._stakingContract.methods.stakeIn(web3.toWei(String(amount),'ether')).send({'from': this._wallet.currentAddress});
		}
		else {
			throw 'Your shoefy balance is not sufficient to stake this amount';
		}
	}
	async unstakeAndClaim(amount: number): Promise<void> {
		await this.refresh();

		if (this._stake >= amount) {
			await this._stakingContract.methods.withdrawStake(web3.toWei(String(amount),'ether')).send({'from': this._wallet.currentAddress});
		}
		else {
			throw 'Your staked shoefy balance is not sufficient to unstake this amount';
		}
	}
	async claim(): Promise<void> {
		await this._stakingContract.methods.claimStakingRewards().send({'from': this._wallet.currentAddress});
		await this.refresh();
	}

	async refresh(): Promise<void> {
		this._balance = await this._shoeFyContract.methods.balanceOf(this._wallet.currentAddress).call() / (10 ** 18);
		this._stake = await this._stakingContract.methods.stakedBalanceOf(this._wallet.currentAddress).call() / (10 ** 18);
		this._pendingRewards = await this._stakingContract.methods.pendingRewards(this._wallet.currentAddress).call() / (10 ** 18);
		this._apr = await this._stakingContract.methods.getCurrentAPR().call();
	}
}