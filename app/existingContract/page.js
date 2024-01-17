"use client";
import { useState, useEffect } from 'react';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';

import { useSearchParams, useRouter } from 'next/navigation';

import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';


const NFTcontract="0x5771C86DA1f1cC114Cc2831a37182De41F1Fb972";
const myabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"name":"bonusInfo","outputs":[{"internalType":"address","name":"Sender","type":"address"},{"internalType":"address","name":"Receiver","type":"address"},{"internalType":"uint256","name":"bonusAmount","type":"uint256"},{"internalType":"uint256","name":"startDate","type":"uint256"},{"internalType":"uint256","name":"sellByDate","type":"uint256"},{"internalType":"bool","name":"atOrAbove","type":"bool"},{"internalType":"bool","name":"atOrBelow","type":"bool"},{"internalType":"uint256","name":"atPrice","type":"uint256"},{"internalType":"bool","name":"meetSalesCondition","type":"bool"},{"internalType":"bool","name":"postDeadlineCheck","type":"bool"},{"internalType":"bool","name":"fundsWithdrawn","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"Receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"},{"internalType":"uint256","name":"startDateInUnixSeconds","type":"uint256"},{"internalType":"uint256","name":"sellByDateInUnixSeconds","type":"uint256"},{"internalType":"bool","name":"atOrAbove","type":"bool"},{"internalType":"bool","name":"atOrBelow","type":"bool"},{"internalType":"uint256","name":"atPrice","type":"uint256"}],"name":"createSenderFund","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"},{"internalType":"bool","name":"meetSalesCondition","type":"bool"},{"internalType":"bool","name":"postDeadlineCheck","type":"bool"}],"name":"updateBonusInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"Receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"}],"name":"withdrawFundsReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"Receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"}],"name":"withdrawFundsSender","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const {ethers} = require('ethers');
var provider;
var MyContract;
var MyContractwSigner;


async function callContract(APN, account) {
	//console.log('suggestedParams:', suggestedParams);
  console.log(account)

  console.log(`Contract read success `);
	return resultsArray
}

async function withdrawSenderPera(APN, account) {
  provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  console.log(signer.address);
    

  MyContract = new ethers.Contract(NFTcontract, myabi, signer);
  console.log(MyContract);

  const result = await MyContract.withdrawFundsSender(account,APN);
  
  console.log(result);
  
	return result
}

async function withdrawReceiverPera(APN, account) {
  
  provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  console.log(signer.address);
    

  MyContract = new ethers.Contract(NFTcontract, myabi, signer);
  console.log(MyContract);

  const result = await MyContract.withdrawFundsReceiver(account,APN);
  
  console.log(result);

	return result
}


const formatLongString = (str) => {
	if (str.length > 6) {
	  return str.slice(0, 3) + '...' + str.slice(-3);
	}
	return str;
};


const MyPage = () => {
  const [aseller, setSeller] = useState("");
  const [arealtor, setRealtor] = useState("");
  const [acontractamount, setAmount] = useState("");
  const [asellbydate, setSellbydate] = useState("");
  const [astartdate, setStartdate] = useState("");
  const [aactiveflag, setActiveFlag] = useState("");
  const [asalesPrice, setSalesPrice] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [fetching, setFetch] = useState(false);
	const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [popupHeader, setPopupHeader] = useState("");
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
  const [popupText, setPopupText] = useState("");
  const [accountAddress, setAccountAddress] = useState(null);

  const searchParams = useSearchParams()
  const router = useRouter();
  const APN = searchParams.get('SelAPN');
	console.log('APN = '+APN);
	const Address = searchParams.get('Address');
  console.log('Address = '+Address);
  const SenderAddress = searchParams.get('Sender');
  const ReceiverAddress = searchParams.get('Receiver');

  useEffect(() => {
		/*peraWallet
			.reconnectSession()
			.then((accounts) => {
				if (peraWallet.isConnected) {
					setAccountAddress(accounts[0])
				}
			
			})
			.catch((e) => console.log(e));*/
	}, []);
	

  async function updateContractInfoSeller(senderwallet, receiverwallet, APN){
    const apiUrl = 'https://smartcrow-backend-mumbai.onrender.com/api/update-contract'; 
  
    // Example data to send in the request body
    const requestData = {
      sender: senderwallet,
      receiver: receiverwallet,
      propertyNumber: APN,
    };
  
    // Set the headers for JSON data
    const headers = {
      'Content-Type': 'application/json',
    };
  
    // Make a POST request using Axios
    axios.post(apiUrl, requestData, { headers })
    .then(async response => {
      // Handle the successful response
      console.log('Response:', response.data);
      if (response.data["meetSalesCondition"].condition == false && response.data["postDeadlineCheck"] == true) {
        await withdrawSenderPera(APN, senderwallet)
        setPopupHeaderSuccess('Withdrawal Initiated. ' + response.data["meetSalesCondition"].reason);
        setShowPopupSuccess(true);
        setFetch(false)
        router.push('/checkContract');
      }
      else {
        setPopupHeader('Unable to withdraw');
        setPopupText(response.data["meetSalesCondition"].reason);
        setShowPopup(true);
        setFetch(false)
      }
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
  }
  
  async function updateContractInfoReceiver(senderwallet, receiverwallet, APN){
    const apiUrl = 'https://smartcrow-backend-mumbai.onrender.com/api/update-contract'; 
  
    // Example data to send in the request body
    const requestData = {
      sender: senderwallet,
      receiver: receiverwallet,
      propertyNumber: APN,
    };
  
    // Set the headers for JSON data
    const headers = {
      'Content-Type': 'application/json',
    };
  
    // Make a POST request using Axios
    axios.post(apiUrl, requestData, { headers })
    .then(async response => {
      // Handle the successful response
      console.log('Response:', response.data);
      if (response.data["meetSalesCondition"].condition) {
        await withdrawReceiverPera(APN, receiverwallet)
        setPopupHeaderSuccess('Withdrawal Initiated. ' + response.data["meetSalesCondition"].reason);
        setShowPopupSuccess(true);
        setFetch(false)
      }
      else {
        setPopupHeader('Unable to withdraw');
        setPopupText(response.data["meetSalesCondition"].reason);
        setShowPopup(true);
        setFetch(false)
      }
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
  }

  const refresh = async () => {
    console.log(accountAddress)
		/*peraWallet
			.reconnectSession()
			.then((accounts) => {
				if (peraWallet.isConnected) {
          setAccountAddress(accounts[0])
					handleUpdate();
				}
			})
			.catch((e) => console.log(e));*/
	}

    const handleClosePopup = () => {
        setShowPopup(false);
      };

	  const handleClosePopupSuccess = () => {
        setShowPopupSuccess(false);
      };

    const handleWithdrawRealtor = async() => {
      await updateContractInfoReceiver(469360340, APN);
      setFetch(true)
    }

    const handleWithdrawSeller = async() => {
      await updateContractInfoSeller(469360340, APN);
      setFetch(true)
    }

  const handleUpdate = async() =>{
      var resultarray = await callContract(APN, accountAddress)

      setSeller(resultarray[1]);
      setRealtor(resultarray[2]);
      setAmount(Number(resultarray[3]) / 1e6);
      var resultdate = new Date(Number(resultarray[4])*1000);
      startdate = new Date(resultdate.getTime()+36000000);
      resultarray[4]=startdate;
      var startdate = resultarray[4].toLocaleString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setStartdate(startdate);

      var resultdate2 = new Date(Number(resultarray[5])*1000);
      sellbydate = new Date(resultdate2.getTime()+36000000);
      resultarray[5]=sellbydate;
      var sellbydate = resultarray[5].toLocaleString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setSellbydate(sellbydate);

      var salesPrice = resultarray[8];
      setSalesPrice(Number(salesPrice));

      var activeflag = resultarray[10];
      if (activeflag){
        setActiveFlag('NO');
      }
      else {
        setActiveFlag('YES');
      }
  }
    
  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-10">
        <div className="flex flex-col gap-4">
          <div className='container flex flex-row'>
            <div className='left-side'>
              <h2 className="text-black text-2xl font-bold">APN Address:</h2>
            </div>
            <div className='right-side ml-auto'>
              <button 
                type="button" 
                onClick={refresh}
                className="refresh_btn flex flex-row-reverse hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/60 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
              >
                <FontAwesomeIcon icon={faArrowsRotate} style={{ color: "#ffffff" }} className='' />
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-default-text text-l font-bold bg-white p-2 border border-sky-200 rounded">{APN}</h1>
          </div>
          <textarea
            id="addresscheck"
            className="ml-0 resize-none flex-grow max-w-screen-m h-15 px-4 py-4 text-white bg-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
            defaultValue={Address}
            disabled
          />
          <div className="p-6 rounded border border border-sky-200">
            <div className="flex rounded px-2 py-2">
              <div className="w-1/2">
                <ul className="list-inside text-black">
                  <li>Amount <span className='text-default-text'>(Algos)</span>:</li>
                  <li>Start date:</li>
                  <li>Sold by:</li>
                  <li>Sender Wallet:</li>
                  <li>Receiver Wallet:</li>
                  <li>Still Active:</li>
                  <li>Sales Price <span className='text-default-text'>$</span>:</li>
                </ul>
              </div>
              <div className="w-2/3 text-right text-default-text">
                <ul className="list-inside">
                  <li id="contractamount">{acontractamount}</li>
                  <li>{astartdate}</li>
                  <li>{asellbydate}</li>
                  <li>{formatLongString(aseller)}</li>
                  <li>{formatLongString(arealtor)}</li>
                  <li>{aactiveflag}</li>
                  <li>{asalesPrice}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-6 rounded flex justify-between">
            <div className="w-full sm:w-1/2 text-center mr-10">
              <button className="bg-white border border-sky-200 hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawSeller}>
                <img src='/assets/images/send.png' className='h-10 w-10' alt="Send" />
              </button>
              <p className="text-default-text">Withdraw as <span><p>Sender</p></span></p>
            </div>
  
            {fetching && (
              <div className="w-full sm:w-1/2 text-center mr-10">
                <p className="text-default-text">Fetching...</p>
              </div>
            )}
  
            <div className="w-full sm:w-1/2 text-center mr-10">
              <button className="bg-white border border-sky-200 hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4" onClick={handleWithdrawRealtor}>
                <img src='/assets/images/receive.png' className='h-10 w-10' alt="Receive" />
              </button>
              <p className="text-default-text">Withdraw as <span><p>Receiver</p></span></p>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup header={popupHeader} text={popupText} closeModal={handleClosePopup} isOpen={showPopup}/>
      )}
      {showPopupSuccess && (
        <PopupSuccess header={popupHeaderSuccess} text={""} closeModal={handleClosePopupSuccess} isOpen={showPopupSuccess}/>
      )}
    </div>
  );
  
  };
  
  export default MyPage;