import { ReactNode } from 'react'
import placeholders from '../utils/placeholders.json'

export type RedirectProps = {
 isUserSignIn: boolean;
 isReversedDirection: boolean;
}

export type PrivateRouteProps = {
 children: ReactNode;
 redirectTo: string;
 isReversedDirection?: boolean;
};

export type PlaceholderKeys = keyof typeof placeholders;

export type ContextProps = {
 children: ReactNode;
};
