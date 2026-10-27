import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";

const title = `${webinar.title} | Cozy Digital free workshop`;
const details = "Live with Quincy + Kayson on Google Meet. Register and find joining details at " + webinar.lumaEventUrl + ". Live attendees receive the 13-page AI Shot Planning Workbook. Scheduled duration: 90 minutes.";
const utc = (value: string) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
export const googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${utc(webinar.startsAt)}/${utc(webinar.calendarEndsAt)}`, details, location: "Google Meet; joining details in Luma", ctz: webinar.timeZone })}`;
export const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?${new URLSearchParams({ path: "/calendar/action/compose", rru: "addevent", subject: title, startdt: new Date(webinar.startsAt).toISOString(), enddt: new Date(webinar.calendarEndsAt).toISOString(), body: details, location: "Google Meet; joining details in Luma" })}`;
