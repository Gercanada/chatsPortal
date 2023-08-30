import { useTranslation } from "react-i18next";

export const Loader = () => {
  const { t } = useTranslation();
    return (
      <div className='loader__box' style={{display:'flex', flexDirection:'column'}}>
        <div className='loader'></div>
        <p>{t('loading_chats')}</p>
      </div>
    );
  };