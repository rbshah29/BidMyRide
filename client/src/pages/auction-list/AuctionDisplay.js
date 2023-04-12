/*
    Author: Rutvik Bhavesh Shah rt304004@dal.ca B00934537
*/
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormWrapper, FormGroup, FormControl } from "../../components/SearchForm/searchForm.styled"



import Typography from '@mui/material/Typography';

import {
  ImageTag,
} from "./AuctionDetailsPage";

function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([])


  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );


  function onSearch(event) {
    let searchKey = event.target.value.trim().toUpperCase();
    if (searchKey) {
      setSearchResults(searchResults.filter(ele => {
        return JSON.stringify(ele).toUpperCase().includes(searchKey)
      }));
    } else {
      setSearchResults(auctions)
    }
    return
  }

  useEffect(() => {
    const fetchAuctions = async () => {
      const { data } = await axios.get(`/auction/getAuction`);
      setAuctions(data.data);
      setSearchResults(data.data)
    };
    fetchAuctions();
  }, []);

  return (
    <div>
      <FormWrapper >
        <FormGroup>
          <FormControl placeholder="Search..." type="search" onInput={onSearch} onChange={onSearch} />
        </FormGroup>
      </FormWrapper>
      <hr />
      {
        searchResults.map((auction) => (
          <div className="projectItem" key={auction._id}>

            <div>
              <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                  <Typography variant='h3' gutterBottom>
                    <ImageTag src={auction.images[1]} alt="thumbnail" />
                  </Typography>
                  <Typography variant='h3' gutterBottom>
                    {auction.carName}
                  </Typography>

                  <Typography variant="h4" component="div">
                    {auction.auctionStatus}
                  </Typography>
                  <Typography variant="body1">
                    Current Bid Amount :- {auction.bidingAmount} CAD
                    <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => {
                    navigate("/auction/details/" + auction._id);
                  }} >Detailed Info</Button>
                </CardActions>
              </Card>
              <br /><br />
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default AuctionList;
