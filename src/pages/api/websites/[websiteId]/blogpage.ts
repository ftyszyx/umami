import { NextApiRequestQueryBody } from 'lib/types';
import { NextApiResponse } from 'next';
import { ok } from 'next-basics';
import { MyblogReq, getBlogStats } from 'queries/analytics/pageviews/getViewStats';
export interface MyblogWebInfo {
  url_path: string;
  num: number;
}
export interface MyBlogResp {
  list: MyblogWebInfo[];
}
export default async (
  req: NextApiRequestQueryBody<MyblogReq>,
  res: NextApiResponse<MyBlogResp>,
) => {
  const views = await getBlogStats(req.query);
  // console.log('get views', views);
  return ok(res, { views });
};
