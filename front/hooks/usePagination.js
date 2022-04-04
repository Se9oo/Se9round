import { useCallback, useEffect, useState } from 'react';
import router from 'next/router';

const usePagination = (pages) => {
  const [pageBlocks, setPageBlocks] = useState([]);
  const [currentPageBlockIndex, setCurrentPageBlockIndex] = useState(0);

  // 보여줄 최대 페이지 수
  const MAX_PAGE_COUNT = 10;

  // page blocks 생성
  const makePaination = () => {
    if (!pages || pages.length === 0) {
      return [];
    }

    const sliceIndex = Math.ceil(pages.length / MAX_PAGE_COUNT);
    const block = [];

    for (let idx = 0; idx < sliceIndex; idx++) {
      block.push(pages.slice(idx * MAX_PAGE_COUNT, idx * MAX_PAGE_COUNT + MAX_PAGE_COUNT));
    }

    setPageBlocks(block);
  };

  // 페이지 이동
  const handleMovePage = useCallback((page) => {
    if (!pages || pages.length === 0) {
      return;
    }

    if (page > 0 && page <= pages.length) {
      router.push({
        pathname: '/home',
        query: { page },
      });

      // page 상단으로 이동
      window.scrollTo(0, 0);
    }
  }, []);

  // page block 이동
  const handleMovePageBlock = (move) => {
    if (!pageBlocks || pageBlocks.length === 0 || !move) {
      return;
    }

    if (move === 'prev' && currentPageBlockIndex > 0) {
      setCurrentPageBlockIndex(currentPageBlockIndex - 1);
    } else if (move === 'next' && pageBlocks[currentPageBlockIndex + 1]) {
      setCurrentPageBlockIndex(currentPageBlockIndex + 1);
    }
  };

  // 선택한 page block 변경시
  useEffect(() => {
    if (pageBlocks.length > 0 && pageBlocks[currentPageBlockIndex] && pageBlocks[currentPageBlockIndex].length > 0) {
      handleMovePage(pageBlocks[currentPageBlockIndex][0]);
    }
  }, [currentPageBlockIndex]);

  return { makePaination, handleMovePage, handleMovePageBlock, pageBlocks, currentPageBlockIndex };
};

export default usePagination;
