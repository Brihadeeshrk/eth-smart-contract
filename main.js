

		const ethE = () => {
			if (window.web3) {
				window.web3 = new Web3(window.web3.currentProvider);
				window.ethereum.enable();
				console.log('SUCCESS: YOU ARE USING A WEB3 INJECTED WEB BROWSER / METAMASK ENABLED')
				return true;
			}
			console.log('FAIL: YOU ARE NOT USING A WEB3 INJECTED WEB BROWSER / METAMASK ABSENT')
			return false;
		}
		if (!ethE()) {
			alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
		}

		console.log(web3)


