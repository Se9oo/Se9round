import React from 'react';
import { Button, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ pagination, handlePages }) => {
  const { pageCount, page } = pagination;
  const pages = Array.from({ length: pageCount }, (x, i) => i + 1);

  return (
    <Flex w="100%" justifyContent="center" alignItems="center" m="3rem 0 .5rem 0">
      <IconButton
        w="2rem"
        icon={<ChevronLeftIcon fontSize="2rem" />}
        m="0 .2rem"
        onClick={() => handlePages(page - 1)}
      />
      {pages.map((num, idx) => {
        return (
          <Button
            w="2rem"
            key={idx}
            bg={page === num ? 'brown' : 'gray.200'}
            color={page === num ? 'white' : 'black'}
            m="0 .2rem"
            _hover={{ bg: 'brown', color: 'white' }}
            onClick={() => handlePages(num)}
          >
            {num}
          </Button>
        );
      })}
      <IconButton
        w="2rem"
        icon={<ChevronRightIcon fontSize="2rem" />}
        m="0 .2rem"
        onClick={() => handlePages(page + 1)}
      />
    </Flex>
  );
};

export default Pagination;
