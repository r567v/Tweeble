import React from "react";
import { AppContext } from "./context/AppContext";

const TipModal = ({tweetId}) => {

    const [amount, setAmount] = React.useState('5');
    const {tweeble, account} = React.useContext(AppContext);

    const addTipAmount = async (e) => {
        e.preventDefault();
        
        await tweeble.methods.tipTweet(tweetId).send({from: account, value: amount});
        window.location.reload();
    }
    return ( 
        <div className="modal fade" id={`tipmodal-${tweetId}`} aria-labelledby="textbox">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Gwei to Tip:</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body custom-scroll">
                                <input type="number" min={1} name="tip" className="form-control" placeholder="5" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="post-share-btn" data-bs-dismiss="modal">cancel</button>
                                <button type="submit" className="post-share-btn" onClick={addTipAmount}>ok</button>
                            </div>
                        </div>
                    </div>
                </div>
    );
}
 
export default TipModal;