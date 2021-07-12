import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Risky",
    author: "Davido",
    url: "www.davido.com",
    likes: 23000,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("Davido")
});
