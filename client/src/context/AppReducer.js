const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "FINISH_TASK":
      console.log(action.payload);
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id == action.payload._id ? (task = action.payload) : task
        ),
      };
    case "TASK_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "GET_NOTES":
      return {
        ...state,
        loading: false,
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes,
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case "NOTE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "GET_ACCOUNTS":
      return {
        ...state,
        users: action.payload,
      };
    case "REGISTER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
      };
    case "ACCOUNT_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
