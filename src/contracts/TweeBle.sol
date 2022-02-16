// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TweeBle {
    string public name = "TweeBle";
    uint public tweetCount = 0;
    mapping(uint256 => Tweet) public tweets;

    struct Tweet {
        uint id;
        string content;
        uint256 timestamp;
        uint likes;
        uint256 tipAmount;
        address payable author;
    }

    event TweetPosted(
        uint id,
        string content,
        uint256 timestamp,
        uint likes,
        uint256 tipAmount,
        address payable author
    );

    event TweetLiked(
        uint id,
        string content,
        uint256 timestamp,
        uint likes,
        uint256 tipAmount,
        address payable author
    );

    event TweetTipped(
        uint id,
        string content,
        uint256 timestamp,
        uint likes,
        uint256 tipAmount,
        address payable author
    );

    function getTweet(uint id) public view returns (Tweet memory) {
        return tweets[id];
    }

    function postTweet(string memory _content, uint256 _timestamp) public {
        // Check to make sure string is empty or not
        require(bytes(_content).length > 0);

        tweetCount++;
        tweets[tweetCount] = Tweet(
            tweetCount,
            _content,
            _timestamp,
            0,
            0,
            payable(msg.sender)
        );

        emit TweetPosted(tweetCount, _content, block.timestamp, 0, 0, payable(msg.sender));
    }

    function likeTweet(uint _id) public {
        require(_id > 0 && _id <= tweetCount);

        Tweet memory _tweet = getTweet(_id);
        _tweet.likes++;

        tweets[_tweet.id] = _tweet;

        emit TweetLiked(_tweet.id, _tweet.content, _tweet.timestamp, _tweet.likes, _tweet.tipAmount, _tweet.author);
    }

    function tipTweet(uint _id) public payable {
        require(_id > 0 && _id <= tweetCount);

        Tweet memory _tweet = getTweet(_id);
        payable(address(_tweet.author)).transfer(msg.value);
        _tweet.tipAmount = _tweet.tipAmount + msg.value;
        
        tweets[_id] = _tweet;

        emit TweetTipped(_tweet.id, _tweet.content, _tweet.timestamp, _tweet.likes, _tweet.tipAmount, _tweet.author);
    }
}