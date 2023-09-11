// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CCIPNFT is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string public constant NFTURI =
        "https://ipfs.filebase.io/ipfs/QmcdYWjv7cxJd1wEfNwZNMLAnmFxbeAhMfa9SWPKBdStCx";

    constructor() ERC721("CCIPNFT", "CT") {}

    function _baseURI() internal pure override returns (string memory) {
        return NFTURI;
    }

    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
