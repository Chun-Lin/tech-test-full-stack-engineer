import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { Button, Flex, Box, Stack, Input } from '@chakra-ui/react';
import PrettifyJsonOutput from '../components/PrettifyJsonOutput';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const fakeJson = {
    _id: '{{objectId()}}',
    index: '{{index()}}',
    guid: '{{guid()}}',
    isActive: '{{bool()}}',
    balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
    picture: 'http://placehold.it/32x32',
    age: '{{integer(20, 40)}}',
    eyeColor: '{{random("blue", "brown", "green")}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
    company: '{{company().toUpperCase()}}',
    email: '{{email()}}',
    phone: '+1 {{phone()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    about: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    latitude: '{{floating(-90.000001, 90)}}',
    longitude: '{{floating(-180.000001, 180)}}',
    tags: ['{{repeat(7)}}', '{{lorem(1, "words")}}'],
    friends: [
      '{{repeat(3)}}',
      {
        id: '{{index()}}',
        name: '{{firstName()}} {{surname()}}'
      }
    ]
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
          <PrettifyJsonOutput data={fakeJson} />
          <Flex flex="1" direction={['column', 'column', 'row']}>
            <Flex flex="1" justify="center" align="center" p="2">
              <Button colorScheme="teal" size="lg">
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
