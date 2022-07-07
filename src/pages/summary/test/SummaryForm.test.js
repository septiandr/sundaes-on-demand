import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("initial conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox disables button on first click and disables on second click", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);
  //poover start out hidden
  const nullpopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullpopover).not.toBeInTheDocument();
  //popover appears upon mouseover of checkbox
  const termsandconditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsandconditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  userEvent.unhover(termsandconditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
