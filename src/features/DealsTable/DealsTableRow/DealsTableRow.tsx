import React from "react";
import { DealType } from "../../../types";
import { useDispatch } from "react-redux";
import { deleteDeal, managePublicationDeal } from "../../../redux/actions";

import "./DealsTableRow.scss";

const currencyAmountToString = (amount: string) => {
  return `$${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

type DealsTableRowProps = {
  deal: DealType;
};

const DealsTableRow = (props: DealsTableRowProps) => {
  const {
    deal: { id, institution, dealType, dealSize, isPublished },
  } = props;

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteDeal(id!));
  };

  const handleTogglePublication = () => {
    dispatch(managePublicationDeal(id!, !isPublished));
  };

  return (
    <tr className='DealsTableRow'>
      <td className='DealsTableRow--cell'>{institution}</td>
      <td className='DealsTableRow--cell'>{dealType}</td>
      <td className='DealsTableRow--cell'>
        {currencyAmountToString(dealSize)}
      </td>
      <td className='DealsTableRow--cell'>{isPublished ? "Yes" : "No"}</td>
      <td className="DealsTableRow--cell actionColumn">
        <button onClick={handleTogglePublication} className={`DealsTableRow--button ${isPublished ? "unpublishAction" : ""}`}>
          {isPublished ? "Unpublish" : "Publish"}
        </button>
      </td>
      <td className="DealsTableRow--cell actionColumn">
        <button onClick={handleDelete} className="DealsTableRow--button deleteAction">
          Delete
        </button>
      </td>   
    </tr>
  );
};

export default DealsTableRow;
