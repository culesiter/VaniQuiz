import { ADD_POINTS } from '../actions/quizActions';

const initialState = {
  points: 0
};

const pointsReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case ADD_POINTS:
      return {
        ...state,
        points: state.points + 1000 // Increment points by 1000 for correct quiz
      };
    default:
      return state;
  }
};

export default pointsReducer;