import Web3 from "web3";

const web3 = new Web3(window.ethereum);
const desiredChainId = 80001;
const contractAddress = "0x77f8fff62C0981f34d1F295515bD3bd3d3f9e5a0";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "websiteDataString",
				"type": "string"
			}
		],
		"name": "uploadWebsite",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "websiteData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export function isMetaMaskInstalled() {
    if(typeof window.ethereum === 'undefined') {
        return false;
    }
    else {
        return true;
    }
}

export async function getAccount() {
    if(isMetaMaskInstalled()) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        return window.ethereum.selectedAddress;
    }
    else {
        window.location.reload();
    }
}

export async function isDesiredChain() {
    const networkId = await web3.eth.net.getId();
    console.log("networkId: " + networkId);
    
    if(networkId == desiredChainId) {
        return true;
    }
    else {
        return false;
    }
}

async function loadContract()
{
    if(await isDesiredChain()) {
        const contract = await new web3.eth.Contract(contractABI, contractAddress);
        return contract;
    }
    else{
        window.location.reload();
    }
}

export async function getWebsiteDataFromContract(websiteAddress)
{
    const contract = await loadContract();
    console.log("data = "+await contract.methods.websiteData(websiteAddress).call());
}

export async function uploadWebsiteDataToContract(websiteDataString)
{
    const contract = await loadContract();
    await contract.methods.uploadWebsite(websiteDataString).send({from: await getAccount()});
}