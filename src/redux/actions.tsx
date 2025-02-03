import { DealType } from "../types";
import axios from "axios";

export const CREATE_DEAL = "CREATE_DEAL";
export const DELETE_DEAL = "DELETE_DEAL";
export const MANAGE_PUBLICATION_DEAL = "MANAGE_PUBLICATION_DEAL";
export const FETCH_DEALS = "FETCH_DEALS";

const PORT = "8000";

export const createDeal = (deal: DealType) => async (dispatch: any) => {
  try {
    const response = await axios.post(`http://localhost:${PORT}/deals`, deal);
    dispatch({
      type: CREATE_DEAL,
      payload: {
        deal: response.data
      }
    });

  } catch (error) {
    console.error("Failed to create deal", error);
  }
};

export const deleteDeal = (id: number) => async (dispatch: any) => {
  try {
    await axios.delete(`http://localhost:${PORT}/deals/${id}`);
    dispatch({
      type: DELETE_DEAL,
      payload: { id }
    });
  } catch (error) {
    console.error("Failed to delete deal", error);
  }
}

export const managePublicationDeal = (id: number, isPublished: boolean) => async (dispatch: any, getState: any) => {
  try {
    // Retrieve the current deal from state
    const deal = getState().deals.find((d: DealType) => d.id === id);
    if (!deal) {
      throw new Error(`Deal with id ${id} not found`);
    }
    // Create an updated deal object with the new publication status
    const updatedDeal = { ...deal, isPublished };
    await axios.put(`http://localhost:${PORT}/deals/${id}`, updatedDeal);

    dispatch({
      type: MANAGE_PUBLICATION_DEAL,
      payload: { id, isPublished }
    });
  } catch (error) {
    console.error("Failed to update deal publication status", error);
  }
};

export const fetchDeals = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`http://localhost:${PORT}/deals`);
    dispatch({
      type: FETCH_DEALS,
      payload: response.data, // assuming response.data is an array of deals
    });
  } catch (error) {
    console.error("Failed to fetch deals", error);
  }
};