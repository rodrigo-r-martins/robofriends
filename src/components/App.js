import React, { useEffect } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import '../styles/App.css';
import { connect } from 'react-redux';
import { requestRobots, setSearchfield } from '../actions';


const mapStateToProps = state => {
	return {
		searchfield: state.searchRobots.searchfield,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
};

const App = props => {
	const { searchfield, onSearchChange, robots, isPending, onRequestRobots } = props;

	useEffect(() => {
    	onRequestRobots();
	}, [onRequestRobots]);

	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})
	
	return (
		isPending ?
			<h1>Loading</h1>
    	:
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
