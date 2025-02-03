// tests/DealsTable.test.tsx
import React from "react";
import { render, fireEvent, screen } from "./utils";
import DealsTable from "../features/DealsTable/DealsTable";
import { DealsListType } from "../types";

// Preload a custom state for sorting tests.
const mockState: DealsListType = {
  deals: [
    { id: 1, institution: "B Bank", dealType: "Loan", dealSize: "100000", isPublished: false },
    { id: 2, institution: "A Bank", dealType: "Mortgage", dealSize: "200000", isPublished: true },
    { id: 3, institution: "C Bank", dealType: "Auto", dealSize: "150000", isPublished: false },
  ],
};

describe("DealsTable", () => {
  it("sorts deals by institution when header is clicked", () => {
    render(<DealsTable deals={mockState.deals} />, { initialState: mockState });
    
    // Click the "Institution" header to sort in ascending order.
    const institutionHeader = screen.getByText(/Institution/i);
    fireEvent.click(institutionHeader);
    
    // Get all rows; the first row is the header.
    const rows = screen.getAllByRole("row");
    // Verify that the first data row (index 1) contains the institution "A Bank" (ascending).
    expect(rows[1].textContent).toContain("A Bank");
    
    // Click the header again to sort in descending order.
    fireEvent.click(institutionHeader);
    const updatedRows = screen.getAllByRole("row");
    // Verify that the first data row (index 1) now contains "C Bank" (descending).
    expect(updatedRows[1].textContent).toContain("C Bank");
  });
});
