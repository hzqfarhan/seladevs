export type FaqItem = { q: string; a: string };

export const COMPANY_FAQ: FaqItem[] = [
  {
    q: "do you take a cut of the candidate's salary?",
    a: "no. we charge a flat fee per listing, disclosed up-front. we never take a placement fee, a recruiter cut, or a commission. if anyone claiming to represent SelaDevs asks for a percentage of salary, report them to `abuse@seladevs.com`.",
  },
  {
    q: "what if i get no applicants?",
    a: "you get a full refund if your listing gets 0 qualified applicants (we define \"qualified\" as matching at least 3 of the 5 requirements you posted) within 14 days. no questions asked.",
  },
  {
    q: "can i edit after posting?",
    a: "yes. up to 3 edits per listing, free. after that it's RM 50 per edit (to prevent gaming the search ranking).",
  },
  {
    q: "refund policy?",
    a: "within 14 days of posting, if your listing is still live and has 0 qualified applicants, full refund. after 14 days, pro-rated refund for the unused days, processed within 7 days.",
  },
  {
    q: "international companies?",
    a: "yes, if you are hiring for a role that is permanently remote OR based in Malaysia/Singapore/Indonesia. for other regions, we currently only accept listings from companies with an SEA office.",
  },
  {
    q: "do you offer screening?",
    a: "no. we do not screen candidates. we provide the platform, the listings, and the applicant pipeline; you do the hiring. for an extra RM 500/listing, our partner guilds can do a 1-hour technical screen; ask `partnerships@seladevs.com` for details.",
  },
];
