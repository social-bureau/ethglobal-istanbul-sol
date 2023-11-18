import { config as dotEnvConfig } from 'dotenv';

//import '@nomiclabs/hardhat-waffle';
import './tasks/accounts';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-web3';
import './tasks/faucet';
import 'dotenv/config';
import '@openzeppelin/hardhat-upgrades';
import '@primitivefi/hardhat-dodoc';
import '@typechain/hardhat';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-abi-exporter';
import '@nomicfoundation/hardhat-chai-matchers';

dotEnvConfig();
const accounts = {
  mnemonic: process.env.MNEMONIC || 'test test test test test test test test test test test junk',
};

const config: any = {
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      default: 1,
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
    excludeContracts: [],
    src: './contracts',
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  dodoc: {
    runOnCompile: false,
    include: [], // default
    exclude: ['contracts/tests', 'contracts/shared', 'console'],
    outputDir: 'docs', // default
    templatePath: 'doc-template.sqrl',
    debugMode: false, // default
    keepFileStructure: true, // default
    freshOutput: true, // default
  },
  solidity: {
    typechain: {
      outDir: 'typechain',
      target: 'ethers-v5',
    },
    compilers: [
      {
        version: '0.8.14',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
    overrides: {},
  },
  networks: {
    hardhat: {
      chainId: 31337,
      accounts,
    },
    localhost: {
      accounts,
    },
    goerli: {
      accounts,
      url: 'https://eth-goerli.public.blastapi.io',
      chainId: 5,
    },
    sepolia: {
      accounts,
      url: 'https://rpc-sepolia.rockx.com',
      chainId: 11155111,
    },
    polygon_mumbai: {
      accounts,
      //url: 'https://rpc-mumbai.maticvigil.com/',
      url: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
      chainId: 80001,
    },
    bkc: {
      accounts,
      url: 'https://rpc.bitkubchain.io',
      chainId: 96,
    },
    bkc_testnet: {
      accounts,
      url: 'https://rpc-testnet.bitkubchain.io',
      chainId: 25925,
    },
    taiko: {
      url: 'https://rpc.test.taiko.xyz',
      accounts: accounts,
      chainId: 167005,
    },
    linea_goerli: {
      url: 'https://rpc.goerli.linea.build',
      accounts: accounts,
      chainId: 59140,
    },
    alfajores: {
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: accounts,
      chainId: 44787,
    },
    chiliz_spicy_testnet: {
      url: 'https://spicy-rpc.chiliz.com',
      accounts: accounts,
      chainId: 88882,
    },
    chiado: {
      url: 'https://rpc.chiadochain.net',
      accounts: accounts,
      chainId: 10200,
    },
    mantle_testnet: {
      url: 'https://rpc.testnet.mantle.xyz/',
      accounts: accounts,
      chainId: 5001,
    },
  },
  etherscan: {
    apiKey: {
      goerli: 'KBZ53MKPP551QTVDYSV8S961FEUC96F8QW',
      sepolia: 'KBZ53MKPP551QTVDYSV8S961FEUC96F8QW',
      polygon_mumbai: 'FPHU3AFWJD2M3ECIKN61FPG1CIMN3IWF46',
      bkc_testnet: 'key',
      bkc: 'key',
      chiliz_spicy_testnet: 'key',
      polygonMumbai: 'FPHU3AFWJD2M3ECIKN61FPG1CIMN3IWF46',
      linea_goerli: 'BE73V3WIFAP2WP7SQBHV95AQBMN1URH4JP',
      alfajores: 'PQ6KHZ9W2YZ7HI3KW651DIEMWS2HUEIXYN',
      mantle_testnet: 'key',
      chiado: '46d152e9-54c0-4a4b-86cd-3ffb7c4205ab',
    },
    customChains: [
      {
        network: 'bkc_testnet',
        chainId: 25925,
        urls: {
          apiURL: 'https://testnet.bkcscan.com/api',
          browserURL: 'https://testnet.bkcscan.com/',
        },
      },
      {
        network: 'bkc',
        chainId: 96,
        urls: {
          apiURL: 'https://www.bkcscan.com/api',
          browserURL: 'https:///www.bkcscan.com/',
        },
      },
      {
        network: 'taiko',
        chainId: 167005,
        urls: {
          apiURL: 'https://explorer.test.taiko.xyz/api',
          browserURL: 'https://explorer.test.taiko.xyz',
        },
      },
      {
        network: 'linea_goerli',
        chainId: 59140,
        urls: {
          apiURL: 'https://api-testnet.lineascan.build/api',
          browserURL: 'https://goerli.lineascan.build',
        },
      },
      {
        network: 'alfajores',
        chainId: 44787,
        urls: {
          apiURL: 'https://api-alfajores.celoscan.io/api',
          browserURL: 'https://alfajores.celoscan.io/',
        },
      },
      {
        network: 'chiliz_spicy_testnet',
        chainId: 88882,
        urls: {
          apiURL: 'https://spicy-explorer.chiliz.com/api',
          browserURL: 'https://spicy-explorer.chiliz.com/',
        },
      },
      {
        network: 'chiado',
        chainId: 10200,
        urls: {
          apiURL: 'https://gnosis-chiado.blockscout.com/api/v2',
          browserURL: 'https://gnosis-chiado.blockscout.com/',
        },
      },
      {
        network: 'mantle_testnet',
        chainId: 5001,
        urls: {
          apiURL: 'https://rpc.testnet.mantle.xyz/api',
          browserURL: 'https://rpc.testnet.mantle.xyz/',
        },
      },
    ],
  },
};

export default config;
