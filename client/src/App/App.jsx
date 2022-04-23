import { hot } from 'react-hot-loader/root';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex } from '@chakra-ui/react';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import PrettifyJsonOutput from '../components/PrettifyJsonOutput';
import { fetchAllCapsules } from '../redux/spaceX/spaceXRedux';
import LandingPadSearch from '../components/LandingPadSearch';

const App = () => {
  const { outputData, isLoading } = useSelector((state) => state.spaceX);
  const dispatch = useDispatch();

  const capsuleBtnClickHandler = () => {
    dispatch(fetchAllCapsules());
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
              <LandingPadSearch />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default hot(App);
