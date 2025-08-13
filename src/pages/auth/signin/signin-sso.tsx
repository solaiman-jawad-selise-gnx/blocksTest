import { useTranslation } from 'react-i18next';
import { LoginOption, SOCIAL_AUTH_PROVIDERS } from 'constant/sso';
import { GRANT_TYPES } from 'constant/auth';
import SSOSigninCard from 'features/auth/components/sso-signin-card/sso-signin-card';
import { Divider } from '../signup/signup-page';

type SsoSigninProps = {
  loginOption: LoginOption;
};

export const SsoSignin = ({ loginOption }: SsoSigninProps) => {
  const { t } = useTranslation();
  const socialGrantAllowed = loginOption?.allowedGrantTypes?.includes(GRANT_TYPES.social);

  if (!socialGrantAllowed) {
    return null;
  }

  const allProviders = Object.values(SOCIAL_AUTH_PROVIDERS).map((provider) => {
    const ssoInfo = loginOption.ssoInfo?.find((s) => s.provider === provider.value);
    return {
      ...provider,
      audience: ssoInfo?.audience ?? '',
      provider: ssoInfo?.provider ?? provider.value,
      isAvailable: !!ssoInfo,
    };
  });

  const availableProviders = allProviders.filter((provider) => provider.isAvailable);

  if (availableProviders.length === 0) {
    return null;
  }

  const isSingleProvider = availableProviders.length === 1;

  return (
    <>
      <div className="mt-6">
        <Divider text={t('AUTH_OR')} />
      </div>

      <div className="flex items-center gap-8">
        <div
          className={`flex w-full items-center ${isSingleProvider ? 'justify-center' : 'gap-4'}`}
        >
          {availableProviders.map((item) => (
            <SSOSigninCard
              key={item?.value}
              providerConfig={item}
              showText={isSingleProvider}
              totalProviders={availableProviders.length}
            />
          ))}
        </div>
      </div>
    </>
  );
};
