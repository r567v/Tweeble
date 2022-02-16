import React from 'react'
import { AppContext } from './context/AppContext';
import TipModal from './TipModal';

const TweetCard = ({tweet}) => {

    const {tweeble, account} = React.useContext(AppContext);
    const [likes, setLikes] = React.useState(parseInt(tweet.likes));
    const addLike = async (e) => {
        e.preventDefault();
        await tweeble.methods.likeTweet(tweet.id).send({from: account});
        setLikes(likes+1);
    }

    return (
        <>
        <TipModal tweetId={tweet.id} />
        <div class="card" >
                <div class="post-title d-flex align-items-center">
        
                    <div class="profile-thumb">
                        <a href="/">
                            <figure class="profile-thumb-middle">
                                <img src="assets/images/profile/profile-small-1.jpg" alt="profile" />
                            </figure>
                        </a>
                    </div>

                    
                    <div class="posted-author">
                        <h6 class="author"><a href="profile.html">User: {tweet.author}</a></h6>
                        <p>{console.log(tweet.timestamp)}</p>
                        <span class="post-time">{Date(tweet.timestamp).toString()}</span>
                    </div>

                    <div />
                    </div>

                    <div class="post-content">
                        <p class="post-desc">
                            {tweet.content}
                        </p>
                        <div class="post-meta">
                            <button class="post-meta-like" onClick={addLike}>
                                <i class="bi bi-heart-beat"></i>
                                <span className="text-dark" ><>{likes} Likes</></span>
                            </button>

                            <ul class="comment-share-meta">
                                <li>
                                    <button class="post-share"  data-bs-toggle="modal" data-bs-target={`#tipmodal-${tweet.id}`}>
                                        <i class="bi bi-share"></i>
                                        <span>{tweet.tipAmount} Gwei Tipped so far</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
            </>
    )
}

export default TweetCard
