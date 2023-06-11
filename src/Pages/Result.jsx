import React from "react"
import { Box, Container, Card, Grid, CardContent, CardActionArea, CardHeader, CardMedia, TableHead, Table, TableBody } from "@mui/material"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { makeNull } from "../Redux/Reducers/details.Reducer.js";
import { useNavigate } from "react-router";

const Result = (props) => {
    const value = useSelector(state => state.counter)
    const [result, setResult] = React.useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        axios.get(`http://localhost:4000/get-all?type=votes`).then((res) => {
            setResult(res.data.data)
            console.log(res.data.data)
        })
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
            <h1 sx={{}}>Results:</h1>
            <Grid container spacing={2}>
                <ToastContainer />
                {/* <Box sx={{ display: "flex", flexDirection: "column" }}> */}
                {result?.length ?
                    result?.map((candidate, index) => {
                        return (
                            <Grid item xs={4} key={index}>
                                <Card sx={{ m: 2, boxShadow: "5px 5px 5px 5px grey" }}>
                                    <CardContent>
                                        <h3>{candidate?.candidate_details ? candidate?.candidate_details[0]?.title : null}</h3>
                                        <p>Name: {candidate?.candidate_details ? candidate?.candidate_details[0]?.name : null}</p>
                                        <p>CNIC: {candidate?.candidate_details ? candidate?.candidate_details[0]?.cnic : null}</p>
                                        <p>Votes : {candidate?.user_details?.length}</p>
                                        {/* <Table>
                                            <TableHead>
                                                <tr>
                                                    <td>Name:</td>
                                                    <td>CNIC:</td>
                                                </tr>
                                            </TableHead>
                                            <TableBody>
                                                {candidate?.user_details?.map((a, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{a?.name}</td>
                                                            <td>{a?.cnic}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table> */}
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
export default Result