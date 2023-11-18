/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Prontera, PronteraInterface } from "../../core/Prontera";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "peer",
        type: "address",
      },
    ],
    name: "ChatIsNotInitialized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "peer",
        type: "address",
      },
    ],
    name: "PeerIsNotInitialized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "UserAlreadyInitialized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "UserIsNotInitialized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "initializer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "peer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "callerEncryptedChatSecret",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "peerEncryptedChatSecret",
        type: "bytes",
      },
    ],
    name: "ChatInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "encryptedUserSecret",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "publicKeyPrefix",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "publicKeyX",
            type: "bytes32",
          },
        ],
        indexed: false,
        internalType: "struct IProntera.UserInitialization",
        name: "init",
        type: "tuple",
      },
    ],
    name: "UserInitialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "chatInitializations",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "firstUser",
        type: "address",
      },
      {
        internalType: "address",
        name: "secondUser",
        type: "address",
      },
    ],
    name: "getChatInitialization",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserInitialization",
    outputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "encryptedUserSecret",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "publicKeyPrefix",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "publicKeyX",
            type: "bytes32",
          },
        ],
        internalType: "struct IProntera.UserInitialization",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "callerEncryptedChatSecret",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "peerEncryptedChatSecret",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "peer",
        type: "address",
      },
    ],
    name: "initializeChat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encryptedUserSecret",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "publicKeyPrefix",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "publicKeyX",
        type: "bytes32",
      },
    ],
    name: "initializeUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initializer",
        type: "address",
      },
      {
        internalType: "address",
        name: "peer",
        type: "address",
      },
    ],
    name: "isChatInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "isUserInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInitializations",
    outputs: [
      {
        internalType: "bytes",
        name: "encryptedUserSecret",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "publicKeyPrefix",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "publicKeyX",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c60806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806365d431eb1161005b57806365d431eb14610100578063821a20fa146101235780638d8613a514610136578063b684fc481461015657600080fd5b806315d3af1c1461008d578063210c0728146100a257806329be6698146100b55780633d45f77d146100e0575b600080fd5b6100a061009b3660046108ca565b610169565b005b6100a06100b036600461094b565b61027d565b6100c86100c33660046109ad565b610390565b6040516100d793929190610a1c565b60405180910390f35b6100f36100ee366004610a41565b61043e565b6040516100d79190610a74565b61011361010e366004610a41565b6104e3565b60405190151581526020016100d7565b6101136101313660046109ad565b61055b565b6101496101443660046109ad565b6105ad565b6040516100d79190610a87565b6100f3610164366004610a41565b61069e565b6101723361055b565b6101965760405163dac5130360e01b81523360048201526024015b60405180910390fd5b61019f8161055b565b6101c757604051630377a1a360e51b81526001600160a01b038216600482015260240161018d565b3360009081526001602090815260408083206001600160a01b038516845290915290206101f5908686610758565b506001600160a01b03811660009081526001602090815260408083203384529091529020610224908484610758565b50806001600160a01b0316336001600160a01b03167f255b4932584710abb8d5a97b40309f3b19546416f6fe04b6d2df0f6d2cf7ba6b8787878760405161026e9493929190610aee565b60405180910390a35050505050565b6102863361055b565b156102a657604051634fd11cfb60e11b815233600482015260240161018d565b604051806060016040528085858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250938552505050841515602080840191909152604092830185905233825281815291902082518051919261031b928492909101906107dc565b5060208281015160018301805460ff19169115159190911790556040928301516002909201919091553360008181529182905290829020915190917f413a60d9927a68d1fd6febd8578e59f31f3cdfe1f77dc1c478c3b4bc7c6392eb916103829190610b5a565b60405180910390a250505050565b6000602081905290815260409020805481906103ab90610b20565b80601f01602080910402602001604051908101604052809291908181526020018280546103d790610b20565b80156104245780601f106103f957610100808354040283529160200191610424565b820191906000526020600020905b81548152906001019060200180831161040757829003601f168201915b505050506001830154600290930154919260ff1691905083565b60016020908152600092835260408084209091529082529020805461046290610b20565b80601f016020809104026020016040519081016040528092919081815260200182805461048e90610b20565b80156104db5780601f106104b0576101008083540402835291602001916104db565b820191906000526020600020905b8154815290600101906020018083116104be57829003601f168201915b505050505081565b6001600160a01b0380831660009081526001602090815260408083209385168352929052908120805461051590610b20565b159050801561055357506001600160a01b038083166000908152600160209081526040808320938716835292905220805461054f90610b20565b1590505b159392505050565b6001600160a01b0381166000908152602081905260408120805461057e90610b20565b15905080156105a657506001600160a01b038216600090815260208190526040902060020154155b1592915050565b60408051606080820183528152600060208201819052918101919091526001600160a01b038216600090815260208190526040908190208151606081019092528054829082906105fc90610b20565b80601f016020809104026020016040519081016040528092919081815260200182805461062890610b20565b80156106755780601f1061064a57610100808354040283529160200191610675565b820191906000526020600020905b81548152906001019060200180831161065857829003601f168201915b5050509183525050600182015460ff161515602082015260029091015460409091015292915050565b6001600160a01b0380831660009081526001602090815260408083209385168352929052208054606091906106d290610b20565b80601f01602080910402602001604051908101604052809291908181526020018280546106fe90610b20565b801561074b5780601f106107205761010080835404028352916020019161074b565b820191906000526020600020905b81548152906001019060200180831161072e57829003601f168201915b5050505050905092915050565b82805461076490610b20565b90600052602060002090601f01602090048101928261078657600085556107cc565b82601f1061079f5782800160ff198235161785556107cc565b828001600101855582156107cc579182015b828111156107cc5782358255916020019190600101906107b1565b506107d8929150610850565b5090565b8280546107e890610b20565b90600052602060002090601f01602090048101928261080a57600085556107cc565b82601f1061082357805160ff19168380011785556107cc565b828001600101855582156107cc579182015b828111156107cc578251825591602001919060010190610835565b5b808211156107d85760008155600101610851565b60008083601f84011261087757600080fd5b50813567ffffffffffffffff81111561088f57600080fd5b6020830191508360208285010111156108a757600080fd5b9250929050565b80356001600160a01b03811681146108c557600080fd5b919050565b6000806000806000606086880312156108e257600080fd5b853567ffffffffffffffff808211156108fa57600080fd5b61090689838a01610865565b9097509550602088013591508082111561091f57600080fd5b5061092c88828901610865565b909450925061093f9050604087016108ae565b90509295509295909350565b6000806000806060858703121561096157600080fd5b843567ffffffffffffffff81111561097857600080fd5b61098487828801610865565b9095509350506020850135801515811461099d57600080fd5b9396929550929360400135925050565b6000602082840312156109bf57600080fd5b6109c8826108ae565b9392505050565b6000815180845260005b818110156109f5576020818501810151868301820152016109d9565b81811115610a07576000602083870101525b50601f01601f19169290920160200192915050565b606081526000610a2f60608301866109cf565b93151560208301525060400152919050565b60008060408385031215610a5457600080fd5b610a5d836108ae565b9150610a6b602084016108ae565b90509250929050565b6020815260006109c860208301846109cf565b602081526000825160606020840152610aa360808401826109cf565b9050602084015115156040840152604084015160608401528091505092915050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b604081526000610b02604083018688610ac5565b8281036020840152610b15818587610ac5565b979650505050505050565b600181811c90821680610b3457607f821691505b602082108103610b5457634e487b7160e01b600052602260045260246000fd5b50919050565b600060208083526060818401526000845481600182811c915080831680610b8257607f831692505b8583108103610b9f57634e487b7160e01b85526022600452602485fd5b6080880183905260a08801818015610bbe5760018114610bcf57610bfa565b60ff19861682528782019650610bfa565b60008b81526020902060005b86811015610bf457815484820152908501908901610bdb565b83019750505b50505087015460ff1680151560408801529350610c15915050565b6002850154606085015280925050509291505056fea2646970667358221220631e416aa7c64e8858bc5d2440e7295eef6326650d18d305f074b24195f3358964736f6c634300080e0033";

type PronteraConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PronteraConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Prontera__factory extends ContractFactory {
  constructor(...args: PronteraConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Prontera> {
    return super.deploy(overrides || {}) as Promise<Prontera>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Prontera {
    return super.attach(address) as Prontera;
  }
  override connect(signer: Signer): Prontera__factory {
    return super.connect(signer) as Prontera__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PronteraInterface {
    return new utils.Interface(_abi) as PronteraInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Prontera {
    return new Contract(address, _abi, signerOrProvider) as Prontera;
  }
}
