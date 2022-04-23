import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Stack, Input, Text, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ReactComponent as Rocket } from '../assets/rocket.svg';

import PrettifyJsonOutput from '../components/PrettifyJsonOutput';
import { fetchAllCapsules, fetchLandingPadsById } from '../redux/spaceX/spaceXRedux';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const { outputData, isLoading, errorMsg } = useSelector((state) => state.spaceX);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  console.log('🚀 ~ file: App.jsx ~ line 22 ~ App ~ errors', errors);

  const capsuleBtnClickHandler = () => {
    dispatch(fetchAllCapsules());
  };

  const ladingPadBtnClickHandler = (id) => {
    dispatch(fetchLandingPadsById({ id }));
  };

  const ladingPadIdFormSubmitHandler = (values) => {
    dispatch(fetchLandingPadsById({ id: values }));
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
            <form onSubmit={handleSubmit(ladingPadIdFormSubmitHandler)}>
              <Flex flex="1" direction="row" justify="center" align="center" p="2">
                <Stack spacing={3}>
                  <Input
                    id="landingPad"
                    placeholder="Input Pad ID"
                    size="lg"
                    {...register('landingPad', {
                      maxLength: { value: 15, message: 'Maximum length should be 15' },
                      pattern: {
                        value: /[A-Za-z\d]+/g,
                        message: 'Invalid ID!'
                      }
                    })}
                  />
                  <Button
                    colorScheme="teal"
                    size="lg"
                    type="submit"
                    isLoading={isLoading?.landingPads}
                  >
                    Landing Pad
                  </Button>
                  <Text fontSize="md" color="tomato">
                    {errors?.landingPad?.message || errorMsg}
                  </Text>
                </Stack>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default hot(App);
