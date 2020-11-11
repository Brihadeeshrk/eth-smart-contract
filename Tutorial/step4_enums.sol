pragma solidity ^0.5.0;

contract FirstContract{
    
    string public terms;
    
    enum State { Created, Voting, Ended }
    State public state;

    
    constructor() public {
        state = State.Created;
    }
    
    modifier stateRequired(State _state) {
        require(state == _state);
        _;
    }
    
    function changeState (State _state) public {
        state = _state;
    }
    
    
    function changeVote(string memory newTerms) 
    public
    stateRequired(State.Voting){
        terms = newTerms;
    }
        
}