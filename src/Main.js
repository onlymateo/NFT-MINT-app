import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import Minting from './Mintingnft.json';

const address = 'ADDRESS_DEPLOYER';

const Main = ({account, setAccount}) => {
    const [nft, setNft] = useState(1);
    const isconnected = Boolean(account[0]);
    async function Mint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, Minting.abi, signer);
        
            try {
                const response = await contract.mint(BigNumber.from(nft), {
                    value: ethers.utils.parseEther((0.01 * nft).toString()),
                });
                console.log('Minted');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const less = () => {
        if (nft <= 1) {
            return;
        }
        setNft(nft - 1);
    }
    const more = () => {
        if (nft >= 10) {
            return;
        }
        setNft(nft + 1);
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <h1>Mint your NFT!</h1>
                </div>
                {isconnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                            backgroundColor="#5DBAE8"
                            borderRadius="4px"
                            boxShadow="0 0 1 1px #5DBAE8"
                            color="white"
                            padding="10px"
                            marginTop="10px"
                            cursor="pointer"
                            onClick={less}>
                                -
                            </Button>
                            <Input
                            readOnly
                            backgroundColor="white"
                            borderRadius="4px"
                            textAlign="center"
                            boxShadow="0 0 1 1px #5DBAE8"
                            color="black"
                            padding="10px"
                            paddingLeft="25px"
                            marginTop="10px"
                            cursor="pointer"
                            type="number" value={nft}
                            />
                            <Button
                            backgroundColor="#5DBAE8"
                            borderRadius="4px"
                            boxShadow="0 0 1 1px #5DBAE8"
                            color="white"
                            padding="10px"
                            marginTop="10px"
                            cursor="pointer"
                            onClick={more}>
                                +
                            </Button>
                        </Flex>
                        <Button
                        backgroundColor="#5DBAE8"
                        borderRadius="4px"
                        boxShadow="0 0 1 1px #5DBAE8"
                        color="white"
                        padding="10px"
                        padddingLeft="0px"
                        marginTop="10px"
                        cursor="pointer"
                        onClick={Mint}>
                            Mint
                        </Button>
                    </div>
                ) : (
                <p>Connect your wallet to mint</p>
                )}
            </Box>
        </Flex>
    );
}

export default Main;