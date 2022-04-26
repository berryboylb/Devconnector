import { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Spinner = () => {
    const [loading] = useState(true);
    const [size, setSize] = useState(30);
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    useEffect(() => {
        if(isMobile){
            setSize(15)
        }
    }, [isMobile])
    
    return (
        <>
            <ClimbingBoxLoader color={'#072F5F'} loading={loading} size={size} />
        </>
    )
}

export default Spinner