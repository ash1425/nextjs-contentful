import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "contentful";
import { Intro } from "../../../model/Intro";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Intro>
) {
  const { name } = req.query;
  const client = createClient({
    space: process.env.CF_SPACE_ID!,
    accessToken: process.env.CF_CD_ACCESS_TOKEN!,
  });
  let entries = await client.getEntries<Intro>({ content_type: "intro" });
  let intro = entries.items.find((entry) => entry.fields.id === name)?.fields!;
  res.status(200).json(intro);
}
