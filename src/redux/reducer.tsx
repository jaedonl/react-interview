import { CREATE_DEAL, DELETE_DEAL, MANAGE_PUBLICATION_DEAL, FETCH_DEALS } from "./actions";
import { DealsListType } from "../types";

// let nextDealId = 3;

export const initialState: DealsListType = {
  deals: [
    {
      id: 1,
      institution: "LS Credit Union",
      dealSize: "1000000",
      dealType: "Consumer Auto",
      isPublished: true,
    },
    {
      id: 2,
      institution: "LS Credit Union",
      dealSize: "5000000",
      dealType: "Real Estate",
      isPublished: false,
    },
  ],
};

type ActionType = {
  type: string;
  payload: any;
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_DEALS:
      return {
        ...state,
        deals: action.payload,
      };
    case CREATE_DEAL:
      return {
        ...state,
        deals: [...state.deals, action.payload.deal],
      };
    case DELETE_DEAL:
      return {
        ...state,
        deals: state.deals.filter((deal) => deal.id !== action.payload.id),
      };
    case MANAGE_PUBLICATION_DEAL:
      return {
        ...state,
        deals: state.deals.map((deal) =>
          deal.id === action.payload.id 
            ? { ...deal, isPublished: action.payload.isPublished } 
            : deal
        ),
      };
    default:
      return state;
  }
};