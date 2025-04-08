import { useTranslation } from 'react-i18next';
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../store/loginSlice.ts";

export const SiteNav = () => {
    const { t, i18n } = useTranslation();
    const lngs: { [key: string]: { nativeName: string; }} = {
        en: { nativeName: 'English' },
    }
    const isLoggedIn = useSelector((state: { login: { value: boolean; }; }) => state.login.value);
    const dispatch = useDispatch();

    function logOut() {
        localStorage.clear();
        dispatch(logout());
    }

    return (
        <nav id={'primary-nav'}>
            {isLoggedIn ? (
                <ul>
                    <li><a className={'link'} href={'/'}>{t('home')}</a></li>
                    <li><a className={'link'} href={'/learn'}>{t('learn')}</a></li>
                    <li><a className={'link'} href={'/profile'}>{t('profile')}</a></li>
                    <li><a className={'link'} href={'/history'}>{t('history')}</a></li>
                    <li><span className={'link'} onClick={() => logOut()}>{t('logout')}</span></li>
                    <li>
                        {Object.keys(lngs).map((lng) => (
                            <a key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                                {lngs[lng].nativeName}
                            </a>
                        ))}
                    </li>
                </ul>
            ) : (
                <ul>
                    <li><a className={'link'} href={'/'}>{t('home')}</a></li>
                    <li><a className={'link'} href={'/login'}>{t('login')}</a></li>
                    <li><a className={'link'} href={'/register'}>{t('register')}</a></li>
                </ul>
            )}
        </nav>
    )
}