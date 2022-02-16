import React from "react";
import { AppContext } from './context/AppContext';
// import moment from 'moment';
import TweetCard from "./TweetCard";

const Feed = () => {
    const {tweets} = React.useContext(AppContext);

    return (
        <>
            {tweets?.length > 0 && tweets?.map((tweet, i) => {
                return <TweetCard tweet={tweet} key={i} />
            })}
        </>
    );
}
 
export default Feed;