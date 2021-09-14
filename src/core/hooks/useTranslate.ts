import { useCallback } from "react";
import { useIntl } from "react-intl";

const useTranslate = () => {
  const intl = useIntl();

  const t = useCallback((id: string, defaultMessage: string, values: Record<string, any>) => {
    return intl.formatMessage({ id, defaultMessage }, values);
  }, [intl]);

  return [t, intl.locale];
};

export default useTranslate;
