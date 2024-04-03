import { EVENT_TYPE } from 'lib/constants';
import { PRISMA, runQuery } from 'lib/db';
import prisma from 'lib/prisma';

export interface MyblogReq {
  websiteId: string;
  url?: string;
}
export async function getBlogStats(req: MyblogReq) {
  return runQuery({
    [PRISMA]: () => sqlQuery(req),
  });
}
async function sqlQuery(req: MyblogReq) {
  const { parseFilters, rawQuery } = prisma;
  const { params } = await parseFilters(req.websiteId, {
    url: req.url,
    eventType: EVENT_TYPE.pageView,
  });
  //   console.log('sql params', params);
  if (req.url) {
    return rawQuery(
      `
    select url_path,count(distinct session_id) as num from website_event where website_id ={{websiteId}}
    and url_path={{url}} and event_type={{eventType}} GROUP BY url_path
        `,
      params,
    );
  }
  return rawQuery(
    `
    select url_path,count(distinct session_id) as num from website_event where website_id ={{websiteId}}
     and event_type={{eventType}} GROUP BY url_path
        `,
    params,
  );
}
