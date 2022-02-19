import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await res.unstable_revalidate("/");
    await res.unstable_revalidate("/intro/ashay");
    await res.unstable_revalidate("/intro/reyansh");
    res.status(200).json({ revalidated: true });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e });
  }
};
