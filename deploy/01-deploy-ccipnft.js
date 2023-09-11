const { network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const developmentChains = ["hardhat", "localhost"]

    log("部署 CCIPNFT 并等待确认...")

    const ccipnft = await deploy("CCIPNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ccipnft.address, [])
    }
    log("---------------------------------------------------")
}

module.exports.tags = ["all", "ccipnft"]
