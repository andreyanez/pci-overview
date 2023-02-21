import { AgGridReact } from 'ag-grid-react';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import data from './near-earth-asteroids.json';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from 'react';

const numberComparator = (valueA: number, valueB: number): number => {
	return valueA - valueB;
};

const stringComparator = (valueA: string, valueB: string): number => {
	if (valueA === valueB) return 0;
	return valueA > valueB ? 1 : -1;
};

const dateComparator = (valueA: string, valueB: string): number => {
	const dateA = new Date(valueA).getTime();
	const dateB = new Date(valueB).getTime();
	return dateA - dateB;
};

const dateFormatter = (params: ValueFormatterParams): string => {
	const dateISO = new Date(params.value);
	const date = dateISO.getDate();
	const month = dateISO.getMonth() + 1;
	const year = dateISO.getFullYear();
	const mmddyyyy =
		(month <= 9 ? '0' + month : month) + '-' + (date <= 9 ? '0' + date : date) + '-' + year;
	return mmddyyyy;
};

const columnDefs: ColDef[] = [
	{
		field: 'designation',
		headerName: 'Designation',
		comparator: stringComparator,
	},
	{
		field: 'discovery_date',
		headerName: 'Discovery Date',
		comparator: dateComparator,
		valueFormatter: dateFormatter,
	},
	{
		field: 'h_mag',
		headerName: 'H (mag)',
		comparator: numberComparator,
	},
	{ field: 'moid_au', headerName: 'MOID (au)', comparator: numberComparator },
	{ field: 'q_au_1', headerName: 'q (au)', comparator: numberComparator },
	{ field: 'q_au_2', headerName: 'Q (au)', comparator: numberComparator },
	{ field: 'period_yr', headerName: 'Period (yr)', comparator: numberComparator },
	{ field: 'i_deg', headerName: 'Inclination (deg)', comparator: numberComparator },
	{ field: 'pha', headerName: 'Potentially Hazardous', comparator: stringComparator },
	{
		field: 'orbit_class',
		headerName: 'Orbit Class',
		enableRowGroup: true,
		comparator: stringComparator,
	},
];

const NeoGrid = (): JSX.Element => {
	const defaultColDef = useMemo(() => {
		return {
			filter: true,
			sortable: true,
		};
	}, []);

	return (
		<div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
			<AgGridReact
				rowData={data}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				rowGroupPanelShow={'always'}
			/>
		</div>
	);
};

export default NeoGrid;
