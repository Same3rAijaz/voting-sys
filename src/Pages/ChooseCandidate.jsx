import React from "react"
import { Box, Container, Card, Grid, CardContent, CardActionArea, CardHeader, CardMedia } from "@mui/material"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { makeNull } from "../Redux/Reducers/details.Reducer.js";
import { useNavigate } from "react-router";

const ChooseCandidate = (props) => {
    const value = useSelector(state => state.counter)
    const [candidates, setCandidates] = React.useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (value?.name !== null && value?.cnic !== null) {
            axios.get(`http://localhost:4000/get-all?type=candidates`).then((res) => {
                setCandidates(res.data.data)
            })

        } else {
            navigate('/')
        }
    }, [])




    const notify = (value) => {
        toast(value?.toString())
        setTimeout(() => {
            navigate('/')
        }, 2500)
    }
    const ForVote = async (id) => {
        try {
            const response = await axios.post('http://localhost:4000/vote', { ...value, voted_for: id })
            console.log(response, "response")
            if (response?.status === 200) {
                notify(response?.data?.message)
                dispatch(makeNull())
            }
        } catch (error) {
            notify(error?.response?.data?.message)
        }

    }
    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <h1 sx={{}}>Ballot:</h1>
            <Grid container spacing={2}>
                <ToastContainer />
                {/* <Box sx={{ display: "flex", flexDirection: "column" }}> */}
                {candidates?.length ?
                    candidates?.map((candidate, index) => {
                        return (
                            <Grid item xs={4} key={index}>
                                <Card sx={{ m: 2, boxShadow: "5px 5px 5px 5px grey" }}>
                                    <CardContent>
                                        <h3>{candidate?.title}</h3>
                                        <p>Name: {candidate?.name}</p>
                                        <p>CNIC: {candidate?.cnic}</p>
                                        <CardActionArea sx={{ padding: 2, bgcolor: "aquamarine" }} onClick={(e) => ForVote(candidate?._id)}>
                                            Vote!
                                        </CardActionArea>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                    : null}
            </Grid>
        </Box>
    </>)
}
export default ChooseCandidate