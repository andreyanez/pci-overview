// Description: This file contains helper functions that are used throughout the application
import { ValueFormatterParams } from 'ag-grid-community';

// This function is used to sort numbers
export const numberComparator = (valueA: number, valueB: number): number => {
	return valueA - valueB;
};

// This function is used to sort strings
export const stringComparator = (valueA: string, valueB: string): number => {
	if (valueA === valueB) return 0;
	return valueA > valueB ? 1 : -1;
};

// This function is used to sort dates
export const dateComparator = (valueA: string, valueB: string): number => {
	const dateA = new Date(valueA).getTime();
	const dateB = new Date(valueB).getTime();
	return dateA - dateB;
};

// This function is used to format dates in the format YYYY-MM-DD
export const dateFormatter = (params: ValueFormatterParams): string => {
	const dateISO = new Date(params.value);
	const date = dateISO.getDate();
	const month = dateISO.getMonth() + 1;
	const year = dateISO.getFullYear();
	const mmddyyyy =
		(month <= 9 ? '0' + month : month) + '-' + (date <= 9 ? '0' + date : date) + '-' + year;
	return mmddyyyy;
};

// This function is used to format Y/N/n/a values into Yes/No/Empty
export const yesNoFormatter = (params: ValueFormatterParams): string => {
	return params.value === 'Y' ? 'Yes' : params.value === 'N' ? 'No' : '';
};

// Attempts to copy the current clipboard data to the clipboard
export const copyToExcel = async () => {
	const clipboardData = await navigator.clipboard.readText();
	navigator.clipboard.write([
		new ClipboardItem({
			'text/plain': new Blob([clipboardData], { type: 'text/plain' }),
		}),
	]);
};

// Light weight event bus for communication between components
export const eventBus = {
	on(event: string, callback: Function) {
		document.addEventListener(event, e => callback(e));
	},
	dispatch(event: string) {
		document.dispatchEvent(new CustomEvent(event));
	},
	remove(event: string, callback?: Function) {
		document.removeEventListener(event, () => callback);
	},
};
