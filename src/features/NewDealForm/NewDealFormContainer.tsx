import { connect } from "react-redux";
import { createDeal } from "../../redux/actions";
import NewDealForm from "./NewDealForm";
import { DealType, DealsListType } from "../../types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

type AppState = DealsListType;
type DispatchType = ThunkDispatch<AppState, any, AnyAction>;

const mapDispatchToProps = (dispatch: DispatchType) => ({
  onCreateDeal: (deal: DealType) => dispatch(createDeal(deal)),
});

export default connect(undefined, mapDispatchToProps)(NewDealForm);
