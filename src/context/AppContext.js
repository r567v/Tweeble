import React from 'react';
import TweeBle from './../contracts/build/TweeBle.json'
import Web3 from 'web3';

export const AppContext = React.createContext({});

const AppContextProvider = ({ children }) => {
	const [account, setAccount] = React.useState();
	const [tweeble, setTweeble] = React.useState();
	const [tweetCount, setTweetCount] = React.useState(0);
	const [tweets, setTweets] = React.useState(null);
	const [totalTweetSize, setTotalTweetSize] = React.useState(0)
	const [loading, setLoading] = React.useState(false);

	const loadWeb3 = async () => {
		try {
			let w = window;
			if (w.ethereum) {
				w.web3 = new Web3(w.ethereum);
				await w.ethereum.enable();
			} else if (w.web3) {
				w.web3 = new Web3(w.web3.currentProvider);
			} else {
				w.alert(
					'Non-Ethereum browser detected. You should consider trying MetaMask!'
				);
			}
		} catch (err) {
			window.alert(err.message);
		}
	};

	const loadBlockchainData = React.useCallback(async () => {
		try {
			let w = window ;
			const web3 = w.web3;
			const accounts = await web3.eth.getAccounts();
			setAccount(accounts[0]);
			const networkId = await web3.eth.net.getId();
			const networkData = (TweeBle ).networks[networkId];
			if (networkData) {
				const tweeble = new web3.eth.Contract(
					TweeBle.abi,
					networkData.address
				);
				setTweeble(tweeble);

				const tweetsCount = await tweeble.methods.tweetCount().call();
				setTweetCount(tweetsCount);

				const newtweets = [];
				let tweetsize = 0;
				for (let i = tweetsCount; i >= 1; i--) {
					const file = await tweeble.methods.tweets(i).call();

					tweetsize += parseInt(file.tweetsize);

					newtweets.push(file);
					setTweets(newtweets);
					setTotalTweetSize(tweetsize);
				}
			} else {
				w.alert('Storage contract not deployed to detected network.');
			}
		} catch (err) {
			window.alert(err.message);
		}
	}, []);

	React.useEffect(() => {
		(async () => {
			setLoading(true)
			await loadWeb3();
			await loadBlockchainData();
			setLoading(false)
		})();
	}, [loadBlockchainData]);

	return (
		<AppContext.Provider
			value={{
				account,
				tweeble,
				tweetCount,
				tweets,
				totalTweetSize,
				loading
			}}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;