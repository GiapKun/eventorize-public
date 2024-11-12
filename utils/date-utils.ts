import moment from 'moment';

export const formatDate = (dateString: string): string => {
    return moment(dateString).format('DD/MM/YYYY-HH:mm:ss');
};

export const formatDateToDateTimeLocal = (dateString: string): string => {
    return moment(dateString).format('YYYY-MM-DDTHH:mm');
};