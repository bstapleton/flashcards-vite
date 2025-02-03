import { useTranslation } from 'react-i18next';

export const SiteNav = () => {
    const { t, i18n } = useTranslation();
    const lngs = {
        en: { nativeName: 'English' },
    }

    return (
        <nav id={'primary-nav'}>
            <ul>
                <li><a className={'link'} href={'/'}>{t('home')}</a></li>
                <li><a className={'link'} href={'/learn'}>{t('learn')}</a></li>
                <li><a className={'link'} href={'/login'}>{t('login')}</a></li>
                <li>
                    {Object.keys(lngs).map((lng) => (
                        <a key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                            {lngs[lng].nativeName}
                        </a>
                    ))}
                </li>
            </ul>
        </nav>
    )
}