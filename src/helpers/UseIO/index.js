import { useEffect, useRef, useState } from 'react';

export const useIO = (options) => {
	const [elements, setElements] = useState([]);
	const [entries, setEntries] = useState([]);

	const observer = useRef(null);


	useEffect(() => {
		if (elements.length) {
			observer.current = new IntersectionObserver((ioEntries) => {
				setEntries(ioEntries);
			});

			elements.forEach(element => {
				observer.current.observe(element);
			});
		}
		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		}
	}, [elements]);

	return [observer.current, setElements, entries];
};