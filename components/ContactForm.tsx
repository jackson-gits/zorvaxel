"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { SITE, getWhatsAppHref } from "@/lib/site";
import { enquirySchema, type EnquiryInput } from "@/lib/contact-schema";

type EnquiryFormValues = z.input<typeof enquirySchema>;

type ContactFormProps = {
  initialQuantity?: string;
};

export function ContactForm({ initialQuantity = "" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const validInitialQty =
    initialQuantity && (SITE.contactPage.quantityOptions as readonly string[]).includes(initialQuantity)
      ? initialQuantity
      : "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues, unknown, EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      quantity: validInitialQty,
      message: "",
      website: "",
    },
    mode: "onBlur",
  });

  // Keep dropdown in sync if navigated with query param
  useEffect(() => {
    const searchQty = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("qty") : null;
    const targetQty = validInitialQty || (searchQty && (SITE.contactPage.quantityOptions as readonly string[]).includes(searchQty) ? searchQty : "");
    if (targetQty) {
      setValue("quantity", targetQty);
    }
  }, [validInitialQty, setValue]);

  async function onSubmit(values: EnquiryInput) {
    setFormError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        setFormError(result.message || SITE.contactPage.formError);
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError(SITE.contactPage.formError);
    }
  }

  if (submitted) {
    return (
      <section aria-live="polite" className="contact-success" role="status">
        <div className="contact-success__badge">Enquiry received</div>
        <h2>{SITE.contactPage.successTitle}</h2>
        <p className="contact-success__copy">{SITE.contactPage.successCopy}</p>
        <div className="contact-success__banner">
          <span className="contact-success__icon" aria-hidden="true">✓</span>
          <div>
            <strong>We reply within one working day</strong>
            <p>Our lab team in Chennai will review your specifications and send a clear next step.</p>
          </div>
        </div>
        <div className="contact-success__direct">
          <p>Need an immediate answer?</p>
          <a className="text-link" href={getWhatsAppHref()} rel="noreferrer" target="_blank">
            <span>Message our lab directly on {SITE.ui.whatsappLabel}</span>
            <span aria-hidden="true" className="text-link__arrow text-link__arrow--external">↗</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <form aria-busy={isSubmitting} className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div aria-hidden="true" className="honeypot">
        <label htmlFor="website">{SITE.contactPage.labels.honeypot}</label>
        <input
          autoComplete="off"
          id="website"
          tabIndex={-1}
          type="text"
          {...register("website")}
        />
      </div>

      <div className="contact-form__grid">
        <div className="form-field">
          <label htmlFor="name">
            {SITE.contactPage.labels.name} <span className="form-field__required" aria-hidden="true">*</span>
          </label>
          <input
            autoComplete="name"
            id="name"
            placeholder={SITE.contactPage.placeholders.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? <p className="form-field__error" id="name-error">{errors.name.message}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="phone">
            {SITE.contactPage.labels.phone} <span className="form-field__optional">(optional)</span>
          </label>
          <input
            autoComplete="tel"
            id="phone"
            inputMode="tel"
            placeholder={SITE.contactPage.placeholders.phone}
            type="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? <p className="form-field__error" id="phone-error">{errors.phone.message}</p> : null}
        </div>

        <div className="form-field form-field--wide">
          <label htmlFor="email">
            {SITE.contactPage.labels.email} <span className="form-field__required" aria-hidden="true">*</span>
          </label>
          <input
            autoComplete="email"
            id="email"
            inputMode="email"
            placeholder={SITE.contactPage.placeholders.email}
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? <p className="form-field__error" id="email-error">{errors.email.message}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="service">
            {SITE.contactPage.labels.service} <span className="form-field__required" aria-hidden="true">*</span>
          </label>
          <select
            id="service"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            {...register("service")}
          >
            <option value="">{SITE.contactPage.placeholders.service}</option>
            {SITE.services.items.map((service) => (
              <option key={service.number} value={service.title}>{service.title}</option>
            ))}
          </select>
          {errors.service ? <p className="form-field__error" id="service-error">{errors.service.message}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="quantity">
            {SITE.contactPage.labels.quantity} <span className="form-field__required" aria-hidden="true">*</span>
          </label>
          <select
            id="quantity"
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={errors.quantity ? "quantity-error" : undefined}
            defaultValue={validInitialQty}
            {...register("quantity")}
          >
            <option value="">{SITE.contactPage.placeholders.quantity}</option>
            {SITE.contactPage.quantityOptions.map((quantity) => (
              <option key={quantity} value={quantity}>{quantity}</option>
            ))}
          </select>
          {errors.quantity ? <p className="form-field__error" id="quantity-error">{errors.quantity.message}</p> : null}
        </div>

        <div className="form-field form-field--wide">
          <label htmlFor="message">
            {SITE.contactPage.labels.message} <span className="form-field__required" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            placeholder={SITE.contactPage.placeholders.message}
            rows={5}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message ? <p className="form-field__error" id="message-error">{errors.message.message}</p> : null}
        </div>
      </div>

      {formError ? <p aria-live="polite" className="contact-form__error" role="alert">{formError}</p> : null}
      <div className="contact-form__submit-row">
        <button className="button button--primary contact-form__submit" disabled={isSubmitting} type="submit">
          <span className="button__label">
            {isSubmitting ? SITE.contactPage.submittingLabel : SITE.contactPage.submitLabel}
          </span>
          <span aria-hidden="true" className="button__arrow">→</span>
        </button>
        <p className="contact-form__guarantee">{SITE.contactPage.responseTime}</p>
      </div>
    </form>
  );
}
