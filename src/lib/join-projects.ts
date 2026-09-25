// Pure PT/EN join, kept free of `astro:content` so it can be unit-tested.

export interface Translation {
  title: string;
  summary: string;
  coverAlt: string;
}

export interface Entry<D> {
  id: string;
  data: D;
}

export interface Canonical extends Translation {
  date: Date;
  draft: boolean;
}

export interface Joined<P, E> {
  id: string;
  pt: P;
  en: E;
}

/**
 * Pairs each published canonical (pt) entry with its translation (en),
 * newest first. A published project without translation fails the build.
 */
export function joinProjects<
  P extends Entry<Canonical>,
  E extends Entry<Translation>,
>(pt: P[], en: E[]): Joined<P, E>[] {
  const byId = new Map(en.map((e) => [e.id, e]));
  const orphans = en.filter((e) => !pt.some((p) => p.id === e.id));
  if (orphans.length) {
    throw new Error(
      `en.md without pt.md: ${orphans.map((o) => o.id).join(", ")}`,
    );
  }

  return pt
    .filter((p) => !p.data.draft)
    .map((p) => {
      const translation = byId.get(p.id);
      if (!translation) {
        throw new Error(
          `Project "${p.id}" is published but has no en.md — add src/content/projects/${p.id}/en.md or set draft: true.`,
        );
      }
      return { id: p.id, pt: p, en: translation };
    })
    .sort((a, b) => b.pt.data.date.getTime() - a.pt.data.date.getTime());
}
