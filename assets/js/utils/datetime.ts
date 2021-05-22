/**
 datetime.js contains the small general snippets related to date/time operations
 */
import moment from 'moment';

export const formatDateTime = (cell: any) => cell && moment(cell.substr(0, 19)).format('DD MMM YYYY, hh:mm A');

export const formatDateTimeSimple = (cell: any) => cell && moment(cell.substr(0, 19)).format('DD-MM-YYYY hh:mm:ss');
