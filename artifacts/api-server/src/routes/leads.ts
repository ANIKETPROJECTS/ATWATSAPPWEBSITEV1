import { Router, type IRouter } from "express";
import {
  SubmitDemoRequestBody,
  SubmitDemoRequestResponse,
} from "@workspace/api-zod";
import { MailConfigurationError, sendDemoRequestEmail } from "../lib/mailer";

const router: IRouter = Router();

router.post("/leads/demo", async (req, res): Promise<void> => {
  const parsed = SubmitDemoRequestBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issueCount: parsed.error.issues.length }, "Rejected invalid demo request");
    res.status(400).json({ error: "Enter a valid name and email address." });
    return;
  }

  const name = parsed.data.name.trim();
  const email = parsed.data.email.trim();
  const whatsapp = parsed.data.whatsapp?.trim();
  const company = parsed.data.company?.trim();
  const interest = parsed.data.interest?.trim();
  const message = parsed.data.message?.trim();
  if (!name || !email) {
    res.status(400).json({ error: "Enter a valid name and email address." });
    return;
  }

  try {
    await sendDemoRequestEmail({
      name,
      email,
      ...(whatsapp ? { whatsapp } : {}),
      ...(company ? { company } : {}),
      ...(interest ? { interest } : {}),
      ...(message ? { message } : {}),
    });
  } catch (error) {
    if (error instanceof MailConfigurationError) {
      req.log.warn("Demo email delivery is not configured");
      res.status(503).json({ error: "Email delivery is not connected yet. Please try again later." });
      return;
    }

    req.log.error(
      { errorName: error instanceof Error ? error.name : "UnknownError" },
      "Failed to deliver demo request email",
    );
    res.status(503).json({ error: "We couldn't send your request right now. Please try again later." });
    return;
  }

  res.json(SubmitDemoRequestResponse.parse({
    success: true,
    message: "Your request has been sent.",
  }));
});

export default router;