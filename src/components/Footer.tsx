import { useI18n } from "../i18n/i18n";

export default function Footer() {
  const { lang, setLang, t } = useI18n();
  const y = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#f97316" aria-hidden>
              <path d="M4 6c0-1.1.9-2 2-2h3.5c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2V6zm8.5 0c0-1.1.9-2 2-2H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3.5c-1.1 0-2-.9-2-2V6z"/>
            </svg>
            <span>VibeStrings</span>
          </div>
          <div className="footer__line">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 8V7l-3 2-2-2-3 2-2-2-3 2-2-2-3 2v9h18V8z"/></svg>
            {t("footer.email")}
          </div>
          <div className="footer__line">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
            {t("footer.city")}
          </div>

          {/* Language switcher */}
          <label className="langSwitch">
            <span>{t("footer.language")}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="langSelect"
            >
              <option value="en">EN</option>
              <option value="sq">SQ</option>
            </select>
          </label>
        </div>

        <div className="footer__col">
          <h4>{t("footer.pages")}</h4>
          <a href="#" className="footer__link">{t("footer.store")}</a>
          <a href="#" className="footer__link">{t("footer.collections")}</a>
          <a href="#" className="footer__link">{t("footer.support")}</a>
        </div>

        <div className="footer__col">
          <h4>{t("footer.product")}</h4>
          <a href="#" className="footer__link">{t("footer.terms")}</a>
          <a href="#" className="footer__link">{t("footer.privacy")}</a>
          <a href="#" className="footer__link">{t("footer.copyright")}</a>
        </div>

        <div className="footer__col">
          <h4>{t("footer.follow")}</h4>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook" className="footer__social">f</a>
            <a href="#" aria-label="Twitter" className="footer__social">x</a>
            <a href="#" aria-label="Instagram" className="footer__social">◎</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">{t("footer.rights", { y })}</div>
    </footer>
  );
}
