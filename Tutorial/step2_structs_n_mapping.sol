pragma solidity ^0.5.0;

contract FirstContract{
    
    
    mapping(address => voter) public voterRegister;
    
    struct voter{
        string voterName;
        bool voted;
    }
    
        
    function addVoter(address _voterAddress, string memory _voterName)
        public
    {
        voter memory v;
        v.voterName = _voterName;
        v.voted = false;
        voterRegister[_voterAddress] = v;
    }
        
}