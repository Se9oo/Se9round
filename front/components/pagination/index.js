import React, { useEffect } from 'react';
import { Button, Flex, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import usePagination from '../../hooks/usePagination';

// 보여줄 최대 페이지 수
const MAX_PAGE_COUNT = 10;

const Pagination = ({ pagination }) => {
  const { pageCount, currentPage } = pagination;
  // 페이지 수 만큼 배열 생성
  const pages = Array.from({ length: pageCount }, (x, i) => i + 1);
  const { makePaination, handleMovePage, handleMovePageBlock, pageBlocks, currentPageBlockIndex } =
    usePagination(pages);

  useEffect(() => {
    // page blocks 생성
    makePaination(pages);
  }, []);

  return (
    <Flex w="100%" justifyContent="center" alignItems="center" m="3rem 0 .5rem 0">
      {pageCount && pageCount > MAX_PAGE_COUNT && (
        <IconButton
          w="2rem"
          icon={<ArrowLeftIcon fontSize="1rem" />}
          m="0 .2rem"
          onClick={() => handleMovePageBlock('prev')}
        />
      )}
      <IconButton
        w="2rem"
        icon={<ChevronLeftIcon fontSize="2rem" />}
        m="0 .2rem"
        onClick={() => handleMovePage(currentPage - 1)}
      />
      {pageBlocks.length > 0 &&
        pageBlocks[currentPageBlockIndex] &&
        pageBlocks[currentPageBlockIndex].length > 0 &&
        pageBlocks[currentPageBlockIndex].map((page, idx) => {
          return (
            <Button
              w="2rem"
              key={idx}
              bg={currentPage === page ? 'brown' : 'gray.200'}
              color={currentPage === page ? 'white' : 'black'}
              m="0 .2rem"
              _hover={{ bg: 'brown', color: 'white' }}
              onClick={() => handleMovePage(page)}
            >
              {page}
            </Button>
          );
        })}
      <IconButton
        w="2rem"
        icon={<ChevronRightIcon fontSize="2rem" />}
        m="0 .2rem"
        onClick={() => handleMovePage(currentPage + 1)}
      />
      {pageCount && pageCount > MAX_PAGE_COUNT && (
        <IconButton
          w="2rem"
          icon={<ArrowRightIcon fontSize="1rem" />}
          m="0 .2rem"
          onClick={() => handleMovePageBlock('next')}
        />
      )}
    </Flex>
  );
};

export default Pagination;
