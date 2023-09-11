const { network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const developmentChains = ["hardhat", "localhost"]

    const routerAddress = "0xD0daae2231E9CB96b94C8512223533293C3693Bf"
    const nftAddress = "0x762bc6d13E2C9B406797804F2907E9BA78ad48E3"

    log("部署 DestChainReceiver 并等待确认...")

    const dest = await deploy("DestChainReceiver", {
        from: deployer,
        args: [routerAddress, nftAddress],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(dest.address, [routerAddress, nftAddress])
    }
    log("---------------------------------------------------")
}

module.exports.tags = ["all", "dest"]
