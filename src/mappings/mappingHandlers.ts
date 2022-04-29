import { StartGovern,VoteByNumber } from "../types";
import { FrontierEvmEvent } from '@subql/contract-processors/dist/frontierEvm';
import { BigNumber } from "ethers";

// Setup types from ABI
type GovernEventArgs = [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, BigNumber] & {creator: string; number: BigNumber; governType: BigNumber; startDate: BigNumber; endDate: BigNumber; uintValue: BigNumber; strValue: string; totalVoter:BigNumber;};
type VoteEventArgs = [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, boolean] & {votor: string; number: BigNumber; governType: BigNumber; totalVoter: BigNumber; approveVoter: BigNumber; opposeVoter:BigNumber; success:boolean;};

export async function handleGovernEvmEvent(event: FrontierEvmEvent<GovernEventArgs>): Promise<void> {
    const startGovern = new StartGovern(event.transactionHash);

    startGovern.creator = event.args.creator;
    startGovern.number = event.args.number.toBigInt();
    startGovern.governType = event.args.governType.toBigInt();
    startGovern.startDate = event.args.startDate.toBigInt();
    startGovern.endDate = event.args.endDate.toBigInt();
    startGovern.uintValue = event.args.uintValue.toBigInt();
    startGovern.strValue = event.args.strValue;
    startGovern.totalVoter = event.args.totalVoter.toBigInt();
    startGovern.contractAddress = event.address;

    await startGovern.save();
}

export async function handleVoteEvmEvent(event: FrontierEvmEvent<VoteEventArgs>): Promise<void> {
    const voteByNumber = new VoteByNumber(event.transactionHash);

    voteByNumber.votor = event.args.votor;
    voteByNumber.number = event.args.number.toBigInt();
    voteByNumber.governType = event.args.governType.toBigInt();
    voteByNumber.totalVoter = event.args.totalVoter.toBigInt();
    voteByNumber.approveVoter = event.args.approveVoter.toBigInt();
    voteByNumber.opposeVoter = event.args.opposeVoter.toBigInt();
    voteByNumber.success = event.args.success;
    voteByNumber.contractAddress = event.address;

    await voteByNumber.save();
}

