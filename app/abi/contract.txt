export const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bonusInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "Sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "Receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "bonusAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sellByDate",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "propertySold",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "haveExpectedSalesPrice",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "expectedSalesPrice",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "meetSalesCondition",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "postDeadlineCheck",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "Receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "propertyNumber",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startDateInDays",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sellByDateInDays",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "haveExpectedSalesPrice",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "expectedSalesPrice",
        "type": "uint256"
      }
    ],
    "name": "createSenderFund",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "propertyNumber",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "propertySold",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "meetSalesCondition",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "postDeadlineCheck",
        "type": "bool"
      }
    ],
    "name": "updateBonusInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "Receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "propertyNumber",
        "type": "uint256"
      }
    ],
    "name": "withdrawFundsReceiver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "Receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "propertyNumber",
        "type": "uint256"
      }
    ],
    "name": "withdrawFundsSender",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]