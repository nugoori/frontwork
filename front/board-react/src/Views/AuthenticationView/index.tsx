import { Box } from "@mui/material";
import SignInCardView from "./SignInCardView";
import SignUpCardView from "./SignUpCardView";
import { useState } from "react";


export default function Authentication() {
    
    const [ signInView, setSignInView ] = useState<boolean>(true);

    return(
        <Box>
            {
                signInView ? (<SignInCardView setSignInView={setSignInView} />) : (<SignUpCardView setSignInView={setSignInView} />)
            }
        </Box>
    )
}