const ADD_TESTIMONY = "ADD_TESTIMONY";
const UPDATE_TESTIMONY = "UPDATE_TESTIMONY";
const DELETE_TESTIMONY = "DELETE_TESTIMONY";
const LIST_TESTIMONY = "LIST_TESTIMONY";
const CURRENT_TESTIMONY = "CURRENT_TESTIMONY";

export const addTestimony = (testimony) => ({
  type: ADD_TESTIMONY,
  payload: testimony,
});

export const updateTestimony = (testimony, id) => ({
  type: UPDATE_TESTIMONY,
  payload: { testimony, id },
});

export const deleteTestimony = (id) => ({
  type: DELETE_TESTIMONY,
  payload: { id },
});

export const getAllTestimony = (testimonies) => ({
  type: LIST_TESTIMONY,
  payload: testimonies,
});

export const getTestimony = (id) => ({
  type: CURRENT_TESTIMONY,
  payload: { id },
});

const initialState = {
  testimonies: [],
  testimony: {},
};

const testimonyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_TESTIMONY:
      return { ...state, testimonies: payload };
    case CURRENT_TESTIMONY:
      return {
        ...state,
        testimony: state.testimonies.find((testimony) => testimony.id === payload.id),
      };
    case ADD_TESTIMONY:
      return { ...state, testimonies: [...state.testimonies, payload] };
    case UPDATE_TESTIMONY:
      return {
        ...state,
        testimonies: state.testimonies.map((testimony) =>
          testimony.id === payload.id ? payload.testimony : testimony
        ),
      };
    case DELETE_TESTIMONY:
      return {
        ...state,
        testimonies: state.testimonies.filter((testimony) => testimony.id !== payload.id),
      };
    default:
      return state;
  }
};

export default testimonyReducer;
