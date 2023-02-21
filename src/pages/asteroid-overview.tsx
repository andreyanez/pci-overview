import { Grid } from '../components/Grid';
import { eventBus } from '../utils/helpers';

export const AsteroidOverview = (): JSX.Element => {
	return (
		<>
			<div className="table-menu">
				<h1>Near-Earth Object Overview</h1>
				{/* This button dispatches an event to the eventBus */}
				<button
					className="table-btn"
					onClick={() => {
						eventBus.dispatch('clearData');
					}}
				>
					Clear Filters and Sorters
				</button>
			</div>
			<Grid />
		</>
	);
};

export default AsteroidOverview;
