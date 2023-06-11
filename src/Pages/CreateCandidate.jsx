import { Box, Button, Container, TextField, Typography, FormControl } from "@mui/material"
import React from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const CreateCandidate = (props) => {
    const notify = (value) => {
        toast(value?.toString())
    }

    const [value, setValue] = React.useState()

    const handler = (e) => {
        let obj = { ...value }
        obj[`${e?.target?.name}`] = e?.target?.value
        setValue(obj)
    }
    const Save = async () => {
        try {
            if (value?.name && value?.cnic && value?.title) {

                const response = await axios.post('http://localhost:4000/create-candidate', { ...value })
                if (response?.status === 200) {
                    notify("Candidate Created SuccessFully")
                }
            } else {
                notify("please fill Form Correctly!")
            }
        } catch (error) {
            console.log(error)
            notify(error?.response?.data?.message)
        }
    }


    return (
        <Container className="ForBG">
            <ToastContainer />
            <Box className="ForForm" sx={{ marginLeft: "35%", transform: "translateX(-50%)", border: "2px solid black", borderRadius: "5px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                <h1>Voting System</h1>
                <h3>Create Candidate</h3>
                <FormControl>
                    <Typography>Enter  Name:</Typography>
                    <TextField placeholder="XXXX XXXX" name="name" onChange={(e) => handler(e)} />
                </FormControl><br />
                <FormControl>
                    <Typography>Enter  Cnic:</Typography>
                    <TextField placeholder="XXXXX-XXXXXXX-X" name="cnic" onChange={(e) => handler(e)} />
                </FormControl><br />
                <FormControl>
                    <Typography>Enter  Title:</Typography>
                    <TextField name="title" onChange={(e) => handler(e)} />
                </FormControl>
                <br />
                <Box>
                    <Button onClick={Save} variant="contained">Save</Button>
                </Box><br /><br />
            </Box>
        </Container>
    )
}
export default CreateCandidate