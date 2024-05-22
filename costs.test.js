import { test, beforeAll, afterAll, expect, vi } from "vitest";
import { getCost } from "./costs.js";
import * as discounts from "./discounts.js";

beforeAll(function () {
  vi.spyOn(discounts, "getRandomDiscount"); // either getCost or costs...
});

afterAll(function () {
  vi.resetAllMocks();
});

test("cheap product", function () {
  // cheap products have IDs between 1000-1999, and cost $100 * discount

  discounts.getRandomDiscount.mockReturnValue(0.1);

  const cost = getCost(1200);
  expect(cost).toEqual("90.00");
});

test("expensive product", function () {
  // expensive products have IDs greater than 2000, and cost $200 * discount

  discounts.getRandomDiscount.mockReturnValue(0.1);

  const cost = getCost(2500);
  expect(cost).toEqual("180.00");
});