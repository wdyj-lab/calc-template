import { useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useDidMount = (fn: () => void): void => useEffect(fn, []);

export default useDidMount;
