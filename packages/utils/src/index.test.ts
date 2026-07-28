import { describe, expect, it } from "vitest";
import { createStorageKey } from "./index";

describe("createStorageKey", () => {
  it("creates a namespaced Hooind storage key", () => {
    expect(createStorageKey("games", "reaction", "bestScore")).toBe(
      "hooind.games.reaction.bestScore",
    );
  });
});
