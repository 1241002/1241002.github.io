import { describe, expect, it } from "vitest";
import { joinProjects } from "./join-projects";

const pt = (id: string, date: string, draft = false) => ({
  id,
  data: {
    title: id,
    summary: "",
    coverAlt: "alt",
    date: new Date(date),
    draft,
  },
});
const en = (id: string) => ({
  id,
  data: { title: `${id} (en)`, summary: "", coverAlt: "alt" },
});

describe("joinProjects", () => {
  it("pairs each project with its translation, newest first", () => {
    const result = joinProjects(
      [pt("old", "2025-01-01"), pt("new", "2026-04-01")],
      [en("old"), en("new")],
    );
    expect(result.map((r) => r.id)).toEqual(["new", "old"]);
    expect(result[0]!.en.data.title).toBe("new (en)");
  });

  it("fails when a published project has no en.md", () => {
    expect(() => joinProjects([pt("dragster", "2026-04-01")], [])).toThrow(
      /dragster.*en\.md/,
    );
  });

  it("hides drafts, which may lack a translation", () => {
    const result = joinProjects(
      [pt("done", "2026-01-01"), pt("wip", "2026-02-01", true)],
      [en("done")],
    );
    expect(result.map((r) => r.id)).toEqual(["done"]);
  });

  it("fails on a translation without a canonical entry", () => {
    expect(() => joinProjects([], [en("ghost")])).toThrow(/ghost/);
  });
});
