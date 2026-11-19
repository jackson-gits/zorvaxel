"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, type FieldErrors } from "react-hook-form";
import type { z } from "zod";
import { enquirySchema, type EnquiryInput } from "@/lib/contact-schema";
import { SITE } from "@/lib/site";

type EnquiryFormValues = z.input<typeof enquirySchema>;

const SESSION_CLOSED_KEY = "zorvaxel_batch_float_closed";

const FIELD_ORDER: ReadonlyArray<{
  key: keyof EnquiryFormValues;
  id: string;
}> = [
  { key: "name", id: "quick-batch-name" },
  { key: "phone", id: "quick-batch-phone" },
  { key: "email", id: "quick-batch-email" },
  { key: "service", id: "quick-batch-service" },
  { key: "quantity", id: "quick-batch-qty-0" },
  { key: "message", id: "quick-batch-message" },
];

export function BatchEnquiryFloat() {
  const copy = SITE.home.batchEnquiryFloat;
  const reduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [hasFailedSubmit, setHasFailedSubmit] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const shouldFocusNameOnOpenRef = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues, unknown, EnquiryInput>({
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

  const selectedQuantity = watch("quantity");

  useEffect(() => {
    setMounted(true);

    // Open automatically only on wide desktop viewports (>= 1024px) where the
    // left-aligned hero copy and bottom-right card have zero overlap.
    try {
      const wasClosed = window.sessionStorage.getItem(SESSION_CLOSED_KEY) === "1";
      const isWideDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isWideDesktop && !wasClosed) {
        setIsOpen(true);
      }
    } catch {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setIsOpen(true);
      }
    }

    const footer = document.querySelector(".site-footer");
    const footerObserver = footer
      ? new IntersectionObserver(
          ([entry]) => setFooterInView(entry.isIntersecting),
          { threshold: 0.05 },
        )
      : null;

    if (footer && footerObserver) footerObserver.observe(footer);

    return () => {
      footerObserver?.disconnect();
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      window.sessionStorage.setItem(SESSION_CLOSED_KEY, "1");
    } catch {
      // Ignore storage errors in restricted browsing contexts.
    }
    window.requestAnimationFrame(() => {
      launcherRef.current?.focus();
    });
  }, []);

  const handleOpen = useCallback(() => {
    shouldFocusNameOnOpenRef.current = true;
    setIsOpen(true);
    try {
      window.sessionStorage.removeItem(SESSION_CLOSED_KEY);
    } catch {
      // Ignore storage errors in restricted browsing contexts.
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (shouldFocusNameOnOpenRef.current) {
      shouldFocusNameOnOpenRef.current = false;
      window.requestAnimationFrame(() => {
        const firstInput = document.getElementById("quick-batch-name");
        if (firstInput instanceof HTMLElement) {
          firstInput.focus();
        }
      });
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  const errorItems = FIELD_ORDER.reduce<Array<{ id: string; message: string }>>(
    (acc, field) => {
      const err = errors[field.key];
      if (err?.message) {
        acc.push({ id: field.id, message: err.message });
      }
      return acc;
    },
    [],
  );

  function onInvalid(_fieldErrors: FieldErrors<EnquiryFormValues>) {
    setHasFailedSubmit(true);
    window.requestAnimationFrame(() => {
      errorSummaryRef.current?.focus();
    });
  }

  async function onSubmit(values: EnquiryInput) {
    setFormError("");
    setHasFailedSubmit(false);
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

  function handleReset() {
    reset();
    setFormError("");
    setHasFailedSubmit(false);
    setSubmitted(false);
  }

  if (!mounted) return null;

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.01 } },
      }
    : {
        initial: { opacity: 0, y: 12, scale: 0.97 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const },
        },
        exit: {
          opacity: 0,
          y: 8,
          scale: 0.97,
          transition: { duration: 0.12, ease: [0.4, 0, 1, 1] as const },
        },
      };

  const pillMotion = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.01 } },
      }
    : {
        initial: { opacity: 0, y: 8, scale: 0.96 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] as const },
        },
        exit: {
          opacity: 0,
          y: 6,
          scale: 0.96,
          transition: { duration: 0.11, ease: [0.4, 0, 1, 1] as const },
        },
      };

  return createPortal(
    <div
      className={`batch-float${footerInView ? " batch-float--docked" : ""}${
        isOpen ? " batch-float--open" : ""
      }`}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.section
            key="batch-panel"
            aria-labelledby="batch-float-title"
            aria-modal="false"
            className="batch-float__card"
            id="batch-float-panel"
            role="dialog"
            {...panelMotion}
          >
            <header className="batch-float__header">
              <div className="batch-float__header-copy">
                <p className="batch-float__eyebrow">
                  <span className="batch-float__status-dot" aria-hidden="true" />
                  <span>{copy.eyebrow}</span>
                </p>
                <h2 className="batch-float__title" id="batch-float-title">
                  {copy.heading}
                </h2>
              </div>
              <button
                aria-label={copy.closeLabel}
                className="batch-float__close"
                onClick={handleClose}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
                </svg>
              </button>
            </header>

            <div className="batch-float__body" data-lenis-prevent>
              {submitted ? (
                <div aria-live="polite" className="batch-float__success" role="status">
                  <span className="batch-float__success-badge">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 16 16"
                      width="13"
                    >
                      <path d="M3 8.5l3.2 3.2L13 4.8" />
                    </svg>
                    <span>{copy.successBadge}</span>
                  </span>
                  <h3>{copy.successTitle}</h3>
                  <p>{copy.successCopy}</p>
                  <div className="batch-float__success-actions">
                    <button
                      className="batch-float__btn-secondary"
                      onClick={handleReset}
                      type="button"
                    >
                      {copy.sendAnotherLabel}
                    </button>
                    <button
                      className="batch-float__btn-primary"
                      onClick={handleClose}
                      type="button"
                    >
                      {copy.doneLabel}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  aria-busy={isSubmitting}
                  className="batch-float__form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit, onInvalid)}
                >
                  <div aria-hidden="true" className="honeypot">
                    <label htmlFor="quick-batch-website">
                      {SITE.contactPage.labels.honeypot}
                    </label>
                    <input
                      autoComplete="off"
                      id="quick-batch-website"
                      tabIndex={-1}
                      type="text"
                      {...register("website")}
                    />
                  </div>

                  {hasFailedSubmit && errorItems.length > 0 ? (
                    <div
                      aria-labelledby="quick-batch-error-summary-title"
                      className="batch-float__error-summary"
                      ref={errorSummaryRef}
                      role="alert"
                      tabIndex={-1}
                    >
                      <p className="batch-float__error-summary-title" id="quick-batch-error-summary-title">
                        Please fix {errorItems.length === 1 ? "this field" : `these ${errorItems.length} fields`}:
                      </p>
                      <ul>
                        {errorItems.map((item) => (
                          <li key={item.id}>
                            <a href={`#${item.id}`}>{item.message}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="batch-float__row">
                    <div className="batch-float__field">
                      <label htmlFor="quick-batch-name">
                        {SITE.contactPage.labels.name}
                        <span aria-hidden="true" className="batch-float__req">*</span>
                      </label>
                      <input
                        aria-describedby={errors.name ? "quick-batch-name-error" : undefined}
                        aria-invalid={Boolean(errors.name)}
                        autoComplete="name"
                        id="quick-batch-name"
                        placeholder={copy.namePlaceholder}
                        type="text"
                        {...register("name")}
                      />
                      {errors.name ? (
                        <p className="batch-float__error" id="quick-batch-name-error">
                          {errors.name.message}
                        </p>
                      ) : null}
                    </div>

                    <div className="batch-float__field">
                      <label htmlFor="quick-batch-phone">
                        {SITE.contactPage.labels.phone}
                      </label>
                      <input
                        aria-describedby={errors.phone ? "quick-batch-phone-error" : undefined}
                        aria-invalid={Boolean(errors.phone)}
                        autoComplete="tel"
                        id="quick-batch-phone"
                        inputMode="tel"
                        placeholder={copy.phonePlaceholder}
                        type="tel"
                        {...register("phone")}
                      />
                      {errors.phone ? (
                        <p className="batch-float__error" id="quick-batch-phone-error">
                          {errors.phone.message}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="batch-float__field">
                    <label htmlFor="quick-batch-email">
                      {SITE.contactPage.labels.email}
                      <span aria-hidden="true" className="batch-float__req">*</span>
                    </label>
                    <input
                      aria-describedby={errors.email ? "quick-batch-email-error" : undefined}
                      aria-invalid={Boolean(errors.email)}
                      autoComplete="email"
                      id="quick-batch-email"
                      inputMode="email"
                      placeholder={copy.emailPlaceholder}
                      type="email"
                      {...register("email")}
                    />
                    {errors.email ? (
                      <p className="batch-float__error" id="quick-batch-email-error">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="batch-float__field">
                    <label htmlFor="quick-batch-service">
                      {SITE.contactPage.labels.service}
                      <span aria-hidden="true" className="batch-float__req">*</span>
                    </label>
                    <select
                      aria-describedby={errors.service ? "quick-batch-service-error" : undefined}
                      aria-invalid={Boolean(errors.service)}
                      id="quick-batch-service"
                      {...register("service")}
                    >
                      <option value="">{copy.servicePlaceholder}</option>
                      {SITE.services.items.map((service) => (
                        <option key={service.number} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.service ? (
                      <p className="batch-float__error" id="quick-batch-service-error">
                        {errors.service.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="batch-float__field">
                    <span className="batch-float__label" id="quick-batch-qty-label">
                      {SITE.contactPage.labels.quantity}
                      <span aria-hidden="true" className="batch-float__req">*</span>
                    </span>
                    <input type="hidden" {...register("quantity")} />
                    <div
                      aria-describedby={errors.quantity ? "quick-batch-qty-error" : undefined}
                      aria-labelledby="quick-batch-qty-label"
                      className="batch-float__qty-grid"
                      role="group"
                    >
                      {SITE.contactPage.quantityOptions.map((option, index) => {
                        const isSelected = selectedQuantity === option;
                        const shortLabel = copy.quantityShortLabels[option] ?? option;
                        return (
                          <button
                            aria-label={`${option} units`}
                            aria-pressed={isSelected}
                            className={`batch-float__qty-chip${
                              isSelected ? " is-selected" : ""
                            }`}
                            id={index === 0 ? "quick-batch-qty-0" : undefined}
                            key={option}
                            onClick={() =>
                              setValue("quantity", option, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                            type="button"
                          >
                            {isSelected ? (
                              <svg
                                aria-hidden="true"
                                className="batch-float__qty-check"
                                fill="none"
                                height="11"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                                viewBox="0 0 12 12"
                                width="11"
                              >
                                <path d="M2 6.5l2.5 2.5L10 3.5" />
                              </svg>
                            ) : null}
                            <span>{shortLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.quantity ? (
                      <p className="batch-float__error" id="quick-batch-qty-error">
                        {errors.quantity.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="batch-float__field">
                    <label htmlFor="quick-batch-message">
                      {SITE.contactPage.labels.message}
                      <span aria-hidden="true" className="batch-float__req">*</span>
                    </label>
                    <textarea
                      aria-describedby={errors.message ? "quick-batch-message-error" : undefined}
                      aria-invalid={Boolean(errors.message)}
                      id="quick-batch-message"
                      placeholder={copy.messagePlaceholder}
                      rows={2}
                      {...register("message")}
                    />
                    {errors.message ? (
                      <p className="batch-float__error" id="quick-batch-message-error">
                        {errors.message.message}
                      </p>
                    ) : null}
                  </div>

                  {formError ? (
                    <p aria-live="polite" className="batch-float__alert" role="alert">
                      <svg
                        aria-hidden="true"
                        className="batch-float__alert-icon"
                        fill="none"
                        height="15"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                        viewBox="0 0 16 16"
                        width="15"
                      >
                        <circle cx="8" cy="8" r="6.5" />
                        <path d="M8 5v3.5M8 11h.01" />
                      </svg>
                      <span>{formError}</span>
                    </p>
                  ) : null}

                  <div className="batch-float__footer">
                    <button
                      className="batch-float__submit"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      <span>
                        {isSubmitting ? copy.submittingLabel : copy.submitLabel}
                      </span>
                      <svg
                        aria-hidden="true"
                        className="batch-float__submit-arrow"
                        fill="none"
                        height="15"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                        viewBox="0 0 16 16"
                        width="15"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </button>
                    <p className="batch-float__note">{copy.responseNote}</p>
                  </div>
                </form>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.button
            key="batch-pill"
            aria-controls="batch-float-panel"
            aria-expanded={false}
            aria-label={copy.openLabel}
            className="batch-float__pill"
            onClick={handleOpen}
            ref={launcherRef}
            type="button"
            {...pillMotion}
          >
            <span aria-hidden="true" className="batch-float__pill-icon">
              <svg
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                viewBox="0 0 24 24"
                width="20"
              >
                <path d="M9 3h6" />
                <path d="M10 3v5.4a2 2 0 0 1-.45 1.26L5.3 15.1A3 3 0 0 0 7.64 20h8.72a3 3 0 0 0 2.34-4.9l-4.25-5.44A2 2 0 0 1 14 8.4V3" />
                <path d="M7.5 15h9" />
              </svg>
            </span>
            <span className="batch-float__pill-content">
              <span className="batch-float__pill-title">
                <span>{copy.pillTitle}</span>
                <span aria-hidden="true" className="batch-float__status-dot" />
              </span>
              <span className="batch-float__pill-subtitle">{copy.pillSubtitle}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
