import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/styles.css';

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useRef } from 'react';
import { columnDefs } from '../types/column-defs';
import data from '../data/near-earth-asteroids.json';
import { copyToExcel, eventBus } from '../utils/helpers';

// Failed attempt to copy the data from the grid to Excel
document.addEventListener('copy', () => copyToExcel);

export const Grid = (): JSX.Element => {
	// This is the default column definition for the grid
	// It is memoized to prevent unnecessary re-renders, based on the docs
	const defaultColDef = useMemo(() => {
		return {
			filter: true,
			sortable: true,
		};
	}, []);

	// This is the reference to the grid
	const gridRef = useRef<AgGridReact>(null);

	useEffect(() => {
		// This event listener listens for the 'clearData' event
		// When the event is dispatched, it clears the filters and sorters
		eventBus.on('clearData', () => {
			gridRef.current?.api.setFilterModel(null);
			gridRef.current?.columnApi.applyColumnState({
				defaultState: { sort: null },
			});
		});

		// This is a cleanup function that removes the event listener
		return () => {
			eventBus.remove('clearData');
		};
	}, []);

	return (
		<div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
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
