import { Box, Button, Container, TextField, Typography, FormControl } from "@mui/material"
import React from "react"
import { useDispatch } from "react-redux";
import { addDetails } from "../Redux/Reducers/details.Reducer.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import '../Styles/DetailPage.css'
const DetailPage = (props) => {
    const dispatch = useDispatch()
    const notify = (value) => {
        toast(value?.toString())
    }
    const navigate = useNavigate()
    const [forCandidate, setForCandidate] = React.useState(false)
    const [value, setValue] = React.useState()

    const handler = (e) => {
        let obj = { ...value }
        obj[`${e?.target?.name}`] = e?.target?.value
        setValue(obj)
    }
    const Save = async () => {
        try {
            if (value?.name && value?.cnic && /^(?:\d{5}-\d{7}-\d{1})$/.test(value?.cnic)) {
                dispatch(addDetails({ ...value }))
                navigate('/ballot')
            } else {
                notify("Please Fill Form Correctly!")
            }
        } catch (error) {
            console.log(error?.message)
        }
    }


    return (
        <Container className="ForBG">
            <ToastContainer />
            <Box className="ForForm" sx={{ marginLeft: "35%", transform: "translateX(-50%)", border: "2px solid black", borderRadius: "5px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                <h1>Voting System</h1>
                <FormControl>
                    <Typography>Enter Your Name:</Typography>
                    <TextField placeholder="XXXX XXXX" name="name" onChange={(e) => handler(e)} />
                </FormControl><br />
                <FormControl>
                    <Typography>Enter Your Cnic:</Typography>
                    <TextField placeholder="XXXXX-XXXXXXX-X" name="cnic" onChange={(e) => handler(e)} />
                </FormControl><br />
                {forCandidate ?
                    <FormControl>
                        <Typography>Enter Your Title:</Typography>
                        <TextField name="title" onChange={(e) => handler(e)} />
                    </FormControl>
                    : null}<br />

                <Box>
                    <Button onClick={Save} variant="contained">Save</Button>
                </Box><br /><br />
            </Box>
        </Container>
    )
}
export default DetailPage