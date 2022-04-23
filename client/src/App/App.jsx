import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { Button, Flex, Stack, Input } from '@chakra-ui/react';

import PrettifyJsonOutput from '../components/PrettifyJsonOutput';
import { fetchAllCapsules, fetchLandingPadsById } from '../redux/spaceX/spaceXRedux';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const { outputData, isLoading } = useSelector((state) => state.spaceX);
  const dispatch = useDispatch();

  const capsuleBtnClickHandler = () => {
    dispatch(fetchAllCapsules());
  };

  const ladingPadBtnClickHandler = (id) => {
    dispatch(fetchLandingPadsById({ id }));
  };

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
          <PrettifyJsonOutput data={outputData?.data} />
          <Flex flex="1" direction={['column', 'column', 'row']}>
            <Flex flex="1" justify="center" align="center" p="2">
              <Button
                colorScheme="teal"
                size="lg"
                onClick={capsuleBtnClickHandler}
                isLoading={isLoading?.capsules}
              >
                Capsules
              </Button>
            </Flex>
            <Flex flex="1" justify="center" align="center" bgColor="blue">
              <Rocket />
            </Flex>
            <Flex flex="1" direction="row" justify="center" align="center" p="2">
              <Stack spacing={3}>
                <Input
                  placeholder="Input Pad ID"
                  size="lg"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => ladingPadBtnClickHandler(inputValue)}
                  isLoading={isLoading?.landingPads}
                >
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
