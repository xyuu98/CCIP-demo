const { network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const developmentChains = ["hardhat", "localhost"]

    const routerAddress = "0x70499c328e1E2a3c41108bd3730F6670a44595D1"
    const linkAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"

    log("部署 SourceChainMinter 并等待确认...")

    const source = await deploy("SourceChainMinter", {
        from: deployer,
        args: [routerAddress, linkAddress],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.POLYGONSCAN_API_KEY
    ) {
        await verify(source.address, [routerAddress, linkAddress])
    }
    log("---------------------------------------------------")
}

module.exports.tags = ["all", "source"]
