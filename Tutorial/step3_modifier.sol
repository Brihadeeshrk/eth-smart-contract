pragma solidity ^0.5.0;

contract FirstContract{
    
    
    address public admin;
    string public terms = 'TnC';
    

    
    constructor() public {
        admin = msg.sender;
    }
    
    modifier onlyOfficial() {
        require(msg.sender == admin);
        _;
    }
    
    
    function changeVote(string memory newTerms) 
    public
    onlyOfficial{
        terms = newTerms;
    }
        
}