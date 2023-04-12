import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { fetchHistorySuccesss } from "../../redux/transaction-history/history.reducers"
import Columns from "../../components/Column/column.component"
import { Container, Row } from "./history-page.styled";
import { FormWrapper, FormGroup, FormControl } from "../../components/SearchForm/searchForm.styled"
import { EmptyStateDescription, EmptyStateTitle, EmptyStateVector, EmptyStateWrapper } from "../new-listings-list-page/newListingsListpage.styles";


const HistoryPage = () => {
    const history = useSelector((state) => state.history.transactions);
    const [searchResults, setSearchResults] = useState([])
    const userInfo = useSelector((state) => state.loginStatus.userInfo)
    const dispatch = useDispatch();

    const fetchHistory = useCallback(
        async (url) => {
            const { "data": response } = await axios.get(url, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            });
            dispatch(fetchHistorySuccesss(response.data));
            setSearchResults(history)
        },
        [dispatch, searchResults]
    );

    function onSearch(event) {
        let searchKey = event.target.value.trim().toUpperCase();
        if (searchKey) {
            setSearchResults(searchResults.filter(history => {
                return JSON.stringify(history).toUpperCase().includes(searchKey)
            }));
        } else {
            setSearchResults(history)
        }
        return
    }

    function GetTransactions() {
        return searchResults.length ?
            (
                <div >
                    <Container fluid>
                        <Row>
                            {searchResults.map((txn) => (
                                <Columns transaction={txn} />
                            ))}
                        </Row>
                    </Container>

                </div>
            )
            :
            (
                <EmptyStateWrapper>
                    <EmptyStateVector />
                    <EmptyStateTitle>No Transaction History Found</EmptyStateTitle>
                    <EmptyStateDescription>We couldn't find anything in your history.</EmptyStateDescription>
                    <EmptyStateDescription><h3>Note:</h3> Transaction history is generated when a transaction is performed.
                    </EmptyStateDescription>
                    <EmptyStateDescription><h3>For example,</h3> A listing for selling a car which is approved and then the auction is completed. This flow generates a Transaction History.</EmptyStateDescription>
                </EmptyStateWrapper>
            )
    }
    useEffect(() => {
        (async function () {
            await fetchHistory(`/user/history/${userInfo._id}`);
            setSearchResults(history)
        })();
    }, []);

    return (
        <>
            <FormWrapper >
                <FormGroup>
                    <FormControl placeholder="Search..." type="search" onInput={onSearch} onChange={onSearch} />
                </FormGroup>
            </FormWrapper>
            <h1 className="heading">Transaction History</h1>
            <hr />
            <GetTransactions />
        </>
    )
}

export default HistoryPage;
