"use client";

import Link from "next/link";
import AppData from "@data/app.json";
import { usePathname } from "next/navigation";

const DefaultFooter = () => {
  const asPath = usePathname();

  return (
    <>
      {/* footer */}
      <footer>
        <div className="container">
          <div className="sb-footer-frame">
            <Link href="/" className="sb-logo-frame">
              {/* logo img */}
              <img
                src={AppData.header.logo.image}
                alt={AppData.header.logo.alt}
              />
            </Link>
            <ul className="sb-social">
              {AppData.social.map((item, key) => (
                <li key={`footer-social-item-${key} `}>
                  <a href={item.link} target="_blank" title={item.title}>
                    <div className="flex gap-1">
                      <i className={`mt-1 ${item.icon}`}></i>

                      <p className="-mt-2">@crumbsncolagos</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="sb-copy">{AppData.footer.copy}</div>
          </div>
        </div>
      </footer>
      {/* footer end */}
    </>
  );
};
export default DefaultFooter;
