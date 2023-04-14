import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';

const Nav = ({ account, setAccount }) => {
    const isconnected = Boolean(account[0]);
    async function connect() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts);
        }
    }
    return (
        <Flex justify="space-around" align="center" width="100%" padding="15px">
            <div>About</div>
            <div>Mint</div>

            {isconnected ? (
                <p>Connected</p>
            ) : (
                <Button
                backgroundColor="#5DBAE8"
                borderRadius="4px"
                color="white"
                padding="10px"
                cursor="pointer"
                margin="0 10px"
                onClick={connect}>Connect</Button>
            )}
        </Flex>
    )
}

export default Nav;