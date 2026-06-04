export const PRIVACY_MD = `# privacy policy

Last updated: 2026-06-04

## what this is

UTHM Forge ("we", "us", "the forge") is a student- and staff-led community platform for builders at Universiti Tun Hussein Onn Malaysia (UTHM), based in Parit Raja, Batu Pahat, Johor. This page tells you what data we collect, what we don't, and what rights you have. We try to be brief and honest.

> UTHM Forge is operated as a community initiative. It is not an official product of Universiti Tun Hussein Onn Malaysia unless explicitly stated. For official UTHM services, visit uthm.edu.my.

## what we collect

When you use the site, we collect the minimum needed to make it work:

- **Account data** (if you register): handle, display name, email, password hash, wallet address. You control what's public.
- **Content you create**: showcase entries, circle posts, job applications, bounty claims, townhall replies.
- **Application data**: if you apply for a job or bounty, we forward your inputs (name, email, note, optional resume URL) to the issuer.
- **Form data**: contact forms, waitlists, and the bounty-poll vote. These are stored in your browser's \`localStorage\` as drafts and posted to our backend on submit.
- **Aggregate analytics**: page views, click counts, error logs. No third-party trackers. No fingerprinting.

## what we don't collect

- No third-party advertising trackers.
- No Google Analytics, no Facebook pixel, no Hotjar, no session-replay.
- No biometric data.
- No location data beyond the faculty you self-select on your profile.
- No data from users who aren't members (visitors are anonymous by default).

## cookies and local storage

We use **only** \`localStorage\` for client-side state. That means: theme preference, RSVP state, bounty-poll votes, applied-jobs log, contact-form drafts. We do not set any \`document.cookie\` values. If your browser blocks \`localStorage\`, the site still works — you just lose some local conveniences.

## third parties

- **Vercel** hosts the site. They see your IP, user-agent, and the page you requested, per their privacy policy.
- **GitHub** is used for our open-source projects. If you sign in with GitHub, we see your handle and email.
- **Discord** powers our community. They have their own privacy policy.

We do not sell, rent, or trade any of your data with anyone.

## data retention

- Account data: until you delete your account.
- Content: until you delete it, or until your account is deleted.
- Application submissions: 12 months, then anonymised for the issuer's records.
- Server logs: 30 days.

## your rights

- **Access**: you can ask for a copy of all data we hold on you.
- **Rectification**: edit your profile any time.
- **Erasure**: delete your account, and we delete your data within 30 days.
- **Portability**: export your showcase entries, applications, and replies as JSON.
- **Complaint**: if you think we've mishandled your data, email \`privacy@uthmforge.uthm.edu.my\` and we'll respond within 14 days. You can also escalate to the Jabatan Perlindungan Data Peribadi (JPDP) under the PDPA 2010.

## children

The site is not directed at children under 13. We do not knowingly collect data from children. Members under 18 (typical for UTHM undergraduates) must have the consent of a parent or guardian to register.

## changes to this policy

If we change anything material, we'll email registered users and post a notice on \`/changelog\` at least 30 days in advance. The "last updated" date at the top reflects the current version.

## contact

For any privacy question: \`privacy@uthmforge.uthm.edu.my\`. For everything else: \`hello@uthmforge.uthm.edu.my\`.`;

export const TERMS_MD = `# terms of service

Last updated: 2026-06-04

## agreement

By using uthmforge.uthm.edu.my, you agree to these terms. If you don't agree, don't use the site. We try to keep these readable; if anything is unclear, email \`legal@uthmforge.uthm.edu.my\`.

> UTHM Forge is a community-led platform. Use of the UTHM name and logo on this site is limited to identification and editorial reference; no official endorsement is implied. For official UTHM services, please visit uthm.edu.my.

## who can use the site

- You must be at least 13 years old.
- If you're under 18, you must have a parent or guardian's consent.
- UTHM students, staff, and alumni are welcome. Non-UTHM contributors may participate in public circles and bounties.
- You must not be barred from using the site under any applicable law.
- You're responsible for what you post and what you do with account credentials.

## accounts

- One account per person. No shared accounts.
- Use a real email — we may need to verify it. UTHM SSO may be offered in a future release.
- Keep your password safe. We hash passwords with bcrypt; we never see your plaintext.
- You're responsible for activity under your account.

## content you post

- **You own what you create.** Showcase entries, townhall replies, circle posts, bounty claims — they're yours.
- **You grant us a license** to display, distribute, and promote your content on UTHM Forge and across our public channels (Discord, social media). This is non-exclusive and revocable when you delete the content.
- **No illegal content.** No harassment, no doxxing, no CSAM, no spam, no malware links.
- **No IP violations.** Don't post code you don't have the right to share. Don't post other people's work without credit.
- **Be honest.** Don't impersonate others. Don't misrepresent your qualifications on job applications.
- **FYP-related content**: if your showcase entry is based on a Final Year Project, you are responsible for ensuring your FYP supervisor and UTHM's IP policy permit the OSS release. UTHM Forge is not liable for any IP dispute arising from FYP-derived work.

## jobs and bounties

- **Job listings** are posted by UTHM-internal units, industry partners, and local Batu Pahat / Johor employers. We vet every listing before it goes live, but we don't guarantee the issuer will hire. If a job looks suspicious, report it via \`/contact?topic=report\`.
- **Bounties** are paid on merge by the issuing member, circle, faculty, or industry sponsor. We hold the escrow and disburse on PR merge. If a dispute arises, the Security circle arbitrates.
- **No ghost jobs.** If a listing is filled, the issuer must close it within 24h or face a strike.

## code of conduct

Our community runs on three rules:

1. Ship something. Anything. Even a typo fix.
2. Review at least 1 PR that isn't yours.
3. Don't be a jerk.

We enforce this. Three strikes from a community-elected council and you're out.

## intellectual property

- **The site itself**: code, design, copy. MIT licensed. Take it. Fork it. Sell it (please don't).
- **Your content**: yours. See above.
- **Trademarks**: "UTHM Forge" and our logo are ours. The "UTHM" name and UTHM's official logo are properties of Universiti Tun Hussein Onn Malaysia; their use on this site is editorial. Do not use the UTHM name or logo in a way that suggests UTHM endorses your project without prior written permission from UTHM's Corporate Communications Office.
- **DMCA / takedown**: if you believe your copyrighted work is on the site without permission, email \`legal@uthmforge.uthm.edu.my\` with a takedown notice.

## disclaimers

The site is provided "as is". We don't promise it's bug-free, secure, or that any particular outcome (a job, a bounty payout, a hire) will result. To the extent allowed by law, we disclaim all warranties.

We are not liable for indirect, incidental, or consequential damages arising from your use of the site.

UTHM is a public university under the Ministry of Higher Education Malaysia. UTHM Forge is operated by the community, not by UTHM's administration. Disputes related to UTHM-internal data (academic records, staff data) are governed by UTHM's data-protection policy and applicable MoHE circulars.

## termination

- **By you**: delete your account any time.
- **By us**: if you violate these terms, we may suspend or terminate your account. We'll tell you why and give you 14 days to appeal (except for serious violations: CSAM, doxxing, malware distribution).

## governing law

These terms are governed by the laws of Malaysia. Disputes are resolved in the courts of Johor Bahru, unless local consumer-protection law gives you the right to sue in your own jurisdiction. Where these terms conflict with UTHM's policies, UTHM's policies prevail for UTHM-internal data and conduct.

## changes

We may update these terms. Material changes get 30 days' notice via email and on \`/changelog\`. Continued use after the effective date means you accept the new terms.

## contact

\`legal@uthmforge.uthm.edu.my\` for anything legal. \`hello@uthmforge.uthm.edu.my\` for everything else.`;
