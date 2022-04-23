import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Stack, Input, Text } from '@chakra-ui/react';
import { fetchLandingPadsById } from '../redux/spaceX/spaceXRedux';

const LandingPadSearch = () => {
  const { isLoading, errorMsg } = useSelector((state) => state.spaceX);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const ladingPadIdFormSubmitHandler = (values) => {
    dispatch(fetchLandingPadsById({ id: values?.landingPad }));
  };

  return (
    <form onSubmit={handleSubmit(ladingPadIdFormSubmitHandler)}>
      <Stack spacing={3}>
        <Input
          id="landingPad"
          placeholder="Input Pad ID"
          size="lg"
          {...register('landingPad', {
            pattern: {
              value: /[A-Za-z\d]+/g,
              message: 'Invalid ID!'
            }
          })}
        />
        <Button colorScheme="teal" size="lg" type="submit" isLoading={isLoading?.landingPads}>
          Landing Pad
        </Button>
        <Text fontSize="md" color="tomato">
          {errors?.landingPad?.message || errorMsg}
        </Text>
      </Stack>
    </form>
  );
};

export default LandingPadSearch;
