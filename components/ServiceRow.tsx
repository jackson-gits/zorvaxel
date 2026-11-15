import Link from "next/link";
import type { SiteService } from "@/lib/site";

type ServiceRowProps = {
  service: SiteService;
};

export function ServiceRow({ service }: ServiceRowProps) {
  return (
    <Link className="service-row" href={`/services#service-${service.number}`}>
      <span aria-hidden="true" className="service-row__number">{service.number}</span>
      <span className="service-row__main">
        <span className="service-row__title">{service.title}</span>
        <span className="service-row__description">{service.shortDescription}</span>
      </span>
      <span className="service-row__aside">
        <span className="service-row__moq">{service.moq}</span>
        <span aria-hidden="true" className="service-row__arrow">↗</span>
      </span>
    </Link>
  );
}
