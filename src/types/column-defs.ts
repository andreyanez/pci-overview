import { ColDef } from 'ag-grid-community';
import {
	dateComparator,
	dateFormatter,
	numberComparator,
	yesNoFormatter,
	stringComparator,
} from '../utils/helpers';

export const columnDefs: ColDef[] = [
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
		valueFormatter: yesNoFormatter,
	},
	{
		field: 'orbit_class',
		headerName: 'Orbit Class',
		comparator: stringComparator,
	},
];
