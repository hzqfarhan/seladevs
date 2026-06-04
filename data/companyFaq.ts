export type FaqItem = { q: string; a: string };

export const COMPANY_FAQ: FaqItem[] = [
  {
    q: "do you take a cut of the candidate's salary?",
    a: "no. we charge a flat sponsorship fee, disclosed up-front. we never take a placement fee, a recruiter cut, or a commission. if anyone claiming to represent UTHM Forge asks for a percentage of salary, report them to `abuse@uthmforge.uthm.edu.my`.",
  },
  {
    q: "what if my bounty gets no applicants?",
    a: "you get a full refund if your bounty gets 0 qualifying PRs within the merge window. \"qualifying\" = matching at least 3 of the 5 acceptance criteria in the bounty spec. no questions asked.",
  },
  {
    q: "can i edit the bounty after posting?",
    a: "yes. up to 3 edits per bounty, free. after that it's RM 50 per edit (to prevent gaming the search ranking).",
  },
  {
    q: "refund policy?",
    a: "within the merge window, if your bounty is still open and has 0 qualifying PRs, full refund. after the merge window, pro-rated refund for the unused days, processed within 7 days.",
  },
  {
    q: "international companies?",
    a: "yes, if you are sponsoring a bounty that is open to UTHM students remotely OR based in Johor (Batu Pahat / Johor Bahru / Skudai). for other regions, we currently only accept sponsorships from companies with a Malaysia office or a MoU with UTHM.",
  },
  {
    q: "do you offer technical screening?",
    a: "no. UTHM Forge does not screen candidates. for an extra RM 500/sponsorship, our partner circles can do a 1-hour technical screen on the bounty scope; ask `partnerships@uthmforge.uthm.edu.my` for details.",
  },
  {
    q: "can a UTHM faculty co-sponsor?",
    a: "yes. faculty sponsors and industry sponsors can co-fund a bounty. this is the most common model for FYP-aligned bounties where the faculty contributes RM 500 and the industry partner contributes the rest.",
  },
];
