import { NextRequest, NextResponse } from 'next/server';

export async function GET(NextRequest){
    //accessToken, 
    //streetAddress, 
    //postalCode, 
    //orderId) {
        const accessToken = 'f3f35d71a871fe8a775387875e11f8f340f4b77698c1933609eff43e959271c2';
        const apiUrl = 'https://api.propmix.io/pubrec/assessor/v1/GetPropertyDetails';
        const url = NextRequest.nextUrl;//.nextUrl;
        //console.log(url);
        const axios = require('axios');
        //const { myaddress, myzipcode} = await req.query;
        const myaddress = url.searchParams.get('myaddress');
        const myzipcode = url.searchParams.get('myzipcode');
        const orderId = myaddress+'_'+myzipcode;
        console.log('Checking propmix');
          const headers = {
              'Access-Token': accessToken,
            };
            
            // Define query parameters
            const params = {
              OrderId: orderId,
              StreetAddress: myaddress,
              PostalCode: myzipcode,
            };
            var parcelnumber;
            // Make the API call using Axios
            await axios
              .get(apiUrl, { headers, params })
              .then((response) => {
                // Handle the API response
                console.log('API Response:', response.data.Data.Listing.ParcelNumber);
                parcelnumber = response.data.Data.Listing.ParcelNumber;
                
                //return NextResponse.json({message:parcelnumber});
                //return Response.json({message:parcelnumber});
                console.log('do we arrive here?')
              })
              .catch((error) => {
                // Handle errors
                console.error('Error calling API:', error.message);
                //return NextResponse.json({error:'Something wrong'},{status:501});
              });
              //console.log(NextResponse.json({message:parcelnumber}));
             //return NextResponse.json({message:parcelnumber});
             console.log('do we arrive here 2 ?')
            return Response.json({message:parcelnumber});

  }