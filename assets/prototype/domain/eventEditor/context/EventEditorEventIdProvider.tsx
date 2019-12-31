/**
 * External imports
 */
import { getWeekYearWithOptions } from 'date-fns/fp';
import pathOr from 'ramda/src/pathOr';
import React, { createContext } from 'react';
import useToaster from '../../../application/services/toaster/useToaster';

const EventEditorEventIdContext = createContext<number | null>(null);

const { Provider } = EventEditorEventIdContext;

const EventEditorEventIdProvider = ({ children }) => {
	const toaster = useToaster();
	const eventId = pathOr<number>(0, ['eeEditorEventData', 'eventId'], window);

	if (!eventId) {
		toaster.error('Event ID is empty or invalid.');
	}
	return eventId ? <Provider value={eventId}>{children}</Provider> : null;
};

export { EventEditorEventIdContext, EventEditorEventIdProvider };
