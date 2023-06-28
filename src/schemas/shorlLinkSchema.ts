import { ErrorMessages } from "../constants/errorMesages.enum";
import { z } from "zod";

export const shortLinkSchema = z.object({
  body: z.object({
    originalLink: z
      .string({
        required_error: "originalLink is required",
      })
      .min(15, "Can't create shorter link")
      .regex(
        /^(https?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
        "originalLink must be an URL"
      ),
  }),
});

export const shortLinkParams = z.object({
  params: z.object({
    link: z
      .string({
        required_error: "originalLink is required",
      })
      .min(5, ErrorMessages.WrongShortLink),
  }),
});
