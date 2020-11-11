pragma solidity ^0.5.0;
 
contract Ballot {
 
    struct vote{
        address voterAddress;
        bool choice;
    }
 
    struct voter{
        string voterName;
        bool voted;
    }
 
    uint private countResult = 0;
    string public finalResultChoice;
    uint public totalVoter = 0;
    uint public totalVote = 0;
    address public ballotOfficialAddress;      
    string public ballotOfficialName;
    string public proposal;
    string public choice1;
    string public choice2;
    uint public choice1Votes = 0;
    uint public choice2Votes = 0;
 
    mapping(uint => vote) public votes;
    mapping(address => voter) public voterRegister;
 
    enum State { Created, Voting, Ended }
	State public state;
 
	//creates a new ballot contract
	constructor(
        string memory _ballotOfficialName,
        string memory _proposal,
        string memory _choice1,
        string memory _choice2) public {
        ballotOfficialAddress = msg.sender;
        ballotOfficialName = _ballotOfficialName;
        proposal = _proposal;
        choice1 = _choice1;
        choice2 = _choice2;
 
        state = State.Created;
    }
 
 
	modifier condition(bool _condition) {
		require(_condition);
		_;
	}
 
	modifier onlyOfficial() {
		require(msg.sender ==ballotOfficialAddress);
		_;
	}
 
	modifier inState(State _state) {
		require(state == _state);
		_;
	}
 
    event voterAdded(address voter);
    event voteStarted();
    event voteEnded(string finalResult);
    event voteDone(address voter);
 
    //add voter
    function addVoter(address _voterAddress, string memory _voterName)
        public
        inState(State.Created)
    {
        voter memory v;
        v.voterName = _voterName;
        v.voted = false;
        voterRegister[_voterAddress] = v;
        totalVoter++;
    }
 
    //declare voting starts now
    function startVote()
        public
        inState(State.Created)
        onlyOfficial
    {
        state = State.Voting;     
    }
 
    //voters vote by indicating their choice (true/false)
    //true = choice1, false = choice2
    function doVote(bool _choice)
        public
        inState(State.Voting)
        returns (bool voted)
    {
        bool found = false;
 
        if (bytes(voterRegister[msg.sender].voterName).length != 0 
        && !voterRegister[msg.sender].voted){
            voterRegister[msg.sender].voted = true;
            vote memory v;
            v.voterAddress = msg.sender;
            v.choice = _choice;
            if (_choice){
                choice1Votes++; //counting on the go
            } else {
                choice2Votes++;
            }
            votes[totalVote] = v;
            totalVote++;
            found = true;
        }
        return found;
    }
 
    //end votes
    function endVote()
        public
        inState(State.Voting)
        onlyOfficial
    {
        state = State.Ended;
        if (choice1Votes > choice2Votes) {
            finalResultChoice = choice1;    
        } else if (choice1Votes == choice2Votes) {
            finalResultChoice = 'TIE';
        } else {
            finalResultChoice = choice2;   
        }
    }
}