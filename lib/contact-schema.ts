import { z } from "zod";
import { SITE } from "@/lib/site";

const copy = SITE.contactPage.validation;
const serviceTitles: readonly string[] = SITE.services.items.map((service) => service.title);
const quantities: readonly string[] = SITE.contactPage.quantityOptions;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, copy.nameRequired)
    .max(100, copy.nameTooLong),
  phone: z
    .string()
    .trim()
    .min(7, copy.phoneRequired)
    .max(25, copy.phoneInvalid)
    .refine((phone) => phone.replace(/\D/g, "").length >= 7, copy.phoneInvalid)
    .regex(/^\+?[\d\s().-]+$/, copy.phoneInvalid),
  email: z
    .string()
    .trim()
    .min(1, copy.emailRequired)
    .email(copy.emailInvalid)
    .max(254, copy.emailInvalid),
  service: z
    .string()
    .min(1, copy.serviceRequired)
    .refine((service) => serviceTitles.includes(service), copy.serviceRequired),
  quantity: z
    .string()
    .min(1, copy.quantityRequired)
    .refine((quantity) => quantities.includes(quantity), copy.quantityRequired),
  message: z
    .string()
    .trim()
    .min(1, copy.messageRequired)
    .min(10, copy.messageTooShort)
    .max(2000, copy.messageTooLong),
  website: z.string().max(500).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
