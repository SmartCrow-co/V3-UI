"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Popup from '@/components/popup';
import PopupSuccess from '@/components/popupsuccess';
import PopupInfo from '@/components/popupinfo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


const axios = require('axios');

//stable coin contracts

const NativeContract = "0x0000000000000000000000000000000000000000";
const Nativemultiplier = 1e18;

const USDTcontract = "0x79C950C7446B234a6Ad53B908fBF342b01c4d446";
const USDTabi = [{"inputs":[{"internalType":"uint256","name":"_initialAmount","type":"uint256"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint8","name":"_decimalUnits","type":"uint8"},{"internalType":"string","name":"_tokenSymbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const USDTmultiplier = 1e6;

const USDCcontract = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";
const USDCabi = [{"inputs":[{"internalType":"address","name":"implementationContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}];
const USDCmultiplier = 1e6;

const WBTCcontract = "0x79C950C7446B234a6Ad53B908fBF342b01c4d446";
const WBTCabi = [{"inputs":[{"internalType":"uint256","name":"_initialAmount","type":"uint256"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint8","name":"_decimalUnits","type":"uint8"},{"internalType":"string","name":"_tokenSymbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const WBTCmultiplier = 1e18;

const WETHcontract = "0x79C950C7446B234a6Ad53B908fBF342b01c4d446";
const WETHabi = [{"inputs":[{"internalType":"uint256","name":"_initialAmount","type":"uint256"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint8","name":"_decimalUnits","type":"uint8"},{"internalType":"string","name":"_tokenSymbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const WETHmultiplier = 1e18;

const DAIcontract = "0x2899a03ffDab5C90BADc5920b4f53B0884EB13cC";
const DAIabi = [{"inputs":[{"internalType":"uint256","name":"_initialAmount","type":"uint256"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint8","name":"_decimalUnits","type":"uint8"},{"internalType":"string","name":"_tokenSymbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const DAImultiplier = 1e18;

const NFTcontract="0x8d4D715Cf0f146e2c60000C69EcEa973Db47Ec2a";
const myabi = [{"inputs":[{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_usdcToken","type":"address"},{"internalType":"address","name":"_wbtcToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"name":"bonusInfo","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"bonusAmount","type":"uint256"},{"internalType":"uint256","name":"startDate","type":"uint256"},{"internalType":"uint256","name":"sellByDate","type":"uint256"},{"internalType":"bool","name":"atOrAbove","type":"bool"},{"internalType":"bool","name":"atOrBelow","type":"bool"},{"internalType":"uint256","name":"atPrice","type":"uint256"},{"internalType":"bool","name":"meetSalesCondition","type":"bool"},{"internalType":"bool","name":"postDeadlineCheck","type":"bool"},{"internalType":"bool","name":"fundsWithdrawn","type":"bool"},{"internalType":"address","name":"token","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"},{"internalType":"uint256","name":"startDateInUnixSeconds","type":"uint256"},{"internalType":"uint256","name":"sellByDateInUnixSeconds","type":"uint256"},{"internalType":"bool","name":"atOrAbove","type":"bool"},{"internalType":"bool","name":"atOrBelow","type":"bool"},{"internalType":"uint256","name":"atPrice","type":"uint256"},{"internalType":"uint256","name":"bonusAmount","type":"uint256"},{"internalType":"address","name":"token","type":"address"}],"name":"createBonusInfo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"},{"internalType":"bool","name":"meetSalesCondition","type":"bool"},{"internalType":"bool","name":"postDeadlineCheck","type":"bool"}],"name":"updateBonusInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdcToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbtcToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"Sender","type":"address"},{"internalType":"address","name":"Receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"}],"name":"withdrawFundsReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"Sender","type":"address"},{"internalType":"address","name":"Receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"}],"name":"withdrawFundsSender","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const {ethers, getBigInt} = require('ethers');
var provider;
var MyContract;
var MyContractwSigner;


const MyForm = () => {
  const today = new Date().toISOString().substring(0, 10); // Get today's date in yyyy-mm-dd format
	const [verificationfailed, setVerified] = useState(true);
	const [showPopup, setShowPopup] = useState(false);
	const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [popupHeader, setPopupHeader] = useState("");
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
  const [popupText, setPopupText] = useState("");
	const [showBalloon,setShowBalloon] = useState(false);
	const [balloonText,setBalloonText] = useState("");
	const [accountAddress, setAccountAddress] = useState(null);
  const [isForSale, setIsForSale] = useState(true);
  const [PriceCondition, setPriceCondition] = useState(true);
  const isConnectedToPeraWallet = !!accountAddress;
  const [sendermail,setSendermail]= useState('');
  const [receiverermail,setReceivermail]= useState('');
  const [usedCoin,setUsedCoin]=useState('USDT');

	useEffect(() => {
		// Reconnect to the session when the component is mounted
		
	  }, []);

	const searchParams = useSearchParams()
  const SelAPN = searchParams.get('SelAPN');
	const Address = searchParams.get('Address')+'\n APN : '+searchParams.get('fetchedAPN');
  //console.log(Address);
  const SenderAddress = searchParams.get('Sender');
  const ReceiverAddress = searchParams.get('Receiver');
  const router = useRouter();

  const approveUSDT = async(amount,chosenmultiplier,chosencontract,chosenabi) =>{
    const tempamount = String(amount * chosenmultiplier);
    console.log(tempamount);
    
    const myamount = ethers.getBigInt(tempamount);
    console.log(myamount);
    //const myamount = ethers.utils.parseEther(amount);
    //const largeInteger = ethers.BigNumber.from("1000000000000000000");
    //var myamount = largeInteger;

    provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const MyUSDTContract = new ethers.Contract(chosencontract, chosenabi, signer);
    var result = await(MyUSDTContract.approve(NFTcontract,myamount));
    console.log(result);


  }

  const sendconfirmationmail = async(mailaddress) => {
    const apiUrl = 'https://smartcrow-backend-goerli.onrender.com/api/send-email'; 
    console.log('mail address = '+mailaddress);
    const senderwallet = document.getElementById('senderwallet').value;
    const receiverwallet = document.getElementById('receiverwallet').value;
    var mymessage = 'Created a bonus contract with sender wallet '+senderwallet+' and receiver wallet '+receiverwallet+' for address '+SelAPN;
  
    // Example data to send in the request body
    const requestData = {
      email: mailaddress,
      message: mymessage,

    };
  
    // Set the headers for JSON data
    const headers = {
      'Content-Type': 'application/json',
    };
  
    // Make a POST request using Axios
    axios.post(apiUrl, requestData, { headers })
    .then(async response => {
      console.log(response);
    })


  }

  const approvestablecoin = async() => {
    const amount = document.getElementById("bonusamount").value;
    approveUSDT(amount);
  }

	async function callBonus(account) {
		var APN = document.getElementById("parcelid").value;
		var amount = document.getElementById("bonusamount").value;
    var seller = document.getElementById("senderwallet").value;
		var realtor = document.getElementById("receiverwallet").value;
		var Sellby = new Date(document.getElementById("sellbydate").value);
		var selltimestamp = Math.floor(Sellby.getTime()/1000);
		var Startby = new Date(document.getElementById("startdate").value);
		var startdatetimestamp = Math.floor(Startby.getTime()/1000);
    var salesPrice = document.getElementById("salesprice").value;
    var boolabove = PriceCondition;
    var boolbelow = !PriceCondition;
    var chosencoin = document.getElementById("usedcoin").value;
    console.log('chosen coin = '+chosencoin);

    //Put both conditions to false if no price condition is selected.
    if (isForSale==false){
      boolabove=false;
      boolbelow=false;
    }

    var chosencontract=NativeContract;
    var chosenabi;
    var chosenmultiplier=Nativemultiplier;

    if (chosencoin=='USDT'){
      chosencontract=USDTcontract;
      chosenabi=USDTabi;
      chosenmultiplier = USDTmultiplier;
    }
    else if(chosencoin=='USDC'){
      chosencontract=USDCcontract;
      chosenabi=USDCabi;
      chosenmultiplier = USDCmultiplier;
    }
    else if(chosencoin=='WBTC'){
      chosencontract=WBTCcontract;
      chosenabi=WBTCabi;
      chosenmultiplier = WBTCmultiplier;
    }
    else if(chosencoin=='WETH'){
      chosencontract=WETHcontract;
      chosenabi=WETHabi;
      chosenmultiplier = WETHmultiplier;
    }
    else if(chosencoin=='DAI'){
      chosencontract=DAIcontract;
      chosenabi=DAIabi;
      chosenmultiplier = DAImultiplier;
    }
    
    var tempbonusamount = String(amount*chosenmultiplier);
    var bonusamount = ethers.getBigInt(tempbonusamount);
    console.log('bonus amount = '+bonusamount);
    //salesPrice /= 1e6
    if(chosencoin!='ETH'){
      await approveUSDT(amount,chosenmultiplier,chosencontract,chosenabi);
    }
    provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer.address);
      

    MyContract = new ethers.Contract(NFTcontract, myabi, signer);
    console.log(MyContract);
    //MyContractwSigner = await MyContract.connect(signer);

    
    
    if (chosencoin!='ETH'){
		  const results = await MyContract.createBonusInfo(realtor,APN,startdatetimestamp,selltimestamp,boolabove,boolbelow,salesPrice,bonusamount,chosencontract);
    }
    else{
      const results2 = await MyContract.createBonusInfo(realtor,APN,startdatetimestamp,selltimestamp,boolabove,boolbelow,salesPrice,bonusamount,chosencontract,{value:bonusamount});
    }
    const sendermail = document.getElementById('sendermail').value;
    const receivermail = document.getElementById('receivermail').value;

    if (sendermail!=''){
      await sendconfirmationmail(sendermail);
    }

    if (receivermail!=''){
      await sendconfirmationmail(receivermail);
    }

		console.log(`Contract created `);
		setPopupHeaderSuccess('Contract Initiated!');
		setShowPopupSuccess(true);
	}


	
	const createbonusfunc = async () => {
    
    await callBonus();
	}

	const login = async () => {
		
	}

	const disconnect = async () => {
		
		setAccountAddress(null);
	}

	const handleClosePopup = () => {
        setShowPopup(false);
      };

	  const handleClosePopupSuccess = () => {
        setShowPopupSuccess(false);
		    router.push('/checkContract');
    };

	  const handleClickBalloon = () => {
		setBalloonText('The amount entered is in Algos. For a conversion to USD, please visit https://www.coinbase.com/converter/algo/usd');
		setShowBalloon(true);
	  }

	  const handleClickBalloon2 = () => {
		setBalloonText('This is the start date of the contract.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon3 = () => {
		setBalloonText('This is the end date of the contract. The real property grant deed must be recorded by this date.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon4 = () => {
		setBalloonText('This is the sender wallet address. This wallet address will fund the contract via Metamask.');
		setShowBalloon(true);
	  }

	  const handleClickBalloon5 = () => {
		setBalloonText('This is the receiver wallet address. If contract terms are met, funds will be sent to the receiver wallet address.');
		setShowBalloon(true);
	  }

    const handleClickBalloon6 = () => {
      setBalloonText('This is the sales price of the conract. Add the anticipated, future, greater than or equal to sales price of the real estate/home.');
      setShowBalloon(true);
      }

	  const handleCloseBalloon = () => {
        setShowBalloon(false);
      };

    const handleOptionChangeCoin = () => {
      setUsedCoin(document.getElementById('usedcoin').value);
      //console.log(document.getElementById('usedcoin').value);
    }

	  const handleChange = async() => {
      console.log('Verifying input');
      const verAmount= document.getElementById("bonusamount").value;
      const verStartdate= document.getElementById("startdate").value;
      const verSellbydate= document.getElementById("sellbydate").value;
      const verSeller = document.getElementById("senderwallet").value;
      const verRealtor = document.getElementById("receiverwallet").value;
      const salesPrice = document.getElementById("salesprice").value;


      if (isForSale) {
        if (verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="" || salesPrice=="" || verSeller==verRealtor) {
          setVerified(true);
        }
        else {
          setVerified(false);
        }
      }
      else {
        if (verAmount==0 || verStartdate=="" || verSellbydate=="" ||verSeller=="" || verRealtor=="" || verSeller==verRealtor) {
          setVerified(true);
        }
        else {
          setVerified(false);
        }
      }
	  }

    return (
      <div className="min-h-screen">
        <nav className="flex justify-between items-center">
          <p className="text-black font-bold text-sm md:text-lg m-2">New Contract</p>
        </nav>
        <div className="container mx-auto pb-3">
          <div className="flex flex-col gap-0.5">
            
            <section className="flex mb-8">
              <input
                type="text"
                id="parcelid"
                className="m-2 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
                defaultValue={SelAPN}
                onChange={handleChange}
                placeholder="APN"
              />
              <button 
                type="button" 
                onClick={handleClickBalloon}
                className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
              >
                <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff", fontSize: '12px' }} className='m-2 py-0' />
              </button>
            </section>
            
            <section className="flex-start m-2 mt-0">
              <textarea
                id="addresscheck"
                className="ml-0 resize-none flex-grow max-w-screen-m h-15 px-4 py-4 text-white bg-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                disabled
                defaultValue={Address}
              ></textarea>
            </section>
            <section className="flex m-2 mt-0 items-center justify-center">
            <script async src="https://cdn.jsdelivr.net/gh/dejurin/crypto-converter-widget@1.5.2/dist/latest.min.js"></script>
              <crypto-converter-widget shadow symbol live background-color="#383a59" border-radius="0.60rem" fiat="united-states-dollar" crypto="bitcoin" amount="1" decimal-places="2"></crypto-converter-widget>
            </section>
    
            {/* Amount USDC */}
            <label htmlFor="bonusamount" className="font-bold mr-4 m-2 text-black">
              Amount
            </label>
            <section className="flex mb-8">
              <input
                type="number"
                placeholder='0'
                inputMode='numeric'
                id="bonusamount"
                min="0"
                className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
                onChange={handleChange}
              />
              <select id="usedcoin" value={usedCoin} onChange={handleOptionChangeCoin}
                className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
              >
                
                <option value="ETH">Native</option>
                <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
                <option value="WETH">WETH</option>
                <option value="WBTC">WBTC</option>
                <option value="DAI">DAI</option>
                
              </select>
              <button 
                type="button" 
                onClick={handleClickBalloon}
                className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
              >
                <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff", fontSize: '12px' }} className='m-2 py-0' />
              </button>
            </section>
    
            {/* Dates */}
            <div className='container flex flex-row'>
              <div className='left-date'>
                <label htmlFor="bonusamount" className="font-bold m-2 text-black">
                  Start Date
                </label>
                <div className="flex items-center flex-row p-2">
                  <section className="flex mb-8">
                    <input
                      type="date"
                      id="startdate"
                      className="max-w-screen-m flex-grow py-2 px-3 mt-1 w-60 bg-default-bg rounded focus:outline-offset-0 outline-sky-200 border APN_input"
                      defaultValue={today}
                      onChange={handleChange}
                    />
                    <button 
                      onClick={handleClickBalloon2}
                      className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
                    >
                      <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff", fontSize: '12px' }} className='m-2 py-0' />
                    </button>
                  </section>
                </div>
              </div>
    
              <div className='right-date ml-12'>
                <label htmlFor="bonusamount" className="font-bold m-2 text-black">
                  Sold By
                </label>
                <div className="flex items-center flex-row p-2">
                  <section className="flex mb-8">
                    <input
                      type="date"
                      id="sellbydate"
                      className="max-w-screen-m flex-grow py-2 px-3 mt-1 w-60 bg-default-bg rounded focus:outline-offset-0 outline-sky-200 border APN_input"
                      defaultValue={today}
                      onChange={handleChange}
                    />
                    <button 
                      onClick={handleClickBalloon3}
                      className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
                    >
                      <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff", fontSize: '12px' }} className='m-2 py-0' />
                    </button>
                  </section>
                </div>
              </div>
            </div>
    
            {/* Add Sales Price */}
            <label htmlFor="bonusamount" className="font-bold m-2 text-black">Add Sales Price: </label>
            <div className="flex items-center flex-row p-2">
              <div className="flex items-center">
                <label className="mr-10 m-2">
                  <input
                    type="radio"
                    id="yes"
                    checked={isForSale}
                    onChange={() => {
                      setIsForSale(true);
                      handleChange();
                      console.log("handle change2");
                    }}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    id="no"
                    checked={!isForSale}
                    onChange={() => {
                      setIsForSale(false);
                      document.getElementById("salesprice").value = 0;
                      handleChange();
                      console.log("handle change");
                    }}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
            {/* sales condition*/}
            <label htmlFor="bonuscondition" className="font-bold m-2 text-black">Sales price condition: </label>
            <div className="flex items-center flex-row p-2">
              <div className="flex items-center">
                <label className="mr-10 m-2">
                  <input
                    type="radio"
                    id="priceabove"
                    checked={PriceCondition}
                    onChange={() => {
                      setPriceCondition(true);
                      handleChange();
                      console.log("handle change price condition 2");
                    }}
                    className="mr-1"
                  />
                  Equal or Above
                </label>
                <label>
                  <input
                    type="radio"
                    id="no"
                    checked={!PriceCondition}
                    onChange={() => {
                      setPriceCondition(false);
                      //document.getElementById("salesprice").value = 0;
                      handleChange();
                      console.log("handle change price condition");
                    }}
                    className="mr-1"
                  />
                  Equal or Below
                </label>
              </div>
            </div>
            {/* Sales Price */}
            <label htmlFor="bonusamount" className="font-bold mt-4 m-2 text-black">
              Sales Price :
            </label>
            <section className="flex mb-8">
              <input
                type="number"
                inputMode='numeric'
                id="salesprice"
                min="0"
                className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
                onChange={handleChange}
                disabled={!isForSale}
              />
              <button 
                type="button" 
                onClick={handleClickBalloon6}
                className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
              >
                <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff", fontSize: '12px' }} className='m-2 py-0' />
              </button>
            </section>
    
            {/* Sender Wallet */}
            <label htmlFor="senderwallet" className="font-bold mr-4 m-2 text-black">Sender Wallet</label>
            <section className="flex mb-2">
              <input
                type="text"
                id="senderwallet"
                defaultValue={SenderAddress}
                className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
                onChange={handleChange}
              />
              <button 
                type="button" 
                onClick={handleClickBalloon4}
                className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
              >
                <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff", fontSize: '12px' }} className='m-2 py-0' />
              </button>
            </section>
            <section className="flex mb-8">
              <input id="sendermail" type="email" placeholder="johndoe@mail.com" className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
                >
              </input>
            </section>
    
            {/* Receiver Wallet */}
            <label htmlFor="receiverwallet" className="font-bold mr-4 m-2 text-black">Receiver Wallet</label>
            <section className="flex mb-2">
              <input
                type="text"
                id="receiverwallet"
                defaultValue={ReceiverAddress}
                className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
                onChange={handleChange}
              />
              <button 
                type="button" 
                onClick={handleClickBalloon5}
                className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
              >
                <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff", fontSize: '12px' }} className='m-2 py-0' />
              </button>
            </section>
            <section className="flex mb-8">
              <input id="receivermail" type="email" placeholder="johndoe@mail.com" className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input max-w-screen-sm flex-grow"
                >
              </input>
            </section>
    
            <div className="p-6 flex items-center justify-center">
              <button 
                className={`create_blue_btn py-2 px-4 rounded ${
                  verificationfailed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-default-bt text-default-bt-text hover:bg-gr-200 border border-default-border'
                }`} 
                disabled={verificationfailed} 
                onClick={createbonusfunc}
              >
                Create Contract
              </button>
              
            </div>
            <div className="p-6 flex items-center justify-center">
              <p className='text-xs text-red-700'>Once Create Contract button is pressed, all entered data is final and cannot be edited. Make sure all entered data is correct.</p>
            </div>
          </div>
        </div>
    
        {showPopup && (
          <Popup header={popupHeader} text={popupText} closeModal={handleClosePopup} isOpen={showPopup}/>
        )}
        {showPopupSuccess && (
          <PopupSuccess header={popupHeaderSuccess} text={""} closeModal={handleClosePopupSuccess} isOpen={showPopupSuccess}/>
        )}
        {showBalloon && (
          <PopupInfo text={balloonText} closeModal={handleCloseBalloon} isOpen={showBalloon}/>
        )}
      </div>
    );    
  };
  
  export default MyForm;