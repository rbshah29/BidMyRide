import React, { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {useSelector} from "react-redux";

import {
    CarDescription,
    CarDetailsBody,
    CarDetailsPage,
    CarDetailsTop,
    CarHeader,
    CarImages,
    CarProperties,
    CarProperty,
    CarTitle,
    DescriptionGroup,
    DescriptionHeading,
    Image,
    PropertyTitle,
    PropertyValue,
    PropertyWrapper,
    Text,
    TitleGroup,
} from "./AuctionDetailsPage";

const AuctionDetails = (props) => {
    const { id } = useParams();
    const [inputValue, setInputValue] = useState('');
    const userDataInfo = useSelector((state) => state.loginStatus.userInfo);


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            let filter = { _id: id }
            const { data } = await axios.get(`/auction/getAuction?filter=${JSON.stringify(filter)}`);
            setAuctions(data.data);
            console.log(data);
        };
        fetchAuctions();
    }, [auctions]);


    const newBidAmount = inputValue;
    const inputEl = useRef(null);

    const onButtonClick = async (lastBidingValue) => {

        if(newBidAmount > lastBidingValue && newBidAmount !== null){
            let bidingAmount = inputEl.current.value;
            const { data } = await axios.put(`/auction/updateAuction`, { bidingAmount, _id: id });
            console.log(data);
            auctions.bidingAmount = newBidAmount;

            let lastBidder = userDataInfo.firstName;
            const { userInfo } = await axios.put(`/auction/updateAuction`, { lastBidder, _id: id });
            auctions.lastBidder = lastBidder;

            setInputValue('');
            inputEl.current.focus();
            console.log('Bid placed successfully');
            alert("Your Bid is places");

        }else if(newBidAmount === null){
            alert("Enter Amount");
        }
        else{
            alert("Enter Bid greater then previous one");
        }
    };
    //for closing auctiuon manually Temporary fix for TA for checking and testing
    const onButtonAuction = async () => {
        let auctionStatus = 'done';
        const { data } = await axios.put(`/auction/updateAuction`, { auctionStatus, _id: id })
        console.log('-------------------------------', data);
        alert("Auction Status is updated");
    }

    return (
        <div>
            {
                auctions.map((auction, index) => (
                        (<div key={auction._id}>
                            <CarDetailsPage>
                                <CarDetailsTop>
                                    <CarImages>
                                        {auction.images.map((image, i) => {
                                            if (i <= 7) {
                                                return <Image src={image} alt="Car Image" key={image} />;
                                            } else {
                                                return <></>;
                                            }
                                        })}
                                    </CarImages>
                                </CarDetailsTop>
                                <CarHeader>
                                    <TitleGroup>
                                        <CarTitle>
                                            {auction.carName}
                                        </CarTitle>
                                    </TitleGroup>
                                </CarHeader>
                                <CarDetailsBody>
                                    <CarProperties>
                                        <CarProperty>
                                            <PropertyWrapper>
                                                <PropertyTitle>Mileage</PropertyTitle>
                                                <PropertyValue>{auction.carMilage} <small>KMS</small></PropertyValue>
                                            </PropertyWrapper>
                                        </CarProperty>
                                        <CarProperty>
                                            <PropertyWrapper>
                                                <PropertyTitle>Auction Status</PropertyTitle>
                                                <PropertyValue>{auction.auctionStatus}</PropertyValue>
                                            </PropertyWrapper>
                                        </CarProperty>
                                    </CarProperties>
                                    <CarDescription>
                                        <DescriptionGroup>
                                            <DescriptionHeading>Car Details</DescriptionHeading>
                                            <Text>{auction.carDetails}</Text>
                                        </DescriptionGroup>
                                        <DescriptionGroup>
                                            <DescriptionHeading>Current Bid
                                                {auction.auctionStatus === 'done' && (
                                                    <> &nbsp;<br/>
                                                        <small>Final Bid Amount</small> &nbsp;<br/>
                                                        <small> Final Auction Bidded By :- {auction.lastBidder}</small>

                                                    </>)}
                                            </DescriptionHeading>
                                            <Text >{auction.bidingAmount} CAD</Text>
                                            {auction.auctionStatus !== 'done' && (
                                                <>
                                                    <input style={{'width': '50%', 'padding': '12px 20px','margin': '8px 0','border': '1px solid #ccc','border-radius': '4px','box-sizing': 'border-box'}} type='text' placeholder='Enter your bid' value={inputValue} onChange={handleInputChange} ref={inputEl}/>
                                                    <Button variant="text" style={{ 'width': '50%' }} onClick={()=>onButtonClick(auction.bidingAmount)}>Place Bid</Button>
                                                </>
                                            )}
                                        </DescriptionGroup>
                                        {auction.auctionStatus === 'live' && (
                                            <>
                                                <DescriptionGroup>
                                                    <DescriptionHeading>Temporaty Manual button for closing auction</DescriptionHeading>
                                                    <Button onClick={onButtonAuction}> Close Auction </Button>
                                                </DescriptionGroup>
                                            </>)}
                                    </CarDescription>
                                </CarDetailsBody>
                            </CarDetailsPage>
                            {/* <h2>{auction.carName}</h2> */}
                        </div>)
                ))

            }
        </div>
    );
}


export default AuctionDetails;
