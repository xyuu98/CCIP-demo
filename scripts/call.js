const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const sourceChainMinter = await ethers.getContract(
        "SourceChainMinter",
        deployer
    )
    const chainSelector = "16015286601757825753"
    const receiver = "0x033D828d5a29D50c9834C9C048c9d34FF184f153"

    console.log(
        `Got contract SourceChainMinter at ${sourceChainMinter.address}`
    )
    console.log(" Send Message ··· ")
    const transactionResponse = await sourceChainMinter.sendMessage(
        chainSelector,
        receiver
    )
    await transactionResponse.wait()
    console.log(`Got transactionResponse at ${transactionResponse.address}`)
    console.log("Sent!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
