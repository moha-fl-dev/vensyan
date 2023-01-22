import { createContext } from 'react';
import { Ilayout, organisationContextType } from '../ui-types';


export const OrganisationContext = createContext<organisationContextType | undefined>(undefined);

export function OrganisationContextProvider({ children }: Ilayout) {

  const contextValues: organisationContextType = {
    city: '',
    organisation_name: ''
  }

  return (
    <OrganisationContext.Provider value={contextValues}>
      {children}
    </OrganisationContext.Provider>
  );
}

export default OrganisationContextProvider;
