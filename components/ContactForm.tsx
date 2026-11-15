"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SITE, getWhatsAppHref } from "@/lib/site";
import { enquirySchema, type EnquiryInput } from "@/lib/contact-schema";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      quantity: "",
      message: "",
      website: "",
    },
    mode: "onBlur",
  });

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
        <span aria-hidden="true" className="contact-success__number">01</span>
        <h2>{SITE.contactPage.successTitle}</h2>
        <p>{SITE.contactPage.successCopy}</p>
        <p className="contact-success__next-step">{SITE.contactPage.responseTime}</p>
        <a className="text-link" href={getWhatsAppHref()} rel="noreferrer" target="_blank">
          <span>{SITE.ui.whatsappLabel}</span>
          <span aria-hidden="true" className="text-link__arrow">↗</span>
        </a>
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
          <label htmlFor="name">{SITE.contactPage.labels.name}</label>
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
          <label htmlFor="phone">{SITE.contactPage.labels.phone}</label>
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
          <label htmlFor="email">{SITE.contactPage.labels.email}</label>
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
          <label htmlFor="service">{SITE.contactPage.labels.service}</label>
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
          <label htmlFor="quantity">{SITE.contactPage.labels.quantity}</label>
          <select
            id="quantity"
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={errors.quantity ? "quantity-error" : undefined}
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
          <label htmlFor="message">{SITE.contactPage.labels.message}</label>
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
          <span aria-hidden="true" className="button__arrow">↗</span>
        </button>
        <p>{SITE.contactPage.responseTime}</p>
      </div>
    </form>
  );
}
