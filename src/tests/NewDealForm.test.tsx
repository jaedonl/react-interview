// tests/NewDealForm.test.tsx
import React from "react";
import { render, fireEvent, screen } from "./utils";
import NewDealForm from "../features/NewDealForm/NewDealForm";

describe("NewDealForm", () => {
  it("shows validation errors when submitted empty", () => {
    // Use a mock callback for onCreateDeal.
    const mockCreateDeal = jest.fn();
    render(<NewDealForm onCreateDeal={mockCreateDeal} />);
    
    // Click the submit button without entering any data.
    fireEvent.click(screen.getByRole("button", { name: /create deal/i }));
    
    // Verify error messages exist by checking that getByText returns non-null values.
    expect(screen.getByText(/Institution is required/i)).not.toBeNull();
    expect(screen.getByText(/Deal type is required/i)).not.toBeNull();
    expect(screen.getByText(/Deal size is required/i)).not.toBeNull();
    
    // Ensure the createDeal callback was not called.
    expect(mockCreateDeal).not.toHaveBeenCalled();
  });

  it("calls onCreateDeal with valid input", () => {
    const mockCreateDeal = jest.fn();
    render(<NewDealForm onCreateDeal={mockCreateDeal} />);
    
    // Fill in the form fields.
    fireEvent.change(screen.getByPlaceholderText(/LS Credit Union/i), {
      target: { value: "Test Bank" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Consumer Auto/i), {
      target: { value: "Personal Loan" },
    });
    fireEvent.change(screen.getByPlaceholderText(/\$1,000,000/i), {
      target: { value: "1000000" },
    });
    
    // Submit the form.
    fireEvent.click(screen.getByRole("button", { name: /create deal/i }));
    
    // Verify that the callback is called with the correct data.
    expect(mockCreateDeal).toHaveBeenCalledWith({
      institution: "Test Bank",
      dealType: "Personal Loan",
      dealSize: "1000000",
      isPublished: false,
    });
  });
});
