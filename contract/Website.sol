// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract Website {

    mapping(address => string) public websiteData;

    function uploadWebsite(string memory websiteDataString) public{
        websiteData[msg.sender] = websiteDataString;
    }
}