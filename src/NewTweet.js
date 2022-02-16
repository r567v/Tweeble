import React from "react";
import { AppContext } from './context/AppContext';


const NewTweet = () => {
    const [tweet, setTweet ] = React.useState('');
    const {tweeble, account} = React.useContext(AppContext);

    const makeTweet = async (e) => {
        e.preventDefault();
        const time = Date.now();
        await tweeble.methods.postTweet(tweet, time).send({from: account});
        window.location.reload();
    }
    return ( 
        <div className="card card-small">
            <div className="share-box-inner">
                <div className="profile-thumb">
                    <a href="/">
                        <figure className="profile-thumb-middle">
                            <img src="/assets/images/profile/profile-small-37.jpg" alt="profile" />
                        </figure>
                    </a>
                </div>

                <div className="share-content-box w-100">
                    <form className="share-text-box">
                        <textarea name="share" className="share-text-field" aria-disabled="true" placeholder="Say Something" data-bs-toggle="modal" data-bs-target="#textbox" id="email"></textarea>
                        <button className="btn-share" type="submit">share</button>
                    </form>
                </div>

                <div className="modal fade" id="textbox" aria-labelledby="textbox">
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={makeTweet}>
                            <div className="modal-header">
                                <h5 className="modal-title">Share Your Mood</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body custom-scroll">
                                <textarea name="share" className="share-field-big custom-scroll" placeholder="Say Something" value={tweet} onChange={(e) => setTweet(e.target.value)}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="post-share-btn" data-bs-dismiss="modal">cancel</button>
                                <button type="submit" className="post-share-btn" >post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewTweet;