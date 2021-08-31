import {Wallet} from '../wallet';
import {Contract} from 'web3-eth-contract';
// import { ethers } from 'ethers';
import * as web3 from 'web3-utils';

export const ShoeFyAddress = "0xd685e8FcC20C55cefcD2d2a2840e345b9aC6A2C7";
export const RaptorAddress = "0x244273D3A157f72731f9ad50a3477009895873Bd";
export const StakingAddress = "0x91803C93A3ca6567C7b6251880f43053c501d569";
export const DonationWalletAddress = "0x50dF6f99c75Aeb6739CB69135ABc6dA77C588f93";

export class Shoefy {
	private readonly _wallet: Wallet;
	private readonly _contract: Contract;
	private readonly _shoeFyContract: Contract;
	private readonly _stakingContract: Contract;

	private _balance: number = 0;
	private _stake: number = 0;
	private _pendingRewards: number = 0;

	constructor(wallet: Wallet) {
		this._wallet = wallet;
		this._contract = wallet.connectToContract(RaptorAddress, require('./raptor.abi.json'));
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

	async stake(amount: number): Promise<void> {
		await this.refresh();

		if (this._balance >= amount) {
			await this._shoeFyContract.methods.approve(StakingAddress, web3.toWei(String(amount),'ether')).send({'from': this._wallet.currentAddress});
			await this._stakingContract.methods.stakeIn(web3.toWei(String(amount),'ether')).send({'from': this._wallet.currentAddress});
		}
		else {
			throw 'Your Raptor balance is not sufficient to stake this amount';
		}
	}
	async unstakeAndClaim(amount: number): Promise<void> {
		await this.refresh();

		if (this._stake >= amount) {
			await this._stakingContract.methods.withdrawStake(web3.toWei(String(amount),'ether')).send({'from': this._wallet.currentAddress});
		}
		else {
			throw 'Your staked Raptor balance is not sufficient to unstake this amount';
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
	}
}
