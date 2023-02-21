import { AgGridReact } from 'ag-grid-react';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import data from './near-earth-asteroids.json';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useCallback, useMemo, useRef } from 'react';
import './styles.css';

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

const phaFormatter = (params: ValueFormatterParams): string => {
	return params.value === 'Y' ? 'Yes' : params.value === 'N' ? 'No' : '';
};

document.addEventListener('copy', async () => {
	const clipboardData = await navigator.clipboard.readText();
	navigator.clipboard.write([
		new ClipboardItem({
			'text/plain': new Blob([clipboardData], { type: 'text/plain' }),
		}),
	]);
});

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
	{
		field: 'pha',
		headerName: 'Potentially Hazardous',
		comparator: stringComparator,
		valueFormatter: phaFormatter,
	},
	{
		field: 'orbit_class',
		headerName: 'Orbit Class',
		comparator: stringComparator,
	},
];

const NeoGrid = (): JSX.Element => {
	const gridRef = useRef<AgGridReact>(null);

	const defaultColDef = useMemo(() => {
		return {
			filter: true,
			sortable: true,
		};
	}, []);

	const clearFilteringAndSorting = useCallback(() => {
		gridRef.current?.api.setFilterModel(null);
		gridRef.current?.columnApi.applyColumnState({
			defaultState: { sort: null },
		});
	}, []);

	return (
		<div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
			<div className="table-menu">
				<h1>Near-Earth Object Overview</h1>
				<button className="table-btn" onClick={clearFilteringAndSorting}>
					Clear Filters and Sorters
				</button>
			</div>
			<AgGridReact
				rowData={data}
				ref={gridRef}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				ensureDomOrder={true}
				enableCellTextSelection={true}
				rowGroupPanelShow={'always'}
			/>
		</div>
	);
};

export default NeoGrid;
