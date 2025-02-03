// tests/DealsTableRow.test.tsx
import React from "react";
import { render, screen } from "./utils";
import DealsTableRow from "../features/DealsTable/DealsTableRow/DealsTableRow";
import { DealType } from "../types";

// A sample deal for testing.
const deal: DealType = {
  id: 1,
  institution: "Test Bank",
  dealType: "Personal Loan",
  dealSize: "1000000",
  isPublished: false,
};

describe("DealsTableRow", () => {
  it("renders deal information and action buttons", () => {
    // Render the row within a minimal table structure.
    render(
      <table>
        <tbody>
          <DealsTableRow deal={deal} />
        </tbody>
      </table>
    );
    
    // Check that the deal information is rendered.
    expect(screen.getByText("Test Bank").textContent).toContain("Test Bank");
    expect(screen.getByText("Personal Loan").textContent).toContain("Personal Loan");
    expect(screen.getByText("$1,000,000").textContent).toContain("$1,000,000");
    expect(screen.getByText("No").textContent).toContain("No");
    
    // Check that the action buttons exist.
    const publishButton = screen.getByRole("button", { name: /publish/i });
    expect(publishButton).not.toBeNull();
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).not.toBeNull();
  });
  
  it("renders an 'Unpublish' button when the deal is published", () => {
    const publishedDeal: DealType = { ...deal, isPublished: true };
    render(
      <table>
        <tbody>
          <DealsTableRow deal={publishedDeal} />
        </tbody>
      </table>
    );
    
    const unpublishButton = screen.getByRole("button", { name: /unpublish/i });
    expect(unpublishButton).not.toBeNull();
  });
});
