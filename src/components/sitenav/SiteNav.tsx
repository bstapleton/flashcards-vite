import { useTranslation } from 'react-i18next';

export const SiteNav = () => {
    const { t } = useTranslation();

    return (
        <nav id={'primary-nav'}>
            <ul>
                <li><a className={'link'} href={'/'}>{t('home')}</a></li>
                <li><a className={'link'} href={'/learn'}>{t('learn')}</a></li>
                <li><a className={'link'} href={'/login'}>{t('login')}</a></li>
            </ul>
        </nav>
    )
}