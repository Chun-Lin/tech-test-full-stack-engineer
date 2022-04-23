import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { Button, Flex, Box, Stack, Input } from '@chakra-ui/react';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Flex w="100vw" h="100vh" justify="center" align="center">
        <Flex
          direction={['row', 'row', 'column']}
          w={['100%', '100%', '50%']}
          h={['100%', '100%', '50%']}
          p="3"
          border={['none', 'none', '1px solid black']}
        >
          <Box flex="2">output</Box>
          <Flex flex="1" direction={['column', 'column', 'row']}>
            <Flex flex="1" justify="center" align="center">
              <Button colorScheme="teal" size="lg">
                Capsules
              </Button>
            </Flex>
            <Flex flex="1" justify="center" align="center" bgColor="blue">
              <Rocket />
            </Flex>
            <Flex flex="1" direction="row" justify="center" align="center">
              <Stack spacing={3}>
                <input
                  placeholder="Input Pad ID"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button colorScheme="teal" size="lg">
                  Landing Pad
                </Button>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default hot(App);
