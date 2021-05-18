import React, { useState } from 'react'
import {
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
    FormGroup,
    Label
} from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


function Header() {

    const [maxResults, setMaxResults] = useState(10);
    const [startIndex, setStartIndex] = useState(1);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([])
    const handleSubmit = () => {
        setLoading(true);
        if (maxResults > 40 || maxResults < 1) {
            toast.error("Max results must be between 1 and 40!")
        } else {
            axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
            ).then(res =>{
                if(startIndex >= res.data.totalItems || startIndex < 1) {
                    toast.error(
                        `Start index must be between 0 and ${res.data.totalItems}`
                    );
                } else {
                    if (res.data.items.length > 0) {
                        setCards(res.data.items)
                        setLoading(false)
                    }
                }
                //console.log(cards)
               // console.log(res.data)
            }).catch(err => {
                setLoading(true)
                toast.error(`${err.response.data.error.message}`)
            });
        }
    }

    return (
        <div className="main-image d-flex justify-content-center align-items-center flex-column">
            <div className="filter"></div>
            <h1 className="display-2 text-center text-white mb-3">
                Google Book Search
          </h1>
            <div className="text-input">
                <InputGroup size="lg" className="mb-3">
                    <Input placeholder="Book Search"
                        value={query}
                        onChange={e => setQuery(e.target.value)} />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary"
                            className="search-button"
                            onClick={handleSubmit}>
                            <i className="fas fa-search"></i>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                <div className="d-flex justify-content-center">
                    <FormGroup className="ml-5">
                        <Label for="maxResults" className="max-result-label">Max Results</Label>
                        <Input type="number"
                            id="maxResults"
                            placeholder="Max Results"
                            value={maxResults}
                            onChange={e => setMaxResults(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="ml-5">
                        <Label for="startIndex" className="max-result-label">Start Index</Label>
                        <Input type="number"
                            id="maxResults"
                            placeholder="Start Index"
                            value={startIndex}
                            onChange={e => setStartIndex(e.target.value)} />
                    </FormGroup>
                </div>

            </div>
        </div>
    )
}

export default Header
