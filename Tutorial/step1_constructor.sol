pragma solidity ^0.5.0;

contract FirstContract{
    
    string public name;
    address public admin;
    
    constructor(string memory _name, address _admin) public {
            name = _name;
            admin = _admin;
        }
        
}