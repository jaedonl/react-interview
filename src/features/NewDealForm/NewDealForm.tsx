import React, { useState } from "react";
import noop from "lodash/noop";
import { DealType } from "../../types";
import "./NewDealForm.scss";

const DEFAULT_DEAL: DealType = {
  institution: "",
  dealType: "",
  dealSize: "",
  isPublished: false,
};

type DealFormProps = {
  onCreateDeal: (deal: DealType) => any;
};

type ErrorsType = {
  institution?: string;
  dealType?: string;
  dealSize?: string;
}

const DealForm = (props: DealFormProps) => {
  const { onCreateDeal = noop } = props;
  const [newDeal, setNewDeal] = useState(DEFAULT_DEAL);
  const [errors, setErrors] = useState<ErrorsType>({});

  // property type string ==> keyof DealType
  const handleUpdateProperty = (property: keyof DealType) => (
    e: React.ChangeEvent<any>
  ) => {
    setNewDeal({ ...newDeal, [property]: e.target.value });
    
    if (errors[property as keyof ErrorsType]) {
      setErrors({...errors, [property as keyof ErrorsType]: undefined})
    }
  }
  
  const validate = (): boolean => {
    const newErrors: ErrorsType = {};

    if (!newDeal.institution.trim()) {
      newErrors.institution = "Institution is required."
    }
    if (!newDeal.dealType.trim()) {
      newErrors.dealType = "Deal Type is required."
    }
    if (!newDeal.dealSize.trim()) {
      newErrors.dealSize = "Deal Size is required."
    } else {
      // Remove any non-numeric characters (e.g. "$", commas) and check
      const numericValue = newDeal.dealSize.replace(/[^0-9]/g, "");
      if (!/^\d+$/.test(numericValue)) {
        newErrors.dealSize = "Deal Size must be a valid number";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleCreateDeal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // return if valdation failed.
    if (!validate()) return; 

    onCreateDeal({ ...newDeal });
    // Reset state for the next deal input.
    setNewDeal({ ...DEFAULT_DEAL });
  };

  return (
    <form className='NewDealForm tile'>
      <div className='tile--header'>Add New Deal</div>
      <div className='NewDealForm--div'>
        <label className='NewDealForm--label'>Institution</label>
        <input
          className='NewDealForm--input'
          value={newDeal.institution}
          placeholder='LS Credit Union'
          onChange={handleUpdateProperty("institution")}
          required
        />
        {errors.institution && (
          <div className="NewDealForm--error">{errors.institution}</div>
        )}
      </div>
      <div className='NewDealForm--div'>
        <label className='NewDealForm--label'>Deal Type</label>
        <input
          className='NewDealForm--input'
          value={newDeal.dealType}
          placeholder='Consumer Auto'
          onChange={handleUpdateProperty("dealType")}
          required
        />
        {errors.dealType && (
          <div className="NewDealForm--error">{errors.dealType}</div>
        )}
      </div>
      <div className='NewDealForm--div'>
        <label className='NewDealForm--label'>Deal Size</label>
        <input
          type="number"
          step="0.01"
          className='NewDealForm--input'
          value={newDeal.dealSize}
          placeholder='$1,000,000'
          onChange={handleUpdateProperty("dealSize")}
          required
        />
        {errors.dealSize && (
          <div className="NewDealForm--error">{errors.dealSize}</div>
        )}
      </div>
      <button className='NewDealForm--button' onClick={handleCreateDeal}>
        Create Deal
      </button>
    </form>
  );
};

export default DealForm;
