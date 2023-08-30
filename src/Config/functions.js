const isBottomReached = (e) => {
  const isReached =
    e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  return isReached;
};

export { isBottomReached };
