import { useContext } from 'react';

import { ToasterHash, ToasterHook } from './types';
import useDismissToast from './useDismissToast';
import useLoadingToast from './useLoadingToast';
import { ToastContext } from '../context/ToastProvider';

const hash: ToasterHash = (message): string => {
	const msg = JSON.stringify(message);
	return msg
		.split('')
		.reduce((a, b) => {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0)
		.toString();
};

const useToaster = (): ToasterHook => {
	const toaster = useContext(ToastContext);

	return {
		dismiss: useDismissToast(toaster, hash),
		loading: useLoadingToast(toaster, hash),
	};
};

export default useToaster;
