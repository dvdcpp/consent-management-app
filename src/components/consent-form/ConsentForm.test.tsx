import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ConsentForm from "./ConsentForm";
import { consentsService } from "@/services/mockConsentService";

// Mock the consentsService
vi.mock("@/services/mockConsentService", () => ({
  consentsService: {
    addConsent: vi.fn().mockResolvedValue({ message: "Consent added successfully" }),
  },
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ConsentForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderConsentForm = () =>
    render(
      <MemoryRouter>
        <ConsentForm />
      </MemoryRouter>
    );

  it("should render the form with all fields and the submit button", () => {
    renderConsentForm();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Receive newsletter")).toBeInTheDocument();
    expect(screen.getByLabelText("Be shown targeted ads")).toBeInTheDocument();
    expect(screen.getByLabelText("Contribute to anonymous visit statistics")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit consent form" })).toBeInTheDocument();
  });

  it("should display validation errors for invalid inputs", async () => {
    renderConsentForm();

    fireEvent.blur(screen.getByLabelText("Name"));
    fireEvent.blur(screen.getByLabelText("Email address"));
    fireEvent.blur(screen.getByLabelText("Receive newsletter"));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("At least one consent option must be selected")).toBeInTheDocument();
    });
  });

  it("should enable submit button and call service on valid form submission", async () => {
    renderConsentForm();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByLabelText("Receive newsletter"));

    const submitButton = screen.getByRole("button", { name: "Submit consent form" });
    
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consentsService.addConsent).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        permissions: {
          receiveNewsletter: true,
          showTargetedAds: false,
          contributeToStatistics: false,
        },
      });
      expect(mockNavigate).toHaveBeenCalledWith("/consents");
    });
  });

  it("should keep submit button disabled when the form is incomplete", async () => {
    renderConsentForm();

    const submitButton = screen.getByRole("button", { name: "Submit consent form" });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "john@example.com" } });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    fireEvent.click(screen.getByLabelText("Receive newsletter"));

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("should show an error Snackbar when form submission fails", async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
    (consentsService.addConsent as Mock).mockRejectedValueOnce(new Error("Submission failed"));
  
    renderConsentForm();
  
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByLabelText("Receive newsletter"));
  
    const submitButton = screen.getByRole("button", { name: "Submit consent form" });
    
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(screen.getByText("Failed to submit consent. Please try again.")).toBeInTheDocument();
    });
  
    expect(mockNavigate).not.toHaveBeenCalled();
  
    consoleErrorSpy.mockRestore();
  });
});