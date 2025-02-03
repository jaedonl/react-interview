import React, {useMemo, useState} from "react";
import { DealsListType } from "../../types";
import DealsTableRow from "./DealsTableRow/DealsTableRow";
import SortIcon from "../../assets/SortIcon";
import "./DealsTable.scss";

type SortConfig = {
  key: keyof Omit<DealsListType["deals"][0], "id">;
  direction: "up" | "down";
};

type DealsTableProps = DealsListType;

const DealsTable = (props: DealsTableProps) => {
  const { deals } = props;
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: SortConfig["key"]) => {
    let direction: "up" | "down" = "up";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "up") {
      direction = "down";
    }
    setSortConfig({ key, direction});
  }

  const softDeals = useMemo(() => {
    const sortableDeals = [...deals];
    if (sortConfig !== null) {
      sortableDeals.sort((a, b) => {
        let aVal: number | string | boolean = a[sortConfig.key];
        let bVal: number |string | boolean = b[sortConfig.key];

        // If sorting by dealSize, convert to number
        if (sortConfig.key === "dealSize") {
          aVal = parseInt((aVal as string).replace(/[^0-9]/g, ""));
          bVal = parseInt((bVal as string).replace(/[^0-9]/g, ""));
        }

        // For booleans, convert to number for sorting.
        if (typeof aVal === "boolean" && typeof bVal === "boolean") {
          aVal = aVal ? 1 : 0;
          bVal = bVal ? 1 : 0;
        }

        if (aVal < bVal) {
          return sortConfig.direction === "up" ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === "up" ? 1 : -1;
        }
        return 0;
      })
    }
    return sortableDeals;
  }, [deals, sortConfig])

  const getSortIconDirection = (key: SortConfig["key"]) => {
    return sortConfig && sortConfig.key === key ? sortConfig.direction : undefined;
  }

  const dealsTableRows = softDeals.map((deal) => (
    <DealsTableRow key={deal.id} deal={deal} />
  ));
  return (
    <div className="tile">
      <div className="tile--header">Deal Portfolio</div>
      <table className='DealsTable'>
        <thead>
          <tr>
            <th className='DealsTable--headerCell' onClick={() => handleSort("institution")}>
              <div className="inner-headerCell">
                <span>Institution</span>
                <SortIcon direction={getSortIconDirection("institution")} />
              </div>              
            </th>
            <th className='DealsTable--headerCell' onClick={() => handleSort("dealType")}>
              <div className="inner-headerCell">
                <span>Deal Type</span>
                <SortIcon direction={getSortIconDirection("dealType")} />
              </div>      
            </th>
            <th className='DealsTable--headerCell' onClick={() => handleSort("dealSize")}>
              <div className="inner-headerCell">
                <span>Deal Size</span>
                <SortIcon direction={getSortIconDirection("dealSize")} />
              </div>      
            </th>
            <th className='DealsTable--headerCell' onClick={() => handleSort("isPublished")}>
              <div className="inner-headerCell">
                <span>Is Published?</span>
                <SortIcon direction={getSortIconDirection("isPublished")} />
              </div>
            </th>
            <th className='DealsTable--headerCell'>Publication</th>
            <th className='DealsTable--headerCell'>Manage Item</th>
          </tr>
        </thead>
        <tbody>{dealsTableRows}</tbody>
      </table>
    </div>
  );
};

export default DealsTable;
