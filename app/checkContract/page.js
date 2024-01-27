"use client";
import PopupInfo from '@/components/popupinfo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import _fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Autocomplete from "react-google-autocomplete";
const GOOGLE_API_KEY='AIzaSyCdgb63drAUPidFDZKNQnxix_ZQqwpfaxc';
//const PROPERTY_API_KEY='f3f35d71a871fe8a775387875e11f8f340f4b77698c1933609eff43e959271c2';
const RENTCAST_KEY='a0913037a0254b40b51d63cb2de9453c'

const axios = require('axios');
const apiUrl = 'https://api.propmix.io/pubrec/assessor/v1/GetPropertyDetails';


const NFTcontract="0x8d4D715Cf0f146e2c60000C69EcEa973Db47Ec2a";
const myabi=[{"inputs":[{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_usdcToken","type":"address"},{"internalType":"address","name":"_wbtcToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"name":"bonusInfo","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"bonusAmount","type":"uint256"},{"internalType":"uint256","name":"startDate","type":"uint256"},{"internalType":"uint256","name":"sellByDate","type":"uint256"},{"internalType":"bool","name":"atOrAbove","type":"bool"},{"internalType":"bool","name":"atOrBelow","type":"bool"},{"internalType":"uint256","name":"atPrice","type":"uint256"},{"internalType":"bool","name":"meetSalesCondition","type":"bool"},{"internalType":"bool","name":"postDeadlineCheck","type":"bool"},{"internalType":"bool","name":"fundsWithdrawn","type":"bool"},{"internalType":"address","name":"token","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"},{"internalType":"uint256","name":"startDateInUnixSeconds","type":"uint256"},{"internalType":"uint256","name":"sellByDateInUnixSeconds","type":"uint256"},{"internalType":"bool","name":"atOrAbove","type":"bool"},{"internalType":"bool","name":"atOrBelow","type":"bool"},{"internalType":"uint256","name":"atPrice","type":"uint256"},{"internalType":"uint256","name":"bonusAmount","type":"uint256"},{"internalType":"address","name":"token","type":"address"}],"name":"createBonusInfo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"},{"internalType":"bool","name":"meetSalesCondition","type":"bool"},{"internalType":"bool","name":"postDeadlineCheck","type":"bool"}],"name":"updateBonusInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdcToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbtcToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"Sender","type":"address"},{"internalType":"address","name":"Receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"}],"name":"withdrawFundsReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"Sender","type":"address"},{"internalType":"address","name":"Receiver","type":"address"},{"internalType":"string","name":"propertyNumber","type":"string"}],"name":"withdrawFundsSender","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

const {ethers} = require('ethers');
var provider;
var MyContract;
var MyContractwSigner;



export default function Home() {
	const [showBalloon,setShowBalloon] = useState(false);
	const [balloonText,setBalloonText] = useState("");
	const [buttonNewContract,setbuttonNewContract] = useState(true);
	const [buttonExistingContract,setbuttonExistingContract] = useState(true);
  	const [accountAddress, setAccountAddress] = useState(null);
  	const isConnectedToPeraWallet = !!accountAddress;
  	const router = useRouter();
	const [myaddress,setMyaddress] = useState('');
	const [streetaddress, setStreetaddress]=useState('');
	const [zipcode, setZipcode]=useState(0);
	const [fetchedAPN,setFetchedAPN] = useState('');

	useEffect(() => {
		// Reconnect to the session when the component is mounted
		
	}, []);

	const getPropertyInfoRentCast = async(propertyID) => {
		console.log('Getting Rentcast info');
		const url = `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(myaddress)}`;
		const headers = { accept: 'application/json', 'X-Api-Key': RENTCAST_KEY };
	  
		try {
		  const response = await axios.get(url, { headers });
		  const json = response.data;
	  
		  if (json) {
			console.log(json);
			const APN = json[0].assessorID;
			//const lastSalePrice = json.lastSalePrice;
			return APN;
		  } else {
			throw new Error('No property found for the given ID');
		  }
		} catch (error) {
		  throw new Error('Error fetching property information: ' + error.message);
		}
	  }

	const getPropertyDetails = async(
		accessToken, 
		streetAddress, 
		postalCode, 
		orderId) => {
			  const headers = {
				  'Access-Token': accessToken,
				};
				
				// Define query parameters
				const params = {
				  OrderId: orderId,
				  StreetAddress: streetAddress,
				  PostalCode: postalCode,
				};
				
				// Make the API call using Axios
				axios
				  .get(apiUrl, { headers, params })
				  .then((response) => {
					// Handle the API response
					console.log('API Response:', response.data);
				  })
				  .catch((error) => {
					// Handle errors
					console.error('Error calling API:', error.message);
				  });
	  }
	  

	const disconnect = async () => {
		//peraWallet.disconnect();
		setAccountAddress(null);
	}

  	const login = async () => {
		//Do we need to log in here?
	}

	async function callContract(APN) {
		
		provider = new ethers.BrowserProvider(window.ethereum);
      	const signer = await provider.getSigner();
      	console.log(signer.address);
      

      	MyContract = new ethers.Contract(NFTcontract, myabi, provider);

      	MyContractwSigner = await MyContract.connect(signer);
      	

	
		try {
			
			const active = results.methodResults[0].returnValue
			if (!active) {
				setbuttonExistingContract(false);
				setbuttonNewContract(true);
			}
			else {
				setBalloonText('Contract is no longer active');
				setShowBalloon(true);
			}
		} catch (e) {
			console.log(e);
			setbuttonNewContract(false);
			setbuttonExistingContract(true);
		}
	}

	const handleClickBalloon = () => {
		setBalloonText('Check the address of the given APN. If there is no active contract on the given APN, you can create a new contract. If there is an active contract, you can check the details of the existing contract.');
		setShowBalloon(true);
	}

	const handleCloseBalloon = () => {
		setShowBalloon(false);
	};

	async function checkAPN(APN) {

		
		provider = new ethers.BrowserProvider(window.ethereum);
      	const signer = await provider.getSigner();
      	console.log(signer.address);
      

      	MyContract = new ethers.Contract(NFTcontract, myabi, provider);

      	MyContractwSigner = await MyContract.connect(signer);
		const mysenderwallet = document.getElementById('mysenderwallet').value;
		const myreceiverwallet = document.getElementById('myreceiverwallet').value;
		
		console.log('myaddress = '+myaddress);
		var result = await MyContract.bonusInfo(mysenderwallet,myreceiverwallet,myaddress);
		var returnresult=1;
		if (result[0]!=mysenderwallet){
			setbuttonExistingContract(true);
			setbuttonNewContract(false);
			returnresult=0;
		}
		else {
			setbuttonExistingContract(false);
			setbuttonNewContract(true);
		}
		console.log(result);
		return returnresult;
	}

	const handleExistingContract = async() => {
		var data = myaddress;
		const data2 = myaddress;
		const data3 = document.getElementById("mysenderwallet").value;
		const data4 = document.getElementById("myreceiverwallet").value;
		const data5 = fetchedAPN;
		router.push(`/existingContract?SelAPN=${data}&Address=${data2}&Sender=${data3}&Receiver=${data4}&fetchedAPN=${data5}`);
	};

	const handleNewContract = async() => {
		var data = myaddress;
		const data2 = myaddress;
		const data3 = document.getElementById("mysenderwallet").value;
		const data4 = document.getElementById("myreceiverwallet").value;
		const data5 = fetchedAPN;
		router.push(`/newContract?SelAPN=${data}&Address=${data2}&Sender=${data3}&Receiver=${data4}&fetchedAPN=${data5}`);
	};
	
	const handleSelect = async(place) => {
		console.log(place);
		console.log(place['formatted_address']);
		setMyaddress(place['formatted_address']);
	}

	const checkaddress = async() => {
		// we need to change this one where the address is put in, with the Google API
		
		console.log('street = '+streetaddress);
		console.log('zip = '+zipcode);
		var myorder = streetaddress+'_'+zipcode;
		var response = await checkAPN();
		var myAPN = await getPropertyInfoRentCast(myaddress);
		console.log(myAPN);
		console.log(typeof myAPN);
		const myText = document.getElementById("addresscheck");
		var APNtext = 'no APN known';
		if (typeof myAPN!='undefined'){
			APNtext = myAPN;
		}
		setFetchedAPN(APNtext);
		myText.value = myaddress+'\n APN : '+APNtext;

		
		
	} 

	return (
		<section className='contract-wrapper'>
		  <div className='mb-2 pb-20 container flex space-between flex-end'>
			<div className='flex-col flex-start pt-4 pb-0 contract-left'>
			<input
				  type="text"
				  id="mysenderwallet"
				  className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input"
				  placeholder="Enter Sender Wallet Address"
				  required
			/>
			<input
				  type="text"
				  id="myreceiverwallet"
				  className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input"
				  placeholder="Enter Receiver Wallet Address"
				  required
			/>
			  
				
			 
			  <Autocomplete
                
                apiKey={GOOGLE_API_KEY}
                className="w-60 bg-default-bg rounded px-3 py-2 focus:outline-offset-0 outline-sky-200 m-2 border APN_input"
				
                options={{
                    types: [],
                    componentRestrictions: { country: "us" },
                }}
                onPlaceSelected={(place) => {
                    handleSelect(place);
                }}
            />
			
			<section className="flex mb-8">
				<button
				  type='button'
				  className='m-2 blue_btn about px-4 py-2'
				  onClick={checkaddress}
				>
				  Check Address
				</button>
				<button
				  type="button"
				  onClick={handleClickBalloon}
				  className="info_btn m-2 about hover:bg-[#000000]/90 focus:outline-none focus:ring-[#000000]/50 inline-flex items-center hover:text-[#ffffff] dark:focus:ring-[#000000]/55"
				>
				  <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#ffffff", fontSize: '12px' }} className='m-2 py-0' />
				</button>
			  </section>
	  
			  <section className="flex-start mb-6 mt-0 w-120">
				<textarea
				  id="addresscheck"
				  className="resize-none m-2 sm:w-96 h-15 px-4 py-4 text-white bg-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
				  disabled
				  placeholder="Address Will Display Here"
				></textarea>
			  </section>
			  <section className="flex-start">
				<div className="w-full sm:w-1/2 text-center mr-10 m-2">
				  <button
					className={`hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4  border border-sky-200 ${buttonNewContract ? 'bg-white cursor-not-allowed' : 'bg-white'}`}
					onClick={handleNewContract}
					disabled={buttonNewContract}
				  >
					<img src="/assets/images/newfile.png" alt="New File Image" className="h-12 w-12" />
				  </button>
				  <p className="text-default-text">New <span><p>Contract</p></span></p>
				</div>
				<div className="w-full sm:w-1/2 text-center m-2">
				  <button
					className={`hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-lg mb-4  border border-sky-200 ${buttonExistingContract ? 'bg-white cursor-not-allowed' : 'bg-default-bg'}`}
					onClick={handleExistingContract}
					disabled={buttonExistingContract}
				  >
					<img src="/assets/images/existingfile.png" alt="Existing File Image" className="h-12 w-12" />
				  </button>
				  <p className="text-default-text">Existing <span><p>Contract</p></span></p>
				</div>
			  </section>
			  <footer className="flex justify-start pt-5">
				<a href="https://www.smartcrow.info" className="m-2 font-semibold text-default-bt-text hover:underline">
				  About Us
				</a>
			  </footer>
			  {showBalloon && <PopupInfo text={balloonText} closeModal={handleCloseBalloon} isOpen={showBalloon} />}
			</div>
	  
			
	  
		  </div>
		</section>
	  );	  
}
