
let state = 0
		// Owl Carousel Scripts
		jQuery(window).on('pluginCarouselReady', function () {
			$('#oc-services').owlCarousel({
				items: 1,
				margin: 30,
				nav: false,
				dots: true,
				smartSpeed: 400,
				responsive: {
					576: { stagePadding: 30, items: 1 },
					768: { stagePadding: 30, items: 2 },
					991: { stagePadding: 150, items: 3 },
					1200: { stagePadding: 150, items: 3 }
				},
			});
		});

		var finalResult, totalVoter, totalVote, ballotOfficialAddress, ballotOfficialName, proposal, defacc

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

		web3.eth.getAccounts(function (error, accounts) {
			web3.eth.defaultAccount = accounts[0]
			$('#hi').text('Hello! ' + web3.eth.defaultAccount)
			$('#userether').attr('href', 'https://rinkeby.etherscan.io/address/' + web3.eth.defaultAccount)
		})

		var ballotContract = web3.eth.contract(	[ { "inputs": [ { "internalType": "string", "name": "_ballotOfficialName", "type": "string" }, { "internalType": "string", "name": "_proposal", "type": "string" }, { "internalType": "string", "name": "_choice1", "type": "string" }, { "internalType": "string", "name": "_choice2", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "voter", "type": "address" } ], "name": "voteDone", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "finalResult", "type": "string" } ], "name": "voteEnded", "type": "event" }, { "anonymous": false, "inputs": [], "name": "voteStarted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "voter", "type": "address" } ], "name": "voterAdded", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_voterAddress", "type": "address" }, { "internalType": "string", "name": "_voterName", "type": "string" } ], "name": "addVoter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "ballotOfficialAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ballotOfficialName", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "choice1", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "choice1Votes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "choice2", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "choice2Votes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "bool", "name": "_choice", "type": "bool" } ], "name": "doVote", "outputs": [ { "internalType": "bool", "name": "voted", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "endVote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "finalResultChoice", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "proposal", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "startVote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "state", "outputs": [ { "internalType": "enum Ballot.State", "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalVote", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalVoter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "voterRegister", "outputs": [ { "internalType": "string", "name": "voterName", "type": "string" }, { "internalType": "bool", "name": "voted", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" } ])

		var refreshData = function () {
			ballot.state(function (err, res) {
				if (!err) { console.log('THE STATE OF YOUR BALLOT IS; '); console.log(res.c[0]); $('#state').text(getState(res.c[0])) }
				else console.log(err)
			})
			ballot.totalVoter(function (err, res) {
				if (!err) { console.log('totalVoter; '); console.log(res); $('#totalvoters').text('👩🏻👨🏻 Total Number of Voters: ' + res) }
				else console.log(err)
			})
			ballot.totalVote(function (err, res) {
				if (!err) { console.log('totalVote; '); console.log(res); }
				else console.log(err)
			})
			ballot.ballotOfficialAddress(function (err, res) {
				if (!err) {
					defacc = res;
					console.log('ballotOfficialAddress; '); console.log(res); $('#admin-id').text('👨🏻‍💼 Admin-ID: ' + res);
				}
				else console.log(err)
			})
			ballot.ballotOfficialName(function (err, res) {
				if (!err) { console.log('ballotOfficialname; '); console.log(res) }
				else console.log(err)
			})
			ballot.proposal(function (err, res) {
				if (!err) { console.log('proposal; '); console.log(res); $('#argument').text(res) }
				else console.log(err)
			})
			ballot.finalResultChoice(function (err, res) {
				if (!err) { console.log('finalresult '); console.log(res) }
				else console.log(err)
			})
			ballot.choice1(function (err, res) {
				if (!err) { console.log('choice1 '); console.log(res); $('#choice1').text(res) }
				else console.log(err)
			})
			ballot.choice2(function (err, res) {
				if (!err) { console.log('choice2 '); console.log(res); $('#choice2').text(res) }
				else console.log(err)
			})
			ballot.choice1Votes(function (err, res) {
				if (!err) { console.log('choice1votes '); console.log(res); $('#choice1vote').text(res) }
				else console.log(err)
			})
			ballot.choice2Votes(function (err, res) {
				if (!err) { console.log('choice2votes '); console.log(res); $('#choice2vote').text(res) }
				else console.log(err)
			})
			ballot.finalResultChoice(function (err, res) {
				if (!err) { console.log('final result'); console.log(res); $('#winner').text("🏁 " + res); }
				else console.log(err)
			})
			// ballot.voterRegister(web3.eth.defaultAccount, function (err, res) {
			// 	if (!err) { console.log('voterRegister '); console.log(res);}
			// 	else console.log(err)
			// })
		}

		var getState = function (stateNum) {
			switch (stateNum) {
				case 0:
					return "Voting has not started yet";
				case 1:
					return "Voting time!! Let your choice be heard";
				case 2:
					return "Voting has ended";
				default:
					return "Please contact admin";
			}
		}

		// INSERT CONTRACT ID HERE
		var contractAddress = '0x451AAD4DB4B2F64693F729a9Cffa5e62378133f2';
		$('#offladdr').text('🔗 Ballot Address: ' + contractAddress)
		$('#etherscan').attr('href', 'https://rinkeby.etherscan.io/address/' + contractAddress)
		var ballot = ballotContract.at(contractAddress);
		console.log(web3.eth.defaultAccount)
		refreshData()

		// STARTVOTE()
		$('#startvote').click(function () {
			if (defacc !== web3.eth.defaultAccount) {
				alert("You Do Not have Sufficient Access");
				return;
			}
			ballot.startVote((err, res) => {
				if (!err) { document.getElementById("ballotstatus").innerHTML = "VOTING HAS STARTED"; }
				else console.log(err)
			})
		})

		// ADDVOTER()
		$('#addvoter').click(function () {
			ballot.addVoter($('#ethid').val(), $('#votername').val(), (err, res) => {
				if (!err) { console.log('VOTER ADDED'); }
				else console.log(err)
			})
		})

		// DOVOTE()
		$('#true').click(function () {
			ballot.doVote(true, (err, res) => {
				if (!err) { console.log('YOU HAVE VOTED') }
				else console.log(err)
			})
		})
		$('#false').click(function () {
			ballot.doVote(false, (err, res) => {
				if (!err) { console.log('YOU HAVE VOTED') }
				else console.log(err)
			})
		})

		// ENDVOTE()
		$('#stopvote').click(function () {
			if (defacc !== web3.eth.defaultAccount) {
				alert("You Do Not have Sufficient Access");
				return;
			}
			ballot.endVote((err, res) => {
				if (!err) { $('#ballotstatus').text("VOTING HAS ENDED") }
				else console.log(err)
			})
		})

		$('#refresh').click(function () {
			console.log('done')
			refreshData()
		})


