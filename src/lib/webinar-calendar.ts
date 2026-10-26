import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";

const title = `${webinar.title} | Cozy Digital free workshop`;
const details = "Live with Quincy + Kayson. The Cozy Digital team will email the joining link before the session. Live attendees receive the 13-page AI Shot Planning Workbook. One-hour calendar hold; session length may vary.";
const utc = (value: string) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
export const googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${utc(webinar.startsAt)}/${utc(webinar.calendarEndsAt)}`, details, location: "Online; joining link by email", ctz: webinar.timeZone })}`;
export const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?${new URLSearchParams({ path: "/calendar/action/compose", rru: "addevent", subject: title, startdt: new Date(webinar.startsAt).toISOString(), enddt: new Date(webinar.calendarEndsAt).toISOString(), body: details, location: "Online; joining link by email" })}`;
