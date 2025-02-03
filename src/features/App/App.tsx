import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDeals } from "../../redux/actions";
import DealsTable from "../DealsTable/DealsTableContainer";
import NewDealForm from "../NewDealForm/NewDealFormContainer";
import "./App.scss";
import LSLogo from "../../assets/LSLogo";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);
  
  return (
    <>
      <div className='App--header'>
        <LSLogo />
      </div>
      <div className='App'>
        <DealsTable />
        <NewDealForm />
      </div>
    </>
  );
};

export default App;
